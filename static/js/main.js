/*var USERNAME;
var ROOM;*/
$(function(){
	$("#ready-button").bind("click", function(){
		// post ready status
		$.getJSON($SCRIPT_ROOT + '/ready', {}, function(){} );
	});
	
	// gets username and room 
	$.getJSON($SCRIPT_ROOT + '/user_info', {}, function(user){
		$("#username").text(user.username);
		$("#room").text(user.room);
	});

	// handles creating an array of mission proposal
	var proposal;
	$("#proposal button").on("click", function(){
		console.log("you pressed a button!");
	});


});