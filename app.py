from flask import Flask, render_template, request
import db

app = Flask(__name__)

tasks = db.get_from_db()

@app.route("/")
def home():
    return render_template("page.html", tasks=tasks)

@app.route("/script.js")
def script():
    return render_template("script.js")

@app.route("/api", methods=["POST"])
def api():
    global tasks
    match request.method:
        case "POST": # CREATE - create a task
            tasks = request.json
            print(tasks)
    
    return "done"
app.run(debug=True, port=3000)

db.load_to_db(tasks)
db.close_db()

# TODO debug the disable enable
# TODO sqlite3 ~ almost done
# TODO ajouter les comptes