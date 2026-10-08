import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CampusBuildings.css";


gsap.registerPlugin(
  ScrollTrigger
);


/* =========================================================
   FALLBACK

   Used automatically if any remote image fails.
========================================================= */

const FALLBACK_BUILDING_IMAGE =
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=92";


/* =========================================================
   BUILDING MARQUEE IMAGES

   01 — SCHOOL BUILDING
   02 — INDIAN SCHOOL VERANDA
   03 — SCHOOL AUDITORIUM
   04 — ACADEMIC BUILDING
========================================================= */

const buildingMarqueeImages = [
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=90",

  "https://images.unsplash.com/photo-1722853827087-f6fc4d977d25?auto=format&fit=crop&w=1400&q=90",

  "https://images.unsplash.com/photo-1702763529935-f4f7b4df3380?auto=format&fit=crop&w=1400&q=90",

  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=90",
];


/* =========================================================
   BUILDING PHOTO GRID

   01 — SCHOOL FRONT / MAIN BLOCK
   02 — INDIAN VERANDA / CORRIDOR
   03 — SCHOOL AUDITORIUM
   04 — SCHOOL HALLWAY
   05 — CAMPUS COURTYARD / BUILDING
   06 — ACADEMIC BLOCK
   07 — INDIAN SCHOOL AUDITORIUM
========================================================= */

const buildingImages = [
  {
    id:
      "01",

    src:
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D",

    alt:
      "Modern school building exterior",

    className:
      "building-photo--01",
  },


  {
    id:
      "02",

    src:
      "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D",

    alt:
      "Indian school veranda and corridor",

    className:
      "building-photo--02",
  },


  {
    id:
      "03",

    src:
      "https://images.unsplash.com/photo-1559135197-8a45ea74d367?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D",

    alt:
      "School auditorium with stage and seating",

    className:
      "building-photo--03",
  },


  {
    id:
      "04",

    src:
      "https://images.unsplash.com/photo-1675747158934-5f82097d2c21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2Nob29sJTIwYnVpbGRpbmdzfGVufDB8fDB8fHww",

    alt:
      "School hallway and corridor",

    className:
      "building-photo--04",
  },


  {
    id:
      "05",

    src:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=2200&q=92",

    alt:
      "Open school courtyard and academic building",

    className:
      "building-photo--05",
  },


  {
    id:
      "06",

    src:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2200&q=92",

    alt:
      "School academic block architecture",

    className:
      "building-photo--06",
  },


{
  id: "07",

  src:
    "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=2200&q=92",

  alt:
    "School building and academic architecture",

  className:
    "building-photo--07",
},
];


/* =========================================================
   COMPONENT
========================================================= */

