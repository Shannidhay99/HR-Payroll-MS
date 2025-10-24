<?php

use App\Constants\Status;
use App\Models\User\Tenant;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

function tenant()
{
    $userId = Auth::id();

    if (!$userId) {
        return null;
    }

    Cache::forget("tenant_$userId");

    return Cache::remember("tenant_$userId", 60, function () use ($userId) {
        return Tenant::where('user_id', $userId)->first();
    });
}

function authUser()
{
    return Auth::check() ? Auth::user() : null;
}

function getPaginate($paginate = 10)
{
    return $paginate;
}

function barCode($length = 12)
{
    return substr(bin2hex(random_bytes(8)), 0, $length);
}

