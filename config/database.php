<?php
/**
 * Database Configuration File
 * 
 * Update these settings according to your MySQL/phpMyAdmin setup
 */

// Database Configuration
return [
    'host' => 'localhost',
    'database' => 'elite_hotels',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
];