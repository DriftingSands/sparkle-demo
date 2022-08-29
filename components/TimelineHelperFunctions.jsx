
const createAnimationTimeline = (gsap, q, timelineArray, timelineSettings) => {
  const tl = gsap.timeline()
  const standardDelay = timelineSettings.autoDelay ? '>' : '<'

  for (let i = 0; i < timelineArray.length; i++) {
    const animation = timelineArray[i]

    
    let delay;
    if (animation.autoDelay !== undefined) {
      delay = animation.autoDelay === true ? '>' : '<'
    }
    if (!delay) {
      delay = standardDelay
    }
    
    if (animation.from && animation.to) {
      tl.fromTo(q(animation.selector), animation.from, animation.to, delay)
    } else {
      animation.from && tl.from(q(animation.selector), animation.from, delay)
      animation.to && tl.to(q(animation.selector), animation.to, delay)
    }
    
    if (animation.selector.includes('textWrapper')) console.log(tl)
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