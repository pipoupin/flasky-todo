from flask import Flask, render_template, request
from db import get_from_db, load_to_db
import json

app = Flask(__name__)

tasks = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/index.js")
def script():
    return render_template("index.js")

@app.route("/api", methods=["POST", "GET"])
def api():
    global tasks
    match request.method:
        case "POST":
            tasks = []
            load_to_db(tasks)
            return "done"
        case "GET":
            tasks = get_from_db()
            return json.dumps(tasks)

app.run(debug=True)

# TODO add more styling
# TODO add "modification" with readOnly
# TODO add accounts
