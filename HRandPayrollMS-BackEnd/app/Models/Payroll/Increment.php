<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;

class Increment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tenant_id',
        'previous_salary',
        'new_salary',
        'increment_amount',
        'increment_percentage',
        'effective_date',
        'reason',
        'approved_by',
        'approved_at',
        'status'
    ];

    protected $casts = [
        'previous_salary' => 'decimal:2',
        'new_salary' => 'decimal:2',
        'increment_amount' => 'decimal:2',
        'increment_percentage' => 'decimal:2',
        'effective_date' => 'date',
        'approved_at' => 'datetime'
    ];

    // SCOPES
    public function scopeTenant($query)
    {
        return $query->where('tenant_id', tenant()->id);
    }

    // RELATIONSHIPS
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
