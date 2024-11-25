from flask import Flask, jsonify, request, Response
from flask_cors import CORS 
import openai
import os
from dotenv import load_dotenv
from openai import OpenAI
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import tiktoken

# from sqlalchemy.dialects.postgresql import UUID
# from sqlalchemy import cast

load_dotenv()
app = Flask(__name__)
CORS(app)
# make request from next.js to python api, allow other servers to make request
openai.api_key = os.getenv("OPENAI_API_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SUPABASE_URI")
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # tk
db = SQLAlchemy(app)

class ChatHistory(db.Model):
    __tablename__ = 'chat_history'
    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(UUID(as_uuid=True), nullable=True)
    user_id = db.Column(db.String(36), nullable=True)
    message = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

def store_chat_history(user_id, message, response):
    chat_entry = ChatHistory(user_id=user_id, message=message, response=response)
    db.session.add(chat_entry)
    db.session.commit()

def fetch_chat_history(user_id, max_tokens=1000):
    encoding = tiktoken.encoding_for_model("gpt-4o")
    messages = []
    total_tokens = 0

    history = ChatHistory.query.filter_by(user_id=user_id).order_by(ChatHistory.timestamp).all()

    for entry in history:
        user_message = {"role": "user", "content": entry.message}
        assistant_message  = {"role": "assistant", "content": entry.response}
        messages.append(user_message)
        messages.append(assistant_message)

        total_tokens += len(encoding.encode(entry.message))
        total_tokens += len(encoding.encode(entry.response))

    while total_tokens > max_tokens and len(messages) > 2:
        remove_user_message = messages.pop(0)
        remove_assistant_message = messages.pop(0)

        total_tokens -= len(encoding.encode(remove_user_message["content"]))
        total_tokens -= len(encoding.encode(remove_assistant_message["content"]))
    return messages

def generate_openai_response(messages):
    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages, 
        temperature=0.7 # indicates its level of creativity
        # stream=True
    )
    return response.choices[0].message.content

@app.route("/api/process_message", methods=["POST"])
def process_message():
    data = request.get_json()
    message = data.get("message")
    user_id = data.get("userId")
    # print({'message': message, 'userId': user_id})
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    history = fetch_chat_history(user_id)
    # read_prev_response(history)
    # openai needs to read the past history and confirm mem is updated
    messages = [{"role": "system", "content": "You are a helpful assistant."}]
    messages.extend(history)
    messages.append({"role": "user", "content": message})
    
    response = generate_openai_response(messages)
    store_chat_history(user_id, message, response)

    return jsonify({"response": response})

if __name__ == "__main__": 
    app.run(debug=True, port=8080)


# def read_prev_response(prev_message):
#     client = OpenAI()
#     response = client.chat.completions.create(
#         model="gpt-4o",
#         messages=[
#         {"role": "system", "content": "You are a helpful assistant."},
#         {"role": "user", "content": prev_message}
#     ]
#         # stream=True
#     )
# def attach_langchain():
#     return "langchain"

# @app.route("/api/process_message", methods=['POST'])
# def process_message():
#     data = request.get_json()
#     user_message = data.get('message')

#     bot_response = generate_openai_response(user_message)

#     # give open access to read chat history
#     # store it somewhere in the database given the userID
#     return jsonify({"response": bot_response})