<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Storage;
use Arr;

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
        ]);

        $data['avatar'] = Storage::url($args['avatar']->storePublicly('public/avatars'));

        return \App\User::create($data);
    }
}
