from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from database.connection import init_db
from routes.memory_routes import memory_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(memory_bp)

    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok", "service": "omont-backend"}), 200

    @app.errorhandler(404)
    def not_found(_e):
        return jsonify({"error": "Not found."}), 404

    @app.errorhandler(500)
    def server_error(_e):
        return jsonify({"error": "Something went wrong."}), 500

    return app


app = create_app()

if __name__ == "__main__":
    try:
        init_db()
    except Exception as exc:
        print(f"[omont] Warning: could not initialize database automatically: {exc}")
        print("[omont] Make sure MySQL is running and `omont_db` exists (see schema.sql).")

    app.run(host="0.0.0.0", port=Config.FLASK_PORT, debug=True)
