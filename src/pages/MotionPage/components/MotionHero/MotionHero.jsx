import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./MotionHero.css";


gsap.registerPlugin(
  ScrollTrigger
);


/* =========================================================
   FEATURED EVENT
========================================================= */

const heroEvent = {
  month:
    "Oct",

  day:
    "10",

  year:
    "2026",

  category:
    "Academic",

  title:
    "Model G20 Summit 2026",

  meta: [
    "Two days",
    "Registration only",
  ],

  description:
    "Vidya Academy’s Model G20 is a student-led diplomatic simulation where students represent nations, negotiate global challenges, build consensus, and experience what it means to lead across differences.",

  image:
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2400&q=92",
};


/* =========================================================
   FALLBACK IMAGE
========================================================= */

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2400&q=90";


/* =========================================================
   ARROW
========================================================= */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >

      <path
        d="M5 12H18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />


      <path
        d="M14 8L18 12L14 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

    </svg>
  );
}


/* =========================================================
   MOTION HERO
========================================================= */

const MotionHero = () => {
  const sectionRef =
    useRef(null);

  const mediaRef =
    useRef(null);

  const imageRef =
    useRef(null);

  const contentRef =
    useRef(null);

  const dateRef =
    useRef(null);


  /* =========================================================
     IMAGE FALLBACK
  ========================================================= */

  const handleImageError =
    (
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
        FALLBACK_IMAGE;
    };


  /* =========================================================
     GSAP
  ========================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const media =
      mediaRef.current;

    const image =
      imageRef.current;

    const content =
      contentRef.current;

    const date =
      dateRef.current;


    if (
      !section ||
      !media ||
      !image ||
      !content
    ) {
      return undefined;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(
        () => {

          /* =================================================
             INITIAL STATES

             IMPORTANT:
             image scale and media translation are now
             completely separate.
          ================================================= */

          gsap.set(
            media,

            {
              x:
                0,

              y:
                0,

              xPercent:
                0,

              yPercent:
                0,

              force3D:
                true,
            }
          );


          gsap.set(
            image,

            {
              scale:
                1.065,

              transformOrigin:
                "50% 50%",

              force3D:
                true,
            }
          );


          gsap.set(
            content.children,

            {
              opacity:
                0,

              y:
                24,
            }
          );


          if (
            date
          ) {
            gsap.set(
              date,

              {
                opacity:
                  0,

                y:
                  -14,
              }
            );
          }


          /* =================================================
             INTRO TIMELINE
          ================================================= */

          const introTimeline =
            gsap.timeline({

              defaults: {
                overwrite:
                  "auto",
              },

            });


          /* IMAGE INTRO */

          introTimeline.to(
            image,

            {
              scale:
                1.015,

              duration:
                1.35,

              ease:
                "power3.out",
            },

            0
          );


          /* CONTENT INTRO */

          introTimeline.to(
            content.children,

            {
              opacity:
                1,

              y:
                0,

              duration:
                0.82,

              stagger:
                0.065,

              ease:
                "power3.out",
            },

            0.12
          );


          /* DATE INTRO */

          if (
            date
          ) {
            introTimeline.to(
              date,

              {
                opacity:
                  1,

                y:
                  0,

                duration:
                  0.75,

                ease:
                  "power3.out",
              },

              0.28
            );
          }


          /* =================================================
             DESKTOP PARALLAX

             ONLY THE WRAPPER MOVES.
             IMAGE SCALE IS NOT TOUCHED.
          ================================================= */

          mm.add(
            "(min-width: 769px)",

            () => {

              gsap.set(
                media,

                {
                  yPercent:
                    -1.6,
                }
              );


              const parallaxTween =
                gsap.to(
                  media,

                  {
                    yPercent:
                      1.6,

                    ease:
                      "none",

                    force3D:
                      true,

                    scrollTrigger: {
                      trigger:
                        section,

                      start:
                        "top top",

                      end:
                        "bottom top",

                      scrub:
                        0.8,

                      invalidateOnRefresh:
                        true,

                      fastScrollEnd:
                        true,
                    },
                  }
                );


              return () => {
                parallaxTween
                  .scrollTrigger
                  ?.kill();


                parallaxTween.kill();


                gsap.set(
                  media,

                  {
                    clearProps:
                      "transform",
                  }
                );
              };

            }
          );


          /* =================================================
             MOBILE

             NO SCRUBBING.

             This intentionally removes mobile ScrollTrigger
             movement because browser toolbars frequently
             change viewport height and make hero effects
             unstable.

             Mobile still gets the intro zoom.
          ================================================= */

          mm.add(
            "(max-width: 768px)",

            () => {

              gsap.set(
                media,

                {
                  clearProps:
                    "transform",
                }
              );


              return () => {};

            }
          );

        },

        section
      );


    /* =====================================================
       ROBUST REFRESH SYSTEM

       Handles:
       - browser zoom
       - breakpoint changes
       - DPR changes
       - VisualViewport scaling
       - image loading
       - font loading

       Pure mobile address-bar height changes are ignored.
    ===================================================== */

    let refreshTimer;


    let previousWidth =
      document
        .documentElement
        .clientWidth;


    let previousVisualWidth =
      window.visualViewport
        ?.width ??
      previousWidth;


    let previousScale =
      window.visualViewport
        ?.scale ??
      1;


    let previousDpr =
      window.devicePixelRatio;


    const refresh =
      (
        delay = 80
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


    const handleViewportChange =
      () => {

        const width =
          document
            .documentElement
            .clientWidth;


        const visualWidth =
          window.visualViewport
            ?.width ??
          width;


        const scale =
          window.visualViewport
            ?.scale ??
          1;


        const dpr =
          window.devicePixelRatio;


        const widthChanged =
          Math.abs(
            width -
            previousWidth
          ) >=
          2;


        const visualWidthChanged =
          Math.abs(
            visualWidth -
            previousVisualWidth
          ) >=
          2;


        const scaleChanged =
          Math.abs(
            scale -
            previousScale
          ) >=
          0.01;


        const dprChanged =
          Math.abs(
            dpr -
            previousDpr
          ) >=
          0.01;


        /*
          Ignore viewport-height-only changes.
          This prevents mobile address bars from causing
          constant ScrollTrigger rebuilding.
        */

        if (
          !widthChanged &&
          !visualWidthChanged &&
          !scaleChanged &&
          !dprChanged
        ) {
          return;
        }


        previousWidth =
          width;


        previousVisualWidth =
          visualWidth;


        previousScale =
          scale;


        previousDpr =
          dpr;


        refresh(
          110
        );

      };


    /* =====================================================
       IMAGE READY
    ===================================================== */

    const handleImageReady =
      () => {

        refresh(
          20
        );

      };


    if (
      image.complete &&
      image.naturalWidth >
        0
    ) {

      if (
        typeof image.decode ===
        "function"
      ) {

        image
          .decode()
          .catch(
            () => {}
          )
          .finally(
            handleImageReady
          );

      } else {

        handleImageReady();

      }

    } else {

      image.addEventListener(
        "load",
        handleImageReady
      );


      image.addEventListener(
        "error",
        handleImageReady
      );

    }


    /* =====================================================
       FONT READY
    ===================================================== */

    document.fonts
      ?.ready
      ?.then(
        () => {

          refresh(
            20
          );

        }
      );


    /* =====================================================
       EVENTS
    ===================================================== */

    window.addEventListener(
      "resize",
      handleViewportChange,
      {
        passive:
          true,
      }
    );


    window.visualViewport
      ?.addEventListener(
        "resize",
        handleViewportChange,
        {
          passive:
            true,
        }
      );


    /* =====================================================
       INITIAL REFRESH
    ===================================================== */

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


    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {

      clearTimeout(
        refreshTimer
      );


      image.removeEventListener(
        "load",
        handleImageReady
      );


      image.removeEventListener(
        "error",
        handleImageReady
      );


      window.removeEventListener(
        "resize",
        handleViewportChange
      );


      window.visualViewport
        ?.removeEventListener(
          "resize",
          handleViewportChange
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
      className="motion-hero"
      data-navbar-hero
    >

      {/* =====================================================
          MEDIA

          Wrapper:
          handles desktop parallax.

          Image:
          handles intro zoom only.
      ===================================================== */}

      <div
        ref={mediaRef}
        className="motion-hero-media"
      >

        <img
          ref={imageRef}
          src={heroEvent.image}
          alt={heroEvent.title}
          className="motion-hero-image"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          draggable="false"
          onError={
            handleImageError
          }
        />

      </div>


      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div
        className="motion-hero-overlay"
        aria-hidden="true"
      />


      {/* =====================================================
          DATE
      ===================================================== */}

      <div
        ref={dateRef}
        className="motion-hero-date"
      >

        <span className="motion-hero-date-month">
          {heroEvent.month}
        </span>


        <strong className="motion-hero-date-day">
          {heroEvent.day}
        </strong>


        <span className="motion-hero-date-year">
          {heroEvent.year}
        </span>

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        ref={contentRef}
        className="motion-hero-content"
      >

        <span className="motion-hero-category">
          {heroEvent.category}
        </span>


        <h1 className="motion-hero-title">
          {heroEvent.title}
        </h1>


        <div className="motion-hero-meta">

          {heroEvent.meta.map(
            (
              item,
              index
            ) => (

              <div
                key={item}
                className="motion-hero-meta-item"
              >

                {index !== 0 && (

                  <span
                    className="motion-hero-meta-dot"
                    aria-hidden="true"
                  />

                )}


                <span>
                  {item}
                </span>

              </div>

            )
          )}

        </div>


        <p className="motion-hero-description">
          {heroEvent.description}
        </p>


        <a
          href="#motion-events"
          className="motion-hero-button"
        >

          <span>
            Explore event
          </span>

          <ArrowIcon />

        </a>

      </div>

    </section>
  );
};


export default MotionHero;