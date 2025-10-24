<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Get role by ID (you can also use Role::findByName() if you prefer)
        $role = Role::find(2);

        if (!$role) {
            $this->command->error('Role with ID 2 not found.');
            return;
        }

        // Get all permissions
        $permissions = Permission::pluck('name')->toArray();

        // Assign all permissions to the role
        $role->syncPermissions($permissions);

        $this->command->info("Assigned all permissions to role '{$role->name}' (ID: 2).");
    }
}
