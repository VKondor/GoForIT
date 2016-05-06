'use strict';

var test = {
  questions: [
    {
      number: 'number1',
      title: '1. Вопрос №1',
      answers: [
        {
          text: 'Вариант ответа №1',
          correct: false,
        },
        {
          text: 'Вариант ответа №2',
          correct: false,
        },
        {
          text: 'Вариант ответа №3',
          correct: true,
        },
      ],
    },
    {
      number: 'number2',
      title: '2. Вопрос №2',
      answers: [
        {
          text: 'Вариант ответа №1',
          correct: true,
        },
        {
          text: 'Вариант ответа №2',
          correct: false,
        },
        {
          text: 'Вариант ответа №3',
          correct: false,
        },
      ],
    },
    {
      number: 'number3',
      title: '3. Вопрос №3',
      answers: [
        {
          text: 'Вариант ответа №1',
          correct: false,
        },
        {
          text: 'Вариант ответа №2',
          correct: true,
        },
        {
          text: 'Вариант ответа №3',
          correct: false,
        },
      ],
    },
  ],
};

localStorage.setItem('app', JSON.stringify(test))
var app = localStorage.getItem('app');
app = JSON.parse(app);

$(function() {
  var html = $('#template-test').html();
  var content = tmpl(html, app);
  $('body').append(content);

  var parentElem = document.querySelector('.wrapper');
  var title = document.createElement('h1');
  var button = document.createElement('button');

  title.innerHTML = 'Тест по программированию';
  button.innerHTML = 'Проверить мои результаты';
  button.className = 'btn btn-primary btn-lg';
  parentElem.insertBefore(title, parentElem.firstChild);
  parentElem.appendChild(button);

  $('.btn').on('click', function() {
    var $conclusion = 'true';
    $('.variant').each(function() {
      if ($(this).prop('checked') != ($(this).attr('value') == 'true')) {
        $conclusion = false;
      };
    });

    var HeightDocument = $(document).height();
	  var WidthDocument = $(document).width();
	  var HeightScreen = $(window).height();

    $(".modal_bg").css({"width":WidthDocument,"height":HeightDocument});
	  $(".modal_bg").fadeIn(1000);
	  $(".modal_bg").fadeTo("slow", 0.8);

    var Top_modal_window = $(document).scrollTop() + HeightScreen/2 - $(".modal_window").height()/2;
	  $(".modal_window").css({"top": Top_modal_window + "px", "display":"block"});

    $(".modal_bg").click(function () {
	    $(".modal_bg, .modal_window").hide(500);
	    $("body").css({"overflow":"auto"});
      $('.variant').each(function() {
        $(this).prop('checked', false);
      });
      $(".modal_text").empty();
	  });

    $(".modal_window button").click(function () {
	    $(".modal_bg, .modal_window").hide(500);
	    $("body").css({"overflow":"auto"});
      $('.variant').each(function() {
        $(this).prop('checked', false);
      });
      $(".modal_text").empty();
	  });

    if ($conclusion == 'true') {
      $('.modal_text').append('Тест пройден успешно!');
      $('.modal_img').attr('src', 'img/like.jpg')
    } else {
      $('.modal_text').append('Тест не пройден! Ответы неверные!');
      $('.modal_img').attr('src', 'img/dislike.jpg')
    }
  });
});
