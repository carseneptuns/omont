-- OMONT / Type Your Memory — database schema

CREATE DATABASE IF NOT EXISTS omont_db;

USE omont_db;

CREATE TABLE IF NOT EXISTS memories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'untitled memory',
    content LONGTEXT,
    typewriter_color VARCHAR(50) NOT NULL DEFAULT 'blue',
    paper_color VARCHAR(50) NOT NULL DEFAULT 'beige',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
