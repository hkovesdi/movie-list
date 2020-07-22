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

        Auth::guard("web")->attempt($credentials);
        
        return Auth::user();
    }
}
