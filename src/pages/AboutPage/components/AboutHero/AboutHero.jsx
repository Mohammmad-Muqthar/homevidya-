import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./AboutHero.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   IMAGES

   DESKTOP:
   01 / 02 / 03 / 04

   MOBILE:
   01 / 03 / 04

   IMAGE 03 = FOCUS IMAGE
========================================================= */

const aboutImages = [
  {
    id: "01",
    src:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2200&q=92",
    alt:
      "Learning at Vidya Academy",
  },

  {
    id: "02",
    src:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2200&q=92",
    alt:
      "Students learning together",
  },

  {
    id: "03",
    src:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2800&q=94",
    alt:
      "Students together at Vidya Academy",
    focus: true,
  },

  {
    id: "04",
    src:
      "https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=2200&q=92",
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
     GSAP
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
        const card01 =
          cardRefs.current[0];

        const card02 =
          cardRefs.current[1];

        const card03 =
          cardRefs.current[2];

        const card04 =
          cardRefs.current[3];


        if (!card03) {
          return;
        }


        /* =====================================================
           INDIVIDUAL CENTER POSITION

           Every image can have a different height.

           This places each image neatly around
           the middle of the viewport.
        ===================================================== */

        const getCardCenterY =
          (
            card,
            offset = 0
          ) => {

            if (!card) {
              return 0;
            }


            const stageCenter =
              stage.clientHeight /
              2;


            const cardCenter =
              card.offsetTop +
              card.offsetHeight /
              2;


            return (
              stageCenter -
              cardCenter +
              offset
            );
          };


        /* =====================================================
           BUILD ANIMATION
        ===================================================== */

        const buildAnimation =
          (
            isMobile
          ) => {

            /* =================================================
               REMOVE POSSIBLE INLINE FULLSCREEN VALUES
               BEFORE BUILDING TIMELINE
            ================================================= */

            gsap.set(
              card03,
              {
                clearProps:
                  "left,right,top,bottom,width,height",
              }
            );


            /* =================================================
               RESET TEXT
            ================================================= */

            gsap.set(
              copy,
              {
                x: 0,

                y: 0,

                opacity: 1,

                force3D: true,
              }
            );


            /* =================================================
               RESET ALL CARDS
            ================================================= */

            gsap.set(
              [
                card01,
                card02,
                card03,
                card04,
              ].filter(Boolean),
              {
                x: 0,

                y: 0,

                scale: 1,

                opacity: 1,

                force3D: true,
              }
            );


            /* =================================================
               LAYERS
            ================================================= */

            gsap.set(
              card03,
              {
                zIndex: 100,

                transformOrigin:
                  "0% 0%",

                force3D: true,
              }
            );


            if (card01) {
              gsap.set(
                card01,
                {
                  zIndex: 10,

                  transformOrigin:
                    "50% 50%",
                }
              );
            }


            if (card02) {
              gsap.set(
                card02,
                {
                  zIndex: 20,

                  transformOrigin:
                    "50% 50%",
                }
              );
            }


            if (card04) {
              gsap.set(
                card04,
                {
                  zIndex: 20,

                  transformOrigin:
                    "50% 50%",
                }
              );
            }


            /* =================================================
               SCROLL LENGTH
            ================================================= */

            const getScrollDistance =
              () =>
                stage.clientHeight *
                (
                  isMobile
                    ? 3.05
                    : 3.4
                );


            const tl =
              gsap.timeline({
                defaults: {
                  ease: "none",
                },

                scrollTrigger: {
                  trigger:
                    stage,

                  start:
                    "top top",

                  end:
                    () =>
                      `+=${getScrollDistance()}`,

                  scrub:
                    isMobile
                      ? 0.9
                      : 1,

                  pin:
                    true,

                  pinSpacing:
                    true,

                  anticipatePin:
                    1,

                  invalidateOnRefresh:
                    true,

                  fastScrollEnd:
                    false,
                },
              });


            /* =================================================
               MOVE TO CENTER
            ================================================= */

            tl.addLabel(
              "moveToCenter",
              0
            );


            /* =================================================
               TEXT MOVES UP

               No fade while scrolling.
            ================================================= */

            tl.to(
              copy,
              {
                y:
                  () =>
                    -(
                      copy.offsetTop +
                      copy.offsetHeight +
                      (
                        isMobile
                          ? 24
                          : 38
                      )
                    ),

                duration:
                  0.84,

                ease:
                  "power1.inOut",
              },

              "moveToCenter"
            );


            /* =================================================
               IMAGE 01
            ================================================= */

            if (card01) {
              tl.to(
                card01,
                {
                  y:
                    () =>
                      getCardCenterY(
                        card01,
                        5
                      ),

                  duration:
                    0.84,

                  ease:
                    "power1.inOut",
                },

                "moveToCenter"
              );
            }


            /* =================================================
               IMAGE 02

               DESKTOP ONLY
            ================================================= */

            if (
              card02 &&
              !isMobile
            ) {
              tl.to(
                card02,
                {
                  y:
                    () =>
                      getCardCenterY(
                        card02,
                        12
                      ),

                  duration:
                    0.84,

                  ease:
                    "power1.inOut",
                },

                "moveToCenter"
              );
            }


            /* =================================================
               IMAGE 03

               Taller focus image.

               Slightly higher than others.
            ================================================= */

            tl.to(
              card03,
              {
                y:
                  () =>
                    getCardCenterY(
                      card03,
                      isMobile
                        ? -12
                        : -22
                    ),

                duration:
                  0.84,

                ease:
                  "power1.inOut",
              },

              "moveToCenter"
            );


            /* =================================================
               IMAGE 04
            ================================================= */

            if (card04) {
              tl.to(
                card04,
                {
                  y:
                    () =>
                      getCardCenterY(
                        card04,
                        5
                      ),

                  duration:
                    0.84,

                  ease:
                    "power1.inOut",
                },

                "moveToCenter"
              );
            }


            /* =================================================
               HOLD AT MIDDLE

               ZOOM HAS NOT STARTED YET.
            ================================================= */

            tl.addLabel(
              "center"
            );


            tl.to(
              {},
              {
                duration:
                  0.2,
              }
            );


            /* =================================================
               ZOOM START
            ================================================= */

            tl.addLabel(
              "zoom"
            );


            /* =================================================
               IMAGE 01 -> LEFT
            ================================================= */

            if (card01) {
              tl.to(
                card01,
                {
                  x:
                    () =>
                      -stage.clientWidth *
                      (
                        isMobile
                          ? 0.42
                          : 0.31
                      ),

                  y:
                    () =>
                      getCardCenterY(
                        card01,
                        -8
                      ),

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


            /* =================================================
               IMAGE 02 -> LEFT

               DESKTOP ONLY
            ================================================= */

            if (
              card02 &&
              !isMobile
            ) {
              tl.to(
                card02,
                {
                  x:
                    () =>
                      -stage.clientWidth *
                      0.24,

                  y:
                    () =>
                      getCardCenterY(
                        card02,
                        0
                      ),

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
               IMAGE 04 -> RIGHT
            ================================================= */

            if (card04) {
              tl.to(
                card04,
                {
                  x:
                    () =>
                      stage.clientWidth *
                      (
                        isMobile
                          ? 0.42
                          : 0.30
                      ),

                  y:
                    () =>
                      getCardCenterY(
                        card04,
                        -5
                      ),

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
               IMAGE 03 -> TRUE FULLSCREEN

               THIS IS THE IMPORTANT FIX.

               Before:
               width / height changed while the old negative
               bottom value remained active.

               That caused Image 03 to finish shifted upward
               and leave empty space underneath.

               Now we animate:

               left   -> 0
               bottom -> 0
               width  -> viewport width
               height -> viewport height
               x      -> 0
               y      -> 0

               Final result:
               EXACT 100% viewport coverage.
            ================================================= */

            tl.to(
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
               FINAL FULLSCREEN HOLD
            ================================================= */

            tl.addLabel(
              "fullscreen"
            );


            tl.to(
              {},
              {
                duration:
                  0.22,
              }
            );


            return tl;
          };


        /* =====================================================
           DESKTOP
        ===================================================== */

        mm.add(
          "(min-width: 769px)",
          () => {

            const animation =
              buildAnimation(
                false
              );


            return () => {
              animation
                .scrollTrigger
                ?.kill();

              animation.kill();
            };
          }
        );


        /* =====================================================
           MOBILE
        ===================================================== */

        mm.add(
          "(max-width: 768px)",
          () => {

            const animation =
              buildAnimation(
                true
              );


            return () => {
              animation
                .scrollTrigger
                ?.kill();

              animation.kill();
            };
          }
        );

      }, section);


    /* =====================================================
       REFRESH
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


        /*
          Ignore browser toolbar height-only changes.
        */

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
       WAIT FOR IMAGES
    ===================================================== */

    const images =
      Array.from(
        section.querySelectorAll(
          "img"
        )
      );


    Promise.all(
      images.map(
        (
          image
        ) => {

          if (
            image.complete
          ) {
            return Promise.resolve();
          }


          return new Promise(
            (
              resolve
            ) => {

              const done =
                () => {
                  resolve();
                };


              image.addEventListener(
                "load",
                done,
                {
                  once: true,
                }
              );


              image.addEventListener(
                "error",
                done,
                {
                  once: true,
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
        passive: true,
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

        {/* =================================================
            TEXT
        ================================================= */}

        <div
          ref={copyRef}
          className="about-hero-copy"
        >

          <span className="about-hero-eyebrow">
            THE REASON WE EXIST
          </span>


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


        {/* =================================================
            IMAGE COLLAGE
        ================================================= */}

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