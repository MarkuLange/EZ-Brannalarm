"use strict"

// SELECTORS
const btn = document.getElementById('button')
const numBox = document.getElementById('numberDisplay');
const progressBarGreen = document.querySelector('.green');
const progressBarYellow = document.querySelector('.yellow');
const progressBarRed = document.querySelector('.red');
const alarmTimer = document.getElementById('timer');
const line1 = document.getElementById('infotext-primary')
const line2 = document.getElementById('infotext-secondary')
const luftKnapp = document.getElementById('vindusknapp')


//GLOBAL VARIABLES
let countdown;

btn.addEventListener('click', setStateDelayed)

luftKnapp.addEventListener('click', function () {
  if (line2.innerHTML === "ALARM UTLØSES OM:") {
    setStateOk()
  }
})

function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  clearInterval(countdown);
  countdown = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if(timer === 91) {
      setStateWarn();
    }

    if (timer === 0) {
      setStateAlarm();
    }

    if (--timer < 0) {
      clearInterval(countdown);
    }
  }, 1000);
}
function delayTimer(){startTimer(300, alarmTimer)}

function setStateOk() {
  numBox.textContent = '';
  progressBarGreen.style.opacity = "1";
  progressBarYellow.style.opacity = "0.1";
  progressBarRed.style.opacity = "0.1";
  btn.disabled = true;


  line1.setAttribute('hidden','')
  line2.setAttribute('hidden','')
  alarmTimer.setAttribute('hidden','')
  clearInterval(countdown);

}

function setStateWarn() {
  numBox.textContent = '743';
  progressBarGreen.style.opacity = "0.1";
  progressBarYellow.style.opacity = "1";
  progressBarRed.style.opacity = "0.1";
  btn.disabled = false;

  line1.removeAttribute('hidden')
  line2.removeAttribute('hidden')
  alarmTimer.removeAttribute('hidden')

  line1.innerHTML="RØYK REGISTRERT"
  line2.innerHTML="ALARM UTLØSES OM:"
  startTimer(90, alarmTimer);
}
function setStateDelayed() {
  numBox.textContent = '743';
  progressBarGreen.style.opacity = "0.1";
  progressBarYellow.style.opacity = "1";
  progressBarRed.style.opacity = "0.1";
  btn.disabled = true;

  line1.innerHTML="LUFT UT RØYK"
  delayTimer();
}
function setStateAlarm() {
  numBox.textContent = '123';
  progressBarGreen.style.opacity = "0.1";
  progressBarYellow.style.opacity = "0.1";
  progressBarRed.style.opacity = "1";
  btn.disabled = true;

  line1.removeAttribute('hidden')
  line2.removeAttribute('hidden')
  alarmTimer.setAttribute('hidden', "");

  line1.innerHTML="Brannalarm Utløst"
  line2.innerHTML="Vennligst Evakuer"
}

function init(){
  setStateOk();
  setTimeout(setStateWarn, 10000)
}

init();
