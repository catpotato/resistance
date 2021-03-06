console.log("yojimbo");
function begin_game(){
	console.log("begining game");
	hide("#pregame");
	// wait 5 seconds
	console.log("starting timer");
	var ctdwn = new Countdown(2, update_countdown, function(){show("#old-ui"); hide("#secrets")});
	show("#secrets");
	update_visuals([secrets, turn_order]);
	new_turn();
}
//these are separated so that things can call new_turn without doing initial setup
function new_turn(){
	hide("#proposal-result");
	console.log("creating new turn");
	update_visual(proposer);
	console.log("resetting game");
	send_message("waiting for proposal");
	// because voting has to be reset to 0, maybe this can be moved, not sure
	$.getJSON($SCRIPT_ROOT + '/reset', {}, function(data){proposal_monitor.activate();});	
}

// means proposal exists, means update UIS
function proposal_sent(){
	hide_console();
	hide("#vote-results");
	show("#vote-cards");
	update_visual(proposal);
	show("#proposal-result");
}

function proposal_voting_complete(){
	// determine if there was a winner or not
	hide("#proposal-result");
	update_visual(votes);
	show("#vote-results");
	if(proposal_voting_completed_monitor.raw_data["winner"]){
		console.log("proposal has passed");
		//show votes for people on the mission
		$("#vote-results h2").text("proposal passed");
		$.getJSON($SCRIPT_ROOT + '/proposal', {}, function(data){
			for(var i = 0; i < data.proposal.length; i++){
				if(data.proposal[i] == USERNAME){
					show("#vote-cards");
					hide_console();
				}
				else{
					send_message("waiting for mission");
				}
			}
			new_mission_vote();
		});
		
	}
	else{
		$("#vote-results h2").text("proposal failed");
		new_turn();
	}
	//if no winner, start new turn, if winner, begin new vote
}

function new_mission_vote(){
	mission_voting_completed_monitor.activate();
}

function mission_voting_complete(){
	console.log("mission voting complete");
	update_visual(mission_history);
	new_turn();
}
