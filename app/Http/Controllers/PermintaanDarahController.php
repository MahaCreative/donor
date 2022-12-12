<?php

namespace App\Http\Controllers;

use App\Models\GolonganDarah;
use App\Models\PermintaanDarah;
use Illuminate\Http\Request;

class PermintaanDarahController extends Controller
{
    public function index()
    {
        $golDar = GolonganDarah::all();
        $permintaan = PermintaanDarah::join('golongan_darahs', 'golongan_darahs.id', 'permintaan_darahs.golongan_darah_id')
            ->join('users', 'users.id', 'permintaan_darahs.petugas_id')
            ->select(['permintaan_darahs.*', 'golongan_darahs.golongan_darah', 'users.name'])
            ->get();
        // dd($permintaan);
        return inertia('Backend/PermintaanDarah/Index', ['golDar' => $golDar, 'permintaan' => $permintaan]);
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
    public function search()
    {
        $permintaan = PermintaanDarah::all();
        return inertia('Backend/PermintaanDarah/Proses', compact('permintaan'));
    }
}
