import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";

import "./MotionHero.css";


/* =========================================================
   FEATURED EVENT
========================================================= */

const heroEvent = {
  month: "Oct",

  day: "10",

  year: "2026",

  category: "Academic",

  title: "Model G20 Summit 2026",

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
   FALLBACK
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

  const imageRef =
    useRef(null);

  const contentRef =
    useRef(null);

  const dateRef =
    useRef(null);


  /* =========================================================
     FALLBACK IMAGE
  ========================================================= */

  const handleImageError =
    (event) => {
      const image =
        event.currentTarget;


      if (
        image.dataset.fallbackApplied ===
        "true"
      ) {
        return;
      }


      image.dataset.fallbackApplied =
        "true";


      image.src =
        FALLBACK_IMAGE;
    };


  /* =========================================================
     INTRO ANIMATION

     IMPORTANT:
     NO SCROLLTRIGGER.
     NO SCROLL PARALLAX.
     NO SCROLL-BASED TRANSFORMS.

     This removes the intermittent white gap.
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


    const ctx =
      gsap.context(
        () => {

          /* ===============================================
             IMAGE
          =============================================== */

          gsap.set(
            image,
            {
              scale: 1.055,

              transformOrigin:
                "50% 50%",

              force3D: true,
            }
          );


          /* ===============================================
             CONTENT
          =============================================== */

          gsap.set(
            content.children,
            {
              opacity: 0,

              y: 24,
            }
          );


          /* ===============================================
             DATE
          =============================================== */

          if (date) {
            gsap.set(
              date,
              {
                opacity: 0,

                y: -12,
              }
            );
          }


          /* ===============================================
             TIMELINE
          =============================================== */

          const timeline =
            gsap.timeline({
              defaults: {
                overwrite: "auto",
              },
            });


          timeline.to(
            image,
            {
              scale: 1,

              duration: 1.45,

              ease: "power3.out",

              force3D: true,
            },
            0
          );


          timeline.to(
            content.children,
            {
              opacity: 1,

              y: 0,

              duration: 0.85,

              stagger: 0.065,

              ease: "power3.out",
            },
            0.12
          );


          if (date) {
            timeline.to(
              date,
              {
                opacity: 1,

                y: 0,

                duration: 0.75,

                ease: "power3.out",
              },
              0.26
            );
          }

        },

        section
      );


    return () => {
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
          BACKGROUND MEDIA

          ABSOLUTELY STATIC DURING SCROLL.
      ===================================================== */}

      <div className="motion-hero-media">

        <img
          ref={imageRef}
          src={heroEvent.image}
          alt={heroEvent.title}
          className="motion-hero-image"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          draggable="false"
          onError={handleImageError}
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