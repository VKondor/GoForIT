var launch = false;
var time = 0;
var stopwatch = document.querySelector('.stopwatch');
var stopwatchMs = document.querySelector('.stopwatch-ms');
var start = document.querySelector('.btn-success');
var clear = document.querySelector('.btn-danger');

clear.addEventListener("click", clearButton);
start.addEventListener("click", startPause);

function startPause() {
  if (launch == false) {
    launch = true;
    startTimer();
    start.innerHTML = 'Pause';
  } else {
    launch = false;
    start.innerHTML = 'Cont.';
  }
}

function clearButton() {
  launch = false;
  time = 0;
  start.innerHTML = 'Start';
  stopwatch.innerHTML = '00:00:00';
  stopwatchMs.innerHTML ='0';
}

function startTimer() {
  if (launch == true) {
    time++;    
    var h = Math.floor(time/10/60/60);    
    var m = Math.floor(time/10/60);  
    var s = Math.floor(time/10 % 60);      
    var ms = (time * 99) % 1000;    

    if(s < 10) {
      s = "0" + s;
    }
    if(m < 10) {
      m = "0" + m;
    }      
    if(h < 10) {
      h = "0" + h;
    }

    stopwatch.innerHTML = h + ":" + m + ":" + s;
    stopwatchMs.innerHTML = ms;
    setTimeout(startTimer, 100);
  }    
}


