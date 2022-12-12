<?php

namespace App\Http\Controllers;

use App\Models\GolonganDarah;
use Illuminate\Http\Request;

class DarahController extends Controller
{
    public function index()
    {
        $darah = GolonganDarah::all();
        return inertia('Backend/DataDarah', ['darah' => $darah]);
    }
}
