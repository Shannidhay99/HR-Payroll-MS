<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        $roles = ['hrms_owner', 'super_admin']; // add 'manager', 'staff' when needed

        foreach ($roles as $role) {
            Role::firstOrCreate([
                'name' => $role,
                'guard_name' => 'sanctum',
            ]);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
}
