<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function __invoke()
    {
        return inertia('Guest/Login');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed'],
        ]);

        if (Auth::attempt($request->only('email', 'password_confirmation', 'password'))) {
            session()->regenerate();
            return redirect()->route('dashboard')->with([
                'type' => 'success',
                'message' => 'Berhasil Login'
            ]);
        } else {
            dd('a');
            return redirect()->route('dashboard')->with([
                'type' => 'error',
                'message' => 'Email atau password anda salah'
            ]);
        }
    }
}
