from flask import Flask, render_template, request

app = Flask(__name__)

tasks = {}

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
app.run(debug=True)
