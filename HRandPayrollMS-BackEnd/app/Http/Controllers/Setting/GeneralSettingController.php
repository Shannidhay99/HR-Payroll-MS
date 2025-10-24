<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Setting\GeneralSetting;

class GeneralSettingController extends Controller
{
    public function setting(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'nullable|string|max:255',
            'company_type' => 'nullable|string|max:255',
            'establish_year' => 'nullable|integer|min:1900|max:' . date('Y'),
            'employee_number' => 'nullable|integer|min:1',
            'location' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'industry' => 'nullable|string|max:255',
            'about_company' => 'nullable|string|max:1000',

            'hr_name' => 'nullable|string|max:255',
            'hr_position' => 'nullable|string|max:255',
            'hr_experience' => 'nullable|string|max:255',
            'hr_joindate' => 'nullable|date',
            'hr_email' => 'nullable|email|max:255',
            'hr_phone' => 'nullable|string|max:20',
            'hr_dept' => 'nullable|string|max:255',
            'hr_education' => 'nullable|string|max:255'
        ]);
 
        $setting = GeneralSetting::firstOrCreate([]);
        
        $setting->site_name = $validated['site_name'] ?? $setting->site_name;
        $setting->company_type = $validated['company_type'] ?? $setting->company_type;
        $setting->establish_year = $validated['establish_year'] ?? $setting->establish_year;
        $setting->employee_number = $validated['employee_number'] ?? $setting->employee_number;
        $setting->location = $validated['location'] ?? $setting->location;
        $setting->website = $validated['website'] ?? $setting->website;
        $setting->phone = $validated['phone'] ?? $setting->phone;
        $setting->email = $validated['email'] ?? $setting->email;
        $setting->industry = $validated['industry'] ?? $setting->industry;
        $setting->about_company = $validated['about_company'] ?? $setting->about_company;

        $setting->hr_name = $validated['hr_name'] ?? $setting->hr_name;
        $setting->hr_position = $validated['hr_position'] ?? $setting->hr_position;
        $setting->hr_experience = $validated['hr_experience'] ?? $setting->hr_experience;
        $setting->hr_joindate = $validated['hr_joindate'] ?? $setting->hr_joindate;
        $setting->hr_email = $validated['hr_email'] ?? $setting->hr_email;
        $setting->hr_phone = $validated['hr_phone'] ?? $setting->hr_phone;
        $setting->hr_dept = $validated['hr_dept'] ?? $setting->hr_dept;
        $setting->hr_education = $validated['hr_education'] ?? $setting->hr_education;



        $setting->save();

        return response()->json(['message' => 'Settings updated successfully']);    
    }
}
