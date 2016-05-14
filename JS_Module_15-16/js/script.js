$(function() {
  $('.form').on('submit', function() {
    var query = $('.form__input').val();

    $.ajax({
      url: "http://api.riffsy.com/v1/search?tag=" + query + "&limit=10",
      success: function(data){
        var ul = document.createElement("ul");
        ul.classList.add('result__menu')
        $.each(data.results, function(i, val){
            var li = document.createElement("li");
            li.innerHTML = '<a class="result__link" href="'+val.url+'" title="'+val.url+'" target="_blank">'+val.title+"</a>" + '</br>' + '<img class="result__images" src="'+val.url+'">';
            ul.appendChild(li);
        });
        $('.result').html(ul);
      },
    });
    return false;
  });

  function Human() {
    this.name = 'Vladyslav';
    this.age = 20;
    this.sex = 'male';
    this.height = 182;
    this.weight = 90;
  };

  function Worker() {
    this.placeOfJob = 'unemployed';
    this.salary = 0;
    this.work = function() {
      alert("It's time for work!");
    }
  }

  function Student() {
    this.placeOfStudy = 'Kyiv Polytechnic Institute';
    this.grunt = 825;
    this.shows = function() {
      alert("It's time to watch TV shows!");
    }
  };

  Worker.prototype = new Human();
  Student.prototype = new Human();

  var Worker1 = new Worker();
  var Worker2 = new Worker();
  var Worker3 = new Worker();

  var Student1 = new Student();
  var Student2 = new Student();
  var Student3 = new Student();

  console.log('Worker1 name: ', Worker1.name);
  console.log('Worker1 age: ', Worker1.age);
  console.log('Worker2 sex: ', Worker1.sex);
  console.log('Worker2 height: ', Worker1.height);
  console.log('Worker3 weight: ', Worker1.weight);
  console.log('Worker3 name: ', Worker1.name);
  console.log('Student1 age: ', Worker1.age);
  console.log('Student1 sex: ', Worker1.sex);
  console.log('Student2 height: ', Worker1.height);
  console.log('Student2 weight: ', Worker1.weight);
  console.log('Student3 name: ', Worker1.name);
  console.log('Student3 age: ', Worker1.age);
});
