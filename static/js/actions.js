function begin_game(){
	console.log("begining game");
	$("#begun p").text("started");
	update_visuals([secrets, turn_order]);
	new_turn();
}
//these are separated so that things can call new_turn without doing initial setup
function new_turn(){
	console.log("creating new turn");
	update_visual(proposer);
	console.log("resetting game");
	// because voting has to be reset to 0, maybe this can be moved, not sure
	$.getJSON($SCRIPT_ROOT + '/reset_votes', {}, function(data){proposal_monitor.activate();});	
}

// means proposal exists, means update UIS
function proposal_sent(){
	update_visual(proposal);
}

function proposal_voting_complete(){
	// determine if there was a winner or not
	update_visual(votes);
	if(proposal_voting_completed_monitor.raw_data["winner"]){
		console.log("proposal has passed");
		update_visual(votes);
		new_mission_vote();
	}
	else{
		console.log("proposal has not passed");
		new_turn();
	}
	//if no winner, start new turn, if winner, begin new vote
}

function new_mission_vote(){
	//console.log("new vote created");
}

function mission_voting_complete(){
	if(mission_voting_completed_monitor.raw_data["winner"]){
		console.log("mission has passed");			
	}
	else{
		console.log("mission has failed");
	}
	update_visual(mission_vote);
	update_visual(mission_history);
	new_turn();
}
