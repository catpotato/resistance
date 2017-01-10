
function Vote(text){
	this.text = text;
	if(text == "yay"){
		this.boolean = 1;
	}
	else{
		this.boolean = 0;
	}
}
$(function(){
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
		ready_monitor.activate();
		console.log("sending ready state to server");
		$.getJSON($SCRIPT_ROOT + '/ready', {}, function(){} );
	});
	// voting button listener
	$("#vote-cards button").bind("click", function(){
		var vote = new Vote($(this).attr("id"));
		console.log("sending vote");
		// TODO first make sure vote is coming from somebody good
		$.post($SCRIPT_ROOT + "/vote", {"vote" : vote.boolean}, function(){console.log("vote sent");});
		$.getJSON($SCRIPT_ROOT + '/vote_type', {}, function(vote){
			if(vote.proposal){
				// after you vote, add checker to see if other have voted
				proposal_voting_completed_monitor.activate();
				mission_voting_completed_monitor.activate();
			}
		});
	});
});
