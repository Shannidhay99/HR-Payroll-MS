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
        'avatar',
        'google_id'
    ];

    protected $hidden = ['password'];
    
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
}
