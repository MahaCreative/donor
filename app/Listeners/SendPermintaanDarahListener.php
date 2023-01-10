<?php

namespace App\Listeners;

use App\Events\SendPermintaanDarah;
use App\Models\Profile;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendPermintaanDarahListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\SendPermintaanDarah  $event
     * @return void
     */
    public function handle(SendPermintaanDarah $event)
    {
        // $profile = Profile::where()
    }
}
