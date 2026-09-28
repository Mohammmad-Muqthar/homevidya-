import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./About.css";

gsap.registerPlugin(ScrollTrigger);


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


    const ctx =
      gsap.context(() => {

        const mm =
          gsap.matchMedia();


        /* =====================================================
           DESKTOP
        ===================================================== */

        mm.add(
          "(min-width: 769px)",

          () => {

            /*
              Green starts higher than before.
              This removes the large white empty area.
            */

            gsap.set(
              green,
              {
                y: () =>
                  stage.offsetHeight *
                  0.46,
              }
            );


            /*
              Story sits very close behind green.
            */

            gsap.set(
              story,
              {
                y: () =>
                  stage.offsetHeight *
                  0.49,
              }
            );


            const timeline =
              gsap.timeline({
                scrollTrigger: {
                  trigger:
                    section,

                  start:
                    "top top",

                  /*
                    Shorter overall slide.
                  */

                  end: () =>
                    `+=${
                      stage.offsetHeight *
                      0.46
                    }`,

                  scrub:
                    0.62,

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


            /* GREEN */

            timeline.to(
              green,
              {
                y: () =>
                  -stage.offsetHeight *
                  0.15,

                duration:
                  0.68,

                ease:
                  "none",
              },

              0
            );


            /* STORY */

            timeline.to(
              story,
              {
                y:
                  0,

                duration:
                  0.60,

                ease:
                  "none",
              },

              0.045
            );


            return () => {
              timeline.kill();
            };
          }
        );


        /* =====================================================
           MOBILE
        ===================================================== */

        mm.add(
          "(max-width: 768px)",

          () => {

            /*
              Much less empty space.

              Green starts around 41%,
              story starts just behind it.
            */

            gsap.set(
              green,
              {
                y: () =>
                  stage.offsetHeight *
                  0.41,
              }
            );


            gsap.set(
              story,
              {
                y: () =>
                  stage.offsetHeight *
                  0.44,
              }
            );


            const timeline =
              gsap.timeline({
                scrollTrigger: {
                  trigger:
                    section,

                  start:
                    "top top",

                  /*
                    Shorter mobile slide.
                  */

                  end: () =>
                    `+=${
                      stage.offsetHeight *
                      0.36
                    }`,

                  scrub:
                    0.56,

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


            /* GREEN */

            timeline.to(
              green,
              {
                y: () =>
                  -stage.offsetHeight *
                  0.13,

                duration:
                  0.66,

                ease:
                  "none",
              },

              0
            );


            /* STORY */

            timeline.to(
              story,
              {
                y:
                  0,

                duration:
                  0.59,

                ease:
                  "none",
              },

              0.035
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
            INTRO
        ================================================= */}

        <div className="vidya-about-intro">

          <div className="vidya-about-intro-inner">

            <h2 className="vidya-about-intro-title">

              Learning should prepare
              <br />

              children for more than

              <span>
                the next exam.
              </span>

            </h2>


            <p className="vidya-about-intro-text">

              It should give them the confidence
              to question, discover and shape
              what comes next.

            </p>

          </div>

        </div>


        {/* =================================================
            GREEN
        ================================================= */}

        <div
          ref={greenRef}
          className="vidya-about-green"
          aria-hidden="true"
        />


        {/* =================================================
            STORY
        ================================================= */}

        <div
          ref={storyRef}
          className="vidya-about-story"
        >

          <div className="vidya-about-story-inner">


            {/* ===========================================
                IMAGE
            ============================================ */}

            <div className="vidya-about-visual">

              <div className="vidya-about-photo">

                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90"
                  alt="Students learning at Vidya Academy"
                />


                <div
                  className="vidya-about-photo-overlay"
                />


                <div className="vidya-about-photo-top">

                  <span />

                  <p>
                    THE VIDYA EXPERIENCE
                  </p>

                </div>


                <div className="vidya-about-photo-content">

                  <p className="vidya-about-photo-label">
                    DISCOVER OUR WORLD
                  </p>


                  <h3>

                    A place to learn.

                    <span>
                      A place to belong.
                    </span>

                  </h3>

                </div>

              </div>

            </div>


            {/* ===========================================
                COPY
            ============================================ */}

            <div className="vidya-about-story-copy">

              <h2>
                Our Learning Philosophy
              </h2>


              <div className="vidya-about-divider" />


              <p className="vidya-about-story-text">

                At Vidya Academy, we believe that
                education is more than the lessons
                taught in a classroom. Every child
                brings unique interests, abilities
                and ideas to school, and our approach
                encourages them to explore these
                qualities with curiosity and
                confidence.

              </p>


              <p className="vidya-about-story-text">

                Learning at Vidya Academy is designed
                to be engaging, purposeful and
                connected to everyday life. Through
                classroom discussions, practical
                activities, creative experiences and
                collaborative projects, students are
                encouraged to participate actively
                in their own learning.

              </p>


              <div className="vidya-about-values">

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

        </div>

      </div>

    </section>
  );
};


export default About;