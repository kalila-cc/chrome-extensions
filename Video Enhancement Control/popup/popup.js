chrome.storage.sync.get('skip', ({ skip }) => {
  let short = document.getElementById('short')
  let medium = document.getElementById('medium')
  let long = document.getElementById('long')
  let save = document.getElementById('save')
  let error = document.getElementById('error')
  let range = {
    short: [10, 30],
    medium: [60, 180],
    long: [300, 600],
  }
  short.value = skip.short
  short.setAttribute('min', range.short[0])
  short.setAttribute('max', range.short[1])
  short.setAttribute('placeholder', `${range.short[0]}s ≤ time ≤ ${range.short[1]}s`)
  medium.value = skip.medium
  medium.setAttribute('min', range.medium[0])
  medium.setAttribute('max', range.medium[1])
  medium.setAttribute('placeholder', `${range.medium[0]}s ≤ time ≤ ${range.medium[1]}s`)
  long.value = skip.long
  long.setAttribute('min', range.long[0])
  long.setAttribute('max', range.long[1])
  long.setAttribute('placeholder', `${range.long[0]}s ≤ time ≤ ${range.long[1]}s`)
  save.addEventListener('click', async () => {
    if (!short.value.match(/^\d+$/) || short.value < range.short[0] || range.short[1] < short.value) {
      let msg = `short time must be an integer from ${range.short[0]} to ${range.short[1]}.`
      error.innerHTML = msg
    } else if (!medium.value.match(/^\d+$/) || medium.value < range.medium[0] || range.medium[1] < medium.value) {
      let msg = `medium time must be an integer from ${range.medium[0]} to ${range.medium[1]}.`
      error.innerHTML = msg
    } else if (!long.value.match(/^\d+$/) || long.value < range.long[0] || range.long[1] < long.value) {
      let msg = `long time must be an integer from ${range.long[0]} to ${range.long[1]}.`
      error.innerHTML = msg
    } else {
      chrome.storage.sync.set({
        skip: {
          short: parseInt(short.value),
          medium: parseInt(medium.value),
          long: parseInt(long.value),
        }
      }, () => {
        let msg = `Configuration changed successfully.`
        error.innerHTML = msg
      })
    }
  })
})
