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
        $title = Arr::first(Arr::only($args, 'title'));

        return DB::table('movies')
            ->when($title, function($query) use($title) {
                $query->where('title', 'like', '%'.$title.'%');
            });
    }
}