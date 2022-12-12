<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\User;
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
        User::created([
            'name' => 'administrator',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now()
        ]);

        Profile::factory(10)->create();
        $this->call([
            RoleSeeder::class,
            GolonganDarahSeeder::class,
            StokDarahSeeder::class
        ]);
        $user = User::find(1);
        $user->assignRole('guest');
    }
}
