from flask_sqlalchemy import SQLAlchemy
from form import LoginForm
from routes import *

db = SQLAlchemy(app)

# player class to store all players in all games (since there is a max 31 games, there is a max 155 players, so it's not that inefficient)
class Player(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	username = db.Column(db.Text)
	room = db.Column(db.Text)
	ready = db.Column(db.Integer)
	role = db.Column(db.Integer)
	vote = db.Column(db.Integer)
	turn = db.Column(db.Integer)
	mission_vote = db.Column(db.Integer)
	mission_received = db.Column(db.Integer)

	def __init__(self, username, room):
		self.username = username
		self.room = room
		self.ready = 0

	def __str__(self):
		return ("username: " + self.username + " | ready: " + str(self.ready))

	def __repr__(self):
		return ("username: " + self.username + " | ready: " + str(self.ready))

class Game(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	room = db.Column(db.Text)
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
	playercount = db.Column(db.Integer)
	turn_order = db.Column(db.String)
	in_proposal = db.Column(db.String)
	cycle = db.Column(db.Integer)
	voting = db.Column(db.Integer)
	round_iterator = db.Column(db.Integer)

	def __str__(self):
		return ("room: " + self.room + " | status: " + str(self.active))

	def __repr__(self):
		return ("room: " + self.room + " | status: " + str(self.active))

def initialize(room):
	game = Game.query.filter_by(room = room).first()
	game.started = 1;
	# assign roles to people
	roles = ["ace of black", "2 of black", "3 of black", "ace of red", "2 of red"]
	for player in ready_players:
		randy = random.randint(0, (len(roles) - 1))
		player.role = card_to_number(roles[randy])
		roles.remove(roles[randy])
	db.session.commit()

def find_game(room):
	return Game.query.filter_by(room = room).first()

def find_player(username):
	return Player.query.filter_by(username = username).first()

def find_username_from_role(room, role):
	return Player.query.filter_by(role = role, room = room).first().username

def find_username_from_id(role):
	return Player.query.filter_by(role = role).first().username

# def get_game_data(game, data):
#	game = find_game(game)
#	return game.data










