$(function(){
	// gets username and room 
	$.getJSON($SCRIPT_ROOT + '/user_info', {}, function(user){
		$("#username").text(user.username);
		$("#room").text(user.room);
	});

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
		console.log("hi");
		$.getJSON($SCRIPT_ROOT + '/ready', {}, function(){} );
	});

	$("#vote-cards button").bind("click", function(){
		// post ready status
		var vote = $(this).attr("id");
		
		if(vote == "yay"){
			vote = true;
		}
		else{
			vote = false;
		}
		console.log(vote);
		//$.post($SCRIPT_ROOT + "/propose", {"proposal[]" : proposal}, function(){});
	});
});