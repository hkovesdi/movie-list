<?php
 
namespace App;
 
trait FullTextSearch
{
    /**
     * Replaces spaces with full text search wildcards
     *
     * @param string $term
     * @return string
     */
    protected function fullTextWildcards($term)
    {
        // removing symbols used by MySQL
        $reservedSymbols = ['-', '+', '<', '>', '@', '(', ')', '~'];
        
        $term = str_replace($reservedSymbols, '', $term);
 
        return $term;
    }
 
    /**
     * Scope a query that matches a full text search of term.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $term
     * @param array $columns
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $term, $columns)
    {   
        $mode = (in_array("description", $columns) || in_array("tagline", $columns)) ? "NATURAL LANGUAGE" : "BOOLEAN";

        $columns = implode(',', array_intersect($this->searchable, $columns));
 
        $searchableTerm = $this->fullTextWildcards($term);
 
        $query->fromSub(function($query) use($columns, $mode, $searchableTerm) {
            $query->selectRaw("*, MATCH ({$columns}) AGAINST (? IN {$mode} MODE) AS relevance_score", [$searchableTerm])->from('movies');
        }, 'moviesWithRelevanceScore')
        ->where('relevance_score', '>', 0)
        ->orderBy('relevance_score', 'desc');
 
        return $query;
    }
}