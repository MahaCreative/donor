<?php

namespace App\Http\Controllers;

use App\Models\ProsesRegistrasiDonor;
use App\Models\RegistrasiDonor;
use App\Models\StockDarah;
use Illuminate\Http\Request;

class ProsesDonorController extends Controller
{
    public function index(Request $req)
    {
        $dataproses = [];
        if ($req->q) {
            $dataproses = ProsesRegistrasiDonor::with(['petugas' => function ($quer) {
                $quer->with('profile')->first();
            }, 'registrasi_donor' => function ($quer) {
                $quer->with(['pendonor', 'user' => function ($quer) {
                    $quer->with('profile')->first();
                }])->first();
            }])->where('status', $req->q)->latest()->get();
        } else {
            $dataproses = ProsesRegistrasiDonor::with(['petugas' => function ($quer) {
                $quer->with('profile')->first();
            }, 'registrasi_donor' => function ($quer) {
                $quer->with(['pendonor', 'user' => function ($quer) {
                    $quer->with('profile')->first();
                }])->first();
            }])->latest()->get();
        }
        $berhasil = ProsesRegistrasiDonor::where('status', 'berhasil')->count();
        $gagal = ProsesRegistrasiDonor::where('status', 'gagal')->count();
        return inertia('Backend/Proses/index', compact('dataproses', 'berhasil', 'gagal'));
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
        return redirect()->back()->with([
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


        $proses->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Menghapus Data'
        ]);
    }
}
