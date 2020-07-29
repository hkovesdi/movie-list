<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ResizePosters extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'resize-posters {--revert} {--regular-multiplier=2} {--high-res-multiplier=4}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Resize the posters or revert them to their original size (182x268)';

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
     * Resize the poster by a specified multiplier
     * modifying its url and maintaining aspect ratio
     *  
     * @param float $MULTIPLIER
     * @param string $url
     * @return string
     */
    private function resizePoster(float $MULTIPLIER, string $url)
    {
        $splitPosterUrl = explode('_', $url);

        $splitCr = explode(',', $splitPosterUrl[3]);
        $splitCr[2] = strval(intval($splitCr[2]) * $MULTIPLIER);
        $splitCr[3] = strval(intval($splitCr[3]) * $MULTIPLIER);
        $splitPosterUrl[3] = implode(",", $splitCr);

        $replacementStr = $splitPosterUrl[2][1] == 'X' ? $splitCr[2] : $splitCr[3];

        $splitPosterUrl[2] = substr_replace($splitPosterUrl[2], $replacementStr, 2);

        $result = implode('_', $splitPosterUrl);
        
        return $result;
    }

    private function revert(\App\Movie $movie) 
    {
        $splitPosterUrl = explode('_', $movie->img_url);

        $multiplier = 1/(intval(explode(',', $splitPosterUrl[3])[2])/182);

        $img_url_resized = $this->resizePoster($multiplier, $movie->img_url);
        $high_res_poster_url_resized = explode('._', $movie->img_url)[0];

        return array(
            'img_url' => $img_url_resized,
            'high_res_poster_url' => $high_res_poster_url_resized
        );
    }

    private function resize(\App\Movie $movie) 
    {   
        $img_url_resized = $this->resizePoster(intval($this->option('regular-multiplier')), $movie->img_url);
        $high_res_poster_url_resized = $this->resizePoster(intval($this->option('high-res-multiplier')), $movie->img_url);

        return array(
            'img_url' => $img_url_resized,
            'high_res_poster_url' => $high_res_poster_url_resized
        );
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {   
        $this->info("Resizing posters");
        $this->output->progressStart(\App\Movie::count());

        \App\Movie::each(function($movie){

            $updatedUrls = $this->option('revert') ? $this->revert($movie) : $this->resize($movie);
            
            $movie->update($updatedUrls);

            $this->output->progressAdvance();
        });

        $this->output->progressFinish();
    }
}
