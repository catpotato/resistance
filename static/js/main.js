$(function(){
	$("#ready-button").bind("click", function(){
		console.log("i've been checked!");
		
	});

	var uber_interval = new Interval([], "uber");
	var fast_interval = new Interval([smoke], "fast");
	var norm_interval = new Interval([choke], "norm");
	var slow_interval = new Interval([baroke], "slow");
});