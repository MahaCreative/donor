<?php

namespace App\Http\Controllers;

use App\Models\ProsesRegistrasiDonor;
use App\Models\RegistrasiDonor;
use App\Models\StockDarah;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProsesDonorController extends Controller
{
    public function query()
    {
        return ProsesRegistrasiDonor::join('users', 'users.id', 'proses_registrasi_donors.petugas_id')
            ->join('profiles', 'profiles.user_id', 'users.id')
            ->join('registrasi_donors', 'proses_registrasi_donors.registrasi_donor_id', 'registrasi_donors.id')
            ->join('pendonors', 'pendonors.id', 'registrasi_donors.pendonor_id')
            ->join('golongan_darahs', 'registrasi_donors.golongan_darah', 'golongan_darahs.id')
            ->select(
                'profiles.nama as nama_petugas',
                'registrasi_donors.kode_registrasi',
                'proses_registrasi_donors.*',
                'pendonors.nama as nama_pendonor',
                'golongan_darahs.golongan_darah'
            );
    }
    public function index(Request $req)
    {
        $dataproses = [];
        $startDate =  Carbon::now()->startOfMonth()->format('Y-m-d');
        $endDate = Carbon::now()->endOfMonth()->format('Y-m-d');
        // dd($endDate);
        $status = $req->q;
        $search = $req->search;
        $dari_tanggal = $req->dari_tanggal ? $req->dari_tanggal : $startDate;
        $sampai_tanggal = $req->sampai_tanggal ? $req->sampai_tanggal : $endDate;
        if ($req->q != null and $req->search == null) {
            // dd($sampai_tanggal);
            $dataproses = $this->query()
                // ->where('proses_registrasi_donors.created_at', '>=', $dari_tanggal)
                // ->where('proses_registrasi_donors.created_at', '<=', $sampai_tanggal)
                ->where('proses_registrasi_donors.status', $status)
                ->get();
        } else if ($req->q == null and $req->search !== null) {
            $dataproses = $this->query()
                ->where('pendonors.nama', 'like', '%' . $search . '%')
                ->orWhere('golongan_darahs.golongan_darah', 'like', '%' . $search . '%')
                ->orWhere('profiles.nama', 'like', '%' . $search . '%')
                ->orderByDesc('proses_registrasi_donors.created_at')
                // ->where('proses_registrasi_donors.created_at', '>=', $dari_tanggal)
                // ->where('proses_registrasi_donors.created_at', '<=', $sampai_tanggal)
                ->get();
        } else if ($req->q !== null and $req->search !== null) {
            $dataproses = $this->query()
                ->where([['pendonors.nama', 'like', '%' . $search . '%'], ['proses_registrasi_donors.status', $status]])
                ->orWhere([['golongan_darahs.golongan_darah', 'like', '%' . $search . '%'], ['proses_registrasi_donors.status', $status]])
                ->orWhere([['profiles.nama', 'like', '%' . $search . '%'], ['proses_registrasi_donors.status', $status]])
                // ->where('proses_registrasi_donors.created_at', '>=', $dari_tanggal)
                // ->where('proses_registrasi_donors.created_at', '<=', $sampai_tanggal)
                ->orderByDesc('proses_registrasi_donors.created_at')
                ->get();
        } else {

            $dataproses = $this->query()
                ->where('proses_registrasi_donors.created_at', '>=', $dari_tanggal)
                ->where('proses_registrasi_donors.created_at', '<=', $sampai_tanggal)
                ->orderByDesc('proses_registrasi_donors.created_at')
                ->get();
        }


        $berhasil = ProsesRegistrasiDonor::where('status', 'berhasil')->count();
        $gagal = ProsesRegistrasiDonor::where('status', 'gagal')->count();
        $req->session()->put('cetak', $dataproses);
        return inertia('Backend/Proses/index', compact('dataproses', 'berhasil', 'gagal', 'endDate', 'startDate'));
    }

    public function proses($kd_registrasi)
    {
        $registrasi = RegistrasiDonor::with(['petugas', 'pendonor' => function ($qur) {
            $qur->with('darah')->first();
        }, 'darah', 'user' => function ($query) {
            $query->with(['profile' => function ($q) {
                $q->with('darah')->first();
            }])->first();
        }])
            ->where('kode_registrasi', $kd_registrasi)->first();
        // return  $registrasi;
        return inertia('Backend/Proses/proses', ['registrasi', $registrasi]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $attr = $request->validate(
            [
                'jumlah_darah' => 'required|numeric',
                'tekanan_darah' => 'required',
                'status' => 'required'
            ]
        );
        $jumlahDarah = $request->status === 'berhasil' ? $request->jumlah_darah : 0;

        $proses = ProsesRegistrasiDonor::create([
            'registrasi_donor_id' => $request->registrasi_id,
            'petugas_id' => $request->user()->id,
            'status' => $request->status,
            'jumlah_darah' => $jumlahDarah,
            'tekanan_darah' => $request->tekanan_darah,
            'keterangan' => $request->keterangan
        ]);
        $darah = $proses->registrasi_donor->golongan_darah;
        $stock_darah = StockDarah::findOrFail($darah);
        $stock_darah->stok = $stock_darah->stok + $proses->jumlah_darah;
        $stock_darah->save();
        $proses->registrasi_donor()->update([
            'status_donor' => 'berhasil'
        ]);
        // dd($darah);
        // dd($proses->registrasi_donor);
        return redirect()->route('proses-donor')->with([
            'type' => 'success',
            'message' => 'Berhasil Menambah Data'
        ]);
    }
    public function update($id, Request $request)
    {
        $proses = ProsesRegistrasiDonor::findOrFail($id);
        // dd($request->all());
        $darah_sebelumnya = $proses->jumlah_darah;
        $attr = $request->validate(
            [
                'jumlah_darah' => 'required|numeric',
                'tekanan_darah' => 'required',
                'status' => 'required'
            ]
        );
        $jumlahDarah = $request->status === 'berhasil' ? $request->jumlah_darah : 0;

        $proses->update([
            'petugas_id' => $request->user()->id,
            'status' => $request->status,
            'jumlah_darah' => $jumlahDarah,
            'tekanan_darah' => $request->tekanan_darah,
            'keterangan' => $request->keterangan
        ]);
        $data = $proses->registrasi_donor->darah->stok;
        $data
            ->update(
                ['stok' => $proses->registrasi_donor->darah->stok->stok - $darah_sebelumnya]
            );

        $stok = StockDarah::findOrFail($proses->registrasi_donor->golongan_darah);
        $stok['stok'] = $stok->stok + $request->jumlah_darah;
        $stok->save();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Mengedit Data'
        ]);
    }
    public function delete($id)
    {
        $proses = ProsesRegistrasiDonor::with('registrasi_donor')->where('id', $id)->first();
        // $proses->registrasi_donor->darah->stok->stok = $proses->registrasi_donor->darah->stok->stok - $proses->jumlah_darah;
        $proses->registrasi_donor->darah->stok()
            ->update(
                ['stok' => $proses->registrasi_donor->darah->stok->stok - $proses->jumlah_darah]
            );
        $proses->registrasi_donor()->update([
            'status_donor' => 'verifikasi'
        ]);

        $proses->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Menghapus Data'
        ]);
    }
}
