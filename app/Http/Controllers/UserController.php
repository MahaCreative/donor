<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $user = User::with('profile', 'roles')->latest()->get();
        // dd($user);
        return inertia('Backend/Users/Index', ['users' => $user]);
    }
    public function update(Request $request)
    {
        $user = User::findOrFail($request->id);

        $attr = $request->validate([
            'name' => ['required', 'min:6', 'unique:users,name', 'alpha_num'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'confirmed', 'min:6', 'alpha_num'],
        ]);

        $user->update($attr);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Menambahkan Data'
        ]);
    }
}
