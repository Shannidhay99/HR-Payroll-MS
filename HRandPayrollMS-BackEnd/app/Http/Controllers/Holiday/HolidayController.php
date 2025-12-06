<?php

namespace App\Http\Controllers\Holiday;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Holiday\Holiday;
use Illuminate\Support\Facades\Validator;
use App\Http\Helpers\SystemLogger;

class HolidayController extends Controller
{
    public function index(Request $request)
    {
        $query = Holiday::tenant();

        if ($request->filled('year')) {
            $query->whereYear('date', $request->year);
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $holidays = $query->orderBy('date', 'asc')->paginate(getPaginate());

        return response()->json([
            'success' => true,
            'data' => $holidays,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'description' => 'nullable|string',
            'type' => 'required|in:public,company,optional',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $holiday = Holiday::create([
            'tenant_id' => tenant()->id,
            'name' => $request->name,
            'date' => $request->date,
            'description' => $request->description,
            'type' => $request->type,
        ]);

        SystemLogger::log('info', "Holiday created: {$holiday->name}");

        return response()->json([
            'success' => true,
            'message' => 'Holiday created successfully',
            'data' => $holiday,
        ], 201);
    }

    public function show($id)
    {
        $holiday = Holiday::tenant()->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $holiday,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'description' => 'nullable|string',
            'type' => 'required|in:public,company,optional',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $holiday = Holiday::tenant()->findOrFail($id);
        $holiday->update($request->only(['name', 'date', 'description', 'type']));

        SystemLogger::log('info', "Holiday updated: {$holiday->name}");

        return response()->json([
            'success' => true,
            'message' => 'Holiday updated successfully',
            'data' => $holiday,
        ], 200);
    }

    public function destroy($id)
    {
        $holiday = Holiday::tenant()->findOrFail($id);
        $holiday->delete();

        SystemLogger::log('info', "Holiday deleted: {$holiday->name}");

        return response()->json([
            'success' => true,
            'message' => 'Holiday deleted successfully',
        ], 200);
    }
}
