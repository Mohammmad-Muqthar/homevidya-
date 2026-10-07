import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CampusHero.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   CAMPUS IMAGES
========================================================= */

const campusImages = [
  {
    id: "01",

    src:
      "https://images.unsplash.com/photo-1770146605185-1e4034fc2d76?auto=format&fit=crop&w=2000&q=88",

    alt:
      "Modern educational building",
  },

  {
    id: "02",

    src:
      "https://images.unsplash.com/photo-1744982588041-8488ed9d8c17?auto=format&fit=crop&w=2000&q=88",

    alt:
      "Modern campus building",
  },

  {
    id: "03",

    src:
      "https://images.unsplash.com/photo-1775933802859-27889463db79?auto=format&fit=crop&w=2000&q=88",

    alt:
      "Educational building at night",
  },

  {
    id: "04",

    src:
      "https://images.unsplash.com/photo-1774600787310-6f9559d9bdac?auto=format&fit=crop&w=2000&q=88",

    alt:
      "University campus architecture",
  },

  {
    id: "05",

    src:
      "https://images.unsplash.com/photo-1708304025151-c168a86a874f?auto=format&fit=crop&w=2400&q=90",

    alt:
      "Aerial school campus",
  },

  {
    id: "06",

    src:
      "https://images.unsplash.com/photo-1774600787271-86f8f714c410?auto=format&fit=crop&w=2000&q=88",

    alt:
      "Contemporary university campus",
  },

  {
    id: "07",

    src:
      "https://images.unsplash.com/photo-1769430886896-dc30842be5a3?auto=format&fit=crop&w=2000&q=88",

    alt:
      "Academic campus building",
  },

  {
    id: "08",

    src:
      "https://images.unsplash.com/photo-1759643740737-9ba5a2e62332?auto=format&fit=crop&w=2000&q=88",

    alt:
      "School building and playground",
  },

  {
    id: "09",

    src:
      "https://images.unsplash.com/photo-1729799959058-bda08177a84c?auto=format&fit=crop&w=2000&q=88",

    alt:
      "Traditional school building",
  },
];


/* =========================================================
   COMPONENT
========================================================= */

