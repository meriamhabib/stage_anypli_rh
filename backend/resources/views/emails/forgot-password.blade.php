<!DOCTYPE html>
<html>

<head>
    <title>Reset Password</title>
</head>

<body style="font-family:Arial;background:#f4f6f9;padding:40px;">

<div style="max-width:600px;background:white;margin:auto;padding:40px;border-radius:10px;">

<h2>Hello {{ $user->first_name }} {{ $user->last_name }}</h2>

<p>
We received a request to reset your password.
</p>

<p style="text-align:center;margin:40px 0;">

<a href="{{ $link }}"
style="
background:#0d6efd;
color:white;
padding:14px 30px;
text-decoration:none;
border-radius:5px;">
Reset Password
</a>

</p>

<p>
If you didn't request a password reset, you can safely ignore this email.
</p>

</div>

</body>

</html>