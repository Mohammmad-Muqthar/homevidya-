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
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90",
    alt:
      "Students learning at Vidya Academy",
  },

  {
    id: "02",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=90",
    alt:
      "Students learning together",
  },

  {
    id: "03",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=90",
    alt:
      "Students experiencing school life",
  },
];


const About = () => {
  const sectionRef =
    useRef(null);

  const stageRef =
    useRef(null);

  const greenRef =
    useRef(null);

  const storyRef =
    useRef(null);


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
      gsap.context(() => {

        /* =====================================================
           LARGE DESKTOP
        ===================================================== */

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


            /* =================================================
               TEXT ENTER
            ================================================= */

            const introTimeline =
              gsap.timeline({
                scrollTrigger: {
                  trigger:
                    section,

                  start:
                    "top 88%",

                  end:
                    "top 20%",

                  scrub:
                    0.55,

                  invalidateOnRefresh:
                    true,
                },
              });


            introTimeline.fromTo(
              introItems,

              {
                y: 38,
                opacity: 0,
              },

              {
                y: 0,
                opacity: 1,

                stagger:
                  0.055,

                ease:
                  "none",
              }
            );


            /* =================================================
               GREEN START
            ================================================= */

            gsap.set(
              green,
              {
                y: () =>
                  stage.offsetHeight *
                  0.84,
              }
            );


            /* =================================================
               GALLERY START
            ================================================= */

            gsap.set(
              story,
              {
                y: () =>
                  stage.offsetHeight *
                  0.87,
              }
            );


            /* =================================================
               MAIN TRANSITION
            ================================================= */

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
                      0.78
                    }`,

                  scrub:
                    0.78,

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
                  0.14,
              }
            );


            timeline.to(
              green,

              {
                y: () =>
                  -stage.offsetHeight *
                  0.18,

                duration:
                  0.82,

                ease:
                  "none",
              },

              0.14
            );


            timeline.to(
              story,

              {
                y: 0,

                duration:
                  0.76,

                ease:
                  "none",
              },

              0.19
            );


            return () => {
              introTimeline.kill();
              timeline.kill();
            };
          }
        );


        /* =====================================================
           LAPTOP
        ===================================================== */

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
                    "top 88%",

                  end:
                    "top 20%",

                  scrub:
                    0.55,

                  invalidateOnRefresh:
                    true,
                },
              });


            introTimeline.fromTo(
              introItems,

              {
                y: 38,
                opacity: 0,
              },

              {
                y: 0,
                opacity: 1,

                stagger:
                  0.055,

                ease:
                  "none",
              }
            );


            gsap.set(
              green,
              {
                y: () =>
                  stage.offsetHeight *
                  0.90,
              }
            );


            gsap.set(
              story,
              {
                y: () =>
                  stage.offsetHeight *
                  0.92,
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
                      0.78
                    }`,

                  scrub:
                    0.78,

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
                  0.14,
              }
            );


            timeline.to(
              green,

              {
                y: () =>
                  -stage.offsetHeight *
                  0.18,

                duration:
                  0.82,

                ease:
                  "none",
              },

              0.14
            );


            timeline.to(
              story,

              {
                y: 0,

                duration:
                  0.76,

                ease:
                  "none",
              },

              0.19
            );


            return () => {
              introTimeline.kill();
              timeline.kill();
            };
          }
        );


        /* =====================================================
           MOBILE

           NO ANIMATION
           NO PIN
           NO SCROLL TRANSITION
        ===================================================== */

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

      }, section);


    let resizeTimer;


    const refresh = () => {
      ScrollTrigger.refresh();
    };


    const handleResize = () => {
      clearTimeout(
        resizeTimer
      );


      resizeTimer =
        setTimeout(
          refresh,
          100
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
            PHILOSOPHY
        ================================================= */}

        <div className="vidya-about-intro">

          <div className="vidya-about-intro-inner">


            <h2 className="vidya-about-intro-title">

              Our Learning{" "}

              <span>
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
            DESKTOP GREEN TRANSITION
        ================================================= */}

        <div
          ref={greenRef}
          className="vidya-about-green"
          aria-hidden="true"
        />


        {/* =================================================
            GALLERY
        ================================================= */}

        <div
          ref={storyRef}
          className="vidya-about-story"
        >

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


                  <span
                    className="vidya-about-gallery-number"
                  >
                    {item.id}
                  </span>

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