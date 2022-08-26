import presetMap from "../../../animationSettings/animationPresets.json";
import defaults from "../../../animationSettings/animationDefaults.json";

const getScroll = (scrollObj, selector) => {
  if (!scrollObj) {
    return null;
  }
  const output = { ...scrollObj };
  !output.trigger &&
    (output.trigger = selector || defaults.defaultScroll.trigger);


  if (output.startComponent || output.startViewport || output.endComponent || output.endViewport ) {
    output.start = [
      (output.startComponent || defaults.defaultScroll.start[0] || "top"),
      (output.startViewport || defaults.defaultScroll.start[1] || "85%")
    ];

    output.end = [
      (output.endComponent || defaults.defaultScroll.end[0] || "bottom"),
      (output.endViewport || defaults.defaultScroll.end[1] || "85%")
    ]
  }

  !output.snap?.length && (output.snap = null);
  
  
  !output.start &&
    (output.start = defaults.defaultScroll.start || ["top", "85%"]);
  !output.end &&
    (output.end = defaults.defaultScroll.end || ["bottom", "85%"]);

  // allows toggleActions to be a object,
  // which is the only way to output this in JSON forums.
  // Functionality for array can be removed once we author new content.
  if (typeof(output.toggleActions) === "object") {
    output.toggleActions = [
      output.toggleActions.onEnter || 'play',
      output.toggleActions.onLeave || 'reverse',
      output.toggleActions.onEnterBack || 'play',
      output.toggleActions.onLeaveBack ||'reverse',
    ]
  } else {
    !output.toggleActions &&
      (output.toggleActions = defaults.defaultScroll.toggleActions || [
        "play",
        "reverse",
        "play",
        "reverse",
      ]);
  }

  if (output.enableScrub !== undefined) {
    (output.enableScrub === true && output.scrub === 0) ? (output.scrub = true) : (output.scrub = false);
    output.enableScrub === false && (output.scrub = false);
  }
  output.start = output.start.join(" ");
  output.end = output.end.join(" ");
  output.toggleActions = output.toggleActions.join(" ");
  return output;
};

const getPreset = (presets, ease, delay) => {
  const output = { from: { ease, delay }, to: { ease, delay } };

  presets.forEach((name) => {
    if (!presetMap[name]) {
      return console.error(`Preset with name: "${name}" was not found!`);
    }
    output.from = { ...output.from, ...presetMap[name].from };
    output.to = { ...output.to, ...presetMap[name].to };
  });
  return output;
};

export const applyAnimation = (gsap, q, animation, componentSelector) => {
  if (!Object.keys(animation).length) {
    return;
  }
  const params = new URLSearchParams(window.location.search);
  const isEditMode = params.get("isEditMode") === "true";
  const animEditPos = params.get("animEditPos");

  const { from, to, presets, snapPos, scroll } = animation;

  const selector = componentSelector || animation.selector;
  if (!selector) {
    return console.error(
      "No selector found!",
      "\n",
      "If you are creating an animation from a component content JSON, remember you have to add the selector manually!",
      "\n",
      "\n",
      "Error caused by:",
      animation,
      componentSelector
    );
  }

  // Checks if element exists. This is required because animations are applied to non-existent elements creating bugs. With scroll snap especially.
  if (!document.querySelector(selector)) {
    return;
  }

  const ease = animation.ease || defaults.defaultEase,
    delay = isEditMode ? 0 : animation.delay || defaults.defaultDelay,
    duration = isEditMode ? (animEditPos === 'start' ? 100 : 0) : animation.duration || defaults.defaultDuration;

  const scrollTrigger = isEditMode ? null : getScroll(scroll, selector);

  let tl = null;

  if (presets) {
    const builtPreset = getPreset(presets, ease, delay);
    tl = gsap
      .timeline({ scrollTrigger })
      .fromTo(q(selector), duration, builtPreset.from, builtPreset.to)
      .addLabel(snapPos && selector, snapPos);
    return;
  }

  // If both a from and to animation are specified ".fromTo" needs to be used to avoid glitches
  if (from && to) {
    tl = gsap
      .timeline({ scrollTrigger })
      .fromTo(
        q(selector),
        duration,
        {
          ...from,
          ease,
          delay,
        },
        {
          ...to,
          ease,
          delay,
        }
      )
      .addLabel(snapPos && selector, snapPos);
  } else {
    if (from) {
      tl = gsap
        .timeline({ scrollTrigger })
        .from(q(selector), duration, {
          ...from,
          ease,
          delay,
        })
        .addLabel(snapPos && selector, snapPos);
    }

    if (to) {
      tl = gsap
        .timeline({ scrollTrigger })
        .to(q(selector), duration, {
          ...to,
          ease,
          delay,
        })
        .addLabel(snapPos && selector, snapPos);
    }
  }

  animEditPos === 'start' && tl.pause();

  return;
};
