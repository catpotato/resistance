from flask import Flask, jsonify, redirect, render_template, request, session
from flask_sqlalchemy import SQLAlchemy
from form import LoginForm
from helpers import find_empty_rooms
import random


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///gc.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["SQLALCHEMY_ECHO"] = True
db = SQLAlchemy(app)
app.secret_key = "ace-of-black"

# rooms class for finding an active room
class Players(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	player = db.Column(db.Text)
	room = db.Column(db.Text)
	ready = db.Column(db.Integer)
	role = db.Column(db.Integer)
	vote = db.Column(db.Integer)

	def __init__(self, player, room):
		self.player = player
		self.room = room
		self.ready = 0

class GC(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	game = db.Column(db.Text)
	active = db.Column(db.Integer)
	started = db.Column(db.Integer)
	mission_1 = db.Column(db.Integer)
	mission_2 = db.Column(db.Integer)
	mission_3 = db.Column(db.Integer)
	mission_4 = db.Column(db.Integer)
	mission_5 = db.Column(db.Integer)
	win = db.Column(db.Integer)
	round = db.Column(db.Integer)
	proposing = db.Column(db.Integer)

	def __str__(self):
		return ("room: " + self.game + " | status: " + str(self.active))

	def __repr__(self):
		return ("room: " + self.game + " | status: " + str(self.active))


# user facing GET requests
@app.route("/", methods = ["GET","POST"])
def index():
	# return form to user
	form = LoginForm(request.form)
	if request.method == "GET":
		return render_template("index.html", form = form)
	# deal with user's entered data
	if request.method == "POST" and form.validate():
		session["username"] = form.username.data
		# deal with making a new room
		if form.room.data == "":
			empty_rooms = find_empty_rooms(GC.query.all())
			new_room = empty_rooms[random.randint(0, len(empty_rooms))].game
			# adds room to user session
			session["room"] = new_room;
			# TODO add in making room active or not
		# deal with entering an existing room
		else:
			session["room"] = form.room.data
			# TODOIF: add in checking to make sure user enters a room that exists

		# add user to database
		new_player = Players(session["username"], session["room"])
		print(new_player.player + new_player.room)
		db.session.add(new_player)
		db.session.commit()
		return redirect("/game")

# TODO: when user leaves the page erase them from the databse

@app.route("/game")
def game():
	return render_template("game.html")

# json reply GET requests
@app.route("/user_info")
def user_info():
	return jsonify(username = session["username"], room = session["room"])

@app.route("/ready_status")
def ready_status():
	return jsonify(ready = True)

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

# POST requests
@app.route("/vote")
def vote():
	return "vote"

@app.route("/ready")
def ready():
	# TODO check if everyone is ready, and if they are, set begin to true
	
	return "ready"


if __name__ == "__main__":
	app.run(debug = True)