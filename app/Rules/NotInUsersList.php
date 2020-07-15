<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class NotInUsersList implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Checks if a movie is in the user's list.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return !auth()->user()->userMovies()->where('movie_id', $value)->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return "The movie is already in the user's list";
    }
}
