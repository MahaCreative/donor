<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function pendonor()
    {
        return $this->hasMany(Profile::class);
    }
    public function darah()
    {
        return $this->belongsTo(GolonganDarah::class);
    }
}
