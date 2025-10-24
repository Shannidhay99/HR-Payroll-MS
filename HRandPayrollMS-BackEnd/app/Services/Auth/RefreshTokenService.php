<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User\User;

class RefreshTokenService
{
    public function create(User $user): string
    {
        $plainToken = Str::random(64);

        DB::table('refresh_tokens')->insert([
            'user_id'    => $user->id,
            'token'      => Hash::make($plainToken),
            'expires_at' => now()->addDays(30),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $plainToken;
    }

    public function validateAndRotate(string $incomingToken): ?array
    {
        $storedTokens = DB::table('refresh_tokens')
            ->where('expires_at', '>', now())
            ->get();

        foreach ($storedTokens as $tokenRecord) {
            if (Hash::check($incomingToken, $tokenRecord->token)) {
                $user = User::find($tokenRecord->user_id);

                if (!$user) {
                    return null;
                }

                DB::table('refresh_tokens')->where('id', $tokenRecord->id)->delete();

                $newRefreshToken = $this->create($user);
                $newAccessToken = $user->createToken('auth_token')->plainTextToken;

                return [
                    'user'           => $user,
                    'access_token'   => $newAccessToken,
                    'refresh_token'  => $newRefreshToken,
                ];
            }
        }

        return null;
    }

    public function revokeAll(User $user): void
    {
        DB::table('refresh_tokens')->where('user_id', $user->id)->delete();
    }
}
