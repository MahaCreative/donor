<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvenDonorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('even_donors', function (Blueprint $table) {
            $table->id();
            $table->string('kode_event');
            $table->string('judul_even');
            $table->text('kontent')->nullable();
            $table->string('slug');
            $table->text('tempat');
            $table->date('tanggal_event');
            $table->string('penyelenggara');
            $table->time('waktu_event');
            $table->string('thumbnail')->nullable();
            $table->boolean('status_event');
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
        Schema::dropIfExists('even_donors');
    }
}
