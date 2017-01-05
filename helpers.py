def find_empty_rooms(rooms):
	temp = rooms[:]
	for room in rooms:
		if(room.active):
			temp.remove(room)
	return temp

def find_ready_players(players):
	temp = players[:]
	for player in players:
		print(not player.ready)
		if(not player.ready):
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

#def turn_order_to_players(players, turn_order):
	#temp = []
	#for role in turn_order:



