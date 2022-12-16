<?php

namespace Database\Factories;

use App\Models\RegistrasiDonor;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProsesRegistrasiDonorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'petugas_id' => 1,
            'registrasi_donor_id' => RegistrasiDonor::factory()->create(),
            'status' => 'berhasil',
            'jumlah_darah' => rand(1, 3),
            'tekanan_darah' => '100/50',
            'keterangan' => 'tidak ada',
            'created_at' => Carbon::create(rand(2022, 2022), rand(1, 12), rand(1, 31))
        ];
    }
}
