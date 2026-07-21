<?php

namespace Tests\Unit\Models;

use App\Models\Document;
use App\Models\DocumentDownload;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DocumentDownloadTest extends TestCase
{
    use RefreshDatabase;

    public function test_download_belongs_to_a_user(): void
    {
        $user = User::factory()->create();
        $download = DocumentDownload::factory()->create(['user_id' => $user->id]);

        $this->assertTrue($user->is($download->user));
    }

    public function test_download_belongs_to_a_document(): void
    {
        $document = Document::factory()->create();
        $download = DocumentDownload::factory()->create(['document_id' => $document->id]);

        $this->assertTrue($document->is($download->document));
    }

    public function test_fillable_attributes_are_mass_assignable(): void
    {
        $user = User::factory()->create();
        $document = Document::factory()->create();

        $download = DocumentDownload::create([
            'user_id' => $user->id,
            'document_id' => $document->id,
            'downloaded_at' => '2024-05-01 12:00:00',
        ]);

        $this->assertSame($user->id, $download->user_id);
        $this->assertSame($document->id, $download->document_id);
    }
}
