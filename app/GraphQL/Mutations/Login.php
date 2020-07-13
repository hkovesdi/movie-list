<?php

namespace App\GraphQL\Mutations;

use Arr;
use Illuminate\Support\Facades\Auth;

class Login
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $credentials = Arr::only($args, ['username', 'password']);
        $loginPayload = array("message" => null, "user" => null);

        if (Auth::attempt($credentials)) {
            $loginPayload['message'] = 'Sucessfully logged in!';
            $loginPayload['user'] = Auth::user()->toArray();
        }
        else {
            $loginPayload['message'] = "Invalid username or password";
        }
        
        return $loginPayload;
    }
}
