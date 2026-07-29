<?php

namespace Tests\Unit\Repositories;

use App\Models\Document;
use App\Models\DocumentDownload;
use App\Models\User;
use App\Repositories\DocumentDownloadRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DocumentDownloadRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private DocumentDownloadRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new DocumentDownloadRepository;
    }

    public function test_get_all_eager_loads_user_and_document(): void
    {
        DocumentDownload::factory()->count(2)->create();

        $downloads = $this->repository->getAll();

        $this->assertCount(2, $downloads);
        $this->assertTrue($downloads->first()->relationLoaded('user'));
        $this->assertTrue($downloads->first()->relationLoaded('document'));
    }

    public function test_get_by_id_returns_download_with_relations(): void
    {
        $download = DocumentDownload::factory()->create();

        $found = $this->repository->getById($download->id);

        $this->assertTrue($download->is($found));
        $this->assertTrue($found->relationLoaded('document'));
    }

    public function test_get_by_id_returns_null_when_missing(): void
    {
        $this->assertNull($this->repository->getById(999));
    }

    public function test_create_persists_a_download(): void
    {
        $user = User::factory()->create();
        $document = Document::factory()->create();

        $download = $this->repository->create([
            'user_id' => $user->id,
            'document_id' => $document->id,
        ]);

        $this->assertInstanceOf(DocumentDownload::class, $download);
        $this->assertDatabaseHas('document_downloads', [
            'user_id' => $user->id,
            'document_id' => $document->id,
        ]);
    }

    public function test_delete_removes_the_download(): void
    {
        $download = DocumentDownload::factory()->create();

        $this->repository->delete($download);

        $this->assertDatabaseMissing('document_downloads', ['id' => $download->id]);
    }
}
