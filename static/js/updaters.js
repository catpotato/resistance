function begin_game(){
	// update ui to say that game has started
	$("#begun p").text("started")
	// remove status checker from interval
	NORM_INTERVAL.remove([GET_ready_status]);
	//get roles, insert them into the page
	$.getJSON($SCRIPT_ROOT + '/secrets', {}, function(secrets){
		$("#secrets #role").text(secrets.role)
		$("#secrets #spy-friend").text(secrets.spy)
		$("#secrets #spy-one").text(secrets.spy_1)
		$("#secrets #spy-two").text(secrets.spy_2)
	})
}