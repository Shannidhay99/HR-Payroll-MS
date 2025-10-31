<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Helpers\SystemLogger;
use App\Models\User\Tenant;
use App\Models\User\User;
use App\Services\Auth\RefreshTokenService;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    // Google login is implemented at the bottom of this file

    public function refresh(Request $request, RefreshTokenService $refreshTokenService)
    {
        $request->validate([
            'refresh_token' => 'required|string',
        ]);

        $result = $refreshTokenService->validateAndRotate($request->refresh_token);

        if (!$result) {
            return response()->json(['message' => 'Invalid or expired refresh token.'], 401);
        }

        return response()->json([
            'access_token'  => $result['access_token'],
            'refresh_token' => $result['refresh_token'],
        ]);
    }
    public function register(Request $request, RefreshTokenService $refreshTokenService)
    {
        $request->validate([
            'firstName'        => 'required|string|max:255',
            'lastName'         => 'required|string|max:255',
            'email'            => 'required|email|unique:users,email',
            'phone'            => 'nullable|string',
            'password'         => 'required|string|min:6|confirmed',
            'role'             => 'required|string|in:employee,admin',
        ]);

        try {
            DB::beginTransaction();

            // Create base user
            $user = new User([
                'firstName' => $request->firstName,
                'lastName'  => $request->lastName,
                'email'     => $request->email,
                'phone'     => $request->phone,
                'password'  => Hash::make($request->password),
                'role_id'   => $request->role === 'admin' ? 2 : 1, // 2 for admin, 1 for employee
            ]);
            
            $user->save();

            // Create tokens
            $token = $user->createToken('auth_token')->plainTextToken;
            $refreshToken = $refreshTokenService->create($user);

            // Handle role-specific logic
            if ($request->role === 'admin') {
                // Create tenant first
                $tenant = Tenant::create([
                    'name' => $request->organization_name ?? "{$user->firstName}'s Organization",
                    'user_id' => $user->id,
                    'updated_by' => $user->id
                ]);

                // Update user with tenant_id
                $user->tenant_id = $tenant->id;
                $user->save();

                // Assign admin role
                $user->assignRole('admin');
                SystemLogger::log('info', "New admin registered: {$user->email}", $user->id);
            } else {
                // Assign employee role
                $user->assignRole('employee');
                SystemLogger::log('info', "New employee registered: {$user->email}", $user->id);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 422);
        }

        return response()->json([
            'message' => 'User registered successfully',
            'user'    => $user->load('roles'), // Load roles to include in response
            'token'   => $token,
            'refresh_token'  => $refreshToken,  // ✅ include refresh token
            'role'    => $request->role, // Include selected role in response
        ], 201);
    }

    public function login(Request $request, RefreshTokenService $refreshTokenService)
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        $refreshToken = $refreshTokenService->create($user); // ✅

        SystemLogger::log('info', "User logged in: {$user->email}", $user->id);

        return response()->json([
            'message'        => 'Login successful',
            'user'           => $user,
            'access_token'   => $token,
            'refresh_token'  => $refreshToken,
        ]);
    }


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        SystemLogger::log('info', "User logged out: {$request->user()->email}");

        return response()->json([
            'message' => 'Successfully logged out',
        ], 200);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // In a full implementation, send reset link or OTP
        SystemLogger::log('info', "Password reset requested for: {$request->email}");

        return response()->json(['message' => 'If the email exists, a reset link has been sent.']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // For demo: accept token blindly and change password
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Invalid user'], 404);
        }
        $user->password = Hash::make($request->password);
        $user->save();
        SystemLogger::log('info', "Password reset for: {$user->email}", $user->id);

        return response()->json(['message' => 'Password has been reset']);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = $request->user();
        if (!$user || !Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 422);
        }

        $user->password = Hash::make($request->password);
        $user->save();
        SystemLogger::log('info', "Password changed for: {$user->email}", $user->id);

        return response()->json(['message' => 'Password changed successfully']);
    }

    public function loginWithGoogle(Request $request)
    {
        try {
            if ($request->isMethod('get')) {
                return Socialite::driver('google')->redirect();
            }

            // Handle the callback from Google
            $googleUser = Socialite::driver('google')->user();

            // Find existing user or create new one
            $user = User::updateOrCreate(
                ['email' => $googleUser->email],
                [
                    'firstName' => explode(' ', $googleUser->name)[0] ?? '',
                    'lastName' => explode(' ', $googleUser->name)[1] ?? '',
                    'avatar' => $googleUser->avatar,
                    'google_id' => $googleUser->id,
                ]
            );

            // Create access token
            $token = $user->createToken('google-token')->plainTextToken;

            // Create refresh token using the service
            $refreshTokenService = app(RefreshTokenService::class);
            $refreshToken = $refreshTokenService->create($user);

            SystemLogger::log('info', "User logged in with Google: {$user->email}", $user->id);

            return response()->json([
                'user' => $user,
                'access_token' => $token,
                'refresh_token' => $refreshToken,
            ]);

        } catch (\Exception $e) {
            Log::error('Google login error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'phone' => 'nullable|string',
            'avatar' => 'nullable|string',
        ]);

        try {
            $user->update([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'phone' => $request->phone,
                'avatar' => $request->avatar,
            ]);

            SystemLogger::log('info', "Profile updated for: {$user->email}", $user->id);

            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Profile update failed',
                'error' => $e->getMessage()
            ], 422);
        }
    }

    public function userRegister(Request $request, RefreshTokenService $refreshTokenService)
    {
        $validator = Validator::make($request->all(), [
            'firstName'        => 'required|string|max:255',
            'lastName'         => 'required|string|max:255',
            'email'            => 'required|email|unique:users,email',
            'phone'            => 'nullable|string',
            'password'         => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'firstName' => $request->firstName,
            'lastName'  => $request->lastName,
            'email'     => $request->email,
            'phone'     => $request->phone,
            'password'  => Hash::make($request->password),
            'tenant_id' => tenant()->id,
        ]);

        $accessToken = $user->createToken('auth_token')->plainTextToken;
        $refreshToken = $refreshTokenService->create($user);

        SystemLogger::log('info', "New user registered under tenant ID " . tenant()->id . ": {$user->email}");

        return response()->json([
            'message'        => 'User registered successfully',
            'user'           => $user,
            'access_token'   => $accessToken,
            'refresh_token'  => $refreshToken,
        ], 201);
    }
}
