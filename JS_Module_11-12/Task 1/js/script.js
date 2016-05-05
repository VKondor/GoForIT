$(function() {
    var leftUIEl = $('.carousel-arrow-left');
    var rightUIEl = $('.carousel-arrow-right');
    var elementsList = $('.carousel-list');

    var currentLeftValue = 0;
    var pixelsOffset = 425;
    var elementsCount = elementsList.find('li').length;
    var minimumOffset = - ((elementsCount - 5) * pixelsOffset);
    var maximumOffset = 0;

    leftUIEl.click(function() {
      if (currentLeftValue != maximumOffset) {
          currentLeftValue += 425;
          elementsList.animate({ left : currentLeftValue + "px"}, 500);
      }
    });

    rightUIEl.click(function() {
      if (currentLeftValue != minimumOffset) {
          currentLeftValue -= 425;
          elementsList.animate({ left : currentLeftValue + "px"}, 500);
      }
    });
});
