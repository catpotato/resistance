def find_empty_rooms(rooms):
	temp = rooms[:]
	for room in rooms:
		if(room.active):
			temp.remove(room)
	return temp

def find_ready_players(players):
	temp = players[:]
	for player in players:
		if(not player.ready):
			temp.remove(player)
	return temp

def find_voted_players(players):
	temp = players[:]
	for player in players:
		print(player.vote)
		if(player.vote == None):
			temp.remove(player)
	return temp

def find_mission_voted_players(players):
	temp = players[:]
	for player in players:
		if(player.mission_vote == None):
			temp.remove(player)
	return temp

def card_to_number(card):
	cards = ["ace of black", "2 of black", "3 of black", "ace of red", "2 of red"]
	return cards.index(card)

def number_to_card(number):
	cards = ["ace of black", "2 of black", "3 of black", "ace of red", "2 of red"]
	return cards[int(number)]

def find_other_spy(spies, player):
	if player.username == spies[0].username:
		return spies[1]
	else:
		return spies[0]

def sqlite_string_to_list(sql_string):
	temp = []
	for letter in sql_string:
		temp.append(int(letter))
	return temp

def list_to_sqlite_string(py_list):
	temp = ""
	for datum in py_list:
		temp = temp + str(datum)
	return temp

# takes in an array of votes that are 1's and zeros and returns the numebr there were more of
# currently only works with a list of 5, could easily be modifed

def determine_winner(players):
	tally = 0;
	for player in players:
		if player.vote != None:
			tally += player.vote
	if tally >= 3:
		return 1
	else:
		return 0

def determine_mission_winner(players):
	for player in players:
		if player.mission_vote == 0:
			return 0
	return 1


#def turn_order_to_players(players, turn_order):
	#temp = []
	#for role in turn_order:



