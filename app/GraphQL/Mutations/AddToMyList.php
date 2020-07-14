<?php

namespace App\GraphQL\Mutations;

use Arr;

class AddToMyList
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
        
        if(auth()->user()->userMovies()->where('movie_id', $data['movie_id'])->exists()) {
            throw new \App\Exceptions\GQLException(
                "Movie is already in the list",
                "The movie with id: ".$data['movie_id']." is already present in the user's list"
            );
        }

        $data['user_id'] = auth()->user()->id;
        
        return \App\UserMovie::create($data);
    }
}
