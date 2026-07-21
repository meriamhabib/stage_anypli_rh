<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\ForgotPasswordMail;
use Throwable;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $request->validate([

            'email' => 'required|email',

            'password' => 'required'

        ]);



        if (!Auth::attempt($request->only('email','password'))) {

            return response()->json([

                'message' => 'Incorrect email or password'

            ],401);

        }



        $user = Auth::user();



        $token = $user
            ->createToken('auth_token')
            ->plainTextToken;



        return response()->json([

            'message' => 'Login successful',

            'user' => $user,

            'token' => $token

        ]);

    }





    public function profile(Request $request)
    {

        return response()->json([

            'user' => $request->user()

        ]);

    }




    /**
     * Déconnexion
     */
    public function logout(Request $request)
    {

        $request->user()
            ->tokens()
            ->delete();



        return response()->json([

            'message' => 'Logout successful'

        ]);

    }
    public function resetPassword(Request $request)
{
    $request->validate([
        'token' => 'required',
        'password' => 'required|confirmed|min:8',
    ]);

    $user = User::where('reset_token', $request->token)->first();

    if (!$user) {
        return response()->json([
            'message' => 'Lien invalide.'
        ], 404);
    }

    $user->password = Hash::make($request->password);
    $user->reset_token = null;
    $user->save();

    return response()->json([
        'message' => 'Mot de passe défini avec succès.'
    ]);
}
public function forgotPassword(Request $request)
{
    $request->validate([
        'email' => 'required|email',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json([
            'message' => 'No account found with this email.'
        ], 404);
    }

    $token = Str::random(64);

    $user->reset_token = $token;
    $user->save();

    $link = env('FRONTEND_URL') . '/reset-password/' . $token;

    try {
        Mail::to($user->email)
            ->send(new ForgotPasswordMail($user, $link));
    } catch (Throwable $e) {
        Log::error('Failed to send password reset email', [
            'email' => $user->email,
            'exception' => $e,
        ]);

        return response()->json([
            'message' => 'Unable to send the password reset email. Please try again later.'
        ], 500);
    }

    return response()->json([
        'message' => 'Password reset link sent successfully.'
    ]);
}

}