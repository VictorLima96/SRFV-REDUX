<?php

// Vercel PHP entry point - forwards all requests to Laravel

// Ensure the compiled views directory exists on the serverless filesystem
$viewPath = '/tmp/views';
if (!is_dir($viewPath)) {
    mkdir($viewPath, 0755, true);
}

require __DIR__ . '/../public/index.php';
