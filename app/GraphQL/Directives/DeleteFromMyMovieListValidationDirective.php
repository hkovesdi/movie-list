<?php

namespace App\GraphQL\Directives;

use Illuminate\Validation\Rule;
use Nuwave\Lighthouse\Schema\Directives\ValidationDirective;

class DeleteFromMyMovieListValidationDirective extends ValidationDirective
{
    /**
     * @return mixed[]
     */
    public function rules(): array
    {
        return [
            "movie_id" => ["required", "integer", "exists:movies,id", new \App\Rules\InUsersList],
        ];
    }
}