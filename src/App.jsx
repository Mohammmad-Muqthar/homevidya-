import { useEffect } from "react";

import Lenis from "lenis";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import AcademicPrograms from "./components/AcademicPrograms/AcademicPrograms";
import LifeAtSchool from "./components/LifeAtSchool/LifeAtSchool";
import TheWay from "./components/TheWay/TheWay";
import QuickFacts from "./components/QuickFacts/QuickFacts";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);


function App() {
  useEffect(() => {
    /* =====================================================
       LENIS
    ===================================================== */

    const lenis = new Lenis({
      duration: 1.1,

      smoothWheel: true,

      wheelMultiplier: 0.9,

      touchMultiplier: 1,

      infinite: false,
    });


    /* =====================================================
       KEEP SCROLLTRIGGER SYNCED
    ===================================================== */

    const handleScroll = () => {
      ScrollTrigger.update();
    };


    lenis.on("scroll", handleScroll);


    /* =====================================================
       GSAP TICKER → LENIS
    ===================================================== */

    const update = (time) => {
      lenis.raf(time * 1000);
    };


    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);


    /* =====================================================
       INITIAL REFRESH
    ===================================================== */

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);


    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      clearTimeout(refreshTimer);

      gsap.ticker.remove(update);

      lenis.off("scroll", handleScroll);

      lenis.destroy();

      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);


  return (
    <div className="app">

      <Navbar />


      <main className="site-main">

        <Hero />

        <About />
        <AcademicPrograms />

        <LifeAtSchool />
        <TheWay />
        <QuickFacts />
        <FAQ />
        <Footer />
      </main>

    </div>
  );
}


export default App;