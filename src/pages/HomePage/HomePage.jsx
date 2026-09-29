import {
  useCallback,
  useState,
} from "react";


/* =========================================================
   HOME INTRO
========================================================= */

import IntroReveal
  from "./components/HomeIntro/HomeIntro";


/* =========================================================
   HOME COMPONENTS
========================================================= */

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


/* =========================================================
   HOME PAGE
========================================================= */

export default function HomePage() {

  /* =======================================================
     HERO VIDEO READY
  ======================================================= */

  const [
    heroReady,
    setHeroReady,
  ] = useState(false);


  /* =======================================================
     INTRO

     Refresh Home:
     plays intro.

     Navigate away and return Home:
     does not replay during same browser load.
  ======================================================= */

  const [
    showIntro,
    setShowIntro,
  ] = useState(() => {

    if (
      typeof window ===
      "undefined"
    ) {
      return false;
    }


    return (
      window.__VIDYA_HOME_INTRO_DONE__
      !== true
    );

  });


  /* =======================================================
     INTRO COMPLETE
  ======================================================= */

  const handleIntroComplete =
    useCallback(() => {

      window.__VIDYA_HOME_INTRO_DONE__ =
        true;


      setShowIntro(false);

    }, []);


  /* =======================================================
     HERO VIDEO READY
  ======================================================= */

  const handleHeroReady =
    useCallback(() => {

      setHeroReady(true);

    }, []);


  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <>

      {/* ===================================================
          HOME INTRO
      =================================================== */}

      {showIntro && (

        <IntroReveal
          ready={heroReady}

          onComplete={
            handleIntroComplete
          }
        />

      )}


      {/* ===================================================
          HOME CONTENT

          IMPORTANT:
          Hero is mounted immediately so the real
          Hero video can show through VIDYA.
      =================================================== */}

      <div className="home-page">

        <Hero
          onVideoReady={
            handleHeroReady
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