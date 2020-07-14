<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersMoviesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_movies', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained()->onDelete('cascade');
            $table->foreignId("movie_id")->constrained()->onDelete('cascade');
            $table->integer("rating")->nullable();
            $table->foreignId("status_id")->constrained()->onDelete('cascade');
            $table->date("date_watched")->nullable();
            $table->integer("times_rewatched")->default(0);
            $table->string("comment", 200)->nullable();
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
        Schema::table('users_movies', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['movie_id']);
            $table->dropForeign(['status_id']);
        });

        Schema::dropIfExists('users_movies');
    }
}
