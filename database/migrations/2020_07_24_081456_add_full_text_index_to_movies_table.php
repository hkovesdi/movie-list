<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFullTextIndexToMoviesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE movies ADD FULLTEXT fulltext_title(title)');
        DB::statement('ALTER TABLE movies ADD FULLTEXT fulltext_description(description)');
        DB::statement('ALTER TABLE movies ADD FULLTEXT fulltext_tagline(tagline)');
        DB::statement('ALTER TABLE movies ADD FULLTEXT fulltext_title_description(title, description)');
        DB::statement('ALTER TABLE movies ADD FULLTEXT fulltext_title_tagline(title, tagline)');
        DB::statement('ALTER TABLE movies ADD FULLTEXT fulltext_description_tagline(description, tagline)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('ALTER TABLE movies DROP INDEX fulltext_title');
        DB::statement('ALTER TABLE movies DROP INDEX fulltext_description');
        DB::statement('ALTER TABLE movies DROP INDEX fulltext_tagline');
        DB::statement('ALTER TABLE movies DROP INDEX fulltext_description_tagline');
        DB::statement('ALTER TABLE movies DROP INDEX fulltext_title_tagline');
        DB::statement('ALTER TABLE movies DROP INDEX fulltext_title_description');
    }
}
