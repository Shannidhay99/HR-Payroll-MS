<?php

// App\Models\User.php

namespace App\Models\User;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Import the HasApiTokens trait
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User\Role; // Import the Role model
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasRoles; // Add HasApiTokens here

    protected $guard_name = 'sanctum';

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'password',
        'tenant_id',
        'image',
        'google_id',
        'department_id',
        'employee_id',
        'date_of_birth',
        'gender',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'emergency_contact_name',
        'emergency_contact_phone',
        'joining_date',
        'designation',
        'basic_salary',
        'employment_type',
        'status',
        'bank_name',
        'bank_account_number',
        'bank_ifsc'
    ];

    protected $hidden = ['password'];

    protected $appends = ['image_url'];

    // ACCESSORS
    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return asset($this->image);
        }
        return null;
    }

    // SCOPES
    public function scopeTenant($query)
    {
        return $query->where('tenant_id', tenant()->id);
    }

    // Define the relationship with the Role model
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function department()
    {
        return $this->belongsTo(\App\Models\Department\Department::class);
    }

    public function documents()
    {
        return $this->hasMany(\App\Models\Employee\Document::class);
    }

    public function notifications()
    {
        return $this->hasMany(\App\Models\Notification\Notification::class);
    }
}
