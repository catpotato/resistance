
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
	$("#proposal button").on("click", function(){
		// TODO limit user from inputing more than they are allowed to on a turn
		var proposal = new URLArgument(get_names(find_checked("#checkboxes td input"), "#proposal #lables"), "array");
		post_data_to("/propose", proposal.as("proposal"));
		hide("#proposal");
		// TODO uncheck all the boxes
	});
	// ready checkbox listener
	$("#ready-button").bind("click", function(){
		hide("#ready-button");
		$("#pregame #ready").text("waiting for others...");
		ready_monitor.activate();
		send_ready_status();
	});
	// voting button listener
	$("#vote-cards img").bind("click", function(){
		hide("#vote-cards");
		send_message("waiting for others");
		var vote_value = new Vote($(this).attr("id"));
		var vote = new URLArgument(vote_value.boolean);
		console.log("sending vote");
		post_data_to("/vote", vote.as("vote"));
		/*$.post($SCRIPT_ROOT + "/vote", {"vote" : vote.boolean}, function(){console.log("vote sent");});*/
		$.getJSON($SCRIPT_ROOT + '/vote_type', {}, function(vote){
			if(vote.proposal){
				console.log("vote proposal determined")
				// after you vote, add checker to see if other have voted
				//these are both here because you hvae to check to see if others finished voting for proposal and then possibly mission
				proposal_voting_completed_monitor.activate();
				/*mission_voting_completed_monitor.activate();*/
			}
		});
	});
});
