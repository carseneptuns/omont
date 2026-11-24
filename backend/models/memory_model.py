from database.connection import get_connection
from config import Config


class MemoryModel:
    """All raw SQL for the `memories` table lives here."""

    @staticmethod
    def get_all(search=None):
        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                if search:
                    like = f"%{search}%"
                    cursor.execute(
                        """
                        SELECT * FROM memories
                        WHERE title LIKE %s OR content LIKE %s
                        ORDER BY updated_at DESC
                        """,
                        (like, like),
                    )
                else:
                    cursor.execute(
                        "SELECT * FROM memories ORDER BY updated_at DESC"
                    )
                return cursor.fetchall()
        finally:
            connection.close()

    @staticmethod
    def get_by_id(memory_id):
        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM memories WHERE id = %s", (memory_id,)
                )
                return cursor.fetchone()
        finally:
            connection.close()

    @staticmethod
    def create(title, content, color, paper_color=None):
        title = title.strip() if title and title.strip() else Config.DEFAULT_TITLE
        color = color if color in Config.VALID_COLORS else Config.DEFAULT_COLOR
        paper_color = (
            paper_color
            if paper_color in Config.VALID_PAPER_COLORS
            else Config.DEFAULT_PAPER_COLOR
        )
        content = content or ""

        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO memories (title, content, typewriter_color, paper_color)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (title, content, color, paper_color),
                )
                connection.commit()
                new_id = cursor.lastrowid
                cursor.execute(
                    "SELECT * FROM memories WHERE id = %s", (new_id,)
                )
                return cursor.fetchone()
        finally:
            connection.close()

    @staticmethod
    def update(memory_id, title=None, content=None, color=None, paper_color=None):
        existing = MemoryModel.get_by_id(memory_id)
        if not existing:
            return None

        new_title = existing["title"]
        if title is not None:
            new_title = title.strip() if title.strip() else Config.DEFAULT_TITLE

        new_content = existing["content"] if content is None else content

        new_color = existing["typewriter_color"]
        if color is not None and color in Config.VALID_COLORS:
            new_color = color

        new_paper_color = existing.get("paper_color", Config.DEFAULT_PAPER_COLOR)
        if paper_color is not None and paper_color in Config.VALID_PAPER_COLORS:
            new_paper_color = paper_color

        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE memories
                    SET title = %s, content = %s, typewriter_color = %s, paper_color = %s
                    WHERE id = %s
                    """,
                    (new_title, new_content, new_color, new_paper_color, memory_id),
                )
                connection.commit()
                cursor.execute(
                    "SELECT * FROM memories WHERE id = %s", (memory_id,)
                )
                return cursor.fetchone()
        finally:
            connection.close()

    @staticmethod
    def delete(memory_id):
        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT id FROM memories WHERE id = %s", (memory_id,)
                )
                if not cursor.fetchone():
                    return False
                cursor.execute(
                    "DELETE FROM memories WHERE id = %s", (memory_id,)
                )
                connection.commit()
                return True
        finally:
            connection.close()
