<?php

namespace Database\Factories;

use App\Models\Pendonor;
use Illuminate\Database\Eloquent\Factories\Factory;

class RegistrasiDonorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        return [
            'kode_registrasi' => 'abg' . rand(1, 999),
            'pendonor_id' => Pendonor::factory()->create(),
            'tanggal_donor_darah' => $this->faker->date(),
            'jam_donor_darah' => '14:02:00',
            'jenis_donor' => 'sukarela',
            'status_donor' => 'berhasil',
            'golongan_darah' => rand(1, 8),
            'petugas_id' => 1
        ];
    }
}
