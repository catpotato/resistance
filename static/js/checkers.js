/*console.log("hiccup")
// TODOIF consolidate get with update functions


// voting means they are not proposing anymore
function GET_voting(){
	update(voting, "voting")
}
function voting(game){
	if(game.voting){
		update(proposal, "proposal");
		console.log("removing proposal checker");
		NORM_INTERVAL.remove([GET_voting]);
	}
}

// checks if 5 players have voted, if they have, call the function that displays the votes, and removes the checker
function GET_voted(){
	update(voted, "voted");
}
function voted(game){
	if(game.voters == 5){
		console.log("asking to update votes ui");
		update(votes, "votes");
		console.log("removing voted checker")
		NORM_INTERVAL.remove([GET_voted]);
		//remove checker from interval
		if(game.winner){
			console.log("winner determined");
			$.getJSON($SCRIPT_ROOT + '/mission_reset', {}, function(vote){ 
				
			});
		}
		else{
			console.log("no winner determined");
			new_turn();
		}
	}
}

function GET_mission_vote(){
	update(mission_vote, "mission_vote");
}
function mission_vote(vote){
	if(vote.done){
		//update ui with result
		mission(vote.winner)
	}
	new_turn();
	// TODO check for winner and reset the game if there is a winner
}
*/



/*function GET_voting(){
	update(voted, "voting");
}
// once the voting has begun, start checking to see if the voting is done
function voting(game){
	if(game.voting){
		update(proposal, "proposal");
		NORM_INTERVAL.remove([GET_votes]);
	}
}

function GET_votes(){
	update(votes, "votes");
}
function votes(){

}*/

/*function GET_missions_status(){

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

}*/

/*function POST_ready_status(){

}

function POST_vote(){

}*/