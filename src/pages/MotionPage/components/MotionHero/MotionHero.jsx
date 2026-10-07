import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./MotionHero.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   FEATURED EVENT
========================================================= */

const heroEvent = {
  month: "Oct",

  day: "10",

  year: "2026",

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

  const imageRef =
    useRef(null);

  const contentRef =
    useRef(null);

  const dateRef =
    useRef(null);


  /* =========================================================
     GSAP
  ========================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const image =
      imageRef.current;

    const content =
      contentRef.current;

    const date =
      dateRef.current;


    if (
      !section ||
      !image ||
      !content
    ) {
      return undefined;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(() => {

        /* =====================================================
           HERO IMAGE INTRO
        ===================================================== */

        gsap.fromTo(
          image,
          {
            scale: 1.07,
          },
          {
            scale: 1.035,

            duration: 1.4,

            ease:
              "power3.out",
          }
        );


        /* =====================================================
           CONTENT INTRO
        ===================================================== */

        gsap.fromTo(
          content.children,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,

            duration: 0.82,

            stagger: 0.07,

            delay: 0.12,

            ease:
              "power3.out",
          }
        );


        /* =====================================================
           DATE
        ===================================================== */

        if (date) {
          gsap.fromTo(
            date,
            {
              opacity: 0,
              y: -14,
            },
            {
              opacity: 1,
              y: 0,

              duration: 0.75,

              delay: 0.28,

              ease:
                "power3.out",
            }
          );
        }


        /* =====================================================
           DESKTOP PARALLAX
        ===================================================== */

        mm.add(
          "(min-width: 769px)",
          () => {
            gsap.fromTo(
              image,
              {
                yPercent: -2,
              },
              {
                yPercent: 4,

                ease: "none",

                scrollTrigger: {
                  trigger: section,

                  start:
                    "top top",

                  end:
                    "bottom top",

                  scrub: 0.9,

                  invalidateOnRefresh:
                    true,
                },
              }
            );
          }
        );


        /* =====================================================
           MOBILE
        ===================================================== */

        mm.add(
          "(max-width: 768px)",
          () => {
            gsap.fromTo(
              image,
              {
                scale: 1.04,
              },
              {
                scale: 1,

                ease: "none",

                scrollTrigger: {
                  trigger: section,

                  start:
                    "top top",

                  end:
                    "bottom top",

                  scrub: 0.45,

                  invalidateOnRefresh:
                    true,
                },
              }
            );
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
            140
          );
      };


    if (!image.complete) {
      image.addEventListener(
        "load",
        refresh
      );
    }


    document.fonts
      ?.ready
      ?.then(refresh);


    window.addEventListener(
      "resize",
      handleResize,
      {
        passive: true,
      }
    );


    requestAnimationFrame(() => {
      requestAnimationFrame(
        refresh
      );
    });


    return () => {
      clearTimeout(
        resizeTimer
      );


      image.removeEventListener(
        "load",
        refresh
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
      className="motion-hero"
      data-navbar-hero
    >

      {/* =====================================================
          FULL HERO IMAGE

          Navbar sits transparently above this image.
      ===================================================== */}

      <img
        ref={imageRef}
        src={heroEvent.image}
        alt={heroEvent.title}
        className="motion-hero-image"
        loading="eager"
        decoding="async"
        draggable="false"
      />


      {/* =====================================================
          DARK OVERLAY

          Keeps navbar + hero copy readable.
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