const supported = "onscrollend" in window
const scrollendEvent = new Event('scrollend')

export const scrollend = scrollport => {
  if (supported) {
    scrollport.addEventListener('scrollend', () => {
      scrollport.dispatchEvent(scrollendEvent)
    })
  }
  else {
    scrollport.addEventListener('scroll', () => {
      clearTimeout(scrollport.scrollEndTimer)

      scrollport.scrollEndTimer = setTimeout(() => {
        scrollport.dispatchEvent(scrollendEvent)
      }, 100)
    })
  }
}