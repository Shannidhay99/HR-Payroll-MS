<?php

namespace App\Http\Controllers\Notice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notice\Notice;
use Illuminate\Support\Facades\Validator;
use App\Http\Helpers\SystemLogger;
use Carbon\Carbon;

class NoticeController extends Controller
{
    public function index(Request $request)
    {
        $query = Notice::tenant()->with('creator');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        // Auto-update expired notices
        Notice::tenant()
            ->where('status', 'active')
            ->whereNotNull('end_date')
            ->where('end_date', '<', Carbon::today())
            ->update(['status' => 'expired']);

        $notices = $query->orderBy('created_at', 'desc')->paginate(getPaginate());

        return response()->json([
            'success' => true,
            'data' => $notices,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'target_audience' => 'required|in:all,employees,managers,specific',
            'priority' => 'required|in:low,medium,high',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'nullable|in:draft,active,expired',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $notice = Notice::create([
            'tenant_id' => tenant()->id,
            'title' => $request->title,
            'description' => $request->description,
            'created_by' => $request->user()->id,
            'target_audience' => $request->target_audience,
            'priority' => $request->priority,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'status' => $request->status ?? 'active',
        ]);

        SystemLogger::log('info', "Notice created: {$notice->title}");

        return response()->json([
            'success' => true,
            'message' => 'Notice created successfully',
            'data' => $notice->load('creator'),
        ], 201);
    }

    public function show($id)
    {
        $notice = Notice::tenant()->with('creator')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $notice,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'target_audience' => 'required|in:all,employees,managers,specific',
            'priority' => 'required|in:low,medium,high',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'nullable|in:draft,active,expired',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $notice = Notice::tenant()->findOrFail($id);
        $notice->update($request->only(['title', 'description', 'target_audience', 'priority', 'start_date', 'end_date', 'status']));

        SystemLogger::log('info', "Notice updated: {$notice->title}");

        return response()->json([
            'success' => true,
            'message' => 'Notice updated successfully',
            'data' => $notice->load('creator'),
        ], 200);
    }

    public function destroy($id)
    {
        $notice = Notice::tenant()->findOrFail($id);
        $notice->delete();

        SystemLogger::log('info', "Notice deleted: {$notice->title}");

        return response()->json([
            'success' => true,
            'message' => 'Notice deleted successfully',
        ], 200);
    }

    public function active()
    {
        $notices = Notice::tenant()
            ->with('creator')
            ->where('status', 'active')
            ->where('start_date', '<=', Carbon::today())
            ->where(function($query) {
                $query->whereNull('end_date')
                      ->orWhere('end_date', '>=', Carbon::today());
            })
            ->orderBy('priority', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $notices,
        ], 200);
    }
}
