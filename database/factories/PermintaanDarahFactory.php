<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PermintaanDarahFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'golongan_darah_id' => rand(1, 8),
            'petugas_id'        => 1,
            'kode_permintaan'   => rand(1, 1000),
            'nama'              => $this->faker->date(),
            'tanggal_lahir'     => $this->faker->date(),
            'jumlah_permintaan' => rand(1, 4),
            'keterangan'        => '',
            'status'            => 'berhasil',
        ];
    }
}
