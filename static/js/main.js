/*var USERNAME;
var ROOM;*/
$(function(){
	$("#ready-button").bind("click", function(){
		// post ready status
		$.getJSON($SCRIPT_ROOT + '/ready', {ready : true}, function(data){ console.log("sucess");} );
	});
	// adds checking the ready status to be checked at a moderate interval
	NORM_INTERVAL.add([GET_ready_status]);

	// gets username and room 
	$.getJSON($SCRIPT_ROOT + '/user_info', {}, function(user){
		$("#username").text(user.username);
		$("#room").text(user.room);
	});


});