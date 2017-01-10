function distribute(adress, object){
	$.getJSON($SCRIPT_ROOT + '/' + adress, {}, function(data){
		distributor(data, object);
	});
}
function distributor(data, object){
	object.raw_data = data;
	object.evaluate();
}
function Monitor(adress, result, value, finished_functions=[]){
	this.adress = adress;
	this.result = result;
	this.value = value;
	this.raw_data = {};
	this.finished_functions = finished_functions;

	this.evaluation = false

	this.update = function(){
		distribute(this.adress, this);
	}
	this.evaluate = function(){
		this.evaluation = (this.raw_data[result] == value);
		if(this.evaluation == true){
			for(var i = 0; i < this.finished_functions.length; i++){
				//console.log(this.finished_functions[i]);
				this.finished_functions[i]();
			}
			//remove interval as well
			window.clearInterval(this.interval)
			console.log(this.adress + " checker has been removed since it evaluated to " + this.evaluation)
		}
	}
	this.add_finished_function = function(f){
		this.finished_functions.push(f);
	}

	this.activate = function(){
		this.interval = window.setInterval(function(){this.update()}.bind(this), 1000);
		console.log(this.adress + " checker has been added");
	}
}

// monitors to be used later on
var proposal_monitor = new Monitor("voting", "voting", true, [proposal_sent]);
var ready_monitor = new Monitor("ready_status", "ready", true, [begin_game]);
var proposal_voting_completed_monitor = new Monitor("voted", "voters", 5, [proposal_voting_complete]);
var mission_voting_completed_monitor = new Monitor("mission_vote", "done", true, [mission_voting_complete]);












