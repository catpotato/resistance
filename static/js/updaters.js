function GET_ready_status(){
	$.getJSON($SCRIPT_ROOT + '/ready_status', {}, function(game){
		console.log("game ready? " + game.ready);
		if(game.ready){
			//update ui to say that game is ready

			//remove ready checking from normal checking loop
			NORM_INTERVAL.remove([GET_ready_status]);
		}
	})
}

function GET_missions_history(){

}

function GET_missions_status(){

}

function GET_proposer(){

}

function GET_voting_results(){

}

function GET_role(){

}

function GET_secrets(){

}

function GET_win_status(){

}

/*function POST_ready_status(){

}

function POST_vote(){

}*/