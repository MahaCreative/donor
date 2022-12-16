<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PendonorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'email' => $this->faker->email,
            'nama' => $this->faker->name,
            'tempat_lahir' => $this->faker->address(),
            'tanggal_lahir' => $this->faker->date(),
            'telp' => $this->faker->phoneNumber(),
            'alamat' => $this->faker->address(),
            'jenis_kelamin' => 'laki-laki',
            'berat_badan' => rand(40, 70),
            'tinggi_badan' => rand(150, 190),
            'gol_darah' => rand(1, 8),
            'pekerjaan' => $this->faker->word(),
            'riwayat_penyakit' => 'tidak ada',
        ];
    }
}
