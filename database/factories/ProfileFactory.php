<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => rand(1, 10),
            'nama' => $this->faker->name(),
            'tempat_lahir' => $this->faker->sentence(),
            'tanggal_lahir' => $this->faker->date(),
            'telp' => $this->faker->phoneNumber(),
            'alamat' => $this->faker->address(),
            'jenis_kelamin' => 'laki-laki',
            'berat_badan' => rand(30, 50),
            'tinggi_badan' => rand(145, 189),
            'gol_darah' => rand(1, 5),
            'pekerjaan' => 'pelajar/mahasiswa',
            'riwayat_penyakit' => 'tidak ada',
        ];
    }
}
