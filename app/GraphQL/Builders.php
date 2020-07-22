<?php

namespace App\GraphQL;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Builders
{
    public function movies($root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): Builder
    {   
        $title = $args['title'];

        return DB::table('movies')
            ->when($title, function($query) use($title) {
                $query->where('title', 'like', '%'.$title.'%');
            });
    }
}