<?php

namespace Tests\Unit\Repositories;

use App\Models\News;
use App\Models\User;
use App\Repositories\NewsRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private NewsRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new NewsRepository;
    }

    public function test_get_all_eager_loads_creator(): void
    {
        News::factory()->count(2)->create();

        $news = $this->repository->getAll();

        $this->assertCount(2, $news);
        $this->assertTrue($news->first()->relationLoaded('creator'));
    }

    public function test_get_by_id_returns_news_with_creator(): void
    {
        $news = News::factory()->create();

        $found = $this->repository->getById($news->id);

        $this->assertTrue($news->is($found));
        $this->assertTrue($found->relationLoaded('creator'));
    }

    public function test_get_by_id_returns_null_when_missing(): void
    {
        $this->assertNull($this->repository->getById(999));
    }

    public function test_create_persists_news(): void
    {
        $user = User::factory()->create();

        $news = $this->repository->create([
            'title' => 'New office',
            'description' => 'We moved',
            'publication_date' => '2024-06-01',
            'created_by' => $user->id,
        ]);

        $this->assertInstanceOf(News::class, $news);
        $this->assertDatabaseHas('news', ['title' => 'New office']);
    }

    public function test_update_modifies_and_returns_news(): void
    {
        $news = News::factory()->create(['title' => 'Old']);

        $updated = $this->repository->update($news, ['title' => 'New']);

        $this->assertSame('New', $updated->title);
        $this->assertDatabaseHas('news', ['id' => $news->id, 'title' => 'New']);
    }

    public function test_delete_removes_news(): void
    {
        $news = News::factory()->create();

        $this->repository->delete($news);

        $this->assertDatabaseMissing('news', ['id' => $news->id]);
    }
}
