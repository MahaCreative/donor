<?php

namespace Database\Seeders;

use App\Models\Pendonor;
use App\Models\Profile;
use App\Models\ProsesPermintaanDarah;
use App\Models\ProsesRegistrasiDonor;
use App\Models\RegistrasiDonor;
use App\Models\User;
use Database\Factories\RegistrasiFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        User::create([
            'name' => 'administrator',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now()
        ]);

        Profile::factory(1)->create();
        ProsesRegistrasiDonor::factory(30)->create();
        ProsesPermintaanDarah::factory(30)->create();
        $this->call([
            RoleSeeder::class,
            GolonganDarahSeeder::class,
            StokDarahSeeder::class,

        ]);

        Pendonor::factory(30)->create();
        $user = User::find(1);
        $user->assignRole('guest');
    }
}
