from flask import Blueprint, request, jsonify
from models.memory_model import MemoryModel

memory_bp = Blueprint("memories", __name__, url_prefix="/api/memories")


@memory_bp.route("", methods=["GET"])
def get_memories():
    try:
        search = request.args.get("search", "").strip()
        memories = MemoryModel.get_all(search=search or None)
        return jsonify(memories), 200
    except Exception as exc:
        return jsonify({"error": "Couldn't load your memories.", "detail": str(exc)}), 500


@memory_bp.route("/<int:memory_id>", methods=["GET"])
def get_memory(memory_id):
    try:
        memory = MemoryModel.get_by_id(memory_id)
        if not memory:
            return jsonify({"error": "Memory not found."}), 404
        return jsonify(memory), 200
    except Exception as exc:
        return jsonify({"error": "Couldn't open that memory.", "detail": str(exc)}), 500


@memory_bp.route("", methods=["POST"])
def create_memory():
    try:
        data = request.get_json(force=True, silent=True) or {}
        memory = MemoryModel.create(
            title=data.get("title", ""),
            content=data.get("content", ""),
            color=data.get("color", "blue"),
            paper_color=data.get("paperColor", data.get("paper_color")),
        )
        return jsonify(memory), 201
    except Exception as exc:
        return jsonify({"error": "Couldn't save your memory.", "detail": str(exc)}), 500


@memory_bp.route("/<int:memory_id>", methods=["PUT"])
def update_memory(memory_id):
    try:
        data = request.get_json(force=True, silent=True) or {}
        memory = MemoryModel.update(
            memory_id,
            title=data.get("title"),
            content=data.get("content"),
            color=data.get("color"),
            paper_color=data.get("paperColor", data.get("paper_color")),
        )
        if not memory:
            return jsonify({"error": "Memory not found."}), 404
        return jsonify(memory), 200
    except Exception as exc:
        return jsonify({"error": "Couldn't save your changes.", "detail": str(exc)}), 500


@memory_bp.route("/<int:memory_id>", methods=["DELETE"])
def delete_memory(memory_id):
    try:
        deleted = MemoryModel.delete(memory_id)
        if not deleted:
            return jsonify({"error": "Memory not found."}), 404
        return jsonify({"message": "Memory deleted."}), 200
    except Exception as exc:
        return jsonify({"error": "Couldn't delete that memory.", "detail": str(exc)}), 500
