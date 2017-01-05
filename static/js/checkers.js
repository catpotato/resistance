function GET_ready_status(){
	$.getJSON($SCRIPT_ROOT + '/ready_status', {}, function(game){
		console.log("game ready? " + game.ready);
		if(game.ready){
			begin_game()
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