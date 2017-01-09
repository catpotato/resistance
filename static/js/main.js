$(function(){
	// gets username and room 
	$.getJSON($SCRIPT_ROOT + '/user_info', {}, function(user){
		$("#username").text(user.username);
		$("#room").text(user.room);
	});
	// get ready status initizlizer is in game.html
	/*
		all of these are essentially POST requests that are enacted by the user
	*/
	// propsal button listeners
	var proposal = [];
	$("#proposal button").on("click", function(){
		// TODO limit user from inputing more than they are allowed to on a turn
		// TODO rethink UI for this
		var id = $(this).text();
		if(id != "confirm"){
			proposal.push(id);
		}
		else {
			$.post($SCRIPT_ROOT + "/propose", {"proposal[]" : proposal}, function(){});
			proposal = [];
		}
	});
	// ready checkbox listener
	$("#ready-button").bind("click", function(){
		// post ready status
		console.log("adding ready listener");
		NORM_INTERVAL.add([GET_ready_status]);
		console.log("sending ready state to server");
		$.getJSON($SCRIPT_ROOT + '/ready', {}, function(){} );
	});
	// voting button listener
	$("#vote-cards button").bind("click", function(){
		var vote = $(this).attr("id");
		if(vote == "yay"){
			vote = 1;
		}
		else{
			vote = 0;
		}
		console.log("sending vote");
		$.post($SCRIPT_ROOT + "/vote", {"vote" : vote}, function(){console.log("vote sent");});
		$.getJSON($SCRIPT_ROOT + '/vote_type', {}, function(vote){
			if(vote.proposal){
				// after you vote, add checker to see if other have voted
				console.log("adding voted checker");
				NORM_INTERVAL.add([GET_voted]);
			}
			else{
				// if we are voting on a mission
				NORM_INTERVAL.add([GET_mission_vote]);
			}
		});
	});
});