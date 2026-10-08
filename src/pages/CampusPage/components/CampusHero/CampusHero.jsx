import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CampusHero.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   FALLBACK IMAGE

   If any campus image fails to load,
   this image is used instead.
========================================================= */

const FALLBACK_CAMPUS_IMAGE =
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2400&q=90";


/* =========================================================
   CAMPUS IMAGES

   CAMPUS-ONLY VISUAL DIRECTION:

   01 — School building
   02 — Sports ground
   03 — Library
   04 — Courtyard / veranda
   05 — Main campus building
   06 — Swimming pool
   07 — Sports court
   08 — Playground / open campus
   09 — Green campus building
========================================================= */

const campusImages = [
  {
    id: "01",

    src:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=90",

    alt:
      "Modern school campus building",
  },

  {
    id: "02",

    src:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=2200&q=90",

    alt:
      "School sports ground and athletics area",
  },

  {
    id: "03",

    src:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=2200&q=90",

    alt:
      "School library and learning space",
  },

  {
    id: "04",

    src:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=2200&q=90",

    alt:
      "School campus veranda and courtyard",
  },

  {
    /* =====================================================
       CENTER IMAGE
       THIS IS THE INITIAL FULLSCREEN CAMPUS IMAGE
    ===================================================== */

    id: "05",

    src:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2600&q=92",

    alt:
      "Beautiful green school campus",

    center:
      true,
  },

  {
    id: "06",

    src:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=2200&q=90",

    alt:
      "Campus swimming pool",
  },

  {
    id: "07",

    src:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=2200&q=90",

    alt:
      "School sports court",
  },

  {
    id: "08",

    src:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2200&q=90",

    alt:
      "School playground and outdoor learning area",
  },

  {
    id: "09",

    src:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2200&q=90",

    alt:
      "Green school campus building",
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
     IMAGE FALLBACK
  ========================================================= */

  const handleImageError = (
    event
  ) => {
    const image =
      event.currentTarget;


    if (
      image.dataset
        .fallbackApplied ===
      "true"
    ) {
      return;
    }


    image.dataset
      .fallbackApplied =
      "true";


    image.src =
      FALLBACK_CAMPUS_IMAGE;
  };


  /* =========================================================
     ANIMATION
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
            opacity:
              0,

            y:
              24,
          },

          {
            opacity:
              1,

            y:
              0,

            duration:
              0.9,

            stagger:
              0.07,

            ease:
              "power4.out",

            delay:
              0.08,
          }
        );


        /* =====================================================
           DESKTOP / LAPTOP

           FULLSCREEN CENTER IMAGE
                     ↓
              ZOOM OUT
                     ↓
               3 × 3 WALL
        ===================================================== */

        mm.add(
          "(min-width: 769px)",
          () => {

            const images =
              grid.querySelectorAll(
                ".campus-wall-image"
              );


            /* =================================================
               START SCALE
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
                  return 3.08;
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
                  1.02
                );
              };


            /* =================================================
               FINAL GAP

               This is the actual visible gap we want.

               We compensate for wall scale so the gap
               does NOT become huge/small during zoom.
            ================================================= */

            const styles =
              window.getComputedStyle(
                grid
              );


            const finalGap =
              parseFloat(
                styles.columnGap
              ) || 16;


            const finalPadding =
              parseFloat(
                styles.paddingLeft
              ) || 10;


            const startScale =
              getStartScale();


            const wallState = {
              scale:
                startScale,
            };


            /* =================================================
               CONSTANT VISUAL GAP

               Actual CSS gap becomes:

               target gap / current scale

               Because the entire wall itself is scaled,
               the gap visually remains almost identical.
            ================================================= */

            const syncWall =
              () => {

                const scale =
                  Math.max(
                    wallState.scale,
                    0.001
                  );


                gsap.set(
                  grid,

                  {
                    scale:
                      scale,

                    gap:
                      `${
                        finalGap /
                        scale
                      }px`,

                    padding:
                      `${
                        finalPadding /
                        scale
                      }px`,

                    xPercent:
                      0,

                    yPercent:
                      0,

                    transformOrigin:
                      "50% 50%",

                    force3D:
                      true,
                  }
                );
              };


            syncWall();


            /* =================================================
               IMAGE RESET
            ================================================= */

            gsap.set(
              images,

              {
                scale:
                  1.025,

                xPercent:
                  0,

                yPercent:
                  0,

                transformOrigin:
                  "center center",

                force3D:
                  true,
              }
            );


            /* =================================================
               COPY RESET
            ================================================= */

            gsap.set(
              content,

              {
                opacity:
                  1,

                y:
                  0,

                scale:
                  1,

                force3D:
                  true,
              }
            );


            /* =================================================
               SCROLL HINT RESET
            ================================================= */

            if (scrollHint) {
              gsap.set(
                scrollHint,

                {
                  opacity:
                    1,

                  y:
                    0,
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
                        1.35
                      }`,

                  scrub:
                    0.95,

                  pin:
                    true,

                  pinSpacing:
                    true,

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
               INITIAL HOLD
            ================================================= */

            timeline.to(
              {},

              {
                duration:
                  0.08,
              }
            );


            /* =================================================
               CONTENT LEAVES
            ================================================= */

            timeline.to(
              content,

              {
                opacity:
                  0,

                y:
                  -34,

                scale:
                  0.992,

                duration:
                  0.18,

                ease:
                  "power1.inOut",
              },

              0.06
            );


            /* =================================================
               SCROLL HINT LEAVES
            ================================================= */

            if (scrollHint) {
              timeline.to(
                scrollHint,

                {
                  opacity:
                    0,

                  y:
                    8,

                  duration:
                    0.14,
                },

                0.06
              );
            }


            /* =================================================
               WALL ZOOMS OUT

               Instead of tweening grid scale directly,
               we tween wallState.scale and update
               the gap every frame.
            ================================================= */

            timeline.to(
              wallState,

              {
                scale:
                  1,

                duration:
                  0.76,

                ease:
                  "power2.inOut",

                onUpdate:
                  syncWall,
              },

              0.08
            );


            /* =================================================
               IMAGE SCALE SETTLES
            ================================================= */

            timeline.to(
              images,

              {
                scale:
                  1,

                xPercent:
                  0,

                yPercent:
                  0,

                duration:
                  0.68,

                ease:
                  "power2.out",
              },

              0.1
            );


            /* =================================================
               FINAL HOLD
            ================================================= */

            timeline.to(
              {},

              {
                duration:
                  0.28,
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


        /* =====================================================
           MOBILE

           SIMPLE AND STABLE.

           ONE CAMPUS IMAGE.
           NO PIN.
           NO ZOOM WALL.
        ===================================================== */

        mm.add(
          "(max-width: 768px)",
          () => {

            gsap.set(
              grid,

              {
                clearProps:
                  "transform,gap,padding",
              }
            );


            gsap.set(
              content,

              {
                clearProps:
                  "transform,opacity",
              }
            );


            if (scrollHint) {
              gsap.set(
                scrollHint,

                {
                  clearProps:
                    "transform,opacity",
                }
              );
            }

          }
        );

      }, section);


    /* =====================================================
       RESIZE
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


        /*
          Ignore mobile URL bar / toolbar
          height changes.

          Only refresh when WIDTH changes.
        */

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
            160
          );
      };


    /* =====================================================
       WAIT FOR ALL IMAGES

       Important:
       everything is eager loaded now, so the wall
       does not reveal blank cards during zoom-out.
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
      className="campus-hero"
      data-navbar-hero
    >

      <div
        ref={stageRef}
        className="campus-hero-stage"
      >

        {/* =========================================
            CAMPUS IMAGE WALL
        ========================================= */}

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


              return (
                <figure
                  key={
                    image.id
                  }

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
                  `}
                >

                  <img
                    src={
                      image.src
                    }

                    alt={
                      image.alt
                    }

                    className="campus-wall-image"

                    /*
                      Load all 9 immediately.

                      Prevents first / edge cards
                      showing empty during zoom.
                    */

                    loading="eager"

                    fetchPriority={
                      isCenter
                        ? "high"
                        : "auto"
                    }

                    decoding="async"

                    draggable="false"

                    onError={
                      handleImageError
                    }
                  />

                </figure>
              );
            }
          )}

        </div>


        {/* =========================================
            MOBILE SHADE
        ========================================= */}

        <div className="campus-hero-mobile-shade" />


        {/* =========================================
            CONTENT
        ========================================= */}

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


        {/* =========================================
            SCROLL INDICATOR
        ========================================= */}

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