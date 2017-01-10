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
			# TODO reset room
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

@app.route("/game")
def game():
	return render_template("game.html")

# TODO: when user leaves the page erase them from the databse

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

# returns whether a mission is being voted on or not
@app.route("/voting")
def voting():
	game = find_game(session["room"])
	print("I RETURNED VOTING AND IT'S VALUE WAS : ")
	print(game.voting)
	return jsonify(voting = bool(game.voting))

@app.route("/proposer")
def proposer():
	# retrun the person proposing the current mission
	game = find_game(session["room"])
	turn = ((game.cycle+1) % 5) - 1
	role = sqlite_string_to_list(game.turn_order)[turn]
	proposer = Player.query.filter_by(role = role).first()
	return jsonify(username = proposer.username)

# gives out role and other role information
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

# tells if anyone has won the game yet
@app.route("/win_status")
def win_status():
	return "win status"

# gives out the turn of play for the current game
@app.route("/turn_order")
def turn_order():
	game = find_game(session["room"])
	# decode proposal data encoded in a string as list of roles
	turn_order = []
	for role in sqlite_string_to_list(game.turn_order):
		turn_order.append(find_username_from_role(session["room"], role))
	return jsonify(turn_order = turn_order)

# gives out people who are in the current proposal
@app.route("/proposal")
def proposal():
	game = find_game(session["room"])
	# decode proposal data encoded in a string as list of roles
	proposal = []
	for role in sqlite_string_to_list(game.in_proposal):
		proposal.append(find_username_from_role(session["room"], role))
	return jsonify(proposal = proposal)

# gives out array of arrays with [username, vote] for people who have voted
@app.route("/votes")
def votes():
	players = Player.query.filter_by(room = session["room"]).all();
	votes = []
	for player in players:
		votes.append([player.username, player.vote])
	return jsonify(votes = votes)

# gives out number of people who have voted
@app.route("/voted")
def voted():
	players = Player.query.filter_by(room = session["room"]).all();
	voters = len(find_voted_players(players))
	# increase cycle by 1 if everyone has voted
	if voters == 5:
		game = find_game(session["room"])
		#game.cycle += 1
		# if there is a winner, and there are 5 votes, the game is no longer proposing, now on to the mission
		if determine_winner(players):
			game.proposing = 0
			db.session.commit()
	return jsonify(winner = determine_winner(players), voters = voters)

@app.route("/vote_type")
def vote_type():
	game = find_game(session["room"])
	return jsonify(proposal = bool(game.proposing), mission = bool(1 - game.proposing))

# resting votes is in the mission proposal because we only want it to happen once
@app.route("/reset_votes")
def reset_votes():
	game = find_game(session["room"])
	game.voting = 0;
	print("SET VOTING TO 0")
	game.proposing = 1;
	db.session.commit()
	return jsonify("blah")

@app.route("/mission_reset")
def mission_reset():
	game = find_game(session["room"])
	game.proposing = 0
	db.session.commit()

# TODO combine mission voted with voted

@app.route("/mission_vote")
def mission_vote():
	players = Player.query.filter_by(room = session["room"]).all();
	voters = len(find_mission_voted_players(players))
	game = find_game(session["room"])
	# TODO demessify this
	# TODO in javascript make sure that all votes that get here are genuine
	status = False
	if (game.round == 1) or (game.round == 3):
		if voters == 2:
			status = True
	else:
		if voters == 3:
			status = True
	votes = []
	for player in find_mission_voted_players(players):
		votes.append(player.mission_vote)
	# shuffle votes
	random.shuffle(votes)
	winner = determine_mission_winner(find_mission_voted_players(players))
	if game.round == 1:
		game.mission_1 = winner
	elif game.round == 2:
		game.mission_2 = winner
	elif game.round == 3:
		game.mission_3 = winner
	elif game.round == 4:
		game.mission_4 = winner
	elif game.round == 5:
		game.mission_5 = winner
	db.session.commit()
	# increase round 
	return jsonify(done = status, winner = winner, votes = votes)

	


# TODO route that gives cards design out

# POST requests from javascript that send info, also will maybe work if i add an ai in the future

# TODOIF make it impossible for user to access the post requests
@app.route("/vote", methods = ["GET","POST"])
def vote():
	vote = request.form.get("vote")
	game = find_game(session["room"])
	player = find_player(session["username"])
	if game.proposing:
		player.vote = vote
	else:
		player.mission_vote = vote
		if game.round_iterator == 0:
			game.round_iterator = 1
			game.round += 1
	db.session.commit()
	return redirect("/")

# voting is set to 1 when proposal has been made, also increasing round is done here, votes set to null so it only happens once and not while people are voting
@app.route("/propose", methods = ["GET","POST"])
def propose():
	proposal = request.form.getlist("proposal[]")
	for i in range(0, len(proposal)):
		proposal[i] = int(Player.query.filter_by(username = proposal[i]).first().role)
	# TODO verify that the request was good
	# TODO verify request came from player it was supposed to
	# insert proposal 
	game = find_game(session["room"])
	game.in_proposal = list_to_sqlite_string(proposal)
	game.voting = 1
	game.round_iterator = 0;
	game.cycle += 1
	# this is here because of a race condition problem
	players = Player.query.filter_by(room = session["room"]).all();
	#game = find_game(session["room"])
	for player in players:
		player.vote = None;
		player.mission_vote = None;
	db.session.commit()
	return redirect("/")

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









