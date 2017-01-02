

function smoke(){
	console.log("smoke")
}
function choke(){
	console.log("choke")
}
function baroke(){
	console.log("baroke")
}
function poke(){
	console.log("poke")
}
function bloake(){
	console.log("bloake")
}


//interval class
function Interval(functions, frequency){
	this.functions = functions;
	this.frequency = new Frequency(frequency);

	this.interval = window.setInterval(function () {
		for(var i = 0; i < functions.length; i++){
			functions[i]();
		}
	}, this.frequency.value);

	/* accepts an array of functions to add to the loop, guaratneeed to be added to the end of the loop */
	this.add = function(to_add){
		for(var i = 0; i < to_add.length; i++){
			functions.push(to_add[i]);
		}
	}

	/* accepts an array of functions that it can remove from the loop, order is not guaranteed */
	this.remove = function(to_rem){
		for(var i = 0; i < to_rem.length; i++){
			functions.splice(functions.indexOf(to_rem[i]), 1);
		}
	}
}

//frequency class
function Frequency(frequency_name){
	this.name = frequency_name;
	frequency_value = "";
	if(frequency_name == "uber"){
		frequency_value = 10;
	}
	else if(frequency_name == "fast"){
		frequency_value = 100;
	}
	else if(frequency_name == "norm"){
		frequency_value = 1000;
	}
	else if(frequency_name == "slow"){
		frequency_value = 10000;
	}
	this.value = frequency_value;
}





