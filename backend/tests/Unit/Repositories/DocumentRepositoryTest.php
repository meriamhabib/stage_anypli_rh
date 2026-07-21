<?php

namespace Tests\Unit\Repositories;

use App\Models\Document;
use App\Models\User;
use App\Repositories\DocumentRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DocumentRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private DocumentRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new DocumentRepository;
    }

    public function test_get_all_eager_loads_creator(): void
    {
        Document::factory()->count(2)->create();

        $documents = $this->repository->getAll();

        $this->assertCount(2, $documents);
        $this->assertTrue($documents->first()->relationLoaded('creator'));
    }

    public function test_get_by_id_returns_document_with_creator(): void
    {
        $document = Document::factory()->create();

        $found = $this->repository->getById($document->id);

        $this->assertTrue($document->is($found));
        $this->assertTrue($found->relationLoaded('creator'));
    }

    public function test_get_by_id_returns_null_when_missing(): void
    {
        $this->assertNull($this->repository->getById(999));
    }

    public function test_create_persists_a_document(): void
    {
        $user = User::factory()->create();

        $document = $this->repository->create([
            'title' => 'Handbook',
            'description' => 'Company handbook',
            'file_path' => 'docs/handbook.pdf',
            'original_name' => 'handbook.pdf',
            'document_type' => 'other',
            'created_by' => $user->id,
        ]);

        $this->assertInstanceOf(Document::class, $document);
        $this->assertDatabaseHas('documents', ['title' => 'Handbook']);
    }

    public function test_update_modifies_and_returns_the_document(): void
    {
        $document = Document::factory()->create(['title' => 'Old']);

        $updated = $this->repository->update($document, ['title' => 'New']);

        $this->assertSame('New', $updated->title);
        $this->assertDatabaseHas('documents', ['id' => $document->id, 'title' => 'New']);
    }

    public function test_delete_removes_the_document(): void
    {
        $document = Document::factory()->create();

        $this->repository->delete($document);

        $this->assertDatabaseMissing('documents', ['id' => $document->id]);
    }
}
