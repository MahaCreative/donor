<?php

namespace App\Http\Controllers;

use App\Models\EvenDonor;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $event = EvenDonor::whereMonth('tanggal_event', Carbon::now()->format('m'))->get()->take(4);
        // dd($event);
        return inertia('Index', compact('event'));
    }
}
