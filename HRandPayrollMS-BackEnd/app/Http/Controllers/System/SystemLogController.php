<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\SystemLog;
use Illuminate\Http\Request;

class SystemLogController extends Controller
{
    public function adminNotifications()
    {
        $logs = SystemLog::where('seen', false)->latest()->take(10)->get();

        $unseenCount = SystemLog::where('seen', false)->count();

        return response()->json([
            'logs' => $logs,
            'count' => $unseenCount,
        ]);
    }

    public function markAllAsSeen()
    {
        SystemLog::where('seen', false)->update(['seen' => true]);

        return response()->json(['message' => 'Logs marked as seen.']);
    }

    public function systemLogForTenant()
    {
        $logs = SystemLog::where('user_id', tenant()->id)->paginate(getPaginate());
        return response()->json([
            'logs' => $logs,
        ]);
    }
}
