<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Storage;
Use Illuminate\Support\Facades\Auth;
use Arr;
use Illuminate\Support\Facades\Hash;

class Register
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $data = Arr::only($args, [
            'username',
            'email',
            'password',
            'bio'
        ]);

        $credentials = Arr::only($args, ['username', 'password']);

        $data['password'] = Hash::make($data['password']);
        
        if(Arr::exists($args, 'avatar'))
            $data['avatar'] = Storage::url($args['avatar']->storePublicly('public/avatars'));

        $user = \App\User::create($data);
        
        Auth::guard("web")->attempt($credentials));

        return $user;
    }
}
