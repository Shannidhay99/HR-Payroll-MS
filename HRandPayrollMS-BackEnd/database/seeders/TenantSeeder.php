<?php

namespace Database\Seeders;

use App\Models\User\Tenant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TenantSeeder extends Seeder
{
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        // First tenant
        Tenant::firstOrCreate(
            ['id' => 1],
            [
                'user_id' => 1,
                'location_id' => null,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // Second tenant
        Tenant::firstOrCreate(
            ['id' => 2],
            [
                'user_id' => 2,
                'location_id' => null,
                'updated_by' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
}
