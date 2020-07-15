<?php

namespace App\GraphQL\Mutations;

use Arr;

class UpdateMyMovieList
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $data = Arr::only($args, [
            'status_id', 
            'rating', 
            'date_watched', 
            'times_rewatched', 
            'comment'
        ]);

        $userMovie = auth()->user()->userMovies()->where('movie_id', $args['movie_id'])->first();

        return $userMovie->fresh();
    }
}
