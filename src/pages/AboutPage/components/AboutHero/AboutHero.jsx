import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./AboutHero.css";


gsap.registerPlugin(
  ScrollTrigger
);


/* =========================================================
   IMAGES
========================================================= */

const aboutImages = [
  {
    id: "01",

    src:
      "https://images.unsplash.com/photo-1692269725827-699e04a11cdf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZGlhbiUyMHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D",

    alt:
      "Learning at Vidya Academy",
  },

  {
    id: "02",

    src:
      "https://images.unsplash.com/photo-1623863568368-69e4cbe6cc0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGluZGlhbiUyMHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D",

    alt:
      "Students learning together",
  },

  {
    id: "03",

    src:
      "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwc2Nob29sfGVufDB8fDB8fHww",

    alt:
      "Students together at Vidya Academy",

    focus:
      true,
  },

  {
    id: "04",

    src:
      "https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwc2Nob29sfGVufDB8fDB8fHww",

    alt:
      "School community at Vidya Academy",
  },
];


/* =========================================================
   COMPONENT
========================================================= */

const AboutHero = () => {
  const sectionRef =
    useRef(null);

  const stageRef =
    useRef(null);

  const copyRef =
    useRef(null);

  const cardRefs =
    useRef([]);


  /* =========================================================
     DESKTOP SCROLL ANIMATION
  ========================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const stage =
      stageRef.current;

    const copy =
      copyRef.current;


    if (
      !section ||
      !stage ||
      !copy
    ) {
      return undefined;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(() => {

        /* =====================================================
           DESKTOP ONLY
        ===================================================== */

        mm.add(
          "(min-width: 769px)",

          () => {
            const card01 =
              cardRefs.current[0];

            const card02 =
              cardRefs.current[1];

            const card03 =
              cardRefs.current[2];

            const card04 =
              cardRefs.current[3];


            if (!card03) {
              return undefined;
            }


            /* =================================================
               TARGET Y
            ================================================= */

            const getTargetY = (
              card,
              targetTopRatio
            ) => {
              if (!card) {
                return 0;
              }


              const targetTop =
                stage.clientHeight *
                targetTopRatio;


              return (
                targetTop -
                card.offsetTop
              );
            };


            const getDesktopY01 =
              () =>
                getTargetY(
                  card01,
                  0.18
                );


            const getDesktopY02 =
              () =>
                getTargetY(
                  card02,
                  0.21
                );


            const getDesktopY03 =
              () =>
                getTargetY(
                  card03,
                  0.14
                );


            const getDesktopY04 =
              () =>
                getTargetY(
                  card04,
                  0.18
                );


            /* =================================================
               RESET
            ================================================= */

            gsap.set(
              card03,

              {
                clearProps:
                  "left,right,top,bottom,width,height",
              }
            );


            gsap.set(
              copy,

              {
                x:
                  0,

                y:
                  0,

                opacity:
                  1,

                force3D:
                  true,
              }
            );


            gsap.set(
              [
                card01,
                card02,
                card03,
                card04,
              ].filter(Boolean),

              {
                x:
                  0,

                y:
                  0,

                scale:
                  1,

                opacity:
                  1,

                force3D:
                  true,
              }
            );


            /* =================================================
               LAYERS
            ================================================= */

            gsap.set(
              card03,

              {
                zIndex:
                  100,

                transformOrigin:
                  "0% 0%",
              }
            );


            if (card01) {
              gsap.set(
                card01,

                {
                  zIndex:
                    10,
                }
              );
            }


            if (card02) {
              gsap.set(
                card02,

                {
                  zIndex:
                    20,
                }
              );
            }


            if (card04) {
              gsap.set(
                card04,

                {
                  zIndex:
                    20,
                }
              );
            }


            /* =================================================
               TIMELINE
            ================================================= */

            const timeline =
              gsap.timeline({

                defaults: {
                  ease:
                    "none",
                },

                scrollTrigger: {
                  trigger:
                    stage,

                  start:
                    "top top",

                  end:
                    () =>
                      `+=${
                        stage.clientHeight *
                        3.4
                      }`,

                  scrub:
                    1,

                  pin:
                    true,

                  pinSpacing:
                    true,

                  anticipatePin:
                    1,

                  invalidateOnRefresh:
                    true,
                },
              });


            /* =================================================
               MOVE UP
            ================================================= */

            timeline.addLabel(
              "moveUp",
              0
            );


            /* TEXT PHYSICALLY MOVES UP */

            timeline.to(
              copy,

              {
                y:
                  () =>
                    -(
                      copy.offsetTop +
                      copy.offsetHeight +
                      38
                    ),

                duration:
                  0.84,

                ease:
                  "power1.inOut",
              },

              "moveUp"
            );


            if (card01) {
              timeline.to(
                card01,

                {
                  y:
                    () =>
                      getDesktopY01(),

                  duration:
                    0.84,

                  ease:
                    "power1.inOut",
                },

                "moveUp"
              );
            }


            if (card02) {
              timeline.to(
                card02,

                {
                  y:
                    () =>
                      getDesktopY02(),

                  duration:
                    0.84,

                  ease:
                    "power1.inOut",
                },

                "moveUp"
              );
            }


            timeline.to(
              card03,

              {
                y:
                  () =>
                    getDesktopY03(),

                duration:
                  0.84,

                ease:
                  "power1.inOut",
              },

              "moveUp"
            );


            if (card04) {
              timeline.to(
                card04,

                {
                  y:
                    () =>
                      getDesktopY04(),

                  duration:
                    0.84,

                  ease:
                    "power1.inOut",
                },

                "moveUp"
              );
            }


            /* =================================================
               HOLD
            ================================================= */

            timeline.to(
              {},

              {
                duration:
                  0.2,
              }
            );


            /* =================================================
               ZOOM
            ================================================= */

            timeline.addLabel(
              "zoom"
            );


            if (card01) {
              timeline.to(
                card01,

                {
                  x:
                    () =>
                      -stage.clientWidth *
                      0.31,

                  y:
                    () =>
                      getDesktopY01() -
                      stage.clientHeight *
                      0.025,

                  opacity:
                    0,

                  scale:
                    0.97,

                  duration:
                    0.7,

                  ease:
                    "power2.inOut",
                },

                "zoom"
              );
            }


            if (card02) {
              timeline.to(
                card02,

                {
                  x:
                    () =>
                      -stage.clientWidth *
                      0.24,

                  y:
                    () =>
                      getDesktopY02(),

                  opacity:
                    0,

                  scale:
                    0.98,

                  duration:
                    0.7,

                  ease:
                    "power2.inOut",
                },

                "zoom"
              );
            }


            if (card04) {
              timeline.to(
                card04,

                {
                  x:
                    () =>
                      stage.clientWidth *
                      0.3,

                  y:
                    () =>
                      getDesktopY04() -
                      stage.clientHeight *
                      0.02,

                  opacity:
                    0,

                  scale:
                    0.98,

                  duration:
                    0.7,

                  ease:
                    "power2.inOut",
                },

                "zoom"
              );
            }


            /* =================================================
               FOCUS IMAGE FULLSCREEN
            ================================================= */

            timeline.to(
              card03,

              {
                x:
                  0,

                y:
                  0,

                left:
                  0,

                bottom:
                  0,

                width:
                  () =>
                    stage.clientWidth,

                height:
                  () =>
                    stage.clientHeight,

                duration:
                  0.88,

                ease:
                  "power2.inOut",

                force3D:
                  true,
              },

              "zoom"
            );


            /* =================================================
               FINAL HOLD
            ================================================= */

            timeline.to(
              {},

              {
                duration:
                  0.2,
              }
            );


            return () => {
              timeline
                .scrollTrigger
                ?.kill();


              timeline.kill();
            };
          }
        );

      }, section);


    /* =====================================================
       RESIZE / REFRESH
    ===================================================== */

    let resizeTimer;


    let previousWidth =
      window.innerWidth;


    const refresh =
      () => {
        ScrollTrigger.refresh();
      };


    const handleResize =
      () => {
        const width =
          window.innerWidth;


        if (
          Math.abs(
            width -
            previousWidth
          ) < 3
        ) {
          return;
        }


        previousWidth =
          width;


        clearTimeout(
          resizeTimer
        );


        resizeTimer =
          setTimeout(
            refresh,
            160
          );
      };


    /* =====================================================
       IMAGES READY
    ===================================================== */

    const images =
      Array.from(
        section.querySelectorAll(
          "img"
        )
      );


    Promise.all(
      images.map(
        (image) => {
          if (
            image.complete
          ) {
            return Promise.resolve();
          }


          return new Promise(
            (resolve) => {
              const done =
                () =>
                  resolve();


              image.addEventListener(
                "load",
                done,
                {
                  once:
                    true,
                }
              );


              image.addEventListener(
                "error",
                done,
                {
                  once:
                    true,
                }
              );
            }
          );
        }
      )
    ).then(
      refresh
    );


    document.fonts
      ?.ready
      ?.then(
        refresh
      );


    window.addEventListener(
      "resize",
      handleResize,
      {
        passive:
          true,
      }
    );


    requestAnimationFrame(
      () => {
        requestAnimationFrame(
          refresh
        );
      }
    );


    /* =====================================================
       CLEANUP
    ===================================================== */

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
     JSX
  ========================================================= */

  return (
    <section
      ref={sectionRef}
      className="about-hero"
      data-navbar-hero
    >

      <div
        ref={stageRef}
        className="about-hero-stage"
      >

        {/* =========================================
            HERO TEXT
        ========================================= */}

        <div
          ref={copyRef}
          className="about-hero-copy"
        >

          <h1 className="about-hero-title">

            <span className="about-hero-title-line">
              A school should be
            </span>


            <span className="about-hero-title-line">
              where curiosity turns
            </span>


            <span className="about-hero-title-line">

              into{" "}

              <span className="about-hero-accent">
                confidence.
              </span>

            </span>

          </h1>

        </div>


        {/* =========================================
            IMAGE GALLERY
        ========================================= */}

        <div className="about-hero-gallery">

          {aboutImages.map(
            (
              image,
              index
            ) => {
              const isFocus =
                image.focus;


              return (
                <figure
                  key={
                    image.id
                  }

                  ref={(
                    element
                  ) => {
                    cardRefs.current[
                      index
                    ] =
                      element;
                  }}

                  className={`
                    about-hero-card
                    about-hero-card--${image.id}
                    ${
                      isFocus
                        ? "about-hero-card--focus"
                        : ""
                    }
                  `}
                >

                  <img
                    src={
                      image.src
                    }

                    alt={
                      image.alt
                    }

                    loading="eager"

                    fetchPriority={
                      isFocus
                        ? "high"
                        : "auto"
                    }

                    decoding="async"

                    draggable="false"
                  />

                </figure>
              );
            }
          )}

        </div>

      </div>

    </section>
  );
};


export default AboutHero;