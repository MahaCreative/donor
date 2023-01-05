<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserSingleResource;
use App\Models\GolonganDarah;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $user_id = Auth::user()->id;
        $user = UserSingleResource::collection(User::with('roles', 'profile')->where('id', $user_id)->get()->take(1));
        $goldar = GolonganDarah::all();
        return inertia('Backend/Profile/Index', ['user' => $user, 'golDar' => $goldar]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'nama' => 'required|min:6',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required',
            'telp' => 'required|min:12|max:13',
            'alamat' => 'required',
            'jenis_kelamin' => 'required',
            // 'golongan_darah' => 'required',
        ]);
        // dd($request->all());
        $profile = Profile::create([
            'user_id' => $request->user()->id,
            'nama' => $request->nama,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'telp' => $request->telp,
            'alamat' => $request->alamat,
            'jenis_kelamin' => $request->jenis_kelamin,
            'gol_darah' => $request->golongan_darah,
            'pekerjaan' => $request->pekerjaan,
            'berat_badan' => $request->berat_badan,
            'tinggi_badan' => $request->tinggi_badan,
            'riwayat_penyakit' => $request->riwayat_penyakit,
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Menambahkan Data'
        ]);
    }

    public function show()
    {
    }
    public function update(Request $request)
    {
        $request->validate([
            'nama' => 'required|min:6',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required',
            'telp' => 'required|min:12|max:13',
            'alamat' => 'required',
            'jenis_kelamin' => 'required',
            // 'golongan_darah' => 'required',
        ]);
        // dd($request->all());

        $profile = Profile::findOrFail($request->id);
        $profile->update([
            'user_id' => $request->user()->id,
            'nama' => $request->nama,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'telp' => $request->telp,
            'alamat' => $request->alamat,
            'jenis_kelamin' => $request->jenis_kelamin,
            'gol_darah' => $request->golongan_darah,
            'pekerjaan' => $request->pekerjaan,
            'berat_badan' => $request->berat_badan,
            'tinggi_badan' => $request->tinggi_badan,
            'riwayat_penyakit' => $request->riwayat_penyakit,
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Memproses Data'
        ]);
    }
}
