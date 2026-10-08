import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
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
      "https://images.unsplash.com/photo-1586760517845-88f3ea745618?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEFjYWRlbWljJTIwQnVpbGRpbmdzfGVufDB8fDB8fHww",
    alt:
      "School learning space",
  },

  {
    id: "02",
    src:
      "https://images.unsplash.com/photo-1505305976870-c0be1cd39939?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFNwb3J0cyUyMCUyNiUyMFJlY3JlYXRpb258ZW58MHx8MHx8fDA%3D",
      alt:
      "School building",
  },

  {
    id: "03",
    src:
      "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=1800&q=90",
    alt:
      "School sports facility",
  },

  {
    id: "04",
    src:
      "https://plus.unsplash.com/premium_photo-1748026235764-a01dd638d70d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QXJ0cyUyMCUyNiUyMEFjdGl2aXR5JTIwU3BhY2VzfGVufDB8fDB8fHww",
      alt:
      "School corridor",
  },

  {
    id: "05",
    src:
      "https://images.unsplash.com/photo-1728206348193-9b5ae74a7d32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM4fHxzY2hvb2x8ZW58MHx8MHx8fDA%3D",
      alt:
      "Vidya Academy campus",
    center:
      true,
  },

  {
    id: "06",
    src:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1800&q=90",
    alt:
      "Swimming pool",
  },

  {
    id: "07",
    src:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1800&q=90",
    alt:
      "School sports ground",
  },

  {
    id: "08",
    src:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90",
    alt:
      "Classroom learning",
  },

  {
    id: "09",
    src:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1800&q=90",
    alt:
      "Students on campus",
  },
];


const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2400&q=90";


/* =========================================================
   CAMPUS HERO
========================================================= */

