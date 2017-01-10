console.log("pigs in a blanket");
function update(handler, adress){
	$.getJSON($SCRIPT_ROOT + '/' + adress, {}, function(data){
		handler(data);
	});
}
/*
	UI updater functions
*/
//updates roles view
//updates turn_order view
//updates propsoer view





//updates who won the mission
function winner(passed){
	var result;
	if(passed){
		result = "mission passed";
	}
	if(passed){
		result = "mission failed";
	}
	$("#mission-results p").text(result);
}
