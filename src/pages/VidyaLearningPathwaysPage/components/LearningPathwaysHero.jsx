import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./LearningPathwaysHero.css";


gsap.registerPlugin(
  ScrollTrigger
);


export default function LearningPathwaysHero() {
  const sectionRef =
    useRef(null);

  const mediaRef =
    useRef(null);

  const contentRef =
    useRef(null);


  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const media =
      mediaRef.current;

    const content =
      contentRef.current;


    if (
      !section ||
      !media ||
      !content
    ) {
      return undefined;
    }


    const ctx =
      gsap.context(() => {

        /* =========================================
           INTRO
        ========================================= */

        gsap.fromTo(
          content.children,

          {
            y:
              28,

            opacity:
              0,
          },

          {
            y:
              0,

            opacity:
              1,

            duration:
              1,

            stagger:
              0.08,

            ease:
              "power4.out",

            delay:
              0.1,
          }
        );


        /* =========================================
           IMAGE SCROLL ZOOM
        ========================================= */

        gsap.to(
          media,

          {
            scale:
              1.07,

            ease:
              "none",

            scrollTrigger: {
              trigger:
                section,

              start:
                "top top",

              end:
                "bottom top",

              scrub:
                1,

              invalidateOnRefresh:
                true,
            },
          }
        );


        /* =========================================
           CONTENT SCROLL
        ========================================= */

        gsap.to(
          content,

          {
            y:
              -52,

            opacity:
              0.72,

            ease:
              "none",

            scrollTrigger: {
              trigger:
                section,

              start:
                "top top",

              end:
                "bottom 35%",

              scrub:
                1,

              invalidateOnRefresh:
                true,
            },
          }
        );

      }, section);


    return () => {
      ctx.revert();
    };

  }, []);


  return (
    <section
      ref={sectionRef}
      className="pathways-hero"
      data-navbar-hero
    >

      {/* =========================================
          INDIAN SCHOOL CLASSROOM IMAGE
      ========================================= */}

      <img
        ref={mediaRef}
        className="pathways-hero__media"
        src="https://images.unsplash.com/photo-1719159381916-062fa9f435a6?auto=format&fit=crop&w=2600&q=92"
        alt="Indian school students learning in a classroom"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        draggable="false"
      />


      {/* =========================================
          CONTENT
      ========================================= */}

      <div
        ref={contentRef}
        className="pathways-hero__content"
      >

        {/* =====================================
            TITLE
        ====================================== */}

        <h1 className="pathways-hero__title">

          <span className="pathways-hero__line">
            One framework.
          </span>


          <span className="pathways-hero__line">
            Three stages.
          </span>


          <span className="pathways-hero__line">

            A lifetime{" "}

            <span className="pathways-hero__accent">
              of thinking.
            </span>

          </span>

        </h1>


        {/* =====================================
            DESCRIPTION
        ====================================== */}

        <p className="pathways-hero__intro">
          A continuous learning journey designed to
          evolve with the student — from the earliest
          years through senior school and beyond.
        </p>

      </div>

    </section>
  );
}