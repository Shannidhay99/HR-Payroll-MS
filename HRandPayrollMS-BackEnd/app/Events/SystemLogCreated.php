<?php

namespace App\Events;

use App\Models\System\SystemLog;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SystemLogCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $log;

    public function __construct(SystemLog $log)
    {
        $this->log = $log;
    }

    // Broadcast on a private/admin channel
    public function broadcastOn()
    {
        return new PrivateChannel('admin-logs');
    }

    public function broadcastWith()
    {
        return [
            'id'          => $this->log->id,
            'event_type'  => $this->log->event_type,
            'message'     => $this->log->message,
            'created_at'  => $this->log->created_at->toDateTimeString(),
        ];
    }
}

