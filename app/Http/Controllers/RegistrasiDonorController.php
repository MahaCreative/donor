<?php

namespace App\Http\Controllers;

use App\Models\GolonganDarah;
use App\Models\Pendonor;
use App\Models\RegistrasiDonor;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RegistrasiDonorController extends Controller
{
    public function index()
    {
        $golonganDarah = GolonganDarah::all();
        return inertia('Guest/RegistrasiDonor', ['golDar' => $golonganDarah]);
    }
    public function check(Request $request)
    {
        $attr = $request->validate([
            'email' => 'required|email|min:6',
            'nama' => 'required|min:6',
            'tempat_lahir' => 'required|min:6',
            'tanggal_lahir' => 'required|date|before:now',
            'telp' => 'required|min:12',
            'alamat' => 'required|min:6',
            'jenis_kelamin' => 'required',
            'berat_badan' => 'min:2|max:4',
            'tinggi_badan' => 'min:2|max:4',
            'gol_darah' => 'required',
            'pekerjaan' => 'min:6',
            'riwayat_penyakit' => 'min:6',
            'tanggal_donor' => 'required|date|after:now',
            'jam_donor' => 'required',
        ]);
        // dd($request->all());
    }
    public function store(Request $request)
    {

        $pendonor = Pendonor::create([
            'email' => $request->email,
            'nama' => $request->nama,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'telp' => $request->telp,
            'alamat' => $request->alamat,
            'jenis_kelamin' => $request->jenis_kelamin,
            'berat_badan' => $request->berat_badan,
            'tinggi_badan' => $request->tinggi_badan,
            'gol_darah' => $request->gol_darah,
            'pekerjaan' => $request->pekerjaan,
            'riwayat_penyakit' => $request->riwayat_penyakit,
        ]);
        $countRegis = RegistrasiDonor::count();
        dd($pendonor);
        $registrasiDonor = RegistrasiDonor::create([
            'kode_registrasi' => 'DD-' . Carbon::now()->format('dd-mm-YY') . 'NO-' . ($countRegis + 1),
            'pendonor_id' => $pendonor->id,
            'tanggal_donor_darah' => $request->tanggal_donor,
            'jam_donor_darah' => $request->jam_donor,
            'status_donor' => 'verifikasi',
            'golongan_darah' => $pendonor->gol_darah,
            'jenis_donor' => $request->jenis_donor
        ]);
        if ($pendonor) {
            return redirect()->back();
        } else {
            dd('gaga');
        }
    }
}
