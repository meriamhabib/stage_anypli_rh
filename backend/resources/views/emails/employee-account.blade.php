```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Welcome to Anypli RH</title>
</head>

<body style="margin:0; padding:40px; background-color:#f4f6f9; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                    style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">

                    <tr>
                        <td style="background:#0d6efd; color:#ffffff; padding:25px; text-align:center;">
                            <h1 style="margin:0;">Anypli RH</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:40px; color:#333333;">

                            <h2 style="margin-top:0;">
                                Hello {{ $employee->first_name }} {{ $employee->last_name }},
                            </h2>

                            <p style="font-size:16px; line-height:1.7;">
                                Your employee account has been created successfully.
                            </p>

                            <p style="font-size:16px; line-height:1.7;">
                                <strong>Login email:</strong><br>
                                {{ $employee->email }}
                            </p>

                            <p style="font-size:16px; line-height:1.7;">
                                Click the button below to create your password and activate your account.
                            </p>

                            <div style="text-align:center; margin:40px 0;">
                                <a href="{{ $link }}"
                                   style="background:#0d6efd;
                                          color:#ffffff;
                                          text-decoration:none;
                                          padding:15px 35px;
                                          border-radius:6px;
                                          display:inline-block;
                                          font-size:16px;
                                          font-weight:bold;">
                                    Create my password
                                </a>
                            </div>

                            <p style="font-size:14px; color:#777777; line-height:1.6;">
                                After creating your password, you can log in using the email address above.
                            </p>

                            <hr style="border:none; border-top:1px solid #eeeeee; margin:30px 0;">

                            <p style="font-size:13px; color:#999999; text-align:center;">
                                © {{ date('Y') }} Anypli RH<br>
                                This is an automatic email. Please do not reply.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
```
