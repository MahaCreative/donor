<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\EvenDonor;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventDonor extends Controller
{
    public function index()
    {
        $event = EvenDonor::whereMonth('tanggal_event', Carbon::now()->format('m'))->get()->take(4);
        return inertia('Guest/EventDonor/index', compact('event'));
    }
}
