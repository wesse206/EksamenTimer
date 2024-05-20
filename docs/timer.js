document.getElementById('hours').select()
document.getElementById('hours').addEventListener('keypress', function (event) {if (event.key === 'Enter') { startTimer() }})
document.getElementById('mins').addEventListener('keypress', function (event) {if (event.key === 'Enter') { startTimer() }})
  
let timer
function startTimer() {

  document.getElementById('startTimer').style.display = 'none'
  document.getElementById('stopTimer').style.display = 'inline'

  document.getElementById('time').style.display = 'none'
  document.getElementById('timer').style.display = 'flex'

  //var time = document.getElementById('timer').innerHTML.split(':')

  countDownDate = Date.now() + (parseInt(document.getElementById('hours').value) * 60 * 60 + parseInt(document.getElementById('mins').value) * 60) * 1000
  initialDistance = countDownDate - Date.now()

  timer = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime()


    // Find the distance between now and the count down date
    var distance = countDownDate - now

    document.getElementById('progress').style.width = (100 - distance / initialDistance * 100) + '%'

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    function pad(num) {
      num = num.toString()
      while (num.length < 2) num = "0" + num
      return num
    }

    hours = pad(hours)
    minutes = pad(minutes)
    seconds = pad(seconds)

    // Display the result in the element with id="timer"
    document.getElementById("timer").innerHTML = hours + ":"
      + minutes + ":" + seconds

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x)
      document.getElementById("timer").innerHTML = "Tyd is verby!!";
    }
  }, 100);
}

function stopTimer() {
  clearInterval(timer)
  document.getElementById("timer").innerHTML = "00:05:00"
  document.getElementById('progress').style.width = '0%'

  document.getElementById('startTimer').style.display = 'inline'
  document.getElementById('stopTimer').style.display = 'none'

  document.getElementById('time').style.display = 'flex'
  document.getElementById('timer').style.display = 'none'
}

function displayTimer() {
  document.getElementById('timerBlock').style.display = 'block'
  document.getElementById('opskrifBlock').style.display = 'none'
  document.getElementById('riglyneBlock').style.display = 'none'
}
function displayOpskrif() {
  var today = new Date()
  document.getElementById('datum').innerHTML = today.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })

  document.getElementById('timerBlock').style.display = 'none'
  document.getElementById('opskrifBlock').style.display = 'block'
  document.getElementById('riglyneBlock').style.display = 'none'
}
function displayRiglyne() {
  document.getElementById('timerBlock').style.display = 'none'
  document.getElementById('opskrifBlock').style.display = 'none'
  document.getElementById('riglyneBlock').style.display = 'block'
}