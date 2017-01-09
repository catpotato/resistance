console.log("pigs in a blanket");
function update(handler, adress){
	$.getJSON($SCRIPT_ROOT + '/' + adress, {}, function(data){
		handler(data);
	});
}
/*
	UI updater functions
*/
//updates roles view
function roles(secrets){
	$("#secrets #role").text(secrets.role);
	$("#secrets #spy-friend").text(secrets.spy);
	$("#secrets #spy-one").text(secrets.spy_1);
	$("#secrets #spy-two").text(secrets.spy_2);
}
//updates turn_order view
function turn_order(order){
	for(var i = 0; i < order.turn_order.length; i++){
		//converts i's to letters.
		var order_element = "#order  #" + String.fromCharCode(97 + i);
		var proposal_element = "#proposal  #" + String.fromCharCode(97 + i);
		$(order_element).text(order.turn_order[i]);
		$(proposal_element).text(order.turn_order[i]);
	}
}
//updates propsoer view
function proposer(proposer){
	$("#proposing p").text(proposer.username);
}

function proposal(game){
	$("#proposal-result p").text(game.proposal);
}

function votes(votes){
	console.log("updating votes ui");
	$("#vote-results #result").text(votes.votes);
	//once votes have been shown, erase them
}
//updates who won the mission
function winner(passed){
	var result;
	if(passed){
		result = "mission passed";
	}
	if(passed){
		result = "mission failed";
	}
	$("#mission-results p").text(result);
}
