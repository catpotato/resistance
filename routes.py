from flask import Flask, jsonify, redirect, render_template, request, session
from flask_sqlalchemy import SQLAlchemy
from game import *
from helpers import *
import random

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///gc.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["SQLALCHEMY_ECHO"] = False
app.secret_key = "ace-of-black"

# user facing GET requests
@app.route("/", methods = ["GET","POST"])
def index():
	# return form to user
	form = LoginForm(request.form)
	if request.method == "GET":
		return render_template("index.html", form = form)
	# deal with user's entered data
	if request.method == "POST" and form.validate():
		# TODOIF check to see if username already exists
		session["username"] = form.username.data
		# deal with making a new room
		if form.room.data == "":
			empty_rooms = find_empty_rooms(Game.query.all())
			new_room = empty_rooms[random.randint(0, len(empty_rooms) - 1)].room
			session["room"] = new_room;
			# TODO add in making room active or not
		# deal with entering an existing room
		else:
			session["room"] = form.room.data
			# TODOIF: add in checking to make sure user enters a room that exists

		# TODO: make sure that room does not have more than five people in it
		# if user doesnt exist, put them in the database, if they do, they dont need to be put in the database (basically a dev login for me to bugtest)
		if find_player(session["username"]) is None:
			new_player = Player(session["username"], session["room"])
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
	game = find_game(session["room"])
	return jsonify(ready = bool(game.started))

@app.route("/mission_history")
def mission_history():
	# TODO retrun the status of the five missions (null being they have not happened yet, 1 being they passed, 0 being they failed) 
	game = find_game(session["room"])
	return jsonify(mission_1 = game.mission_1,  mission_2 = game.mission_2, mission_3 = game.mission_3, mission_4 = game.mission_4, mission_5 = game.mission_5,)
	#return "mission history"

@app.route("/mission_status")
def mission_status():
	#
	return "mission status"

@app.route("/proposer")
def proposer():
	# retrun the person proposing the current mission
	game = find_game(session["room"])
	turn = ((game.cycle+1) % 5) - 1
	role = sqlite_string_to_list(game.turn_order)[turn]
	proposer = Player.query.filter_by(role = role).first()
	return jsonify(username = proposer.username)

@app.route("/voting_results")
def voting_results():
	# retrun whether current vote passed or failed
	return "voting results"

@app.route("/secrets")
def secrets():
	# get users role
	# TODOIF make sure that game is started
	player = find_player(session["username"])
	# mix up the spies so i dont know which is which
	spies = [Player.query.filter_by(role = card_to_number("ace of red")).first(), Player.query.filter_by(role = card_to_number("2 of red")).first()]
	randy = random.randint(0,1)
	#return jsonify(None)
	if number_to_card(player.role) == "ace of black":
		# if role is ace of black give them the spies
		return jsonify(role = number_to_card(player.role), spy_1 = spies[randy].username, spy_2 = spies[1-randy].username)	
	elif number_to_card(player.role) == "ace of red" or number_to_card(player.role) == "2 of red":
		# if role is ace of red or 3 of red show them the other spy
		return(jsonify(role = number_to_card(player.role), spy = find_other_spy(spies, player).username))
	else:
		# otherwise show them nothing
		return jsonify(role = number_to_card(player.role))

@app.route("/win_status")
def win_status():
	return "win status"

@app.route("/turn_order")
def turn_order():
	game = find_game(session["room"])
	turn_order = []
	for role in sqlite_string_to_list(game.turn_order):
		turn_order.append(Player.query.filter_by(role = role).first().username)
	return jsonify(turn_order = turn_order)

# TODO route that gives cards design out

# POST requests
@app.route("/vote")
def vote():
	return "vote"

@app.route("/ready")
def ready():
	# TODOIF actually get the input from the checkbox instead of assuming it is true
	# set player ready status to true
	# TODO count up the number of players and add it to games table
	player = find_player(session["username"]);
	player.ready = 1
	db.session.commit()
	# check if everyone is ready, and if they are, initialize the game
	ready_players = find_ready_players(Player.query.filter_by(room = session["room"]).all())
	if len(ready_players) == 5:
		game = find_game(session["room"])
		game.started = 1;
		# assign roles to people
		# TODOIF reimplement using random.shuffle()
		roles = ["ace of black", "2 of black", "3 of black", "ace of red", "2 of red"]
		for player in ready_players:
			randy = random.randint(0, (len(roles) - 1))
			player.role = card_to_number(roles[randy])
			roles.remove(roles[randy])
		# determine turn order
		turn_order = [0,1,2,3,4]
		random.shuffle(turn_order)
		game.turn_order = list_to_sqlite_string(turn_order)
		db.session.commit()
	return redirect("/")


if __name__ == "__main__":
	app.run(debug = True)