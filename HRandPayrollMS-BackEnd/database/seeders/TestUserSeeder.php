<?php

namespace Database\Seeders;

use App\Models\User\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user for E2E tests (admin@example.com / password)
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'firstName' => 'Admin',
                'lastName' => 'User',
                'phone' => '1234567890',
                'password' => Hash::make('password'),
                'status' => 1,
                'role_id' => 2,
                'employee_id' => 'ADM-001',
                'designation' => 'Administrator',
                'joining_date' => now(),
                'employment_type' => 'full_time',
            ]
        );

        // Create test employee for E2E tests (test@example.com / password123)
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'firstName' => 'Test',
                'lastName' => 'User',
                'phone' => '9876543210',
                'password' => Hash::make('password123'),
                'status' => 1,
                'role_id' => 1,
                'employee_id' => 'EMP-001',
                'designation' => 'QA Engineer',
                'department' => 'Quality Assurance',
                'joining_date' => now(),
                'employment_type' => 'full_time',
                'date_of_birth' => '1995-05-15',
                'gender' => 'female',
                'address' => '456 Test Avenue',
                'blood_group' => 'A+',
                'emergency_contact_phone' => '2222222222',
            ]
        );

        // Create admin user (admin@test.com)
        User::updateOrCreate(
            ['email' => 'admin@test.com'],
            [
                'firstName' => 'Admin',
                'lastName' => 'User',
                'phone' => '1234567890',
                'password' => Hash::make('password123'),
                'status' => 1,
                'role_id' => 2,
            ]
        );

        // Create employee user (employee@test.com)
        User::updateOrCreate(
            ['email' => 'employee@test.com'],
            [
                'firstName' => 'John',
                'lastName' => 'Employee',
                'phone' => '0987654321',
                'password' => Hash::make('password123'),
                'status' => 1,
                'role_id' => 1,
            ]
        );

        // Create Sadia employee
        User::updateOrCreate(
            ['email' => 'sadia@test.com'],
            [
                'firstName' => 'Sadia',
                'lastName' => 'Rahman',
                'phone' => '01712345678',
                'password' => Hash::make('password123'),
                'status' => 1,
                'role_id' => 1,
            ]
        );

        // Create more test employees
        User::updateOrCreate(
            ['email' => 'ahmed@test.com'],
            [
                'firstName' => 'Ahmed',
                'lastName' => 'Hassan',
                'phone' => '01723456789',
                'password' => Hash::make('password123'),
                'status' => 1,
                'role_id' => 1,
            ]
        );

        User::updateOrCreate(
            ['email' => 'fatima@test.com'],
            [
                'firstName' => 'Fatima',
                'lastName' => 'Khan',
                'phone' => '01734567890',
                'password' => Hash::make('password123'),
                'status' => 1,
                'role_id' => 1,
            ]
        );
    }
}
