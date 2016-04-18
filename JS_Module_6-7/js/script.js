$(function() {

  var $tabs = $('.tab');
  var $text = $('.tab-inner');

  $tabs.on('click', function(e) {
    var $index = $(this).index();

    $tabs.removeAttr('id');
    $(this).attr('id', 'active-tab');

    $text.removeAttr('id');
    $text.eq($index).attr('id', 'active-text');
  })
})