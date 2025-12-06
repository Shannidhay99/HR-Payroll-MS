<?php

namespace App\Http\Controllers\Expense;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Expense\Expense;
use Illuminate\Support\Facades\Validator;
use App\Http\Helpers\SystemLogger;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $query = Expense::tenant()->with(['user', 'approver']);

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('month') && $request->filled('year')) {
            $query->whereMonth('date', $request->month)
                  ->whereYear('date', $request->year);
        }

        $expenses = $query->orderBy('date', 'desc')->paginate(getPaginate());

        return response()->json([
            'success' => true,
            'data' => $expenses,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'category' => 'required|in:travel,food,supplies,equipment,utilities,other',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'description' => 'required|string',
            'receipt_file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $receiptPath = null;
        if ($request->hasFile('receipt_file')) {
            $receiptPath = $request->file('receipt_file')->store('receipts', 'public');
        }

        $expense = Expense::create([
            'tenant_id' => tenant()->id,
            'user_id' => $request->user_id,
            'category' => $request->category,
            'amount' => $request->amount,
            'date' => $request->date,
            'description' => $request->description,
            'receipt_file' => $receiptPath,
            'status' => 'pending',
        ]);

        SystemLogger::log('info', "Expense created by user ID {$request->user_id} for amount {$request->amount}");

        return response()->json([
            'success' => true,
            'message' => 'Expense submitted successfully',
            'data' => $expense->load(['user', 'approver']),
        ], 201);
    }

    public function show($id)
    {
        $expense = Expense::tenant()->with(['user', 'approver'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $expense,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $expense = Expense::tenant()->findOrFail($id);

        if ($expense->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot update expense that has been processed',
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'category' => 'nullable|in:travel,food,supplies,equipment,utilities,other',
            'amount' => 'nullable|numeric|min:0',
            'date' => 'nullable|date',
            'description' => 'nullable|string',
            'receipt_file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->hasFile('receipt_file')) {
            if ($expense->receipt_file) {
                Storage::disk('public')->delete($expense->receipt_file);
            }
            $expense->receipt_file = $request->file('receipt_file')->store('receipts', 'public');
        }

        $expense->update($request->only(['category', 'amount', 'date', 'description']));

        SystemLogger::log('info', "Expense ID {$id} updated");

        return response()->json([
            'success' => true,
            'message' => 'Expense updated successfully',
            'data' => $expense->load(['user', 'approver']),
        ], 200);
    }

    public function destroy($id)
    {
        $expense = Expense::tenant()->findOrFail($id);

        if ($expense->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete expense that has been processed',
            ], 400);
        }

        if ($expense->receipt_file) {
            Storage::disk('public')->delete($expense->receipt_file);
        }

        $expense->delete();

        SystemLogger::log('info', "Expense ID {$id} deleted");

        return response()->json([
            'success' => true,
            'message' => 'Expense deleted successfully',
        ], 200);
    }

    public function approve(Request $request, $id)
    {
        $expense = Expense::tenant()->findOrFail($id);

        if ($expense->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Expense has already been processed',
            ], 400);
        }

        $expense->status = 'approved';
        $expense->approved_by = $request->user()->id;
        $expense->approved_at = Carbon::now();
        $expense->save();

        SystemLogger::log('info', "Expense ID {$id} approved by user ID {$request->user()->id}");

        return response()->json([
            'success' => true,
            'message' => 'Expense approved successfully',
            'data' => $expense->load(['user', 'approver']),
        ], 200);
    }

    public function reject(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'rejection_reason' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $expense = Expense::tenant()->findOrFail($id);

        if ($expense->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Expense has already been processed',
            ], 400);
        }

        $expense->status = 'rejected';
        $expense->approved_by = $request->user()->id;
        $expense->approved_at = Carbon::now();
        $expense->rejection_reason = $request->rejection_reason;
        $expense->save();

        SystemLogger::log('info', "Expense ID {$id} rejected by user ID {$request->user()->id}");

        return response()->json([
            'success' => true,
            'message' => 'Expense rejected',
            'data' => $expense->load(['user', 'approver']),
        ], 200);
    }
}
