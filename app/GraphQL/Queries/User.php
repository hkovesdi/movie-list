<?php

namespace App\GraphQL\Queries;

class User
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $searchField = $args['searchField'];

        switch($searchField) 
        {
            case "ID":
                return \App\User::find($args['searchString']);
            case "USERNAME":
                return \App\User::where('username', $args['searchString'])->first();
            case "EMAIL":
                return \App\User::where('email', $args['searchString'])->first();
        }
    }
}
