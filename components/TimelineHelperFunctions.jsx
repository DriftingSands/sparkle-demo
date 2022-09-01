
const createAnimationTimeline = (gsap, q, timelineArray, timelineSettings) => {
  const tl = gsap.timeline()
  tl.delay(timelineSettings.startDelay)
  const standardDelay = timelineSettings.globalAutoDelay ? '>' : '<'

  for (let i = 0; i < timelineArray.length; i++) {
    const animation = timelineArray[i]

    if (animation?.to?.scrollTrigger || animation?.from?.scrollTrigger) {
      if (animation.to && animation.from) {
        gsap.fromTo(q(animation.selector), animation.from, animation.to);
        continue;
      }
      (animation.to) && gsap.to(q(animation.selector), animation.to);
      (animation.from) && gsap.from(q(animation.selector), animation.from);
      continue;
    }
    
    let delay;
    if (animation.autoDelay !== undefined) {
      delay = animation.autoDelay === true ? '>' : '<'
    } else {
      delay = standardDelay
    }
    
    if (animation.from && animation.to) {
      tl.fromTo(q(animation.selector), animation.from, animation.to, delay)
    } else {
      animation.from && tl.from(q(animation.selector), animation.from, delay)
      animation.to && tl.to(q(animation.selector), animation.to, delay)
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