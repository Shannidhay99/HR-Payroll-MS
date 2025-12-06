<?php

namespace App\Http\Controllers\Department;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department\Department;
use Illuminate\Support\Facades\Validator;
use App\Http\Helpers\SystemLogger;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Department::tenant();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $departments = $query->paginate(getPaginate());

        return response()->json([
            'success' => true,
            'data' => $departments,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $department = Department::create([
            'name' => $request->name,
            'description' => $request->description,
            'tenant_id' => tenant()->id,
            'status' => $request->status ?? true,
        ]);

        SystemLogger::log('info', "Department created: {$department->name}");

        return response()->json([
            'success' => true,
            'message' => 'Department created successfully',
            'data' => $department,
        ], 201);
    }

    public function show($id)
    {
        $department = Department::tenant()->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $department,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $department = Department::tenant()->findOrFail($id);
        $department->update($request->only(['name', 'description', 'status']));

        SystemLogger::log('info', "Department updated: {$department->name}");

        return response()->json([
            'success' => true,
            'message' => 'Department updated successfully',
            'data' => $department,
        ], 200);
    }

    public function destroy($id)
    {
        $department = Department::tenant()->findOrFail($id);
        $department->delete();

        SystemLogger::log('info', "Department deleted: {$department->name}");

        return response()->json([
            'success' => true,
            'message' => 'Department deleted successfully',
        ], 200);
    }
}
