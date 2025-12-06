<?php

namespace App\Models\Notice;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;

class Notice extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'title',
        'description',
        'created_by',
        'target_audience',
        'priority',
        'start_date',
        'end_date',
        'status'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date'
    ];

    // SCOPES
    public function scopeTenant($query)
    {
        return $query->where('tenant_id', tenant()->id);
    }

    // RELATIONSHIPS
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
