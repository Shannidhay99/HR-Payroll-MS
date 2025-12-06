<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'user_id',
        'document_type',
        'document_name',
        'file_path',
        'file_size',
        'uploaded_by',
        'expiry_date',
        'notes'
    ];

    protected $casts = [
        'expiry_date' => 'date',
        'file_size' => 'integer'
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

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
