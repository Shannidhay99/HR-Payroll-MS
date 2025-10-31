<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;
use App\Http\Helpers\SystemLogger;


class UserController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('permission:user.view')->only(['profile', 'getAllUsers', 'manageUsers', 'viewTrashUser']);
    //     $this->middleware('permission:user.create')->only(['store']);
    //     $this->middleware('permission:user.update')->only(['update', 'updateUserImage']);
    //     $this->middleware('permission:user.delete')->only(['destroy']);
    //     $this->middleware('permission:user.restore')->only(['restore']);
    //     $this->middleware('permission:user.force_delete')->only(['forceDelete']);
    // }

    // Return the authenticated user's profile
    public function profile(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'message' => 'User Profile',
            'user'    => array_merge($user->toArray(), [
                'avatar' => $user->image ? asset($user->image) : null,
            ]),
        ], 200);
    }

    // Return all users' information with their roles
    public function getAllUsers()
    {
        $users = User::with('roles:name')->paginate(getPaginate()); // Fetch users with their roles
        return response()->json([
            'message' => 'All Users',
            'users'   => $users,
        ], 200);
    }

    public function manageUsers(Request $request)
    {
        $query = User::tenant()->with('role', 'role.permissions');

        if ($request->filled('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
            $users = $query->get();
        } else {
            $users = $query->paginate(getPaginate());
        }
        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName'        => 'required|string|max:255',
            'lastName'         => 'required|string|max:255',
            'email'            => 'required|email|unique:users,email',
            'phone'            => 'nullable|string',
            'password'         => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'firstName' => $request->firstName,
            'lastName'  => $request->lastName,
            'email'     => $request->email,
            'phone'     => $request->phone,
            'password'  => Hash::make($request->password),
            'tenant_id' => tenant()->id,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        SystemLogger::log('info', "New user registered under tenant ID " . tenant()->id . ": {$user->email}");

        return response()->json([
            'message' => 'User registered successfully',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    // Update the authenticated user's own profile
    public function updateProfileSelf(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'firstName' => 'nullable|string|max:255',
            'lastName'  => 'nullable|string|max:255',
            'phone'     => 'nullable|string',
            'profilePicture' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $user->firstName = $request->input('firstName', $user->firstName);
        $user->lastName  = $request->input('lastName', $user->lastName);
        $user->phone     = $request->input('phone', $user->phone);
        if ($request->filled('profilePicture')) {
            $user->image = $request->input('profilePicture');
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'firstName' => 'required|string|max:255',
                'lastName'  => 'required|string|max:255',
                'email'     => 'required|email|unique:users,email,' . $user->id,
                'phone'     => 'nullable|string',
                'role_id'   => 'required|exists:roles,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation Failed',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            $user->firstName = $request->firstName;
            $user->lastName  = $request->lastName;
            $user->email     = $request->email;
            $user->phone     = $request->phone;
            $user->role_id   = $request->role_id;

            $user->save();

            // Assign new role
            $role = Role::findOrFail($request->role_id);
            $user->syncRoles([$role->name]); // Use syncRoles to avoid duplicates

            SystemLogger::log('info', "User updated under tenant ID " . tenant()->id . ": {$user->email}");
            SystemLogger::log('info', "Role '{$role->name}' assigned to user {$user->email} (ID: {$user->id}).");

            return response()->json([
                'message' => 'User updated successfully',
                'user'    => $user,
            ]);
        } catch (\Exception $e) {
            SystemLogger::log('error', "Failed to update user: " . $e->getMessage());

            return response()->json([
                'message' => 'User update failed',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }


    public function updateUserImage(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            ]);

            $user = $request->user();

            // Delete old image if exists
            if ($user->image && File::exists(public_path($user->image))) {
                File::delete(public_path($user->image));
            }

            // Upload new image
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $imagePath = 'uploads/user_images/';
            $image->move(public_path($imagePath), $imageName);

            // Save new image path on image column
            $user->image = $imagePath . $imageName;
            $user->save();

            return response()->json([
                'message' => 'User image updated successfully.',
                'image' => asset($user->image),
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the user image.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        SystemLogger::log('info', "User {$user->firstName} {$user->lastName} deleted under tenant ID " . tenant()->id . ": {$user->email}");

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }

    public function viewTrashUser()
    {
        $users = User::onlyTrashed()->tenant()->with(['role'])->latest()->paginate(getPaginate());
        return response()->json(['products' => $users], 200);
    }

    public function restore($id)
    {
        $user = User::onlyTrashed()->where('id', $id)->tenant()->firstOrFail();
        $user->restore();

        SystemLogger::log('info', "user restore: {$user->firstName} (ID: {$user->id}) under tenant ID " . tenant()->id);

        return response()->json(['message' => 'User restored successfully.']);
    }

    public function forceDelete($id)
    {
        $user = User::onlyTrashed()->where('id', $id)->tenant()->firstOrFail();
        $userName = $user->firstName;
        $userId = $user->id;

        // Delete image if exists
        if ($user->user_image && file_exists(public_path($user->user_image))) {
            unlink(public_path($user->user_image));
        }

        $user->forceDelete();

        SystemLogger::log('warning', "User deleted: {$userName} (ID: {$userId}) under tenant ID " . tenant()->id);

        return response()->json(['message' => 'User permanently deleted.']);
    }
}
