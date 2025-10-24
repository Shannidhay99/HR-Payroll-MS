<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    protected $fillable = [
        'user_id',
        'location_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
