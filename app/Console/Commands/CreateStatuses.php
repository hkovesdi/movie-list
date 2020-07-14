<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateStatuses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:statuses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates the statuses if they dont already exist';

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
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $statuses = array("Plan to watch", "On hold", "Watching", "Completed", "Dropped");

        foreach($statuses as $status) {
            if(!\App\Status::where('name', $status)->exists()) {
                \App\Status::create([
                    'name' => $status
                ]);
            }
        }
    }
}
