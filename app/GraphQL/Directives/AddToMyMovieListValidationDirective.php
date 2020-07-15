<?php

namespace App\GraphQL\Directives;

use Illuminate\Validation\Rule;
use Nuwave\Lighthouse\Schema\Directives\ValidationDirective;

class AddToMyMovieListValidationDirective extends ValidationDirective
{
    /**
     * @return mixed[]
     */
    public function rules(): array
    {
        return [
            "movie_id" => ["required", "integer", "exists:movies,id", new \App\Rules\NotInUsersList],
            "status_id" => ["required", "integer", "exists:statuses,id"],
            "rating" => ["sometimes","integer","between:1,10"],
            "date_watched" => ["sometimes", "date", "before_or_equal:today"],
            "times_rewatched" => ["sometimes", "integer"],
            "comment" => ["sometimes", "string", "max:200"]
        ];
    }
}