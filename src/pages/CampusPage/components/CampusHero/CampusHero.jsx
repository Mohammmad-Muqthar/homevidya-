import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import Lenis from "lenis";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CampusHero.css";


gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   TEMPORARY CAMPUS / SCHOOL IMAGES
========================================================= */

const campusImages = [
  {
    id: "01",
    src:
      "https://images.unsplash.com/photo-1770146605185-1e4034fc2d76?auto=format&fit=crop&w=2000&q=88",
    alt: "Modern educational building",
  },

  {
    id: "02",
    src:
      "https://images.unsplash.com/photo-1744982588041-8488ed9d8c17?auto=format&fit=crop&w=2000&q=88",
    alt: "Modern campus building",
  },

  {
    id: "03",
    src:
      "https://images.unsplash.com/photo-1775933802859-27889463db79?auto=format&fit=crop&w=2000&q=88",
    alt: "Educational building at night",
  },

  {
    id: "04",
    src:
      "https://images.unsplash.com/photo-1774600787310-6f9559d9bdac?auto=format&fit=crop&w=2000&q=88",
    alt: "University campus architecture",
  },

  /* =====================================================
     CENTER / HERO IMAGE
  ===================================================== */

  {
    id: "05",
    src:
      "https://images.unsplash.com/photo-1708304025151-c168a86a874f?auto=format&fit=crop&w=2400&q=90",
    alt: "Aerial school campus",
  },

  {
    id: "06",
    src:
      "https://images.unsplash.com/photo-1774600787271-86f8f714c410?auto=format&fit=crop&w=2000&q=88",
    alt: "Contemporary university campus",
  },

  {
    id: "07",
    src:
      "https://images.unsplash.com/photo-1769430886896-dc30842be5a3?auto=format&fit=crop&w=2000&q=88",
    alt: "Academic campus building",
  },

  {
    id: "08",
    src:
      "https://images.unsplash.com/photo-1759643740737-9ba5a2e62332?auto=format&fit=crop&w=2000&q=88",
    alt: "School building and playground",
  },

  {
    id: "09",
    src:
      "https://images.unsplash.com/photo-1729799959058-bda08177a84c?auto=format&fit=crop&w=2000&q=88",
    alt: "Traditional school building",
  },
];


