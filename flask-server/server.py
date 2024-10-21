from flask import Flask, jsonify
from flask_cors import CORS 
# make request from next.js to python api, allow other servers to make request

app = Flask(__name__)
CORS(app)
# allow the next.js make a request to our api
# then use the fetch api in page.tsx, call the endpoint localhost 8080
# response goes to json and state set to be message data variable
@app.route("/api/home", methods=['GET'])
def members(): 
    return jsonify({
        'message': "something",
        'people': ['jack', 'harry', 'barry']
    })

@app.route('/wibble2')
def wibble2():
    return 'This is my pointless new page'

if __name__ == "__main__": 
    app.run(debug=True, port=8080)

