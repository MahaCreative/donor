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
            'email' => ['required'],
            'password' => ['required', 'confirmed'],
        ]);
        if (Auth::attempt($request->only('email', 'password'))) {
            session()->regenerate();
            return redirect()->route('dashboard')->with([
                'type' => 'success',
                'message' => 'Berhasil Login'
            ]);
        }

        throw ValidationException::withMessages(['email' => 'the email credential is not match our record.']);
    }
}