const CampusHero = () => {
  const sectionRef =
    useRef(null);

  const stageRef =
    useRef(null);

  const wallRef =
    useRef(null);

  const centerCardRef =
    useRef(null);

  const contentRef =
    useRef(null);

  const shadeRef =
    useRef(null);

  const scrollRef =
    useRef(null);


  /* =========================================================
     IMAGE FALLBACK
  ========================================================= */

  const handleImageError =
    (event) => {
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
        FALLBACK_IMAGE;
    };


  /* =========================================================
     GSAP
  ========================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const stage =
      stageRef.current;

    const wall =
      wallRef.current;

    const centerCard =
      centerCardRef.current;

    const content =
      contentRef.current;

    const shade =
      shadeRef.current;

    const scrollHint =
      scrollRef.current;


    if (
      !section ||
      !stage ||
      !wall ||
      !centerCard ||
      !content ||
      !shade
    ) {
      return undefined;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(
        () => {

          /* =================================================
             DESKTOP / LAPTOP
          ================================================= */

          mm.add(
            "(min-width: 769px)",

            () => {

              /* =============================================
                 START SCALE
              ============================================= */

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
                    return 3.25;
                  }


                  const scaleX =
                    stageWidth /
                    cardWidth;


                  const scaleY =
                    stageHeight /
                    cardHeight;


                  /*
                    Slight overscan prevents any tiny
                    blank edge while fully zoomed in.
                  */

                  return (
                    Math.max(
                      scaleX,
                      scaleY
                    ) *
                    1.045
                  );
                };


              /* =============================================
                 INITIAL STATES
              ============================================= */

              gsap.set(
                wall,

                {
                  x: 0,
                  y: 0,

                  xPercent: 0,
                  yPercent: 0,

                  scale:
                    getStartScale,

                  rotation: 0,

                  transformOrigin:
                    "50% 50%",

                  force3D: true,
                }
              );


              gsap.set(
                content,

                {
                  opacity: 1,

                  x: 0,
                  y: 0,

                  scale: 1,
                }
              );


              gsap.set(
                shade,

                {
                  opacity: 1,
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


              /* =============================================
                 MASTER TIMELINE

                 PIN THE STAGE.

                 IMPORTANT:
                 Parent section has AUTO height in CSS.

                 Therefore pinSpacing can expand the
                 section normally and the next section
                 cannot slide over the Campus hero.
              ============================================= */

              const timeline =
                gsap.timeline({

                  defaults: {
                    ease: "none",
                  },

                  scrollTrigger: {
                    trigger:
                      section,

                    start:
                      "top top",

                    /*
                      A controlled zoom duration.

                      No manual 200vh CSS track.
                    */

                    end:
                      () =>
                        `+=${
                          Math.round(
                            Math.max(
                              stage.clientHeight *
                              1.15,
                              680
                            )
                          )
                        }`,

                    scrub: 0.9,

                    pin:
                      stage,

                    /*
                      THIS MUST STAY TRUE.

                      ScrollTrigger creates real document
                      space below the pinned stage.
                    */

                    pinSpacing:
                      true,

                    anticipatePin:
                      1,

                    invalidateOnRefresh:
                      true,

                    fastScrollEnd:
                      false,

                    refreshPriority:
                      1,
                  },
                });


              /* =============================================
                 SMALL START HOLD
              ============================================= */

              timeline.to(
                {},
                {
                  duration: 0.05,
                }
              );


              /* =============================================
                 CONTENT OUT
              ============================================= */

              timeline.to(
                content,

                {
                  opacity: 0,

                  y: -30,

                  scale: 0.992,

                  duration: 0.2,

                  ease: "power1.out",
                },

                0.05
              );


              /* =============================================
                 SCROLL HINT OUT
              ============================================= */

              if (scrollHint) {

                timeline.to(
                  scrollHint,

                  {
                    opacity: 0,

                    y: 8,

                    duration: 0.15,
                  },

                  0.05
                );

              }


              /* =============================================
                 SHADE OUT
              ============================================= */

              timeline.to(
                shade,

                {
                  opacity: 0,

                  duration: 0.3,

                  ease: "power1.out",
                },

                0.06
              );


              /* =============================================
                 WALL ZOOM OUT
              ============================================= */

              timeline.to(
                wall,

                {
                  scale: 1,

                  x: 0,
                  y: 0,

                  xPercent: 0,
                  yPercent: 0,

                  duration: 0.83,

                  ease: "power2.inOut",

                  force3D: true,
                },

                0.08
              );


              /* =============================================
                 VERY SMALL FINAL HOLD

                 Enough to see the finished collage,
                 but not enough to feel like empty space.
              ============================================= */

              timeline.to(
                {},
                {
                  duration: 0.06,
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


          /* =================================================
             MOBILE

             SIMPLE STATIC HERO.
          ================================================= */

          mm.add(
            "(max-width: 768px)",

            () => {

              gsap.set(
                wall,

                {
                  clearProps:
                    "transform",
                }
              );


              gsap.set(
                [
                  content,
                  shade,
                  scrollHint,
                ].filter(Boolean),

                {
                  clearProps:
                    "transform,opacity",
                }
              );


              return () => {};

            }
          );

        },

        section
      );


    /* =========================================================
       REFRESH HANDLING
    ========================================================= */

    let refreshTimer;


    let previousWidth =
      document
        .documentElement
        .clientWidth;


    let previousHeight =
      document
        .documentElement
        .clientHeight;


    let previousDpr =
      window.devicePixelRatio;


    const refresh =
      (
        delay = 110
      ) => {

        clearTimeout(
          refreshTimer
        );


        refreshTimer =
          window.setTimeout(
            () => {

              ScrollTrigger.refresh(
                true
              );


              ScrollTrigger.update();

            },
            delay
          );

      };


    const handleResize =
      () => {

        const width =
          document
            .documentElement
            .clientWidth;


        const height =
          document
            .documentElement
            .clientHeight;


        const dpr =
          window.devicePixelRatio;


        const widthChanged =
          Math.abs(
            width -
            previousWidth
          ) >= 2;


        const heightChanged =
          Math.abs(
            height -
            previousHeight
          ) >= 4;


        const dprChanged =
          Math.abs(
            dpr -
            previousDpr
          ) >= 0.01;


        const isDesktop =
          width >
          768;


        if (
          !widthChanged &&
          !dprChanged &&
          !(
            isDesktop &&
            heightChanged
          )
        ) {
          return;
        }


        previousWidth =
          width;


        previousHeight =
          height;


        previousDpr =
          dpr;


        refresh();

      };


    /* =========================================================
       WAIT FOR IMAGES
    ========================================================= */

    const images =
      Array.from(
        section.querySelectorAll(
          "img"
        )
      );


    const imagePromises =
      images.map(
        (image) => {

          if (
            image.complete &&
            image.naturalWidth >
              0
          ) {

            if (
              typeof image.decode ===
              "function"
            ) {

              return image
                .decode()
                .catch(
                  () => {}
                );

            }


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
      );


    Promise
      .allSettled(
        imagePromises
      )
      .then(
        () => {
          refresh(20);
        }
      );


    document.fonts
      ?.ready
      ?.then(
        () => {
          refresh(20);
        }
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
          () => {

            ScrollTrigger.refresh(
              true
            );

          }
        );

      }
    );


    return () => {

      clearTimeout(
        refreshTimer
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
            PERMANENT BACKGROUND

            Prevents blank flashes while Chrome
            recomposites the collage.
        ================================================= */}

        <div
          className="campus-hero-safety"
          aria-hidden="true"
        >

          <img
            src={campusImages[4].src}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            draggable="false"
            onError={
              handleImageError
            }
          />

        </div>


        {/* =================================================
            3 × 3 WALL
        ================================================= */}

        <div
          ref={wallRef}
          className="campus-zoom-wall"
        >

          {campusImages.map(
            (image) => {

              const isCenter =
                image.center;


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
                    campus-wall-card--${image.id}
                    ${
                      isCenter
                        ? "campus-wall-card--center"
                        : ""
                    }
                  `}
                >

                  <img
                    src={image.src}
                    alt={image.alt}
                    className="campus-wall-image"
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


        {/* =================================================
            SHADE
        ================================================= */}

        <div
          ref={shadeRef}
          className="campus-hero-shade"
          aria-hidden="true"
        />


        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          ref={contentRef}
          className="campus-hero-content"
        >

          <span className="campus-hero-kicker">
            CAMPUS AS CHARACTER
          </span>


          <h1 className="campus-hero-title">

            <span className="campus-hero-title-main">
              A campus built
            </span>


            <span className="campus-hero-title-accent">
              with intention.
            </span>

          </h1>


          <p className="campus-hero-description">

            Every space is designed to invite curiosity,
            movement, collaboration and meaningful
            learning.

          </p>

        </div>


        {/* =================================================
            SCROLL HINT
        ================================================= */}

        <div
          ref={scrollRef}
          className="campus-hero-scroll"
        >

          <span>
            Scroll to explore
          </span>

          <i />

        </div>

      </div>

    </section>
  );
};


export default CampusHero;