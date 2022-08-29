
const createAnimationTimeline = (gsap, q, timelineArray, timelineSettings) => {
  const tl = gsap.timeline()

  for (let i = 0; i < timelineArray.length; i++) {
    const animation = timelineArray[i]
    const standardDelay = timelineSettings.autoDelay ? '>' : '<'
    if (animation.from && animation.to) {
      tl.fromTo(q(animation.selector), animation.from, animation.to, standardDelay)
    } else {
      animation.from && tl.from(q(animation.selector), animation.from, standardDelay)
      animation.to && tl.to(q(animation.selector), animation.to, standardDelay)
    }

  }
  if (timelineSettings.debugButton) {
    const debugButton = document.createElement('button')
    debugButton.innerText = 'replay TL: '
    debugButton.style.position = 'fixed'
    debugButton.style.top = 0
    debugButton.style.zIndex = 9000
    debugButton.style.cursor = 'pointer'
    debugButton.addEventListener('click', () => tl.play(0))
    document.body.prepend(debugButton)
  }

}

export default createAnimationTimeline