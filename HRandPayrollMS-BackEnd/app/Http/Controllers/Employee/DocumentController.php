<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee\Document;
use Illuminate\Support\Facades\Validator;
use App\Http\Helpers\SystemLogger;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        $query = Document::tenant()->with(['user', 'uploader']);

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('document_type')) {
            $query->where('document_type', $request->document_type);
        }

        $documents = $query->orderBy('created_at', 'desc')->paginate(getPaginate());

        return response()->json([
            'success' => true,
            'data' => $documents,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'document_type' => 'required|in:contract,id_card,certificate,resume,offer_letter,other',
            'document_name' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:10240',
            'expiry_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $file = $request->file('file');
        $filePath = $file->store('documents', 'public');
        $fileSize = $file->getSize();

        $document = Document::create([
            'tenant_id' => tenant()->id,
            'user_id' => $request->user_id,
            'document_type' => $request->document_type,
            'document_name' => $request->document_name,
            'file_path' => $filePath,
            'file_size' => $fileSize,
            'uploaded_by' => $request->user()->id,
            'expiry_date' => $request->expiry_date,
            'notes' => $request->notes,
        ]);

        SystemLogger::log('info', "Document uploaded for user ID {$request->user_id}");

        return response()->json([
            'success' => true,
            'message' => 'Document uploaded successfully',
            'data' => $document->load(['user', 'uploader']),
        ], 201);
    }

    public function show($id)
    {
        $document = Document::tenant()->with(['user', 'uploader'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $document,
        ], 200);
    }

    public function download($id)
    {
        $document = Document::tenant()->findOrFail($id);

        if (!Storage::disk('public')->exists($document->file_path)) {
            return response()->json([
                'success' => false,
                'message' => 'File not found',
            ], 404);
        }

        return Storage::disk('public')->download($document->file_path, $document->document_name);
    }

    public function destroy($id)
    {
        $document = Document::tenant()->findOrFail($id);

        if (Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        SystemLogger::log('info', "Document deleted: ID {$id}");

        return response()->json([
            'success' => true,
            'message' => 'Document deleted successfully',
        ], 200);
    }
}
