<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Inscription (Sign Up)
    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'telephone' => 'nullable|string|max:20',
            'role' => 'nullable|in:directeur,employe',
            'poste' => 'nullable|string|max:100',
            'date_embauche' => 'nullable|date',
        ]);

        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => $request->password,
            'telephone' => $request->telephone,
            'role' => $request->role ?? 'employe',
            'poste' => $request->poste,
            'date_embauche' => $request->date_embauche,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Utilisateur créé avec succès',
            'user' => $user,
            'token' => $token
        ], 201);
    }


    // Connexion (Sign In)
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);


        if (!Auth::attempt($request->only('email', 'password'))) {

            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401);

        }


        $user = Auth::user();

        $token = $user->createToken('auth_token')->plainTextToken;


        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $user,
            'token' => $token
        ]);
    }


    // Profil utilisateur connecté
    public function profile(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }


    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }
}
