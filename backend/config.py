import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Central place for environment-driven configuration."""

    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "")
    DB_NAME = os.getenv("DB_NAME", "omont_db")
    DB_PORT = int(os.getenv("DB_PORT", 3306))

    FLASK_PORT = int(os.getenv("FLASK_PORT", 5000))

    VALID_COLORS = {"blue", "black", "brown", "gray", "pink"}
    DEFAULT_COLOR = "blue"

    VALID_PAPER_COLORS = {
        "beige", "white", "orange", "pink", "blue", "green", "yellow", "purple",
    }
    DEFAULT_PAPER_COLOR = "beige"

    DEFAULT_TITLE = "untitled memory"
