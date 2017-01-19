function update_visual(handler){
	console.log("updating visuals for " + handler.name);
	$.getJSON($SCRIPT_ROOT + '/' + handler.name, {}, function(data){
		handler(data);
	});
}
function update_visuals(updates){
	for(var i = 0; i < updates.length; i++){
		update_visual(updates[i]);
	}
}
function hide(selector){
	$(selector).css("display", "none");
}
function show(selector){
	$(selector).css("display", "unset");
}
/*
UI Updaters
*/
function secrets(secret){
	console.log("updating secrets UI");
	$("#secrets #role").text("You are the " + secret.role);
	if(secret.spy != null){
		$("#secrets #spy-friend").text("The other spy is " + secret.spy);
	}
	if(secret.spy_1 != null){
		$("#secrets #spy-one").text("Spy 1 is " + secret.spy_1);
		$("#secrets #spy-two").text("Spy 2 is " + secret.spy_2);
	}}

function turn_order(order){
	console.log("updating turn order UI");
	for(var i = 0; i < order.turn_order.length; i++){
		//converts i's to letters.
		var order_element = "#order #usernames #" + String.fromCharCode(97 + i);
		var proposal_element = "#proposal #list #lables #" + String.fromCharCode(97 + i);
		$(order_element).text(order.turn_order[i]);
		$(proposal_element).text(order.turn_order[i]);
	}
}

function proposer(proposer){
	//update ui
	$("#order #spade svg").css("fill", "white");
	$("#order #spade #" + String.fromCharCode(97 + proposer.turn) + " svg").css("fill", "black")
	//show the proposer the proposing buttons
	if(proposer.username == USERNAME){
		show("#proposal");
	}
}

function proposal(game){
	text = "";
	for(var i = 0; i < game.proposal.length; i++){
		text = text + game.proposal[i] + " "
	}
	$("#proposal-result h4").text(text);
}

function votes(votes){
	console.log("updating votes ui");
	for(var i = 0; i < votes.votes.length; i++){
		var current_vote = votes.votes[i];
		console.log(current_vote);
		$("#vote-results #usernames #" + String.fromCharCode(97 + i) ).text(current_vote[0])
		var color = "black";
		var text = "pass";
		console.log("current_vote[1] : " + current_vote[1]);
		if(current_vote[1] == 0){
			console.log("0 detected");
			color = "red";
			text = "fail";
		}
		$("#vote-results #votes #" + String.fromCharCode(97 + i) ).text(text);
		$("#vote-results #votes #" + String.fromCharCode(97 + i) ).css("color",color);

	}
	//TODO add in thing that says who won
}

function mission_vote(mission){
	if(mission.winner)
	$("#mission-results p").text(votes.votes);

}

function mission_history(history){
	var i = 0;
	for (key in history){
		text = "pass";
		color = "black";
		if(history[key] == 0){
			text = "fail";
			color = "red";
		}
		$("#previous-rounds #" + String.fromCharCode(97 + i)).text(text)
		$("#previous-rounds #" + String.fromCharCode(97 + i)).css("color", color);
	}
	$("#previous-rounds #history").text(history);
}

function get_rid_of_pre_game_stuff(){
	$("#pregame").css("display", "none");
	$("#old-ui").css("display", "initial");
}

function update_countdown(seconds){
	$("#countdown").text(seconds);
}
/*
function View_Controller(routes=[]){
	this.routes = routes;
	this.update_route = function(route){
		for(var i = 0; i < routes.length; i++){
			if(routes[i].adress == route){
				route.execute();
			}		
		}

	}

}
function Route(adress, handlers=[]){
	this.adress = adress;
	this.handlers = handlers;
	this.execute = function(){
		for(var i = 0; i < handlers.length; i++){
			$.getJSON($SCRIPT_ROOT + '/' + this.adress, {}, function(data){
				handler(data);
			});
			handlers[i]();
		}
	}
}*/






