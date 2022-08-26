import React, { useEffect, useRef, createContext, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const GsapContext = createContext(null);

export const AnimationWrapper = ({ children }) => {
  const ref = useRef();
  const q = gsap.utils.selector(ref);

  useEffect(() => {
    // Refresh ScrollTrigger when page switches, fixes snap positions staying through pages
    window.onload = () => ScrollTrigger.refresh();
  }, []);

  return (
    <div className="gsapAnimationsWrapper" ref={ref}>
      <GsapContext.Provider value={{ gsap, q }}>
        {children}
      </GsapContext.Provider>
    </div>
  );
};
