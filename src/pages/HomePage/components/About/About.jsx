import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./About.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   GALLERY DATA
========================================================= */

const galleryImages = [
  {
    id: "01",
    badge: "LEARN",

    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90",

    alt:
      "Students learning at Vidya Academy",
  },

  {
    id: "02",
    badge: "EXPLORE",

    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=90",

    alt:
      "Students learning together",
  },

  {
    id: "03",
    badge: "GROW",

    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=90",

    alt:
      "Students experiencing school life",
  },
];


/* =========================================================
   COMPLETE REVERSE-U CURVES
========================================================= */

const curveLevels = [
  { inset: -120, apex: 8 },
  { inset: -82, apex: 42 },
  { inset: -44, apex: 76 },
  { inset: -6, apex: 110 },

  { inset: 32, apex: 144 },
  { inset: 70, apex: 178 },
  { inset: 108, apex: 212 },
  { inset: 146, apex: 246 },

  { inset: 184, apex: 280 },
  { inset: 222, apex: 314 },
  { inset: 260, apex: 348 },
  { inset: 298, apex: 382 },

  { inset: 336, apex: 416 },
  { inset: 374, apex: 450 },
  { inset: 412, apex: 484 },
  { inset: 450, apex: 518 },

  { inset: 488, apex: 552 },
  { inset: 526, apex: 586 },
  { inset: 564, apex: 620 },
  { inset: 602, apex: 654 },

  { inset: 640, apex: 688 },
  { inset: 678, apex: 722 },
];


/* =========================================================
   BUILD COMPLETE ∩ PATH
========================================================= */

const buildReverseUPath = (
  inset,
  apex
) => {

  const left =
    inset;

  const right =
    1600 - inset;

  const center =
    800;

  const bottom =
    1000;


  /*
    Shoulder determines how vertically
    the sides rise before rounding
    into the top of the arch.
  */

  const shoulder =
    Math.min(
      850,
      Math.max(
        apex + 185,
        220
      )
    );


  const innerControl =
    Math.max(
      80,
      (right - left) * 0.19
    );


  return `
    M ${left} ${bottom}

    C
      ${left}
      ${shoulder}

      ${center - innerControl}
      ${apex}

      ${center}
      ${apex}

    C
      ${center + innerControl}
      ${apex}

      ${right}
      ${shoulder}

      ${right}
      ${bottom}
  `;

};


/* =========================================================
   SECONDARY CURVES

   Insert a line between every
   two main lines.
========================================================= */

const secondaryCurveLevels =
  curveLevels
    .slice(
      0,
      -1
    )
    .map(
      (
        current,
        index
      ) => {

        const next =
          curveLevels[
            index + 1
          ];


        return {
          inset:
            (
              current.inset +
              next.inset
            ) / 2,

          apex:
            (
              current.apex +
              next.apex
            ) / 2,
        };

      }
    );


/* =========================================================
   CURVE SVG
========================================================= */

function AboutCurveLines({
  className = "",
}) {

  return (

    <svg
      className={`
        vidya-about-curves
        ${className}
      `}
      viewBox="0 0 1600 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >

      {/* MAIN LINES */}

      <g className="vidya-about-curves-main">

        {curveLevels.map(
          (
            curve,
            index
          ) => (

            <path
              key={
                `main-${index}`
              }
              d={
                buildReverseUPath(
                  curve.inset,
                  curve.apex
                )
              }
            />

          )
        )}

      </g>


      {/* EXTRA LINES */}

      <g className="vidya-about-curves-secondary">

        {secondaryCurveLevels.map(
          (
            curve,
            index
          ) => (

            <path
              key={
                `secondary-${index}`
              }
              d={
                buildReverseUPath(
                  curve.inset,
                  curve.apex
                )
              }
            />

          )
        )}

      </g>

    </svg>

  );

}


/* =========================================================
   ABOUT
========================================================= */

