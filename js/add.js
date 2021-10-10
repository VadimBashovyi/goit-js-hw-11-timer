const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  day: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
}

const timer = {
  intervalId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return
    }

    const startTime = new Date('Dec 31 2021 00:00:00')
    this.isActive = true

    this.intervalId = setInterval(() => {
      const currentTime = new Date()
      const deltaTime = startTime - currentTime
      const time = getTimeComponents(deltaTime)

      updateClockface(time)
    }, 1000)
  },

  stop() {
    clearInterval(this.intervalId)

    this.isActive = false
  },
}

refs.startBtn.addEventListener('click', () => {
  timer.start()
})

refs.stopBtn.addEventListener('click', () => {
  timer.stop()
})

function updateClockface({ days, hours, mins, secs }) {
  refs.day.textContent = days
  refs.hours.textContent = hours
  refs.mins.textContent = mins
  refs.secs.textContent = secs
}

function pad(value) {
  return String(value).padStart(2, '0')
}

function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)))
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  )
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)))
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000))

  return { days, hours, mins, secs }
}
