import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   LENIS → SCROLLTRIGGER SYNC
========================================================= */

function ScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  return null;
}


/* =========================================================
   GLOBAL SMOOTH SCROLL
========================================================= */

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const update = (time) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    /*
      GSAP ticker time = seconds.
      Lenis expects milliseconds.
    */
    gsap.ticker.add(update);

    /*
      Removes GSAP lag compensation so the scrolling
      and animation timeline remain tightly synced.
    */
    gsap.ticker.lagSmoothing(0);

    /*
      Recalculate ScrollTrigger positions after page load.
    */
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);

      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,

        /*
          Smooth wheel scrolling
        */
        smoothWheel: true,

        /*
          Keep touch closer to native behavior.
          Better for mobile performance.
        */
        syncTouch: false,

        /*
          Scroll interpolation.
          Lower = softer / more cinematic.
        */
        lerp: 0.075,

        /*
          Wheel sensitivity.
        */
        wheelMultiplier: 0.9,

        /*
          Touch sensitivity.
        */
        touchMultiplier: 1,

        /*
          Allow anchor links later:
          #about
          #admissions
          etc.
        */
        anchors: true,
      }}
    >
      <ScrollTriggerSync />

      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;