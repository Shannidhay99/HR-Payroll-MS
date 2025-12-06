<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;

class Salary extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tenant_id',
        'month',
        'year',
        'basic_salary',
        'allowances',
        'deductions',
        'overtime_pay',
        'bonus',
        'net_salary',
        'status',
        'paid_date',
        'payment_method',
        'notes'
    ];

    protected $casts = [
        'month' => 'integer',
        'year' => 'integer',
        'basic_salary' => 'decimal:2',
        'allowances' => 'decimal:2',
        'deductions' => 'decimal:2',
        'overtime_pay' => 'decimal:2',
        'bonus' => 'decimal:2',
        'net_salary' => 'decimal:2',
        'paid_date' => 'date'
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
}
