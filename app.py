from flask import Flask, render_template, request
import db
import json

app = Flask(__name__)

tasks = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/index.js")
def script():
    return render_template("index.js")

@app.route("/api", methods=["POST", "GET", "PUT", "DELETE"])
def api():
    global tasks
    match request.method:
        case "POST":
            data = request.json
            print(data)
            updates = [ task for task in data if task[0] ]
            creates = [task for task in data if task[0] == False]

            
            response = db.create_tasks(creates)
            db.update_tasks(updates)
            return response
        case "GET":
            tasks = db.get_tasks()
            return json.dumps(tasks)
        case "PUT":
            db.update_tasks(request.json) # request.json["tasks"] when we'll have accounts done
            return "done"
        case "DELETE":
            db.delete_tasks(request.json) # request.json["tasks"]
            return "done"


app.run(debug=True)

# TODO fix the issues caused by the recent implementation of CRUD
# TODO add styling
# TODO add accounts
