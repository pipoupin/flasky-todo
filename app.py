from flask import Flask, render_template, request
import db
import json

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/app")
def _app(): # function name app causes error
    return render_template("app.html")

@app.route("/index.js")
def script():
    return render_template("index.js")

@app.route("/api", methods=["POST", "GET", "PUT", "DELETE"])
def api():
    match request.method:
        case "POST":
            id = db.create_task(request.json)
            return json.dumps({"id": id})
        case "GET":
            tasks = db.get_tasks()
            return json.dumps(tasks)
        case "PUT":
            db.update_task(request.json)
            return json.dumps("done")
        case "DELETE":
            db.delete_task(request.json)
            return json.dumps("done")


app.run(debug=True)

# TODO add styling
# TODO add accounts