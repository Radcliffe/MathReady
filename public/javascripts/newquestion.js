$(document).ready( function () {
	var selectedCourse = 1;
	var selectedContentArea = 1;

	function setCourse(sel) {
		selectedCourse = sel;
    	$('option.c').hide();
   		$('option.' + sel).show();
   		setContentArea(0);
   		$('#selectContentArea option[value="0"]').prop('selected', true);
	}
	
	function setContentArea(sel) {
		selectedContentArea = sel;
		$('option.t').hide();
		$('option.' + selectedCourse + '-' + sel).show();
		$('#selectTopic option[value="0"]').prop('selected', true);
	}

	$('select#selectCourse').change(function () {
	    setCourse($(this).val());
	});

	$('select#selectContentArea').change(function () {
		setContentArea($(this).val());
	});

	setCourse(selectedCourse);
	setContentArea(selectedContentArea);
});