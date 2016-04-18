var test = {
  questions: [
    {
      title: '1. Вопрос №1',
      answers: [
        {
          text: 'Вариант ответа №1',
          correct: false
        },
        {
          text: 'Вариант ответа №2',
          correct: false
        },
        {
          text: 'Вариант ответа №3',
          correct: true
        }
      ]
    },
    {
      title: '2. Вопрос №2',
      answers: [
        {
          text: 'Вариант ответа №1',
          correct: true
        },
        {
          text: 'Вариант ответа №2',
          correct: false
        },
        {
          text: 'Вариант ответа №3',
          correct: false
        }
      ]
    },
    {
      title: '3. Вопрос №3',
      answers: [
        {
          text: 'Вариант ответа №1',
          correct: false
        },
        {
          text: 'Вариант ответа №2',
          correct: true
        },
        {
          text: 'Вариант ответа №3',
          correct: false
        }
      ]
    }
  ],

  body: document.body,
  wrapper: document.createElement('div'),

  generateTest: function() {
    var title = document.createElement('h1');
    var button = document.createElement('button');
    this.wrapper.classList.add('wrapper');
    this.body.appendChild(this.wrapper);
    var parentElem = document.querySelector('.wrapper');

    title.classList.add('text-center');
    title.innerHTML = 'Тест по программированию';
    parentElem.insertBefore(title, parentElem.children[0]);

    button.className = 'btn btn-primary btn-lg';
    button.setAttribute('type', 'button');  
    button.innerHTML = 'Проверить мои результаты';
    parentElem.appendChild(button);
  },
  generateQuestion: function() {
    this.wrapper.classList.add('wrapper');
    this.body.appendChild(this.wrapper);
    for (var i = 0; i < this.questions.length; i++) {
      var newQuestion = document.createElement('h2');
      var parentElem = document.querySelector('.wrapper');
      newQuestion.classList.add('title-name');
      newQuestion.innerHTML = this.questions[i].title;
      parentElem.appendChild(newQuestion);      

      for (var j = 0; j < this.questions[i].answers.length; j++) {
        var newAnswer = document.createElement('label');
        var parentElem = document.querySelector('.wrapper'); 
        newAnswer.classList.add('checkbox'); 
        newAnswer.innerHTML = this.questions[i].answers[j].text;        
        parentElem.appendChild(newAnswer);
      }
    }
  },
  generateCheck: function() {
    var labelElem = document.querySelectorAll('label'); 
    for (i = 0; i < labelElem.length; i++) {
      var newCheck = document.createElement('input');
      newCheck.setAttribute('type', 'checkbox');   
      labelElem[i].insertBefore(newCheck, labelElem[i].firstChild);
    }
  }
};

test.generateQuestion();
test.generateTest();
test.generateCheck();



