<?php

namespace App\Http\Controllers;

use App\Models\GolonganDarah;
use App\Models\Pendonor;
use App\Models\PermintaanDarah;
use App\Models\ProsesPermintaanDarah;
use App\Models\ProsesRegistrasiDonor;
use App\Models\RegistrasiDonor;
use App\Models\StockDarah;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PermintaanDarahController extends Controller
{
    public function index(Request $request)
    {
        $golDar = GolonganDarah::all();
        $startDate =  Carbon::now()->startOfMonth()->format('Y-m-d');
        $endDate = Carbon::now()->endOfMonth()->format('Y-m-d');
        $dari_tanggal = $request->dari_tanggal ? $request->dari_tanggal : $startDate;
        $sampai_tanggal = $request->sampai_tanggal ? $request->sampai_tanggal : $endDate;
        $permintaan = [];
        if ($request->search === null) {
            $permintaan = PermintaanDarah::join('golongan_darahs', 'golongan_darahs.id', 'permintaan_darahs.golongan_darah_id')
                ->join('users', 'users.id', 'permintaan_darahs.petugas_id')
                ->select(['permintaan_darahs.*', 'golongan_darahs.golongan_darah', 'users.name'])
                ->whereBetween('permintaan_darahs.created_at', [$dari_tanggal, $sampai_tanggal])
                ->orderByDesc('permintaan_darahs.created_at')
                ->get();
        } else {
            $permintaan = PermintaanDarah::join('golongan_darahs', 'golongan_darahs.id', 'permintaan_darahs.golongan_darah_id')
                ->join('users', 'users.id', 'permintaan_darahs.petugas_id')

                ->orwhere([['permintaan_darahs.nama', 'like', '%' . $request->search . '%'], ['permintaan_darahs.created_at', '>=', $dari_tanggal], ['permintaan_darahs.created_at', '<=', $sampai_tanggal]])
                ->orwhere([['permintaan_darahs.status', 'like', '%' . $request->search . '%'], ['permintaan_darahs.created_at', '>=', $dari_tanggal], ['permintaan_darahs.created_at', '<=', $sampai_tanggal]])
                ->orwhere([['golongan_darahs.golongan_darah', 'like', '%' . $request->search . '%'], ['permintaan_darahs.created_at', '>=', $dari_tanggal], ['permintaan_darahs.created_at', '<=', $sampai_tanggal]])
                ->select(['permintaan_darahs.*', 'golongan_darahs.golongan_darah', 'users.name'])
                ->orderByDesc('permintaan_darahs.created_at')
                ->get();
        }
        $request->session()->put('cetak', $permintaan);
        return inertia('Backend/PermintaanDarah/Index', ['golDar' => $golDar, 'permintaan' => $permintaan, 'endDate' => $endDate, 'startDate' => $startDate]);
    }
    public function store(Request $req)
    {
        $petugasId = $req->user()->id;
        // dd($petugasId);
        $countPermintaan = PermintaanDarah::count();
        $kode = 'PD-' . now()->format('d-m-y') . '-' . $countPermintaan;
        $req->validate([
            'gol_darah' => 'required',
            'nama' => 'required',
            'tanggal_lahir' => 'required',
            'jumlah_permintaan' => 'required',
            'keterangan' => 'required',
        ]);
        $permintaan = PermintaanDarah::create([
            'kode_permintaan' => $kode,
            'golongan_darah_id' => $req->gol_darah,
            'nama' => $req->nama,
            'petugas_id' => $petugasId,
            'tanggal_lahir' => $req->tanggal_lahir,
            'jumlah_permintaan' => $req->jumlah_permintaan,
            'keterangan' => $req->keterangan,
        ]);
        return redirect()->back();
    }
    public function update($id, Request $req)
    {
        $permintaan = PermintaanDarah::findOrFail($id);
        $petugasId = $req->user()->id;
        $req->validate([
            'gol_darah' => 'required',
            'nama' => 'required',
            'tanggal_lahir' => 'required',
            'jumlah_permintaan' => 'required',
            'keterangan' => 'required',
        ]);
        $permintaan->update([
            'golongan_darah_id' => $req->gol_darah,
            'nama' => $req->nama,
            'petugas_id' => $petugasId,
            'tanggal_lahir' => $req->tanggal_lahir,
            'jumlah_permintaan' => $req->jumlah_permintaan,
            'keterangan' => $req->keterangan,
            'status' => $req->status
        ]);

        return redirect()->back();
    }
    public function delete($id)
    {
        $permintaan = PermintaanDarah::findOrFail($id);
    }
    public function proses_permintaan(Request $request)
    {
        // dd($request->all());
        $countProses = ProsesPermintaanDarah::count();
        $kode_proses_permintaan = 'PD-' . now()->format('d-m-y') . '-' . $countProses;
        $user_id = $request->user()->id;
        // dd($user_id);
        // Cek Stok Darah
        $cekstok = StockDarah::findOrFail($request->id);

        if ($cekstok->stok - $request->jumlah_permintaan >= 0) {
            $proses = ProsesPermintaanDarah::create([
                'petugas_id' => $user_id,
                'kode_proses_permintaan' => $kode_proses_permintaan,
                'permintaan_darah_id' => $request->id,
                'gol_darah_id' => $request->golongan_darah_id
            ]);

            // Update Stok Darah
            $proses->permintaan_darah()->update(['status' => 'berhasil']);
            $stok = StockDarah::findOrFail($request->id);
            $stok->stok = $stok->stok - $request->jumlah_permintaan;
            $stok->save();
            return redirect()->back()->with([
                'type' => 'success',
                'message' => 'Proses Permintaan Berhasil. Stok Darah Telah Berkurang'
            ]);
        } else {
            return redirect()->back()->with([
                'type' => 'error',
                'message' => 'jumlah permintaan melebihi stok yang ada'
            ]);
        }


        // dd($request->all());
    }
}
