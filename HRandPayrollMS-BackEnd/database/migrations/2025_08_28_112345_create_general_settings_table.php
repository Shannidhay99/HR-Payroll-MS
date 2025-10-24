<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('general_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->nullable();
            $table->string('company_type')->nullable();
            $table->integer('establish_year')->nullable();
            $table->integer('employee_number')->nullable();
            $table->string('location')->nullable();
            $table->string('website')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('industry')->nullable();
            $table->text('about_company')->nullable();

            $table->string('hr_name')->nullable();
            $table->string('hr_position')->nullable();
            $table->string('hr_experience')->nullable();
            $table->date('hr_joindate')->nullable();
            $table->string('hr_email')->nullable();
            $table->string('hr_phone', 20)->nullable();
            $table->string('hr_dept')->nullable();
            $table->string('hr_education')->nullable();

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('general_settings');
    }
};
