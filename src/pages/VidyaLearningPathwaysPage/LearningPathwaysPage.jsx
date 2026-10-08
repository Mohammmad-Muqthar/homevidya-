import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LearningPathwaysHero from "./components/LearningPathwaysHero";
import ProgrammeOverview from "./components/ProgrammeOverview";
import ProgrammeSection from "./components/ProgrammeSection";
import ContinuumSection from "./components/ContinuumSection";
import CareerGuidance from "./components/CareerGuidance";
import LearningPathwaysTourBar from "./components/LearningPathwaysTourBar";

import { programmes } from "./data/programmes";
import "./LearningPathwaysPage.css";

gsap.registerPlugin(ScrollTrigger);

export default function LearningPathwaysPage() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray(".pathways-reveal");

      revealItems.forEach((item) => {
        gsap.fromTo(
          item,
          {
            y: 34,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      const images = gsap.utils.toArray(".pathways-media img");

      images.forEach((image) => {
        gsap.fromTo(
          image,
          {
            scale: 1.07,
          },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image.closest(".pathways-media"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, page);

    const refresh = () => ScrollTrigger.refresh();

    requestAnimationFrame(() => {
      requestAnimationFrame(refresh);
    });

    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className="pathways-page">
      <LearningPathwaysHero />

      <ProgrammeOverview programmes={programmes} />

      <ProgrammeSection
        programme={programmes[0]}
        theme="dark"
      />

      <ProgrammeSection
        programme={programmes[1]}
        theme="rose"
        reverse
      />

      <ProgrammeSection
        programme={programmes[2]}
        theme="cream"
      />

      <ContinuumSection programmes={programmes} />

      <CareerGuidance />

      {/* <LearningPathwaysTourBar /> */}

      {/*
        Do NOT render Footer here if your MainLayout already renders:
        <Navbar />
        <Outlet />
        <Footer />

        The supplied reference recording stops before its footer.
        Your existing Vidya Academy footer will naturally appear next.
      */}
    </main>
  );
}
