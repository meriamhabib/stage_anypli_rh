<?php

namespace Tests\Unit\Mail;

use App\Mail\ForgotPasswordMail;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ForgotPasswordMailTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_exposes_the_user_and_link(): void
    {
        $user = User::factory()->create();
        $link = 'https://app.test/reset-password/token456';

        $mailable = new ForgotPasswordMail($user, $link);

        $this->assertTrue($user->is($mailable->user));
        $this->assertSame($link, $mailable->link);
    }

    public function test_it_builds_with_the_expected_subject_and_view(): void
    {
        $user = User::factory()->create();

        $mailable = new ForgotPasswordMail($user, 'https://app.test/reset');
        $mailable->build();

        $this->assertSame('Reset your password', $mailable->subject);
        $this->assertSame('emails.forgot-password', $mailable->view);
    }

    public function test_it_renders_the_reset_link(): void
    {
        $user = User::factory()->create();
        $link = 'https://app.test/reset-password/token456';

        $mailable = new ForgotPasswordMail($user, $link);
        $mailable->assertSeeInHtml($link);
    }
}
