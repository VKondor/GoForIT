$(function() {

  var $tabs = $('.tab');
  var $text = $('.tab-inner');

  $tabs.on('click', function(e) {
    var $index = $(this).index();

    $tabs.removeAttr('id');
    $(this).attr('id', 'active-tab');

    $text.removeAttr('id');
    $text.eq($index).attr('id', 'active-text');
  });

  var $field = $('.field');
  var $title = $('.title');
  var $help = $('.help');

  $field.hover(function() {
    var $indexSecond = $(this).index();
    $title.eq($indexSecond).css('display', 'block');
    $title.eq($indexSecond).animate({ opacity: 1.0 }, 200);
  }, function() {
    var $indexThird = $(this).index();
    $title.eq($indexThird).animate({ opacity: 0.0 }, 400);
    $title.eq($indexThird).css('display', 'none');
  });

  $help.on('click', function(e) {
    $title.css('display', 'block');
    $title.animate({ opacity: 1.0 }, 200);
  })
})

