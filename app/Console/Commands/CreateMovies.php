<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class CreateMovies extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:movies';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populates the movies document from movies.json';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Creates the genre from the movie array extracted from the json
     * and attaches it to the movie model.
     * 
     * @param array $movieArray
     * @param \App\Movie $movieModel
     * 
     * @return void
     */
    private function createAndAttachGenres(array $movieArray, \App\Movie $movieModel) 
    {
        foreach ($movieArray['genres'] as $genreName) {
            $genre = \App\Genre::where('name', $genreName)->first();
            if ($genre === null) {
                $genre = \App\Genre::create([
                    'name' => $genreName
                ]);
            }
            $movieModel->genres()->attach($genre->id);
        }
    }

    /**
     * Creates the country from the movie array extracted from the json
     * and attaches it to the movie model.
     * 
     * @param array $movieArray
     * @param \App\Movie $movieModel
     * 
     * @return void
     */
    private function createAndAttachCountries(array $movieArray, \App\Movie $movieModel) 
    {
        foreach ($movieArray['countries'] as $countryName) {
            $country = \App\Country::where('name', $countryName)->first();
            if ($country === null) {
                $country = \App\Country::create([
                    'name' => $countryName
                ]);
            }
            $movieModel->countries()->attach($country->id);
        }
    }

    /**
     * Creates the languages from the movie array extracted from the json
     * and attaches it to the movie model.
     * 
     * @param array $movieArray
     * @param \App\Movie $movieModel
     * 
     * @return void
     */
    private function createAndAttachLanguages(array $movieArray, \App\Movie $movieModel) 
    {
        foreach ($movieArray['languages'] as $languageName) {
            $language = \App\Language::where('name', $languageName)->first();
            if ($language === null) {
                $language = \App\Language::create([
                    'name' => $languageName
                ]);
            }
            $movieModel->languages()->attach($language->id);
        }
    }

    /**
     * Creates the directors from the movie array extracted from the json
     * and attaches it to the movie model.
     * 
     * @param array $movieArray
     * @param \App\Movie $movieModel
     * 
     * @return void
     */
    private function createAndAttachDirectors(array $movieArray, \App\Movie $movieModel) 
    {
        foreach ($movieArray['directors'] as $directorName) {
            $director = \App\Director::where('name', $directorName)->first();
            if ($director === null) {
                $director = \App\Director::create([
                    'name' => $directorName
                ]);
            }
            $movieModel->directors()->attach($director->id);
        }
    }

    /**
     * Creates the actors from the movie array extracted from the json
     * and attaches it to the movie model.
     * 
     * @param array $movieArray
     * @param \App\Movie $movieModel
     * 
     * @return void
     */
    private function createAndAttachActors(array $movieArray, \App\Movie $movieModel) 
    {
        foreach ($movieArray['actors'] as $actorName) {
            $actor = \App\Actor::where('name', $actorName)->first();
            if ($actor === null) {
                $actor = \App\Actor::create([
                    'name' => $actorName
                ]);
            }
            $movieModel->actors()->attach($actor->id);
        }
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $movies = array_chunk(json_decode(Storage::get('movies.json'), true), 1000)[0];
        $movieCount = count($movies);

        
        if (\App\Movie::count() > 0) {
            $this->error('The movies document is not empty!');
        }
        else {
            $this->info("Creating movies");
            $this->output->progressStart($movieCount);

            foreach($movies as $movie) {
                $movie['runtime'] = explode(" ", $movie['runtime'])[0];

                if ($movie['runtime'] != null && $movie['high_res_poster_url'] != null)
                    $createdMovie = \App\Movie::create($movie);
                
                $this->createAndAttachActors($movie, $createdMovie);
                $this->createAndAttachDirectors($movie, $createdMovie);
                $this->createAndAttachCountries($movie, $createdMovie);
                $this->createAndAttachLanguages($movie, $createdMovie);
                $this->createAndAttachGenres($movie, $createdMovie);

                $this->output->progressAdvance();
            }
            $this->output->progressFinish();
        }

    }
}