/* =========================================================
   CAMPUS HERO
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

  const centerImageRef =
    useRef(null);

  const contentRef =
    useRef(null);

  const shadeRef =
    useRef(null);

  const scrollHintRef =
    useRef(null);


  /* =========================================================
     LENIS SMOOTH SCROLL

     If later you add Lenis globally for the whole site,
     remove this effect from CampusHero.
  ========================================================= */

  useEffect(() => {

    const lenis =
      new Lenis({
        lerp: 0.075,

        smoothWheel: true,

        wheelMultiplier: 0.82,

        touchMultiplier: 1,

        syncTouch: false,
      });


    const handleLenisScroll =
      () => {

        ScrollTrigger.update();

      };


    lenis.on(
      "scroll",
      handleLenisScroll
    );


    const raf =
      (time) => {

        lenis.raf(
          time * 1000
        );

      };


    gsap.ticker.add(
      raf
    );


    return () => {

      gsap.ticker.remove(
        raf
      );


      lenis.off(
        "scroll",
        handleLenisScroll
      );


      lenis.destroy();

    };

  }, []);


  /* =========================================================
     CAMPUS ZOOM TRANSITION
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

    const centerImage =
      centerImageRef.current;

    const content =
      contentRef.current;

    const shade =
      shadeRef.current;

    const scrollHint =
      scrollHintRef.current;


    if (
      !section ||
      !stage ||
      !grid ||
      !centerCard ||
      !centerImage ||
      !content ||
      !shade
    ) {
      return;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(() => {


        /* =====================================================
           HERO TEXT LOAD ANIMATION
        ===================================================== */

        const introItems =
          content.querySelectorAll(
            [
              ".campus-hero-kicker",
              ".campus-hero-title",
              ".campus-hero-description",
            ].join(",")
          );


        gsap.fromTo(
          introItems,

          {
            opacity: 0,

            y: 32,
          },

          {
            opacity: 1,

            y: 0,

            duration: 1,

            stagger: 0.07,

            ease:
              "power4.out",

            delay: 0.1,
          }
        );


        /* =====================================================
           DESKTOP / LAPTOP
        ===================================================== */

        mm.add(
          "(min-width: 769px)",

          () => {

            const images =
              grid.querySelectorAll(
                ".campus-wall-image"
              );


            /* =================================================
               EXACT ZOOM REQUIRED TO MAKE
               CENTER TILE COVER VIEWPORT
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
                  ) * 1.015
                );

              };


            /* =================================================
               INITIAL STATE
            ================================================= */

            gsap.set(
              grid,

              {
                scale:
                  getStartScale,

                transformOrigin:
                  "50% 50%",

                force3D:
                  true,
              }
            );


            gsap.set(
              images,

              {
                scale: 1.035,
              }
            );


            gsap.set(
              shade,

              {
                opacity: 1,
              }
            );


            gsap.set(
              content,

              {
                opacity: 1,
              }
            );


            /* =================================================
               SCROLL TIMELINE
            ================================================= */

            const timeline =
              gsap.timeline({

                scrollTrigger: {

                  trigger:
                    section,

                  start:
                    "top top",

                  end:
                    "bottom bottom",

                  scrub:
                    1.15,

                  invalidateOnRefresh:
                    true,

                  anticipatePin:
                    1,

                },

              });


            /* ===============================================
               SMALL HOLD
            =============================================== */

            timeline.to(
              {},

              {
                duration: 0.07,
              }
            );


            /* ===============================================
               TEXT STARTS LEAVING
            =============================================== */

            timeline.to(
              content,

              {
                opacity: 0,

                y: -42,

                scale: 0.985,

                duration: 0.18,

                ease: "none",
              },

              0.06
            );


            /* ===============================================
               SCROLL LABEL
            =============================================== */

            if (scrollHint) {

              timeline.to(
                scrollHint,

                {
                  opacity: 0,

                  y: 12,

                  duration: 0.12,

                  ease: "none",
                },

                0.06
              );

            }


            /* ===============================================
               DARK HERO OVERLAY DISAPPEARS
            =============================================== */

            timeline.to(
              shade,

              {
                opacity: 0,

                duration: 0.32,

                ease: "none",
              },

              0.08
            );


            /* ===============================================
               THE IMPORTANT EFFECT

               THE COMPLETE 3 × 3 WALL
               ZOOMS OUT AS ONE OBJECT.
            =============================================== */

            timeline.to(
              grid,

              {
                scale: 1,

                duration: 0.82,

                ease:
                  "power2.inOut",
              },

              0.10
            );


            /* ===============================================
               VERY SUBTLE IMAGE SETTLE
            =============================================== */

            timeline.to(
              images,

              {
                scale: 1,

                duration: 0.78,

                ease:
                  "power2.out",
              },

              0.12
            );


            return () => {

              timeline.kill();

            };

          }
        );


        /* =====================================================
           MOBILE

           SAME IDEA,
           BUT 3 IMAGES ONLY.
        ===================================================== */

        mm.add(
          "(max-width: 768px)",

          () => {

            const images =
              grid.querySelectorAll(
                ".campus-wall-image"
              );


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
                  ) * 1.02
                );

              };


            const startScale =
              getStartScale();


            gsap.set(
              grid,

              {
                scale:
                  startScale,

                transformOrigin:
                  "50% 50%",

                force3D:
                  true,
              }
            );


            /*
              Mobile grid is vertical.

              This horizontal compensation keeps
              the centre image looking like a
              proper full-screen hero instead
              of being massively zoomed.
            */

            gsap.set(
              centerImage,

              {
                scaleX:
                  1 /
                  startScale,

                scaleY:
                  1.035,

                transformOrigin:
                  "50% 50%",
              }
            );


            gsap.set(
              shade,

              {
                opacity: 1,
              }
            );


            const timeline =
              gsap.timeline({

                scrollTrigger: {

                  trigger:
                    section,

                  start:
                    "top top",

                  end:
                    "bottom bottom",

                  scrub:
                    0.9,

                  invalidateOnRefresh:
                    true,

                },

              });


            timeline.to(
              {},

              {
                duration:
                  0.06,
              }
            );


            timeline.to(
              content,

              {
                opacity:
                  0,

                y:
                  -30,

                duration:
                  0.18,

                ease:
                  "none",
              },

              0.05
            );


            if (scrollHint) {

              timeline.to(
                scrollHint,

                {
                  opacity:
                    0,

                  duration:
                    0.12,
                },

                0.05
              );

            }


            timeline.to(
              shade,

              {
                opacity:
                  0,

                duration:
                  0.28,
              },

              0.07
            );


            /* ===============================================
               MOBILE WALL ZOOM
            =============================================== */

            timeline.to(
              grid,

              {
                scale:
                  1,

                duration:
                  0.82,

                ease:
                  "power2.inOut",
              },

              0.09
            );


            /* ===============================================
               CENTRE IMAGE RETURNS TO NORMAL
            =============================================== */

            timeline.to(
              centerImage,

              {
                scaleX:
                  1,

                scaleY:
                  1,

                duration:
                  0.82,

                ease:
                  "power2.inOut",
              },

              0.09
            );


            timeline.to(
              images,

              {
                scale:
                  1,

                duration:
                  0.72,

                ease:
                  "power2.out",
              },

              0.13
            );


            return () => {

              timeline.kill();

            };

          }
        );


      }, section);


    /* =====================================================
       REFRESH AFTER IMAGE / FONT LOAD
    ===================================================== */

    const refresh =
      () => {

        ScrollTrigger.refresh();

      };


    let resizeTimer;


    const handleResize =
      () => {

        clearTimeout(
          resizeTimer
        );


        resizeTimer =
          setTimeout(
            refresh,
            120
          );

      };


    const images =
      section.querySelectorAll(
        "img"
      );


    images.forEach(
      (image) => {

        if (
          !image.complete
        ) {

          image.addEventListener(
            "load",
            refresh
          );

        }

      }
    );


    if (
      document.fonts?.ready
    ) {

      document.fonts.ready.then(
        refresh
      );

    }


    window.addEventListener(
      "resize",
      handleResize
    );


    requestAnimationFrame(
      () => {

        requestAnimationFrame(
          refresh
        );

      }
    );


    return () => {

      clearTimeout(
        resizeTimer
      );


      images.forEach(
        (image) => {

          image.removeEventListener(
            "load",
            refresh
          );

        }
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
     RENDER
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
            3 × 3 IMAGE WALL

            IMPORTANT:
            The complete wall scales.
            Individual cards do not fly separately.
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


              const mobileVisible =
                (
                  index === 0 ||
                  index === 4 ||
                  index === 8
                );


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

                    campus-wall-card-${
                      image.id
                    }

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
                    ref={
                      isCenter
                        ? centerImageRef
                        : null
                    }

                    src={
                      image.src
                    }

                    alt={
                      image.alt
                    }

                    className="campus-wall-image"

                    loading={
                      isCenter
                        ? "eager"
                        : "lazy"
                    }

                    draggable="false"
                  />

                </figure>

              );

            }
          )}

        </div>


        {/* =================================================
            HERO DARK SHADE
        ================================================= */}

        <div
          ref={shadeRef}

          className="campus-hero-shade"

          aria-hidden="true"
        />


        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div
          ref={contentRef}

          className="campus-hero-content"
        >

          <span
            className="campus-hero-kicker"
          >
            CAMPUS AS CHARACTER
          </span>


          <h1
            className="campus-hero-title"
          >

            A campus built

            <span>
              with intention.
            </span>

          </h1>


          <p
            className="campus-hero-description"
          >
            Every space is designed
            to invite curiosity,
            movement, collaboration
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