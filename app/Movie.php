<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $title
 * @property string $rating
 * @property int $year
 * @property float $users_rating
 * @property int $metascore
 * @property string $img_url
 * @property string $high_res_poster_url
 * @property string $tagline
 * @property string $description
 * @property int $runtime
 * @property string $imdb_url
 * @property string $created_at
 * @property string $updated_at
 * @property Actor[] $actors
 * @property Country[] $countries
 * @property Director[] $directors
 * @property Genre[] $genres
 * @property Language[] $languages
 */
class Movie extends Model
{   
    use FullTextSearch;
    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = [
        'title', 
        'rating', 
        'year', 
        'users_rating', 
        'metascore', 
        'img_url', 
        'high_res_poster_url', 
        'tagline', 
        'description', 
        'runtime', 
        'imdb_url', 
        'created_at', 
        'updated_at'
    ];
  
    /**
     * The columns of the full text index
     */
    protected $searchable = [
        'title',
        'description',
        'tagline'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function actors()
    {
        return $this->belongstoMany('App\Actor', 'movies_actors');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function countries()
    {
        return $this->belongsToMany('App\Country', 'movies_countries');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function directors()
    {
        return $this->belongsToMany('App\Director', 'movies_directors');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function genres()
    {
        return $this->belongsToMany('App\Genre', 'movies_genres');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function languages()
    {
        return $this->belongsToMany('App\Language', 'movies_languages');
    }

        /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function userMovies()
    {
        return $this->hasMany('App\UserMovie');
    }
}
