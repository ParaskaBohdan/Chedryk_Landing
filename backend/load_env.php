<?php
// Secure credentials loader for Nova Energy backend
// Loads from environment, config.local.php, or .env (all ignored by git)

foreach ([
    __DIR__ . '/config.local.php',
    __DIR__ . '/api/config.local.php',
    dirname(__DIR__) . '/config.local.php',
] as $localConfig) {
    if (file_exists($localConfig)) {
        require_once $localConfig;
        break;
    }
}

foreach ([
    __DIR__ . '/.env',
    __DIR__ . '/api/.env',
    dirname(__DIR__) . '/.env',
] as $envFile) {
    if (file_exists($envFile) && is_readable($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line !== '' && strpos($line, '#') !== 0 && strpos($line, '=') !== false) {
                list($k, $v) = explode('=', $line, 2);
                $k = trim($k);
                $v = trim($v, " \t\n\r\0\x0B\"'");
                if (!getenv($k)) {
                    putenv("{$k}={$v}");
                    $_ENV[$k] = $v;
                }
            }
        }
        break;
    }
}
