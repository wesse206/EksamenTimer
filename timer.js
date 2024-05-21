// The three main blocks
{
  var timerBlock = document.getElementById('timerBlock')
  var opskrifBlock = document.getElementById('opskrifBlock')
  var riglyneBlock = document.getElementById('riglyneBlock')
}

// Block for all that has to happen when the timer has to be initialized.
{
  var timer

  var hoursInput = document.getElementById('hours')
  var minsInput = document.getElementById('mins')

  var leestydText = document.getElementById('leestydText')

  hoursInput.select()

  hoursInput.addEventListener('keypress', function (event) { if (event.key === 'Enter') { startTimer() } })
  minsInput.addEventListener('keypress', function (event) { if (event.key === 'Enter') { startTimer() } })

  hoursInput.addEventListener('click', function () { hoursInput.select() })
  minsInput.addEventListener('click', function () { minsInput.select() })
}

function displayTimer() {
  timerBlock.style.display = 'block'
  opskrifBlock.style.display = 'none'
  riglyneBlock.style.display = 'none'
}

function startTimer() {
  document.getElementById('leestyd').disabled = true

  document.getElementById('startTimer').style.display = 'none'
  document.getElementById('stopTimer').style.display = 'inline'

  document.getElementById('time').style.display = 'none'
  document.getElementById('timer').style.display = 'flex'

  // Validation just incase no values are in the inputs.
  {
    if (hoursInput.value === '') {
      hoursInput.value = '00'
    }
    if (minsInput.value === '') {
      minsInput.value = '00'
    }
  }

  let leestyd = 0
  if (document.getElementById('leestyd').checked) {
    leestyd = 10
  }

  countDownDate = Date.now() + (parseInt(hoursInput.value) * 60 * 60 + (parseInt(minsInput.value) + leestyd) * 60) * 1000
  initialDistance = countDownDate - Date.now()

  timer = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime()


    // Find the distance between now and the count down date
    var distance = countDownDate - now

    let progress = document.getElementById('progress')

    if ((document.getElementById('leestyd').checked) && (distance > initialDistance - (leestyd * 60 * 1000))) {
      progress.style.width = (((initialDistance - distance) / (leestyd * 60 * 1000)) * 100) + '%'
      leestydText.style.display = 'inline'
    }
    else {
      progress.style.width = (100 - distance / (initialDistance - leestyd * 60 * 1000) * 100) + '%'
      leestydText.style.display = 'none'
    }

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

    if ((hours <= 0) && (minutes <= 0) && (seconds <= 0)) {
      document.getElementById("timer").innerHTML = "00:00:00";
      document.getElementById('progress').style.width = '100%'
      document.getElementById('progress').classList.add('flash')
      clearInterval(timer)
    }
    else {
      // Display the result in the element with id="timer"
      document.getElementById("timer").innerHTML = hours + ":"
        + minutes + ":" + seconds
    }


  }, 100);
}

function stopTimer() {
  clearInterval(timer)
  leestydText.style.display = 'none'
  document.getElementById('progress').style.width = '0%'
  document.getElementById('progress').classList.remove('flash')

  document.getElementById('leestyd').disabled = false

  document.getElementById("timer").innerHTML = "00:00:00"
  document.getElementById('progress').style.width = '0%'

  document.getElementById('startTimer').style.display = 'inline'
  document.getElementById('stopTimer').style.display = 'none'

  document.getElementById('time').style.display = 'flex'
  document.getElementById('timer').style.display = 'none'
}

// All that is needed to initialize opskrif block
{
  var vak = document.getElementById('vak')
  var leerdernaam = document.getElementById('leerdernaam')
  var seksie = document.getElementById('seksie')
  var onderwyserkode = document.getElementById('onderwyserkode')

  vak.addEventListener('keyup', function () {
    if (vak.value !== '') {
      document.getElementById('vakText').innerHTML = vak.value
    }
    else {
      document.getElementById('vakText').innerHTML = 'Vak'
    }
  })

  leerdernaam.addEventListener('keyup', function () {
    if (leerdernaam.value !== '') {
      document.getElementById('leerdernaamText').innerHTML = leerdernaam.value
    }
    else {
      document.getElementById('leerdernaamText').innerHTML = 'Naam en Van'
    }
  })

  seksie.addEventListener('keyup', function () {
    if (seksie.value !== '') {
      document.getElementById('seksieText').innerHTML = seksie.value
    }
    else {
      document.getElementById('seksieText').innerHTML = 'Klas'
    }
  })

  onderwyserkode.addEventListener('keyup', function () {
    if (onderwyserkode.value !== '') {
      document.getElementById('onderwyserkodeText').innerHTML = onderwyserkode.value
    }
    else {
      document.getElementById('onderwyserkodeText').innerHTML = 'Onderwyser Kode'
    }
  })

}

function displayOpskrif() {
  var today = new Date()
  document.getElementById('datum').innerHTML = today.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })

  timerBlock.style.display = 'none'
  opskrifBlock.style.display = 'block'
  riglyneBlock.style.display = 'none'
}


function settings() {
  let settingsDialog = document.getElementById('settings')
  settingsDialog.showModal()
}

function closeSettings() {
  let settingsDialog = document.getElementById('settings')
  settingsDialog.close()
}

function displayRiglyne() {
  timerBlock.style.display = 'none'
  opskrifBlock.style.display = 'none'
  riglyneBlock.style.display = 'block'
}