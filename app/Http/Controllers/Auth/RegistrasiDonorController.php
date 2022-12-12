<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\RegistrasiDonorResource;
use App\Http\Resources\RegistrasiDonorResourceFetchAll;
use App\Models\GolonganDarah;
use App\Models\Pendonor;
use App\Models\RegistrasiDonor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegistrasiDonorController extends Controller
{
    public $search;
    public function index(Request $request)
    {
        $registrasi = [];
        if ($request->j) {

            $registrasi = RegistrasiDonor::with(['darah', 'petugas', 'pendonor', 'proses', 'user' => function ($query) {
                $query->with('profile')->first();
            }])->where('jenis_donor', $request->j)
                ->latest()->get();
        } else {
            $registrasi = RegistrasiDonor::with(['darah', 'petugas', 'pendonor', 'proses', 'user' => function ($query) {
                $query->with('profile')->first();
            }])->latest()->get();
        }
        if ($request->search) {
            $this->search = $request->search;
            $registrasi = RegistrasiDonor::with(['darah', 'petugas', 'pendonor', 'proses', 'user' => function ($query) {
                $query->with('profile')->first();
            }])->where('tanggal_donor_darah', 'like', '%' . $request->search . '%')
                ->latest()->get();
            // dd($registrasi);
        } else {
            $registrasi = RegistrasiDonor::with(['darah', 'petugas', 'pendonor', 'proses', 'user' => function ($query) {
                $query->with('profile')->first();
            }])->latest()->get();
        }


        $pengganti = RegistrasiDonor::where('jenis_donor', 'pengganti')->count();
        $sukarela = RegistrasiDonor::where('jenis_donor', 'sukarela')->count();
        $bayaran = RegistrasiDonor::where('jenis_donor', 'bayaran')->count();
        // $count = DB::table('registrasi_donors')->select(DB::raw('jenis_donor as jenis'), DB::raw('count(jenis_donor) as total'))->groupBy(DB::raw('jenis_donor'))->get();
        // dd($registrasi);
        $darah = GolonganDarah::all();
        return inertia('Backend/Registrasi/RegistrasiDonor', ['pengganti' => $pengganti, 'sukarela' => $sukarela, 'bayaran' => $bayaran, 'registrasi' => $registrasi, 'golDar' => $darah]);
    }
    public function store(Request $request)
    {
        // dd($request->all());
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
            'jenis_donor' => 'required',

        ]);

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
        $registrasiDonor = RegistrasiDonor::create([
            'kode_registrasi' => 'DD-' . Carbon::now()->format('d-m-Y') . 'NO-' . ($countRegis + 1),
            'pendonor_id' => $pendonor->id,
            'tanggal_donor_darah' => $request->tanggal_donor,
            'jam_donor_darah' => $request->jam_donor,
            'status_donor' => 'verifikasi',
            'golongan_darah' => $pendonor->gol_darah,
            'jenis_donor' => $request->jenis_donor,
            'petugas_id' => 1
        ]);

        if ($pendonor) {
            return redirect()->back()->with([
                'type' => 'success',
                'message' => 'Berhasil Menambahkan Data'
            ]);;
        } else {
            dd('gaga');
        }
    }
    public function update(Request $request)
    {
        $registrasi = RegistrasiDonor::where('id', $request->id)->first();
        $pendonor = $registrasi->pendonor;
        $pendonor->update([
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
        $registrasi->update([

            'pendonor_id' => $pendonor->id,
            'tanggal_donor_darah' => $request->tanggal_donor,
            'jam_donor_darah' => $request->jam_donor,
            'status_donor' => 'verifikasi',
            'golongan_darah' => $pendonor->gol_darah,
            'jenis_donor' => $request->jenis_donor,
            'petugas_id' => 1
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Mengedit Data'
        ]);
    }
    public function delete($kode)
    {

        $register = RegistrasiDonor::with('proses', 'darah')->where('kode_registrasi', $kode)->first();
        $register->darah->stok()->update(
            ['stok' => $register->darah->stok->stok - $register->proses->jumlah_darah]
        );
        $register->proses()->delete();
        $register->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Menghapus Data'
        ]);
    }
}
