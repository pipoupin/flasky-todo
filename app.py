from flask import Flask, render_template, request
from db import get_from_db, load_to_db

app = Flask(__name__)

tasks = get_from_db()

@app.route("/")
def home():
    return render_template("index.html", tasks=tasks)

@app.route("/index.js")
def script():
    return render_template("index.js")

@app.route("/api", methods=["POST"])
def api():
    global tasks
    if request.method == "POST":
        tasks = request.json
        load_to_db(tasks)
    return "done"

app.run(debug=True)

# TODO add more styling
# TODO add "modification" with readOnly
# TODO add accounts
