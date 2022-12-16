<?php

namespace Database\Factories;

use App\Models\PermintaanDarah;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProsesPermintaanDarahFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'petugas_id'                => 1,
            'kode_proses_permintaan'    => rand(1, 999),
            'permintaan_darah_id'       => PermintaanDarah::factory()->create(),
            'gol_darah_id'              => rand(1, 8),
        ];
    }
}
