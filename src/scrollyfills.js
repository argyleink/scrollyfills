const scrollendEvent = new Event('scrollend')

export const scrollend = scrollport => {
  scrollport.addEventListener('scroll', () => {
    clearTimeout(scrollport.scrollEndTimer)

    scrollport.scrollEndTimer = setTimeout(() => {
      scrollport.dispatchEvent(scrollendEvent)
    }, 100)
  })
}