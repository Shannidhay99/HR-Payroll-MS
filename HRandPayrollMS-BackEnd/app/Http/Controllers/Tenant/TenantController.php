<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\User\Tenant;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::select('id', 'name', 'user_id', 'created_at')
            ->with(['user:id,firstName,lastName,email'])
            ->get();

        return response()->json($tenants);
    }

    public function show($id)
    {
        $tenant = Tenant::with(['user:id,firstName,lastName,email'])
            ->findOrFail($id);

        return response()->json($tenant);
    }
}