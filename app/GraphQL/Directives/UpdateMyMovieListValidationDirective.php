<?php

namespace App\GraphQL\Directives;

use Illuminate\Validation\Rule;
use Nuwave\Lighthouse\Schema\Directives\ValidationDirective;

class UpdateMyMovieListValidationDirective extends ValidationDirective
{
    /**
     * @return mixed[]
     */
    public function rules(): array
    {
        return [
            "movie_id" => ["sometimes", "integer", "exists:movies,id", new \App\Rules\InUsersList],
            "status_id" => ["sometimes", "integer", "exists:statuses,id"],
            "rating" => ["sometimes","integer","between:1,10"],
            "date_watched" => ["sometimes", "date", "before_or_equal:today"],
            "times_rewatched" => ["sometimes", "integer"],
            "comment" => ["sometimes", "string", "max:200"]
        ];
    }
}