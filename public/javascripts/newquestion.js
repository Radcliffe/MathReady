$(document).ready( function () {
  var selectedCourse = 1;
  var selectedContentArea = 1;

  function setCourse(sel) {
    selectedCourse = sel;
      $('option.content').hide();
       $('option.course-' + sel).show();
       setContentArea(0);
       $('#selectContentArea option[value="0"]').prop('selected', true);
  }

  function setContentArea(sel) {
    selectedContentArea = sel;
    $('option.topic').hide();
    $('option.content-' + sel).show();
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
