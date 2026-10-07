import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CampusBuildings.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   BUILDING MARQUEE IMAGES
========================================================= */

const buildingMarqueeImages = [
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=90",

  "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=90",

  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=90",

  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=90",
];


/* =========================================================
   BUILDING IMAGES
========================================================= */

const buildingImages = [
  {
    id: "01",

    src:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=90",

    alt:
      "Modern school building",

    className:
      "building-photo--01",
  },

  {
    id: "02",

    src:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=2000&q=90",

    alt:
      "Contemporary educational architecture",

    className:
      "building-photo--02",
  },

  {
    id: "03",

    src:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=90",

    alt:
      "Academic building exterior",

    className:
      "building-photo--03",
  },

  {
    id: "04",

    src:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=90",

    alt:
      "Open campus architecture",

    className:
      "building-photo--04",
  },

  {
    id: "05",

    src:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=2000&q=90",

    alt:
      "School interior",

    className:
      "building-photo--05",
  },

  {
    id: "06",

    src:
      "https://images.unsplash.com/photo-1560582861-45078880e48e?auto=format&fit=crop&w=2000&q=90",

    alt:
      "Modern school architecture",

    className:
      "building-photo--06",
  },

  {
    id: "07",

    src:
      "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=2000&q=90",

    alt:
      "Educational building",

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
      return;
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
                    },
                  }
                );


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
                  src={image}
                  alt=""
                  draggable="false"
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
              key={image.id}

              ref={
                (element) => {
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
                src={image.src}

                alt={image.alt}

                loading={
                  index < 3
                    ? "eager"
                    : "lazy"
                }

                decoding="async"

                draggable="false"
              />

            </figure>

          )
        )}

      </div>

    </section>
  );
};


export default CampusBuildings;