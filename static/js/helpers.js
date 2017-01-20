function find_checked(boxes_selector){
	return $(boxes_selector + ":checked");
}

function id(jq_object){
	return jq_object.attr("id");
}

function get_names(boxes, name_location){
	var names = [];
	for(var i = 0; i < boxes.length; i++){
		names.push($(name_location + " #" + $(boxes[i]).attr("id")).text())
	}
	return names;
}


function post_data_to(adress, data){
	var name = data.name; 
	if(data.type == "array"){
		name += "[]";
	}
	$.post($SCRIPT_ROOT + adress, make_json_obj(name, data.value), function(){console.log(data.name + " was posted to /" + adress)});
	
}
function make_json_obj(key, value){
	var json_obj = {};
	json_obj[key] = value;
	return json_obj
}
function URLArgument(value, type = "", name = ""){
	this.name = name;
	this.value = value;
	this.type = type;

	this.as = function(new_name){
		this.name = new_name;
		return this;
	}
}
function send_ready_status(){
	$.getJSON($SCRIPT_ROOT + '/ready', {}, function(){} );
}
function send_message(message){
	show("#html-console");
	$("#html-console h4").text(message + "...");
}

function hide_console(){
	hide("#html-console");
	$("#html-console h4").text("");
}

function Countdown(seconds, updater, termination){
	this.interval = window.setInterval(function(){this.update()}.bind(this), 1000);
	this.seconds = seconds
	this.updater = updater;
	this.updater(seconds);
	console.log(termination);
	this.termination = termination;

	this.update = function(){
		this.seconds--;
		if(this.seconds == 0){
			this.termination();
			window.clearInterval(this.interval);
		}
		else{
			this.updater(this.seconds);
		}	
	}
}
