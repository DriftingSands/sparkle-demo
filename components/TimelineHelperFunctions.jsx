let animationsList = [];

const createAnimationTimeline = (gsap, q, timelineArray, timelineSettings, runOnEnd, debugAnim) => {
  const instant = debugAnim === "instant";
  const tl = gsap.timeline({ onComplete: runOnEnd });
  if (timelineSettings?.startDelay && !instant) tl.delay(timelineSettings.startDelay);
  const standardDelay = timelineSettings?.globalAutoDelay && !instant ? ">" : "<";

  for (let i = 0; i < timelineArray.length; i++) {
    const animation = timelineArray[i];

    if (animation?.to?.scrollTrigger || animation?.from?.scrollTrigger) {
      if (animation.to && instant) {
        if (!animation.to.scrollTrigger.scrub) animation.to.duration = 0;
        if (typeof animation.to.scrollTrigger.scrub === "number") animation.to.scrollTrigger.scrub = true;
        animation.to.delay = 0;
      }
      if (animation?.from && instant) {
        animation.from.delay = 0;
        animation.from.duration = 0;
      }
      if (animation.to && animation.from) {
        const scrollAnimation = gsap.fromTo(q(animation.selector), animation.from, animation.to);
        animationsList.push(scrollAnimation);
        continue;
      }
      if (animation.to) {
        const scrollAnimation = gsap.to(q(animation.selector), animation.to);
        animationsList.push(scrollAnimation);
      }
      if (animation.from) {
        const scrollAnimation = gsap.from(q(animation.selector), animation.from);
        animationsList.push(scrollAnimation);
      }
      continue;
    }

    let delay;
    if (animation.autoDelay !== undefined) {
      delay = animation.autoDelay === true ? ">" : "<";
    } else {
      delay = standardDelay;
    }
    if (instant) delay = 0;
    if (animation.to && instant) {
      animation.to.duration = 0;
    }

    if (animation.from && animation.to) {
      tl.fromTo(q(animation.selector), animation.from, animation.to, delay);
    } else {
      animation.from && tl.from(q(animation.selector), animation.from, delay);
      animation.to && tl.to(q(animation.selector), animation.to, delay);
    }
  }
  animationsList.push(tl);
};

export default createAnimationTimeline;
