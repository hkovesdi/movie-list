<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handles a login attempt.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return json
     */
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Sucessfully logged in!',
                'user' => Auth::user()->toArray()
            ]);
        }

        return response()->json([
            'message' => 'Invalid username or password!',
        ], 401);

    }

    /**
     * Logs out the currently authenticated user.
     * @return json
     */
    public function logout()
    {
        if(Auth::check()){
            Auth::logout();
        }

        return response()->json([
            'message' => 'Successfully logged out!',
        ]);
    }
}
