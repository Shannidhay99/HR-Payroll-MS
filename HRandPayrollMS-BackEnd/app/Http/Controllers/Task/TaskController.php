<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        return response()->json([
            'message' => 'Tasks fetched successfully',
            'data' => [
                [ 'id' => 1, 'title' => 'Sample Task', 'search' => $search ],
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
        ]);
        return response()->json([
            'message' => 'Task created successfully',
            'data' => [ 'id' => 2, 'title' => $request->title ],
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|string',
        ]);
        return response()->json([
            'message' => 'Task updated successfully',
            'data' => [ 'id' => (int)$id, 'title' => $request->input('title', 'Updated Task') ],
        ]);
    }

    public function addAttachment(Request $request)
    {
        // Expecting a multipart/form-data with file
        return response()->json([
            'message' => 'Attachment received',
        ], 201);
    }

    public function addComment(Request $request, $id)
    {
        $request->validate([
            'comment' => 'required|string',
        ]);
        return response()->json([
            'message' => 'Comment added',
            'taskId' => (int)$id,
        ], 201);
    }
}



