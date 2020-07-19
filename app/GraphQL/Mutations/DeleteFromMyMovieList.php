<?php

namespace App\GraphQL\Mutations;

class DeleteFromMyMovieList
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $movieListItem = auth()->user()->userMovies()->where('movie_id', $args['movie_id'])->first();
        $movieListItem->delete();

        return $movieListItem;
    }
}
