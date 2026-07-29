<?php

namespace Tests\Unit\Models;

use App\Models\Document;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DocumentTest extends TestCase
{
    use RefreshDatabase;

    public function test_document_belongs_to_its_creator(): void
    {
        $user = User::factory()->create();
        $document = Document::factory()->create(['created_by' => $user->id]);

        $this->assertTrue($user->is($document->creator));
    }

    public function test_fillable_attributes_are_mass_assignable(): void
    {
        $user = User::factory()->create();

        $document = Document::create([
            'title' => 'Policy',
            'description' => 'HR policy',
            'file_path' => 'docs/policy.pdf',
            'original_name' => 'policy.pdf',
            'document_type' => 'other',
            'created_by' => $user->id,
        ]);

        $this->assertSame('Policy', $document->title);
        $this->assertSame('docs/policy.pdf', $document->file_path);
    }
}
