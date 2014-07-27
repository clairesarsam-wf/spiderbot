$(document).on('ready', function() {
	$('#blink').click(function() {
		$.ajax({
			url: "/blink"
		});
	});

	$('#stopblink').click(function() {
		$.ajax({
			url: "/stopblink"
		});
	});
	$('#eyeson').click(function() {
		$.ajax({
			url: "/eyeson"
		});
	});
	$('#eyesoff').click(function() {
		$.ajax({
			url: "/eyesoff"
		});
	});
	$('#legs').click(function() {
		$.ajax({
			url: "/forward"
		});
	});
	$('#legsoff').click(function() {
		$.ajax({
			url: "/stop"
		});
	});
});