<?php

namespace App\Models\Shift;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shift extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'tenant_id',
        'name',
        'start_time',
        'end_time',
        'break_duration',
        'working_hours',
        'days_of_week',
        'status'
    ];

    protected $casts = [
        'days_of_week' => 'array',
        'status' => 'boolean',
        'working_hours' => 'decimal:2',
        'break_duration' => 'integer'
    ];

    // SCOPES
    public function scopeTenant($query)
    {
        return $query->where('tenant_id', tenant()->id);
    }

    // RELATIONSHIPS
    public function assignments()
    {
        return $this->hasMany(ShiftAssignment::class);
    }
}
