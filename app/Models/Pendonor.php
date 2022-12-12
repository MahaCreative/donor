<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendonor extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function registrasiDonor()
    {
        return $this->belongsTo(RegistrasiDonor::class);
    }
    public function darah()
    {
        return $this->belongsTo(GolonganDarah::class, 'gol_darah');
    }
}
