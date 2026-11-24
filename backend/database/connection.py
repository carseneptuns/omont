import pymysql
import pymysql.cursors
from config import Config


def get_connection():
    """
    Opens a fresh PyMySQL connection using DictCursor so rows come back
    as dictionaries (much easier to jsonify than tuples).
    """
    return pymysql.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME,
        port=Config.DB_PORT,
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=False,
    )


def init_db():
    """
    Creates the `memories` table if it doesn't exist yet.
    Called once when the Flask app starts, so the API works
    out of the box after `mysql -u root -p < schema.sql` has
    created the database itself.
    """
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS memories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL DEFAULT 'untitled memory',
                    content LONGTEXT,
                    typewriter_color VARCHAR(50) NOT NULL DEFAULT 'blue',
                    paper_color VARCHAR(50) NOT NULL DEFAULT 'beige',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        ON UPDATE CURRENT_TIMESTAMP
                )
                """
            )
            # backfill for databases created before paper_color existed
            try:
                cursor.execute(
                    "ALTER TABLE memories ADD COLUMN paper_color VARCHAR(50) NOT NULL DEFAULT 'beige'"
                )
            except Exception:
                pass  # column already exists
        connection.commit()
    finally:
        connection.close()
