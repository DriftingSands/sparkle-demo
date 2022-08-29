import React, { useEffect, useRef, createContext } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import createAnimationTimeline from './TimelineHelperFunctions'
ScrollTrigger.defaults({toggleActions: 'play reverse play reverse'})
gsap.registerPlugin(ScrollTrigger);


export const TimelineProvider = createContext(null);

export const TimelineAnimationWrapper = ({ children }) => {
  const ref = useRef();
  const q = gsap.utils.selector(ref);

  const createTimeline = (timelineArray, timelineSettings) => {
    createAnimationTimeline(gsap, q, timelineArray, timelineSettings)
  }

  useEffect(() => {
    // Refresh ScrollTrigger when page switches, fixes snap positions staying through pages
    window.onload = () => ScrollTrigger.refresh();
  }, []);

  return (
    <div className="gsapAnimationsWrapper" ref={ref}>
      <TimelineProvider.Provider value={createTimeline}>
        {children}
      </TimelineProvider.Provider>
    </div>
  );
};
