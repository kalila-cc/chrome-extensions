let presetSkip = {
  short: 10,
  medium: 60,
  long: 300,
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ skip: presetSkip })
  chrome.contextMenus.create({
    id: 'open-video-enhancement-control',
    title: 'Open Video Enhancement Control',
    contexts: ['video']
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      let video = document.querySelector('video')
      chrome.storage.sync.get('skip', ({ skip }) => {
        document.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowUp' && video.volume + 0.1 <= 1) {
            video.volume += 0.1
          } else if (event.key === 'ArrowDown' && video.volume - 0.1 >= 0) {
            video.volume -= 0.1
          } else if (event.key === 'ArrowRight' && video.currentTime + skip.short <= video.duration) {
            video.currentTime += skip.short
          } else if (event.key === 'ArrowLeft' && video.currentTime - skip.short >= 0) {
            video.currentTime -= skip.short
          } else if (event.key === '>' && video.currentTime + skip.medium <= video.duration) {
            video.currentTime += skip.medium
          } else if (event.key === '<' && video.currentTime - skip.medium >= 0) {
            video.currentTime -= skip.medium
          } else if (event.key === '}' && video.currentTime + skip.long <= video.duration) {
            video.currentTime += skip.long
          } else if (event.key === '{' && video.currentTime - skip.long >= 0) {
            video.currentTime -= skip.long
          }
        })
        console.log('Video enhancement control added successfully.')
      })
    },
  })
})
