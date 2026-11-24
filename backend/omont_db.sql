-- =========================================================
-- OMONT / Type Your Memory — MySQL database
-- Import this file directly (phpMyAdmin "Import" tab, or:
--   mysql -u root -p < omont_db.sql
-- ) and the database + table are ready to use.
-- =========================================================

CREATE DATABASE IF NOT EXISTS omont_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE omont_db;

CREATE TABLE IF NOT EXISTS memories (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    title             VARCHAR(255) NOT NULL DEFAULT 'untitled memory',
    content           LONGTEXT,
    typewriter_color  VARCHAR(50)  NOT NULL DEFAULT 'blue',
    paper_color       VARCHAR(50)  NOT NULL DEFAULT 'beige',
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- If you already imported an earlier version of this file
-- (without paper_color), just run this line by itself to
-- upgrade your existing table instead of re-importing:
--
--   ALTER TABLE memories ADD COLUMN paper_color VARCHAR(50) NOT NULL DEFAULT 'beige';
-- -----------------------------------------------------------

-- -----------------------------------------------------------
-- Optional: a couple of sample memories, just to see the app
-- populated right away. Uncomment if you want a head start.
-- -----------------------------------------------------------

-- INSERT INTO memories (title, content, typewriter_color, paper_color) VALUES
-- ('boring office',
--  'From the moment our love intertwined, my life has been graced with its happiest blessing.',
--  'blue', 'beige'),
-- ('old memory of new time....',
--  'I don''t remember exactly when it started, only that it did, quietly, like most important things.',
--  'brown', 'yellow');
