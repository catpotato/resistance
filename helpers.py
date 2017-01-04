def find_empty_rooms(rooms):
	for room in rooms:
		if(room.active):
			rooms.remove(room)
	return rooms