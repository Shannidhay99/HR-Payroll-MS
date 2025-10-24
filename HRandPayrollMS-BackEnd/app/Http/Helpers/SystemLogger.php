<?php

namespace App\Http\Helpers;

use App\Models\System\SystemLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use App\Events\SystemLogCreated;

class SystemLogger
{
    public static function log($eventType, $message, $id = null)
    {
        $userId = Auth::id() ?? $id;

        $log = SystemLog::create([
            'event_type' => $eventType,
            'message' => $message,
            'user_id' => $userId,
            'ip_address' => Request::ip(),
            'url' => Request::fullUrl(),
        ]);

        event(new SystemLogCreated($log));
    }
}
