import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import IntroReveal
  from "./components/HomeIntro/HomeIntro";

import Hero
  from "./components/Hero/Hero";

import About
  from "./components/About/About";

import AcademicPrograms
  from "./components/AcademicPrograms/AcademicPrograms";

import LifeAtSchool
  from "./components/LifeAtSchool/LifeAtSchool";

import TheWay
  from "./components/TheWay/TheWay";

import QuickFacts
  from "./components/QuickFacts/QuickFacts";

import FAQ
  from "./components/FAQ/FAQ";


export default function HomePage() {

  /* =========================================================
     CHECK WHETHER INTRO ALREADY PLAYED
  ========================================================= */

  const introAlreadyDone =
    typeof window !== "undefined" &&
    window.__VIDYA_HOME_INTRO_DONE__ === true;


  /* =========================================================
     HERO VIDEO READY
  ========================================================= */

  const [
    heroReady,
    setHeroReady,
  ] = useState(false);


  /* =========================================================
     INTRO
  ========================================================= */

  const [
    showIntro,
    setShowIntro,
  ] = useState(
    () => !introAlreadyDone
  );


  /* =========================================================
     HERO CONTENT

     false while VIDYA intro is active.

     After intro finishes:
     wait only 120ms,
     then Hero text appears.
  ========================================================= */

  const [
    showHeroContent,
    setShowHeroContent,
  ] = useState(
    () => introAlreadyDone
  );


  const revealTimerRef =
    useRef(null);


  /* =========================================================
     HERO VIDEO READY
  ========================================================= */

  const handleHeroReady =
    useCallback(() => {

      setHeroReady(true);

    }, []);


  /* =========================================================
     INTRO COMPLETE
  ========================================================= */

  const handleIntroComplete =
    useCallback(() => {

      window.__VIDYA_HOME_INTRO_DONE__ =
        true;


      /* -----------------------------------------------
         REMOVE VIDYA INTRO FIRST
      ------------------------------------------------ */

      setShowIntro(false);


      /* -----------------------------------------------
         HERO TEXT

         Small 120ms separation.

         Fast enough to feel connected,
         but Hero text cannot appear
         during the VIDYA zoom.
      ------------------------------------------------ */

      revealTimerRef.current =
        window.setTimeout(() => {

          setShowHeroContent(true);

        }, 120);

    }, []);


  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {

    return () => {

      if (
        revealTimerRef.current
      ) {

        window.clearTimeout(
          revealTimerRef.current
        );

      }

    };

  }, []);


  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <>

      {/* ===================================================
          VIDYA INTRO
      =================================================== */}

      {showIntro && (

        <IntroReveal
          ready={
            heroReady
          }

          onComplete={
            handleIntroComplete
          }
        />

      )}


      {/* ===================================================
          HOME PAGE
      =================================================== */}

      <div className="home-page">

        <Hero
          onVideoReady={
            handleHeroReady
          }

          showContent={
            showHeroContent
          }
        />


        <About />


        <AcademicPrograms />


        <LifeAtSchool />


        <TheWay />


        <QuickFacts />


        <FAQ />

      </div>

    </>
  );
}