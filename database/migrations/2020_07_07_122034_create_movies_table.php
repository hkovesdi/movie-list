<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoviesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('rating');
            $table->integer('year');
            $table->float('users_rating', 2, 2);
            $table->integer('metascore');
            $table->string('img_url');
            $table->string('high_res_poster_url');
            $table->string('tagline');
            $table->string('description');
            $table->integer('runtime');
            $table->string('imdb_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movies');
    }
}
