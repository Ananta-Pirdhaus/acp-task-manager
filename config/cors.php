<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],  // Apply CORS rules to API routes and Sanctum CSRF cookie.

    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE'],  // Limit to the methods you need.

    'allowed_origins' => ['https://your-frontend-app.com'],  // Replace with your frontend domain, e.g., 'https://example.com'.

    'allowed_origins_patterns' => [],  // You can use regex patterns here if needed.

    'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],  // Limit to headers you expect to receive.

    'exposed_headers' => [],  // You can add headers that should be exposed to the client.

    'max_age' => 3600,  // Cache the results of preflight requests for 1 hour (3600 seconds).

    'supports_credentials' => true,  // Set to true if your app requires cookies or authorization headers.

];