const CampusHero = () => {
  const sectionRef =
    useRef(null);

  const stageRef =
    useRef(null);

  const gridRef =
    useRef(null);

  const centerCardRef =
    useRef(null);

  const contentRef =
    useRef(null);

  const scrollHintRef =
    useRef(null);


  /* =========================================================
     HERO ANIMATION

     IMPORTANT:

     NO LOCAL LENIS.

     NO CSS STICKY.

     SCROLLTRIGGER ITSELF PINS
     THE FULL-SCREEN STAGE.
  ========================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const stage =
      stageRef.current;

    const grid =
      gridRef.current;

    const centerCard =
      centerCardRef.current;

    const content =
      contentRef.current;

    const scrollHint =
      scrollHintRef.current;


    if (
      !section ||
      !stage ||
      !grid ||
      !centerCard ||
      !content
    ) {
      return undefined;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(() => {

        /* =====================================================
           INTRO
        ===================================================== */

        const introItems =
          content.querySelectorAll(
            [
              ".campus-hero-title",
              ".campus-hero-description",
            ].join(",")
          );


        gsap.fromTo(
          introItems,
          {
            opacity: 0,

            y: 24,
          },
          {
            opacity: 1,

            y: 0,

            duration: 0.9,

            stagger: 0.07,

            ease:
              "power4.out",

            delay: 0.08,
          }
        );


        /* =====================================================
           ANIMATION BUILDER
        ===================================================== */

        const createAnimation =
          (
            isMobile
          ) => {

            const images =
              grid.querySelectorAll(
                ".campus-wall-image"
              );


            /* =================================================
               INITIAL SCALE

               CENTER CARD MUST COMPLETELY
               COVER THE VIEWPORT.
            ================================================= */

            const getStartScale =
              () => {
                const stageWidth =
                  stage.clientWidth;

                const stageHeight =
                  stage.clientHeight;

                const cardWidth =
                  centerCard.offsetWidth;

                const cardHeight =
                  centerCard.offsetHeight;


                if (
                  !stageWidth ||
                  !stageHeight ||
                  !cardWidth ||
                  !cardHeight
                ) {
                  return isMobile
                    ? 3
                    : 3.05;
                }


                const scaleX =
                  stageWidth /
                  cardWidth;

                const scaleY =
                  stageHeight /
                  cardHeight;


                return (
                  Math.max(
                    scaleX,
                    scaleY
                  ) *
                  (
                    isMobile
                      ? 1.01
                      : 1.015
                  )
                );
              };


            /* =================================================
               RESET
            ================================================= */

            gsap.set(
              grid,
              {
                scale:
                  getStartScale(),

                xPercent: 0,

                yPercent: 0,

                transformOrigin:
                  "50% 50%",

                force3D: true,
              }
            );


            gsap.set(
              images,
              {
                scale:
                  isMobile
                    ? 1.012
                    : 1.018,

                xPercent: 0,

                yPercent: 0,

                transformOrigin:
                  "center center",

                force3D: true,
              }
            );


            gsap.set(
              content,
              {
                opacity: 1,

                y: 0,

                scale: 1,

                force3D: true,
              }
            );


            if (scrollHint) {
              gsap.set(
                scrollHint,
                {
                  opacity: 1,

                  y: 0,
                }
              );
            }


            /* =================================================
               SCROLL DISTANCE

               Old version:

               Hero = 225svh
               Stage = 100svh

               Effective scrolling distance ≈ 125svh.

               We recreate that here WITHOUT
               leaving a blank 125svh wrapper.
            ================================================= */

            const getScrollDistance =
              () => {
                return (
                  stage.clientHeight *
                  (
                    isMobile
                      ? 1
                      : 1.25
                  )
                );
              };


            /* =================================================
               TIMELINE + PIN

               THE FIX:

               ScrollTrigger handles the pin spacing.

               When this pin ends, the NEXT section
               begins immediately.

               No blank white CampusHero area remains.
            ================================================= */

            const timeline =
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
                      ? 0.78
                      : 0.98,

                  pin:
                    true,

                  pinSpacing:
                    true,

                  /*
                    Makes this much safer if a parent
                    ever receives transform/overflow.
                  */
                  pinReparent:
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
               SMALL INITIAL HOLD
            ================================================= */

            timeline.to(
              {},
              {
                duration:
                  0.07,
              }
            );


            /* =================================================
               CONTENT LEAVES
            ================================================= */

            timeline.to(
              content,
              {
                opacity: 0,

                y:
                  isMobile
                    ? -22
                    : -34,

                scale:
                  isMobile
                    ? 0.994
                    : 0.992,

                duration:
                  0.17,
              },

              0.055
            );


            /* =================================================
               SCROLL HINT LEAVES
            ================================================= */

            if (scrollHint) {
              timeline.to(
                scrollHint,
                {
                  opacity: 0,

                  y: 8,

                  duration:
                    0.12,
                },

                0.055
              );
            }


            /* =================================================
               WALL ZOOMS OUT

               FULLSCREEN CENTER IMAGE
                      ↓
               3 × 3 CAMPUS WALL
            ================================================= */

            timeline.to(
              grid,
              {
                scale: 1,

                xPercent: 0,

                yPercent: 0,

                duration:
                  0.72,

                ease:
                  "power2.inOut",
              },

              0.07
            );


            /* =================================================
               INNER IMAGE SCALE SETTLES
            ================================================= */

            timeline.to(
              images,
              {
                scale: 1,

                xPercent: 0,

                yPercent: 0,

                duration:
                  0.64,

                ease:
                  "power2.out",
              },

              0.095
            );


            /* =================================================
               FINAL WALL HOLD

               VERY IMPORTANT.

               After the wall finishes zooming out,
               NOTHING moves.

               The complete image wall stays covering
               the full viewport until pin release.

               This prevents the white blank frame.
            ================================================= */

            timeline.to(
              {},
              {
                duration:
                  0.25,
              }
            );


            return timeline;
          };


        /* =====================================================
           DESKTOP
        ===================================================== */

        mm.add(
          "(min-width: 769px)",
          () => {
            const timeline =
              createAnimation(
                false
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
            const timeline =
              createAnimation(
                true
              );


            return () => {
              timeline.kill();
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
        const currentWidth =
          window.innerWidth;


        if (
          Math.abs(
            currentWidth -
            previousWidth
          ) < 3
        ) {
          return;
        }


        previousWidth =
          currentWidth;


        clearTimeout(
          resizeTimer
        );


        resizeTimer =
          setTimeout(
            refresh,
            150
          );
      };


    /* =====================================================
       WAIT FOR IMAGES

       Critical because the initial wall scale
       depends on the center card dimensions.
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
      className="campus-hero"
      data-navbar-hero
    >

      <div
        ref={stageRef}
        className="campus-hero-stage"
      >

        {/* =================================================
            IMAGE WALL
        ================================================= */}

        <div
          ref={gridRef}
          className="campus-zoom-wall"
        >

          {campusImages.map(
            (
              image,
              index
            ) => {
              const isCenter =
                index === 4;


              /*
                Mobile keeps:

                01
                05
                09
              */

              const mobileVisible =
                (
                  index === 0 ||
                  index === 4 ||
                  index === 8
                );


              return (
                <figure
                  key={image.id}

                  ref={
                    isCenter
                      ? centerCardRef
                      : null
                  }

                  className={`
                    campus-wall-card
                    campus-wall-card-${image.id}

                    ${
                      isCenter
                        ? "is-center"
                        : ""
                    }

                    ${
                      mobileVisible
                        ? "is-mobile-visible"
                        : ""
                    }
                  `}
                >

                  <img
                    src={image.src}

                    alt={image.alt}

                    className="campus-wall-image"

                    loading={
                      isCenter
                        ? "eager"
                        : "lazy"
                    }

                    fetchPriority={
                      isCenter
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


        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div
          ref={contentRef}
          className="campus-hero-content"
        >

          <h1 className="campus-hero-title">

            <span className="campus-hero-title-main">
              A campus built
            </span>


            <span className="campus-hero-title-accent">
              with intention.
            </span>

          </h1>


          <p className="campus-hero-description">
            Every space is designed to invite
            curiosity, movement, collaboration
            and meaningful learning.
          </p>

        </div>


        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        <div
          ref={scrollHintRef}
          className="campus-hero-scroll"
        >

          <span>
            SCROLL TO EXPLORE
          </span>

          <i />

        </div>

      </div>

    </section>
  );
};


export default CampusHero;