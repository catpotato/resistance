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
/*
UI Updaters
*/
function secrets(secret){
	console.log("updating secrets UI");
	$("#secrets #role").text(secret.role);
	$("#secrets #spy-friend").text(secret.spy);
	$("#secrets #spy-one").text(secret.spy_1);
	$("#secrets #spy-two").text(secret.spy_2);
}

function turn_order(order){
	console.log("updating turn order UI");
	for(var i = 0; i < order.turn_order.length; i++){
		//converts i's to letters.
		var order_element = "#order  #" + String.fromCharCode(97 + i);
		var proposal_element = "#proposal  #" + String.fromCharCode(97 + i);
		$(order_element).text(order.turn_order[i]);
		$(proposal_element).text(order.turn_order[i]);
	}
}

function proposer(proposer){
	$("#proposing p").text(proposer.username);
}

function proposal(game){
	$("#proposal-result p").text(game.proposal);
}

function votes(votes){
	console.log("updating votes ui");
	$("#vote-results #result").text(votes.votes);
	//TODO add in thing that says who won
}

function mission_vote(mission){
	if(mission.winner)
	$("#mission-results p").text(votes.votes);

}

function mission_history(history){
	$("#previous-rounds #history").text(history);
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






