from flask import Flask, jsonify, request, Response
from flask_cors import CORS 
import openai
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# make request from next.js to python api, allow other servers to make request
app = Flask(__name__)
CORS(app)

def generate_openai_response(user_message):
    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": user_message
        }
    ]
        # stream=True
    )
    return response.choices[0].message.content

@app.route("/api/process_message", methods=['POST'])
def process_message():
    data = request.get_json()
    user_message = data.get('message')

    bot_response = generate_openai_response(user_message)

    # give open access to read chat history
    # store it somewhere in the database given the userID
    return jsonify({"response": bot_response})

if __name__ == "__main__": 
    app.run(debug=True, port=8080)


# allow the next.js make a request to our api
# then use the fetch api in page.tsx, call the endpoint localhost 8080
# response goes to json and state set to be message data variable
# @app.route("/api/home", methods=['GET'])
# def members(): 
#     return jsonify({
#         'message': "something",
#         'people': ['jack', 'harry', 'barry']
#     })

# @app.route('/wibble2')
# def wibble2():
#     return 'This is my pointless new page'
