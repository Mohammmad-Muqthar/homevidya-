import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CampusGrounds.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   INTRO TEXT
========================================================= */

const introText =
  "At Vidya, the campus and the learning experience are designed together. The playground is not simply an amenity. The courtyards are not decoration. They are spaces created for curiosity, movement, collaboration and the kind of learning that happens everywhere.";


/* =========================================================
   MARQUEE IMAGES
========================================================= */

const marqueeImages = [
  "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=90",

  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=90",

  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=90",

  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=90",
];


/* =========================================================
   CAMPUS PHOTOS
========================================================= */

const campusImages = [
  {
    id: "01",

    src:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=90",

    alt:
      "School campus exterior",

    className:
      "campus-photo--01",
  },

  {
    id: "02",

    src:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=90",

    alt:
      "Educational campus grounds",

    className:
      "campus-photo--02",
  },

  {
    id: "03",

    src:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=90",

    alt:
      "Academic campus building",

    className:
      "campus-photo--03",
  },

  {
    id: "04",

    src:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=2000&q=90",

    alt:
      "Modern educational building",

    className:
      "campus-photo--04",
  },

  {
    id: "05",

    src:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=2000&q=90",

    alt:
      "School learning environment",

    className:
      "campus-photo--05",
  },

  {
    id: "06",

    src:
      "https://images.unsplash.com/photo-1560582861-45078880e48e?auto=format&fit=crop&w=2000&q=90",

    alt:
      "Modern campus architecture",

    className:
      "campus-photo--06",
  },

  {
    id: "07",

    src:
      "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=2000&q=90",

    alt:
      "Educational campus building",

    className:
      "campus-photo--07",
  },
];


/* =========================================================
   COMPONENT
========================================================= */

const CampusGrounds = () => {
  const sectionRef =
    useRef(null);

  const introSectionRef =
    useRef(null);

  const introTextRef =
    useRef(null);

  const marqueeTrackRef =
    useRef(null);

  const photoRefs =
    useRef([]);


  /* =========================================================
     GSAP
  ========================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const introSection =
      introSectionRef.current;

    const introTextElement =
      introTextRef.current;

    const marqueeTrack =
      marqueeTrackRef.current;


    if (
      !section ||
      !introSection ||
      !introTextElement ||
      !marqueeTrack
    ) {
      return;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(() => {

        /* =====================================================
           INTRO WORD REVEAL
        ===================================================== */

        const words =
          introTextElement.querySelectorAll(
            ".campus-intro-word"
          );


        gsap.set(
          words,
          {
            color:
              "rgba(11, 130, 85, 0.14)",
          }
        );


        gsap.to(
          words,
          {
            color:
              "#0b8255",

            stagger: {
              each:
                0.011,
            },

            ease:
              "none",

            scrollTrigger: {
              trigger:
                introSection,

              start:
                "top 76%",

              end:
                "bottom 34%",

              scrub:
                0.7,

              invalidateOnRefresh:
                true,
            },
          }
        );


        /* =====================================================
           DESKTOP TEXT PARALLAX
        ===================================================== */

        mm.add(
          "(min-width: 769px)",

          () => {
            gsap.fromTo(
              introTextElement,

              {
                y:
                  12,
              },

              {
                y:
                  -12,

                ease:
                  "none",

                scrollTrigger: {
                  trigger:
                    introSection,

                  start:
                    "top bottom",

                  end:
                    "bottom top",

                  scrub:
                    0.8,
                },
              }
            );
          }
        );


        /* =====================================================
           MARQUEE
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
           DESKTOP PHOTO REVEALS
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
           MOBILE PHOTO REVEALS
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
        className="campus-grounds-marquee-group"

        aria-hidden={
          hidden
            ? "true"
            : undefined
        }
      >

        {marqueeImages.map(
          (
            image,
            index
          ) => (

            <div
              key={`${prefix}-${index}`}

              className="campus-grounds-marquee-item"
            >

              <div className="campus-marquee-thumb">

                <img
                  src={image}
                  alt=""
                  draggable="false"
                />

              </div>


              <span>
                The Grounds
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
      className="campus-grounds"
    >

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section
        ref={introSectionRef}
        className="campus-intro"
      >

        <div className="campus-intro-inner">

          <p
            ref={introTextRef}
            className="campus-intro-text"
          >

            {introText
              .split(" ")
              .map(
                (
                  word,
                  index
                ) => (

                  <span
                    key={`${word}-${index}`}
                    className="campus-intro-word"
                  >
                    {word}{" "}
                  </span>

                )
              )}

          </p>

        </div>

      </section>


      {/* =====================================================
          GROUNDS
      ===================================================== */}

      <section className="campus-grounds-main">

        {/* =================================================
            MARQUEE
        ================================================= */}

        <div className="campus-grounds-marquee-section">

          <div className="campus-grounds-marquee-shell">

            <div
              ref={marqueeTrackRef}
              className="campus-grounds-marquee-track"
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


        {/* =================================================
            SMALL DESCRIPTION
        ================================================= */}

        <div className="campus-grounds-caption">

          <p>
            Every outdoor space is a learning
            space. The architecture doesn't
            separate sport from study. It
            refuses to.
          </p>

        </div>


        {/* =================================================
            PHOTO GRID
        ================================================= */}

        <div className="campus-photo-grid">

          {campusImages.map(
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
                  campus-photo
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

    </section>
  );
};


export default CampusGrounds;