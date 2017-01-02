from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/game")
def game():
	return render_template("game.html")

@app.route("/ready_status")
def ready_status():
	return "ready status"

@app.route("/mission_history")
def mission_history():
	return "mission history"

@app.route("/mission_status")
def mission_status():
	return "mission status"

@app.route("/proposer")
def proposer():
	return "proposer"

@app.route("/voting_results")
def voting_results():
	return "voting results"

@app.route("/role")
def role():
	return "role"

@app.route("/secrets")
def secrets():
	return "secrets"

@app.route("/win_status")
def win_status():
	return "win status"

@app.route("/vote")
def vote():
	return "vote"


if __name__ == "__main__":
	app.run(debug = True)