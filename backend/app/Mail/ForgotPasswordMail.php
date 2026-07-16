<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class ForgotPasswordMail extends Mailable
{
    public $user;
    public $link;

    public function __construct($user, $link)
    {
        $this->user = $user;
        $this->link = $link;
    }

    public function build()
    {
        return $this->subject('Reset your password')
                    ->view('emails.forgot-password');
    }
}