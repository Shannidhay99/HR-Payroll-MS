<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User\User;
use App\Models\User\Tenant;
use App\Models\Department\Department;
use App\Models\Shift\Shift;
use App\Models\Shift\ShiftAssignment;
use App\Models\Attendance\Attendance;
use App\Models\Leave\Leave;
use App\Models\Holiday\Holiday;
use App\Models\Notice\Notice;
use App\Models\Expense\Expense;
use App\Models\Payroll\Salary;
use App\Models\Payroll\Increment;
use App\Models\Notification\Notification;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Spatie\Permission\Models\Role;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        // Create tenant
        $tenant = Tenant::firstOrCreate(
            ['id' => 1],
            [
                'name' => 'Demo Company',
                'user_id' => 1,
            ]
        );

        // Helper function to set tenant
        $setTenant = function() use ($tenant) {
            app()->instance('tenant', $tenant);
            return $tenant;
        };
        $setTenant();

        // Create roles if they don't exist
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'sanctum']);
        $employeeRole = Role::firstOrCreate(['name' => 'employee', 'guard_name' => 'sanctum']);
        $hrRole = Role::firstOrCreate(['name' => 'hr', 'guard_name' => 'sanctum']);
        $managerRole = Role::firstOrCreate(['name' => 'manager', 'guard_name' => 'sanctum']);

        // Create departments
        $departments = [
            ['name' => 'IT', 'description' => 'Information Technology Department'],
            ['name' => 'HR', 'description' => 'Human Resources Department'],
            ['name' => 'Sales', 'description' => 'Sales Department'],
            ['name' => 'Marketing', 'description' => 'Marketing Department'],
            ['name' => 'Finance', 'description' => 'Finance Department'],
        ];

        $deptModels = [];
        foreach ($departments as $dept) {
            $deptModels[] = Department::firstOrCreate(
                ['name' => $dept['name'], 'tenant_id' => $tenant->id],
                array_merge($dept, ['tenant_id' => $tenant->id, 'status' => true])
            );
        }

        // Create shifts
        $shifts = [
            [
                'name' => 'Morning Shift',
                'start_time' => '09:00',
                'end_time' => '18:00',
                'break_duration' => 60,
                'working_hours' => 8,
                'days_of_week' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            ],
            [
                'name' => 'Evening Shift',
                'start_time' => '14:00',
                'end_time' => '23:00',
                'break_duration' => 60,
                'working_hours' => 8,
                'days_of_week' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            ],
        ];

        $shiftModels = [];
        foreach ($shifts as $shift) {
            $shiftModels[] = Shift::firstOrCreate(
                ['name' => $shift['name'], 'tenant_id' => $tenant->id],
                array_merge($shift, ['tenant_id' => $tenant->id, 'status' => true])
            );
        }

        // Create users
        $users = [
            [
                'firstName' => 'Admin',
                'lastName' => 'User',
                'email' => 'admin@demo.com',
                'password' => Hash::make('password'),
                'phone' => '1234567890',
                'tenant_id' => $tenant->id,
                'department_id' => $deptModels[0]->id,
                'employee_id' => 'EMP001',
                'designation' => 'System Administrator',
                'joining_date' => Carbon::now()->subYears(2),
                'basic_salary' => 75000,
                'employment_type' => 'full_time',
                'status' => 'active',
                'role' => $adminRole,
            ],
            [
                'firstName' => 'John',
                'lastName' => 'Doe',
                'email' => 'john@demo.com',
                'password' => Hash::make('password'),
                'phone' => '1234567891',
                'tenant_id' => $tenant->id,
                'department_id' => $deptModels[0]->id,
                'employee_id' => 'EMP002',
                'designation' => 'Software Engineer',
                'joining_date' => Carbon::now()->subYear(),
                'basic_salary' => 60000,
                'employment_type' => 'full_time',
                'status' => 'active',
                'role' => $employeeRole,
            ],
            [
                'firstName' => 'Jane',
                'lastName' => 'Smith',
                'email' => 'jane@demo.com',
                'password' => Hash::make('password'),
                'phone' => '1234567892',
                'tenant_id' => $tenant->id,
                'department_id' => $deptModels[1]->id,
                'employee_id' => 'EMP003',
                'designation' => 'HR Manager',
                'joining_date' => Carbon::now()->subMonths(18),
                'basic_salary' => 65000,
                'employment_type' => 'full_time',
                'status' => 'active',
                'role' => $hrRole,
            ],
            [
                'firstName' => 'Mike',
                'lastName' => 'Johnson',
                'email' => 'mike@demo.com',
                'password' => Hash::make('password'),
                'phone' => '1234567893',
                'tenant_id' => $tenant->id,
                'department_id' => $deptModels[2]->id,
                'employee_id' => 'EMP004',
                'designation' => 'Sales Manager',
                'joining_date' => Carbon::now()->subMonths(14),
                'basic_salary' => 70000,
                'employment_type' => 'full_time',
                'status' => 'active',
                'role' => $managerRole,
            ],
            [
                'firstName' => 'Sarah',
                'lastName' => 'Williams',
                'email' => 'sarah@demo.com',
                'password' => Hash::make('password'),
                'phone' => '1234567894',
                'tenant_id' => $tenant->id,
                'department_id' => $deptModels[3]->id,
                'employee_id' => 'EMP005',
                'designation' => 'Marketing Executive',
                'joining_date' => Carbon::now()->subMonths(10),
                'basic_salary' => 55000,
                'employment_type' => 'full_time',
                'status' => 'active',
                'role' => $employeeRole,
            ],
        ];

        $userModels = [];
        foreach ($users as $userData) {
            $role = $userData['role'];
            unset($userData['role']);

            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );
            $user->assignRole($role);
            $userModels[] = $user;
        }

        // Assign shifts to users
        foreach ($userModels as $index => $user) {
            $shift = $shiftModels[$index % count($shiftModels)];
            ShiftAssignment::firstOrCreate([
                'user_id' => $user->id,
                'shift_id' => $shift->id,
                'tenant_id' => $tenant->id,
            ], [
                'start_date' => Carbon::now()->startOfMonth(),
                'is_permanent' => true,
                'status' => 'active',
            ]);
        }

        // Create attendance records for last 30 days
        $today = Carbon::today();
        for ($i = 1; $i <= 30; $i++) {
            $date = $today->copy()->subDays($i);

            if ($date->isWeekday()) {
                foreach ($userModels as $user) {
                    $status = 'present';
                    if (rand(1, 10) == 1) $status = 'absent';
                    elseif (rand(1, 15) == 1) $status = 'late';

                    Attendance::firstOrCreate([
                        'user_id' => $user->id,
                        'date' => $date,
                        'tenant_id' => $tenant->id,
                    ], [
                        'check_in' => $status != 'absent' ? $date->copy()->setTime(9, rand(0, 30)) : null,
                        'check_out' => $status != 'absent' ? $date->copy()->setTime(18, rand(0, 30)) : null,
                        'status' => $status,
                        'work_hours' => $status != 'absent' ? 8 + (rand(-10, 20) / 10) : 0,
                        'overtime_hours' => rand(0, 2),
                    ]);
                }
            }
        }

        // Create leave applications
        $leaveTypes = ['sick', 'casual', 'annual'];
        foreach ($userModels as $user) {
            for ($i = 0; $i < 3; $i++) {
                $startDate = Carbon::now()->addDays(rand(1, 30));
                Leave::firstOrCreate([
                    'user_id' => $user->id,
                    'start_date' => $startDate,
                    'tenant_id' => $tenant->id,
                ], [
                    'leave_type' => $leaveTypes[array_rand($leaveTypes)],
                    'end_date' => $startDate->copy()->addDays(rand(1, 5)),
                    'days' => rand(1, 5),
                    'reason' => 'Sample leave request',
                    'status' => ['pending', 'approved', 'rejected'][rand(0, 2)],
                    'approved_by' => $userModels[0]->id,
                    'approved_at' => Carbon::now(),
                ]);
            }
        }

        // Create holidays
        $holidays = [
            ['name' => 'New Year', 'date' => Carbon::create(date('Y'), 1, 1), 'type' => 'public'],
            ['name' => 'Independence Day', 'date' => Carbon::create(date('Y'), 7, 4), 'type' => 'public'],
            ['name' => 'Christmas', 'date' => Carbon::create(date('Y'), 12, 25), 'type' => 'public'],
            ['name' => 'Company Anniversary', 'date' => Carbon::create(date('Y'), 6, 15), 'type' => 'company'],
        ];

        foreach ($holidays as $holiday) {
            Holiday::firstOrCreate([
                'name' => $holiday['name'],
                'date' => $holiday['date'],
                'tenant_id' => $tenant->id,
            ], array_merge($holiday, [
                'tenant_id' => $tenant->id,
                'description' => 'Holiday',
            ]));
        }

        // Create notices
        $notices = [
            [
                'title' => 'Welcome to Demo Company',
                'description' => 'Welcome all new employees to our company!',
                'priority' => 'high',
                'target_audience' => 'all',
                'start_date' => Carbon::now(),
                'status' => 'active',
            ],
            [
                'title' => 'Office Timing Change',
                'description' => 'Please note the new office timings starting next month.',
                'priority' => 'medium',
                'target_audience' => 'all',
                'start_date' => Carbon::now(),
                'status' => 'active',
            ],
        ];

        foreach ($notices as $notice) {
            Notice::firstOrCreate([
                'title' => $notice['title'],
                'tenant_id' => $tenant->id,
            ], array_merge($notice, [
                'tenant_id' => $tenant->id,
                'created_by' => $userModels[0]->id,
            ]));
        }

        // Create expenses
        $categories = ['travel', 'food', 'supplies', 'equipment'];
        foreach ($userModels as $user) {
            for ($i = 0; $i < 2; $i++) {
                Expense::create([
                    'tenant_id' => $tenant->id,
                    'user_id' => $user->id,
                    'category' => $categories[array_rand($categories)],
                    'amount' => rand(100, 5000),
                    'date' => Carbon::now()->subDays(rand(1, 30)),
                    'description' => 'Sample expense',
                    'status' => ['pending', 'approved', 'rejected'][rand(0, 2)],
                    'approved_by' => $userModels[0]->id,
                    'approved_at' => Carbon::now(),
                ]);
            }
        }

        // Create salaries for current month
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        foreach ($userModels as $user) {
            Salary::firstOrCreate([
                'user_id' => $user->id,
                'month' => $currentMonth,
                'year' => $currentYear,
                'tenant_id' => $tenant->id,
            ], [
                'basic_salary' => $user->basic_salary,
                'allowances' => rand(1000, 5000),
                'deductions' => rand(500, 2000),
                'overtime_pay' => rand(0, 3000),
                'bonus' => rand(0, 5000),
                'net_salary' => $user->basic_salary + rand(2000, 8000),
                'status' => 'pending',
                'payment_method' => 'bank_transfer',
            ]);
        }

        // Create some increments
        foreach (array_slice($userModels, 1, 3) as $user) {
            Increment::create([
                'tenant_id' => $tenant->id,
                'user_id' => $user->id,
                'previous_salary' => $user->basic_salary,
                'new_salary' => $user->basic_salary + 5000,
                'increment_amount' => 5000,
                'increment_percentage' => round((5000 / $user->basic_salary) * 100, 2),
                'effective_date' => Carbon::now()->addMonth(),
                'reason' => 'Performance based increment',
                'status' => 'pending',
            ]);
        }

        // Create notifications
        foreach ($userModels as $user) {
            Notification::create([
                'tenant_id' => $tenant->id,
                'user_id' => $user->id,
                'type' => 'system',
                'title' => 'Welcome to the system',
                'message' => 'Welcome to our HR & Payroll Management System!',
                'is_read' => false,
            ]);
        }

        $this->command->info('Demo data seeded successfully!');
        $this->command->info('Login credentials:');
        $this->command->info('Admin: admin@demo.com / password');
        $this->command->info('Employee: john@demo.com / password');
    }
}
