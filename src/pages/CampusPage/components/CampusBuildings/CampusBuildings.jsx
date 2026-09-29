import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CampusBuildings.css";


gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   SMALL MARQUEE IMAGES
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
           INFINITE BUILDINGS MARQUEE
        ===================================================== */

        const marqueeTween =
          gsap.to(
            marqueeTrack,
            {
              xPercent:
                -50,

              duration:
                25,

              ease:
                "none",

              repeat:
                -1,
            }
          );


        /* =====================================================
           SUBTLE MARQUEE SCROLL DRIFT
        ===================================================== */

        const marqueeShell =
          section.querySelector(
            ".campus-buildings-marquee-shell"
          );


        if (marqueeShell) {

          gsap.fromTo(
            marqueeShell,
            {
              x: 14,
            },
            {
              x: -14,

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
           DESCRIPTION REVEAL
        ===================================================== */

        if (caption) {

          gsap.fromTo(
            caption,
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

              ease:
                "none",

              scrollTrigger: {
                trigger:
                  caption,

                start:
                  "top 90%",

                end:
                  "top 72%",

                scrub:
                  0.55,
              },
            }
          );

        }


        /* =====================================================
           DESKTOP BUILDINGS
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
                      52 +
                      (
                        index %
                        3
                      ) *
                        13,
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
                        "top 70%",

                      scrub:
                        0.65,
                    },
                  }
                );


                /* =============================================
                   IMAGE PARALLAX
                ============================================= */

                if (image) {

                  gsap.fromTo(
                    image,
                    {
                      scale:
                        1.075,

                      yPercent:
                        -3,
                    },
                    {
                      scale:
                        1,

                      yPercent:
                        3,

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
                          0.75,
                      },
                    }
                  );

                }

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

            const photos =
              photoRefs.current.filter(
                Boolean
              );


            photos.forEach(
              (
                card
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
                      28,
                  },
                  {
                    opacity:
                      1,

                    y:
                      0,

                    duration:
                      0.72,

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


                if (image) {

                  gsap.fromTo(
                    image,
                    {
                      scale:
                        1.05,
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
                          0.5,
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


    const refresh =
      () => {

        ScrollTrigger.refresh();

      };


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
      (
        image
      ) => {

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
        (
          image
        ) => {

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
              key={
                `${prefix}-${index}`
              }

              className="campus-buildings-marquee-item"
            >

              <div
                className="campus-buildings-thumb"
              >

                <img
                  src={
                    image
                  }

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
          MOVING BUILDINGS TITLE

          NO TEXT SECTION ABOVE THIS.
      ====================================================== */}

      <div
        className="campus-buildings-marquee-section"
      >

        <div
          className="campus-buildings-marquee-shell"
        >

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
          SHORT BUILDING STATEMENT
      ====================================================== */}

      <div
        ref={captionRef}

        className="campus-buildings-caption"
      >

        <p>
          Open light. Thoughtful lines.
          Spaces designed to give ideas,
          imagination and learning room
          to grow.
        </p>

      </div>


      {/* =====================================================
          BUILDING PHOTOS
      ====================================================== */}

      <div
        className="campus-buildings-grid"
      >

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
                  index < 3
                    ? "eager"
                    : "lazy"
                }

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