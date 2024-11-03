export function getScrollPercentage(): number {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight
  const windowHeight = window.innerHeight

  const scrollPercentage = (scrollTop / (docHeight - windowHeight)) * 100
  return scrollPercentage
}

export function scrollToPercentage(percentage: number, behavior: ScrollBehavior = 'smooth') {
  const scrollHeight = document.documentElement.scrollHeight
  const windowHeight = window.innerHeight
  const scrollPosition = (scrollHeight - windowHeight) * (percentage / 100)
  window.scrollTo({
    top: scrollPosition,
    behavior: behavior
  })
}
