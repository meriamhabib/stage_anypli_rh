<?php

namespace Tests\Unit\Mail;

use App\Mail\EmployeeAccountCreated;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeAccountCreatedTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_exposes_the_employee_and_link(): void
    {
        $employee = User::factory()->create();
        $link = 'https://app.test/reset-password/token123';

        $mailable = new EmployeeAccountCreated($employee, $link);

        $this->assertTrue($employee->is($mailable->employee));
        $this->assertSame($link, $mailable->link);
    }

    public function test_it_has_the_expected_subject_and_view(): void
    {
        $employee = User::factory()->create();

        $mailable = new EmployeeAccountCreated($employee, 'https://app.test/reset');

        $this->assertSame(
            'Your Employee Account Has Been Created',
            $mailable->envelope()->subject
        );
        $this->assertSame('emails.employee-account', $mailable->content()->view);
        $this->assertSame([], $mailable->attachments());
    }

    public function test_it_renders_the_reset_link(): void
    {
        $employee = User::factory()->create();
        $link = 'https://app.test/reset-password/token123';

        $mailable = new EmployeeAccountCreated($employee, $link);
        $mailable->assertSeeInHtml($link);
    }
}
