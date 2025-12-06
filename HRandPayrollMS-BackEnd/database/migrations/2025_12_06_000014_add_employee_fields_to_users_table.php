<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('employee_id')->nullable()->unique();
            $table->date('date_of_birth')->nullable();
            $table->string('gender')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('emergency_contact_name')->nullable();
            $table->string('emergency_contact_phone')->nullable();
            $table->date('joining_date')->nullable();
            $table->string('designation')->nullable();
            $table->decimal('basic_salary', 10, 2)->nullable();
            $table->enum('employment_type', ['full_time', 'part_time', 'contract', 'intern'])->nullable();
            $table->enum('status', ['active', 'inactive', 'terminated'])->default('active');
            $table->string('bank_name')->nullable();
            $table->string('bank_account_number')->nullable();
            $table->string('bank_ifsc')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'employee_id', 'date_of_birth', 'gender', 'address', 'city', 'state',
                'country', 'postal_code', 'emergency_contact_name', 'emergency_contact_phone',
                'joining_date', 'designation', 'basic_salary', 'employment_type', 'status',
                'bank_name', 'bank_account_number', 'bank_ifsc'
            ]);
        });
    }
};
