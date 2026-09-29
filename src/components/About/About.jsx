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
           DESKTOP
        ===================================================== */

        mm.add(
          "(min-width: 769px)",

          () => {

            /* =================================================
               TEXT ENTRANCE

               This happens BEFORE the About section
               reaches the top/pinned position.

               So:
               1. section enters viewport
               2. text fully settles
               3. section pins
               4. small hold
               5. green transition begins
            ================================================= */

            const introItems =
              gsap.utils.toArray([
                ".vidya-about-intro-title",
                ".vidya-about-intro-divider",
                ".vidya-about-intro-copy",
                ".vidya-about-intro-values",
              ]);


            const introTimeline =
              gsap.timeline({
                scrollTrigger: {
                  trigger:
                    section,

                  start:
                    "top 88%",

                  end:
                    "top 18%",

                  scrub:
                    0.55,

                  invalidateOnRefresh:
                    true,
                },
              });


            introTimeline.fromTo(
              introItems,

              {
                y:
                  48,

                opacity:
                  0,
              },

              {
                y:
                  0,

                opacity:
                  1,

                stagger:
                  0.08,

                ease:
                  "none",
              }
            );


            /* =================================================
               INITIAL TRANSITION POSITIONS
            ================================================= */

            gsap.set(
              green,
              {
                y: () =>
                  stage.offsetHeight *
                  0.90,
              }
            );


            /*
              Gallery stays very close behind green.

              This prevents large empty green space.
            */

            gsap.set(
              story,
              {
                y: () =>
                  stage.offsetHeight *
                  0.92,
              }
            );


            /* =================================================
               MAIN PINNED TRANSITION
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
                      0.82
                    }`,

                  scrub:
                    0.82,

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


            /* =================================================
               SMALL HOLD

               User sees complete text section
               before anything covers it.
            ================================================= */

            timeline.to(
              {},
              {
                duration:
                  0.18,
              }
            );


            /* =================================================
               GREEN CURVE
            ================================================= */

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

              0.18
            );


            /* =================================================
               IMAGES

               Follow closely behind green.
            ================================================= */

            timeline.to(
              story,

              {
                y:
                  0,

                duration:
                  0.74,

                ease:
                  "none",
              },

              0.225
            );


            return () => {
              introTimeline.kill();
              timeline.kill();
            };
          }
        );


        /* =====================================================
           MOBILE

           KEEP CURRENT MOBILE BEHAVIOUR
        ===================================================== */

        mm.add(
          "(max-width: 768px)",

          () => {

            gsap.set(
              green,
              {
                y: () =>
                  stage.offsetHeight *
                  0.86,
              }
            );


            gsap.set(
              story,
              {
                y: () =>
                  stage.offsetHeight *
                  0.87,
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
                      0.50
                    }`,

                  scrub:
                    0.58,

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
              green,

              {
                y: () =>
                  -stage.offsetHeight *
                  0.16,

                duration:
                  0.69,

                ease:
                  "none",
              },

              0
            );


            timeline.to(
              story,

              {
                y:
                  0,

                duration:
                  0.64,

                ease:
                  "none",
              },

              0.055
            );


            return () => {
              timeline.kill();
            };
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


            {/* =============================================
                HEADING
            ============================================= */}

            <h2 className="vidya-about-intro-title">

              Our Learning{" "}

              <span>
                Philosophy.
              </span>

            </h2>


            {/* =============================================
                DIVIDER
            ============================================= */}

            <div className="vidya-about-intro-divider" />


            {/* =============================================
                BODY
            ============================================= */}

            <div className="vidya-about-intro-copy">

              <p>

                At Vidya Academy, we believe that
                education is more than the lessons
                taught in a classroom. Every child
                brings unique interests, abilities
                and ideas to school, and our approach
                encourages them to explore these
                qualities with curiosity and
                confidence.

              </p>


              <p>

                Learning at Vidya Academy is designed
                to be engaging, purposeful and
                connected to everyday life. Through
                classroom discussions, practical
                activities, creative experiences and
                collaborative projects, students are
                encouraged to participate actively
                in their own learning.

              </p>

            </div>


            {/* =============================================
                VALUES
            ============================================= */}

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
            GREEN TRANSITION
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


                  <span className="vidya-about-gallery-number">
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