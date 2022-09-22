let animationsList = []

const isBrowser = () => typeof window !== "undefined"

isBrowser() && window.addEventListener('message', ({data}) => {
  if (data.type !== "clear-animations") {return}
  console.log("\x1b[31m~ animationsList", animationsList)
  animationsList.forEach((item) => {
    item.kill()
  })
  animationsList = []
})

const createAnimationTimeline = (gsap, q, timelineArray, timelineSettings, runOnEnd) => {
  const tl = gsap.timeline({onComplete: runOnEnd})
  timelineSettings?.startDelay && tl.delay(timelineSettings.startDelay)
  const standardDelay = timelineSettings?.globalAutoDelay ? '>' : '<'

  for (let i = 0; i < timelineArray.length; i++) {
    const animation = timelineArray[i]

    if (animation?.to?.scrollTrigger || animation?.from?.scrollTrigger) {
      if (animation.to && animation.from) {
        const scrollAnimation = gsap.fromTo(q(animation.selector), animation.from, animation.to);
        animationsList.push(scrollAnimation)
        continue;
      }
      if (animation.to) {
        const scrollAnimation = gsap.to(q(animation.selector), animation.to)
        animationsList.push(scrollAnimation)
      };
      if (animation.from) {
        const scrollAnimation = gsap.from(q(animation.selector), animation.from)
        animationsList.push(scrollAnimation)
      };
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
  animationsList.push(tl)




}

export default createAnimationTimeline