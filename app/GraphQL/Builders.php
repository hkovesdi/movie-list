<?php

namespace App\GraphQL;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Arr;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Builders
{
    public function movies($root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): Builder
    {   
        $searchMode = Arr::get($args, 'searchMode');
        $searchTerm = Arr::get($args, 'searchTerm');

        $query = DB::table('movies');

        switch($searchMode) {
            case "ALL":
                break;
            case "TITLE":
                $query = \App\Movie::search($searchTerm, ['title'])->orWhere('title', 'like', "%$searchTerm%")->getQuery();
                break;
            case "DESCRIPTION":
                $query = \App\Movie::search($searchTerm, ['description', 'tagline'])->getQuery();
                break;
        }

        return $query;
    }
}