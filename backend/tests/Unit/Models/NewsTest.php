<?php

namespace Tests\Unit\Models;

use App\Models\News;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsTest extends TestCase
{
    use RefreshDatabase;

    public function test_news_belongs_to_its_creator(): void
    {
        $user = User::factory()->create();
        $news = News::factory()->create(['created_by' => $user->id]);

        $this->assertTrue($user->is($news->creator));
    }

    public function test_fillable_attributes_are_mass_assignable(): void
    {
        $user = User::factory()->create();

        $news = News::create([
            'title' => 'Announcement',
            'description' => 'Something happened',
            'image' => 'news/a.jpg',
            'publication_date' => '2024-05-01',
            'created_by' => $user->id,
        ]);

        $this->assertSame('Announcement', $news->title);
        $this->assertSame('news/a.jpg', $news->image);
    }
}
