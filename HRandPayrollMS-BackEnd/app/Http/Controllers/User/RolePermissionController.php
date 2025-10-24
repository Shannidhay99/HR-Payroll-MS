<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;
use App\Models\User\User;
use Illuminate\Support\Str;
use Spatie\Permission\PermissionRegistrar;
use App\Http\Helpers\SystemLogger;


class RolePermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:role.create')->only(['createRole']);
        $this->middleware('permission:permission.create')->only(['createPermission']);
        $this->middleware('permission:role.assign')->only(['assignRoleToUser', 'assignPermissionToRole']);
        $this->middleware('permission:permission.assign')->only(['assignPermissionToUser']);
        $this->middleware('permission:role.view')->only(['getAllRoles']);
        $this->middleware('permission:permission.view')->only(['getAllPermissions']);
    }

    // Create a new role
    public function createRole(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
        ]);

        $role = Role::create([
            'tenant_id'  => tenant()->id,
            'name'       => $request->name,
            'guard_name' => 'sanctum'
        ]);

        SystemLogger::log('info', "Role '{$role->name}' created.");

        return response()->json(['message' => 'Role created successfully', 'role' => $role], 201);
    }

    // Create a new permission
    public function createPermission(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name',
        ]);

        $permission = Permission::create(['name' => $request->name, 'guard_name' => 'sanctum']);

        SystemLogger::log('info', "Permission '{$permission->name}' created.");

        return response()->json(['message' => 'Permission created successfully', 'permission' => $permission], 201);
    }

    // Assign a role to a user
    public function assignRoleToUser(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::findOrFail($request->user_id);
        $role = Role::findOrFail($request->role_id);

        $user->assignRole($role->name);
        $user->role_id = $request->role_id;
        $user->save();

        SystemLogger::log('info', "Role '{$role->name}' assigned to user {$user->email} (ID: {$user->id}).");

        return response()->json([
            'success' => true,
            'message' => 'Role assigned successfully.',
        ]);
    }

    // Assign a permission to a role
    public function assignPermissionToRole(Request $request)
    {
        try {
            $request->validate([
                'role' => 'required|exists:roles,name',
                'permissions' => 'required|array',
                'permissions.*' => 'exists:permissions,name',
            ]);

            $role = Role::findByName($request->role);

            $role->givePermissionTo($request->permissions);

            // IMPORTANT: Clear permission cache
            app()[PermissionRegistrar::class]->forgetCachedPermissions();

            SystemLogger::log('info', "Permissions [" . implode(', ', $request->permissions) . "] assigned to role '{$role->name}'.");

            return response()->json(['message' => 'Permissions assigned to role successfully']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Spatie\Permission\Exceptions\PermissionDoesNotExist $e) {
            return response()->json([
                'message' => 'One or more permissions do not exist.',
                'error' => $e->getMessage()
            ], 400);
        } catch (\Exception $e) {
            SystemLogger::log('error', 'Error assigning permissions: ' . $e->getMessage());

            return response()->json([
                'message' => 'An unexpected error occurred.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Assign a permission to a User
    public function assignPermissionToUser(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'permissions' => 'required|array',
                'permissions.*' => 'exists:permissions,name',
            ]);

            $user = User::findOrFail($request->user_id);

            $user->givePermissionTo($request->permissions); // accepts array or string

            SystemLogger::log('info', "Permissions [" . implode(', ', $request->permissions) . "] assigned to user ID {$user->id}.");

            return response()->json(['message' => 'Permissions assigned to user successfully']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors()
            ], 422);
        } catch (PermissionDoesNotExist $e) {
            return response()->json([
                'message' => 'One or more permissions do not exist.',
                'error' => $e->getMessage()
            ], 400);
        } catch (\Exception $e) {
            SystemLogger::log('error', 'Error assigning permissions to user: ' . $e->getMessage());

            return response()->json([
                'message' => 'An unexpected error occurred.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Get all roles
    public function getAllRoles()
    {
        $roles = Role::where('name', '!=', 'hrms_owner')->get();
        return response()->json(['roles' => $roles]);
    }

    public function getTenantRoles()
    {
        $roles = Role::where('tenant_id', authUser()->id)
            ->whereNotIn('name', ['hrms_owner', 'super_admin'])
            ->get();

        return response()->json([
            'roles' => $roles
        ]);
    }

    // Get all permissions
    public function getAllPermissions()
    {
        $permissions = Permission::all();
        return response()->json(['permissions' => $permissions]);
    }
    // public function getAllPermissions()
    // {
    //     $permissions = Permission::all();

    //     // Group by module name (assume last word is module)
    //     $grouped = $permissions->groupBy(function ($permission) {
    //         // Extract module name (e.g., from 'edit brand' → 'brand')
    //         $words = explode(' ', strtolower($permission->name));
    //         return count($words) > 1
    //             ? Str::singular(last($words))
    //             : 'general'; // fallback if pattern doesn't match
    //     });

    //     // Format output
    //     $modules = $grouped->map(function ($items, $module) {
    //         return [
    //             'module' => ucfirst($module),
    //             'permissions' => $items->values(), // Full permission objects
    //         ];
    //     })->values();

    //     return response()->json(['modules' => $modules]);
    // }
}
