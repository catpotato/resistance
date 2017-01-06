function begin_game(){
	// update ui to say that game has started
	$("#begun p").text("started");
	// remove status checker from interval
	NORM_INTERVAL.remove([GET_ready_status]);
	update(roles, "secrets");
	// give out turn order
	update(turn_order, "turn_order");
	// check who is proposing
	update(proposer, "proposer");
	// once proposal is made, add a checker to everyone elses pages so that they can get the info when a proposal is made
	NORM_INTERVAL.add([GET_voting]);
}

function update(handler, adress){
	$.getJSON($SCRIPT_ROOT + '/' + adress, {}, function(data){
		handler(data);
	});
}
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
		//converts i's to letters
		var order_element = "#order  #" + String.fromCharCode(97 + i);
		var proposal_element = "#proposal  #" + String.fromCharCode(97 + i);
		$(order_element).text(order.turn_order[i]);
		$(proposal_element).text(order.turn_order[i]);
	}
}
//updates propsoer view
function proposer(proposer){
	$("#proposing p").text(proposer.username)
}

function proposal(game){
	console.log(game.proposal);
	$("#proposal-result p").text(game.proposal)
}
function new_turn(){

}
