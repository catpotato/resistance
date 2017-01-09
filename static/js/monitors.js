function distribute(adress, object){
	$.getJSON($SCRIPT_ROOT + '/' + adress, {}, function(data){
		distributor(data, object);
	});
}
function distributor(data, object){
	object.raw_data = data;
	object.evaluate();
	//object.finished();
}
function Monitor(terminator, termination_functions=[]){
	// TODO create new interval that check for this 
	this.termination_functions = termination_functions;
	this.terminator = terminator
	// add in a function that destroys the interval whem the monitor is doen
	for(var i = 0; i < termination_functions.length; i++){
		terminator.add_finished_function(termination_functions[i])
	}
	this.interval = window.setInterval(function(){terminator.update()}, 1000);
	this.clear_interval = function(){
		window.clearInterval(this.interval);
		console.log(this.interval);
	}
	this.terminator.add_finished_function(this.clear_interval);
	/*this.termination_functions.push(function(){console.log("being terminated!")});*/
}
function Server_Condition(adress, result, value, finished_functions=[]){
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
				this.finished_functions[i](this);
			}
		}
	}
	this.add_finished_function = function(f){
		this.finished_functions.push(f);
	}
}
var condition = new Server_Condition("ready_status", "ready", true)
var monitor = new Monitor(condition);










