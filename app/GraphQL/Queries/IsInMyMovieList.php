<?php

namespace App\GraphQL\Queries;

class IsInMyMovieList
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        return auth()->user()->userMovies()->where('movie_id', $args['movie_id'])->exists();
    }
}
