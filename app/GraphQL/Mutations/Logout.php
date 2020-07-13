<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;

class Logout
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        if(Auth::check()) {
            Auth::guard('web')->logout(); //https://github.com/laravel/sanctum/issues/87#issuecomment-595952005
        }

        return array("message" => "Successfully logged out!");
    }
}
