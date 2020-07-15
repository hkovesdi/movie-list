<?php

namespace App\GraphQL\Mutations;

use Arr;

class AddToMyMovieList
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $data = Arr::only($args, [
            'movie_id', 
            'status_id', 
            'rating', 
            'date_watched', 
            'times_rewatched', 
            'comment'
        ]);
        
        $data['user_id'] = auth()->user()->id;
        
        return \App\UserMovie::create($data);
    }
}
