<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmployeeAccountCreated extends Mailable
{
    use Queueable, SerializesModels;

    public $employee;
    public $link;

    public function __construct($employee, $link)
    {
        $this->employee = $employee;
        $this->link = $link;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Employee Account Has Been Created',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.employee-account',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}