<?php

namespace App\Repositories;

use App\Models\News;

class NewsRepository extends BaseRepository
{
    protected array $relations = ['creator'];

    public function __construct(News $news)
    {
        $this->model = $news;
    }
}
