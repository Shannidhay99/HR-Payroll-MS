<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class SystemLog extends Model
{
    protected $fillable = [
    'user_id',
    'event_type', 
    'message',
    'ip_address',
    'url',
    'created_at',
    'updated_at',
];
}