const About = () => {

  const sectionRef =
    useRef(null);

  const stageRef =
    useRef(null);

  const greenRef =
    useRef(null);

  const storyRef =
    useRef(null);


  /* =========================================================
     SCROLL ANIMATION
  ========================================================= */

  useLayoutEffect(() => {

    const section =
      sectionRef.current;

    const stage =
      stageRef.current;

    const green =
      greenRef.current;

    const story =
      storyRef.current;


    if (
      !section ||
      !stage ||
      !green ||
      !story
    ) {

      return;

    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(
        () => {

          /* =================================================
             LARGE DESKTOP
          ================================================= */

          mm.add(
            "(min-width: 1201px)",

            () => {

              const introItems =
                section.querySelectorAll(
                  [
                    ".vidya-about-intro-title",
                    ".vidya-about-intro-divider",
                    ".vidya-about-intro-copy",
                    ".vidya-about-intro-values",
                  ].join(",")
                );


              /* =============================================
                 INTRO
              ============================================= */

              const introTimeline =
                gsap.timeline({

                  scrollTrigger: {

                    trigger:
                      section,

                    start:
                      "top 90%",

                    end:
                      "top 22%",

                    scrub:
                      0.9,

                    invalidateOnRefresh:
                      true,

                  },

                });


              introTimeline.fromTo(
                introItems,

                {
                  y:
                    34,

                  opacity:
                    0,
                },

                {
                  y:
                    0,

                  opacity:
                    1,

                  stagger:
                    0.055,

                  ease:
                    "none",
                }
              );


              /* =============================================
                 START POSITIONS
              ============================================= */

              gsap.set(
                green,

                {
                  y: () =>
                    stage.offsetHeight *
                    0.86,

                  force3D:
                    true,
                }
              );


              gsap.set(
                story,

                {
                  y: () =>
                    stage.offsetHeight *
                    0.9,

                  force3D:
                    true,
                }
              );


              /* =============================================
                 MAIN SMOOTH SLIDE
              ============================================= */

              const timeline =
                gsap.timeline({

                  scrollTrigger: {

                    trigger:
                      section,

                    start:
                      "top top",

                    end: () =>
                      `+=${
                        stage.offsetHeight *
                        1.05
                      }`,

                    scrub:
                      1.15,

                    pin:
                      stage,

                    pinSpacing:
                      true,

                    anticipatePin:
                      1,

                    invalidateOnRefresh:
                      true,

                  },

                });


              timeline.to(
                {},
                {
                  duration:
                    0.07,
                }
              );


              timeline.to(
                green,

                {
                  y: () =>
                    -stage.offsetHeight *
                    0.06,

                  duration:
                    0.96,

                  ease:
                    "none",
                },

                0.07
              );


              timeline.to(
                story,

                {
                  y:
                    0,

                  duration:
                    0.92,

                  ease:
                    "none",
                },

                0.13
              );


              return () => {

                introTimeline.kill();

                timeline.kill();

              };

            }
          );


          /* =================================================
             LAPTOP
          ================================================= */

          mm.add(
            "(min-width: 769px) and (max-width: 1200px)",

            () => {

              const introItems =
                section.querySelectorAll(
                  [
                    ".vidya-about-intro-title",
                    ".vidya-about-intro-divider",
                    ".vidya-about-intro-copy",
                    ".vidya-about-intro-values",
                  ].join(",")
                );


              const introTimeline =
                gsap.timeline({

                  scrollTrigger: {

                    trigger:
                      section,

                    start:
                      "top 90%",

                    end:
                      "top 22%",

                    scrub:
                      0.85,

                    invalidateOnRefresh:
                      true,

                  },

                });


              introTimeline.fromTo(
                introItems,

                {
                  y:
                    32,

                  opacity:
                    0,
                },

                {
                  y:
                    0,

                  opacity:
                    1,

                  stagger:
                    0.05,

                  ease:
                    "none",
                }
              );


              gsap.set(
                green,

                {
                  y: () =>
                    stage.offsetHeight *
                    0.9,

                  force3D:
                    true,
                }
              );


              gsap.set(
                story,

                {
                  y: () =>
                    stage.offsetHeight *
                    0.93,

                  force3D:
                    true,
                }
              );


              const timeline =
                gsap.timeline({

                  scrollTrigger: {

                    trigger:
                      section,

                    start:
                      "top top",

                    end: () =>
                      `+=${
                        stage.offsetHeight *
                        1
                      }`,

                    scrub:
                      1.05,

                    pin:
                      stage,

                    pinSpacing:
                      true,

                    anticipatePin:
                      1,

                    invalidateOnRefresh:
                      true,

                  },

                });


              timeline.to(
                {},
                {
                  duration:
                    0.07,
                }
              );


              timeline.to(
                green,

                {
                  y: () =>
                    -stage.offsetHeight *
                    0.055,

                  duration:
                    0.96,

                  ease:
                    "none",
                },

                0.07
              );


              timeline.to(
                story,

                {
                  y:
                    0,

                  duration:
                    0.92,

                  ease:
                    "none",
                },

                0.13
              );


              return () => {

                introTimeline.kill();

                timeline.kill();

              };

            }
          );


          /* =================================================
             MOBILE
          ================================================= */

          mm.add(
            "(max-width: 768px)",

            () => {

              gsap.set(
                green,

                {
                  clearProps:
                    "all",
                }
              );


              gsap.set(
                story,

                {
                  clearProps:
                    "all",
                }
              );


              return () => {};

            }
          );

        },

        section
      );


    /* =========================================================
       REFRESH
    ========================================================= */

    let resizeTimer;


    const refresh =
      () => {

        ScrollTrigger.refresh();

      };


    const handleResize =
      () => {

        clearTimeout(
          resizeTimer
        );


        resizeTimer =
          window.setTimeout(
            refresh,
            120
          );

      };


    requestAnimationFrame(
      refresh
    );


    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {

      clearTimeout(
        resizeTimer
      );


      window.removeEventListener(
        "resize",
        handleResize
      );


      mm.revert();

      ctx.revert();

    };

  }, []);


  /* =========================================================
     RETURN
  ========================================================= */

  return (

    <section
      ref={sectionRef}
      className="vidya-about"
      id="about"
    >

      <div
        ref={stageRef}
        className="vidya-about-stage"
      >

        {/* =================================================
            INTRO
        ================================================= */}

        <div className="vidya-about-intro">

          <div className="vidya-about-intro-inner">

            <h2 className="vidya-about-intro-title">

              <span className="vidya-about-title-dark">
                Our Learning
              </span>

              {" "}

              <span className="vidya-about-title-light">
                Philosophy.
              </span>

            </h2>


            <div
              className="vidya-about-intro-divider"
            />


            <div className="vidya-about-intro-copy">

              <p className="vidya-about-copy-lead">

                At Vidya Academy, learning goes beyond
                the classroom. Every child is encouraged
                to explore ideas with curiosity and
                confidence through meaningful discussions,
                practical activities, creative experiences
                and collaborative learning.

              </p>


              <p className="vidya-about-intro-extra vidya-about-intro-extra--1">

                We believe children learn best when they
                are actively involved in the process.
                Our learning environment encourages
                students to ask questions, communicate
                their ideas, work with others and discover
                different ways of approaching a challenge.

              </p>


              <p className="vidya-about-intro-extra vidya-about-intro-extra--2">

                Alongside academic learning, students are
                encouraged to become thoughtful,
                independent and confident learners.
                Each experience helps them connect
                knowledge with everyday life, develop
                their own perspective and continue
                growing with purpose.

              </p>


              <p className="vidya-about-desktop-extra">

                Our approach also creates opportunities for
                children to reflect on what they learn,
                understand their individual strengths and
                apply their knowledge with confidence.
                Through consistent guidance and purposeful
                experiences, students develop the habits,
                resilience and awareness needed to become
                capable learners prepared for the world
                beyond the classroom.
 Our approach also creates opportunities for
                children to reflect on what they learn,
                understand their individual strengths and
                apply their knowledge with confidence.
                Through consistent guidance and purposeful
                experiences, students develop the habits,
                resilience and awareness needed to become
                capable learners prepared for the world
                beyond the classroom.

              </p>

            </div>


            <div className="vidya-about-intro-values">

              <span>
                LEARN
              </span>

              <i />

              <span>
                EXPLORE
              </span>

              <i />

              <span>
                GROW
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            GREEN CURVED TRANSITION

            SAME LINE SYSTEM AS STORY BELOW
        ================================================= */}

        <div
          ref={greenRef}
          className="vidya-about-green"
          aria-hidden="true"
        >

          <div className="vidya-about-transition-line-window">

            <AboutCurveLines
              className="vidya-about-transition-curves"
            />

          </div>

        </div>


        {/* =================================================
            GREEN STORY / IMAGES
        ================================================= */}

        <div
          ref={storyRef}
          className="vidya-about-story"
        >

          {/* ===============================================
              ENTIRE GREEN BACKGROUND LINES
          =============================================== */}

          <div
            className="vidya-about-green-lines"
            aria-hidden="true"
          >

            <AboutCurveLines />

          </div>


          {/* ===============================================
              IMAGES
          =============================================== */}

          <div className="vidya-about-gallery">

            {galleryImages.map(
              (
                item,
                index
              ) => (

                <article
                  key={item.id}

                  className={`
                    vidya-about-gallery-card
                    vidya-about-gallery-card--${
                      index + 1
                    }
                  `}
                >

                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="eager"
                  />


                  <div
                    className="vidya-about-gallery-overlay"
                  />


                  <div className="vidya-about-gallery-badge">

                    <span>
                      {item.badge}
                    </span>

                  </div>

                </article>

              )
            )}

          </div>

        </div>

      </div>

    </section>

  );

};


export default About;