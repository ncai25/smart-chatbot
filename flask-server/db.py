from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

load_dotenv()
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SUPABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # tk

db = SQLAlchemy(app)

class Room(db.Model):
    __tablename__ = 'rooms'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

class Temperature(db.Model):
    __tablename__ = 'temperatures'
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id', ondelete="CASCADE"), nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()


@app.route("/api/room", methods=["POST"])
def create_room():
    data = request.get_json()
    name = data.get('name')
    
    # Check if room exists
    room = Room.query.filter_by(name=name).first()
    if room:
        return jsonify({"message": f"Room {name} already exists."}), 400

    # Create new room
    new_room = Room(name=name)
    db.session.add(new_room)
    db.session.commit()
    return {"id": new_room.id, "message": f"Room {name} created."}, 201

@app.route("/api/temperature", methods=["POST"])
def add_temperature():
    data = request.get_json()
    room_id = data.get("room_id")
    temperature = data.get("temperature")
    date = data.get("date", datetime.utcnow())  # default to now if not provided

    # Validate room exists
    room = Room.query.get(room_id)
    if not room:
        return jsonify({"message": "Room not found"}), 404

    new_temp = Temperature(room_id=room_id, temperature=temperature, date=date)
    db.session.add(new_temp)
    db.session.commit()
    
    return {"message": "Temperature recorded successfully."}, 201