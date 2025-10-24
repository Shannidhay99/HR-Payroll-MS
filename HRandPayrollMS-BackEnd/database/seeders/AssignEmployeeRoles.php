<?php

namespace Database\Seeders;

use App\Models\User\User;
use Illuminate\Database\Seeder;

class AssignEmployeeRoles extends Seeder
{
    public function run(): void
    {
        $users = User::whereIn('email', ['sadia@test.com', 'ahmed@test.com', 'fatima@test.com', 'employee@test.com'])->get();
        
        foreach($users as $user) {
            $user->role_id = 1;
            $user->save();
            $user->assignRole('employee');
            echo "Assigned employee role to: {$user->firstName} {$user->lastName}\n";
        }
        
        echo "Employee roles assigned successfully!\n";
    }
}
