<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GolonganDarah extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function stock()
    {
        return $this->belongsTo(StockDarah::class);
    }
    public function stok()
    {
        return $this->hasOne(StockDarah::class, 'darah_id');
    }
}