const CampusBuildings = () => {
  const sectionRef =
    useRef(null);

  const marqueeTrackRef =
    useRef(null);

  const captionRef =
    useRef(null);

  const photoRefs =
    useRef([]);


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
        FALLBACK_BUILDING_IMAGE;
    };


  /* =========================================================
     ANIMATIONS
  ========================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const marqueeTrack =
      marqueeTrackRef.current;

    const caption =
      captionRef.current;


    if (
      !section ||
      !marqueeTrack
    ) {
      return undefined;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(() => {

        /* =====================================================
           INFINITE MARQUEE
        ===================================================== */

        const marqueeTween =
          gsap.to(
            marqueeTrack,

            {
              xPercent:
                -50,

              duration:
                30,

              repeat:
                -1,

              ease:
                "none",
            }
          );


        /* =====================================================
           SUBTLE MARQUEE DRIFT
        ===================================================== */

        const marqueeShell =
          section.querySelector(
            ".campus-buildings-marquee-shell"
          );


        if (
          marqueeShell
        ) {
          gsap.fromTo(
            marqueeShell,

            {
              x:
                8,
            },

            {
              x:
                -8,

              ease:
                "none",

              scrollTrigger: {
                trigger:
                  section,

                start:
                  "top bottom",

                end:
                  "bottom top",

                scrub:
                  1,

                invalidateOnRefresh:
                  true,
              },
            }
          );
        }


        /* =====================================================
           CAPTION REVEAL
        ===================================================== */

        if (
          caption
        ) {
          gsap.fromTo(
            caption,

            {
              opacity:
                0,

              y:
                18,
            },

            {
              opacity:
                1,

              y:
                0,

              ease:
                "none",

              scrollTrigger: {
                trigger:
                  caption,

                start:
                  "top 92%",

                end:
                  "top 78%",

                scrub:
                  0.5,

                invalidateOnRefresh:
                  true,
              },
            }
          );
        }


        /* =====================================================
           DESKTOP PHOTOS
        ===================================================== */

        mm.add(
          "(min-width: 769px)",

          () => {
            const photos =
              photoRefs.current.filter(
                Boolean
              );


            photos.forEach(
              (
                card,
                index
              ) => {
                const image =
                  card.querySelector(
                    "img"
                  );


                /* =============================================
                   CARD REVEAL
                ============================================= */

                gsap.fromTo(
                  card,

                  {
                    opacity:
                      0,

                    y:
                      36 +
                      (
                        index %
                        3
                      ) *
                      7,
                  },

                  {
                    opacity:
                      1,

                    y:
                      0,

                    ease:
                      "none",

                    scrollTrigger: {
                      trigger:
                        card,

                      start:
                        "top 94%",

                      end:
                        "top 72%",

                      scrub:
                        0.65,

                      invalidateOnRefresh:
                        true,
                    },
                  }
                );


                /* =============================================
                   IMAGE PARALLAX
                ============================================= */

                if (
                  image
                ) {
                  gsap.fromTo(
                    image,

                    {
                      scale:
                        1.05,

                      yPercent:
                        -2.5,
                    },

                    {
                      scale:
                        1,

                      yPercent:
                        2.5,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          card,

                        start:
                          "top bottom",

                        end:
                          "bottom top",

                        scrub:
                          0.72,

                        invalidateOnRefresh:
                          true,
                      },
                    }
                  );
                }
              }
            );
          }
        );


        /* =====================================================
           MOBILE PHOTOS
        ===================================================== */

        mm.add(
          "(max-width: 768px)",

          () => {
            const photos =
              photoRefs.current.filter(
                Boolean
              );


            photos.forEach(
              (
                card,
                index
              ) => {
                const image =
                  card.querySelector(
                    "img"
                  );


                /* =============================================
                   MOBILE CARD REVEAL
                ============================================= */

                gsap.fromTo(
                  card,

                  {
                    opacity:
                      0,

                    y:
                      20 +
                      (
                        index %
                        2
                      ) *
                      4,
                  },

                  {
                    opacity:
                      1,

                    y:
                      0,

                    duration:
                      0.68,

                    ease:
                      "power3.out",

                    scrollTrigger: {
                      trigger:
                        card,

                      start:
                        "top 92%",

                      once:
                        true,
                    },
                  }
                );


                /* =============================================
                   MOBILE IMAGE PARALLAX
                ============================================= */

                if (
                  image
                ) {
                  gsap.fromTo(
                    image,

                    {
                      scale:
                        1.025,
                    },

                    {
                      scale:
                        1,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          card,

                        start:
                          "top bottom",

                        end:
                          "bottom top",

                        scrub:
                          0.4,

                        invalidateOnRefresh:
                          true,
                      },
                    }
                  );
                }
              }
            );
          }
        );


        return () => {
          marqueeTween.kill();
        };

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
       IMAGE LOAD REFRESH
    ===================================================== */

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
     MARQUEE GROUP
  ========================================================= */

  const renderMarqueeGroup =
    (
      prefix,
      hidden = false
    ) => (

      <div
        className="campus-buildings-marquee-group"

        aria-hidden={
          hidden
            ? "true"
            : undefined
        }
      >

        {buildingMarqueeImages.map(
          (
            image,
            index
          ) => (

            <div
              key={`${prefix}-${index}`}
              className="campus-buildings-marquee-item"
            >

              <div className="campus-buildings-thumb">

                <img
                  src={
                    image
                  }

                  alt=""

                  loading="lazy"

                  decoding="async"

                  draggable="false"

                  onError={
                    handleImageError
                  }
                />

              </div>


              <span>
                The Buildings
              </span>

            </div>

          )
        )}

      </div>

    );


  /* =========================================================
     JSX
  ========================================================= */

  return (
    <section
      ref={sectionRef}
      className="campus-buildings"
    >

      {/* =====================================================
          MARQUEE
      ===================================================== */}

      <div className="campus-buildings-marquee-section">

        <div className="campus-buildings-marquee-shell">

          <div
            ref={marqueeTrackRef}
            className="campus-buildings-marquee-track"
          >

            {renderMarqueeGroup(
              "first"
            )}


            {renderMarqueeGroup(
              "second",
              true
            )}

          </div>

        </div>

      </div>


      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <div
        ref={captionRef}
        className="campus-buildings-caption"
      >

        <p>

          <span className="campus-buildings-caption-accent">
            Open light. Thoughtful lines.
          </span>

          {" "}

          Spaces designed to give ideas,
          imagination and learning room
          to grow.

        </p>

      </div>


      {/* =====================================================
          BUILDING PHOTOS
      ===================================================== */}

      <div className="campus-buildings-grid">

        {buildingImages.map(
          (
            image,
            index
          ) => (

            <figure
              key={
                image.id
              }

              ref={
                (
                  element
                ) => {
                  photoRefs.current[
                    index
                  ] =
                    element;
                }
              }

              className={`
                campus-building-photo
                ${image.className}
              `}
            >

              <img
                src={
                  image.src
                }

                alt={
                  image.alt
                }

                loading={
                  index <
                  3
                    ? "eager"
                    : "lazy"
                }

                fetchPriority={
                  index === 0
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

          )
        )}

      </div>

    </section>
  );
};


export default CampusBuildings;