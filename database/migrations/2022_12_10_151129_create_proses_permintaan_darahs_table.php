<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProsesPermintaanDarahsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proses_permintaan_darahs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('petugas_id');
            $table->foreignId('kode_proses_permintaan');
            $table->foreignId('pendonor_id');
            $table->foreignId('gol_darah_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('proses_permintaan_darahs');
    }
}
