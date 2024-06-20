from flask import Flask, render_template, request
from db import get_from_db, load_to_db

app = Flask(__name__)

tasks = get_from_db()

@app.route("/")
def home():
    return render_template("page.html", tasks=tasks)

@app.route("/script.js")
def script():
    return render_template("script.js")

@app.route("/style.css")
def style():
    print("sending css")
    return render_template("style.css")

@app.route("/api", methods=["POST"])
def api():
    global tasks
    if request.method == "POST":
        tasks = request.json
        load_to_db(tasks)
    return "done"

app.run(debug=True)

# TODO style the page
# TODO add accounts