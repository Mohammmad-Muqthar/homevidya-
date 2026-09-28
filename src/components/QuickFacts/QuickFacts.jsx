import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./QuickFacts.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   FALLBACK IMAGE
========================================================= */

const fallbackImage =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=90";


/* =========================================================
   QUICK FACTS DATA
========================================================= */

const facts = [
  {
    id: "01",
    value: "1,200+",
    title: "Students",
    description:
      "A vibrant community learning, creating and growing together.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=90",
  },

  {
    id: "02",
    value: "60+",
    title: "Educators",
    description:
      "Teachers who bring care, attention and purpose to every classroom.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=90",
  },

  {
    id: "03",
    value: "15:1",
    title: "Student–Teacher Ratio",
    description:
      "More interaction, individual attention and meaningful learning.",
    image:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1600&q=90",
  },

  {
    id: "04",
    value: "25+",
    title: "Activities",
    description:
      "Sports, arts and experiences that take learning beyond the classroom.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1600&q=90",
  },

  {
    id: "05",
    value: "30+",
    title: "Learning Spaces",
    description:
      "Spaces designed for exploration, collaboration and discovery.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=90",
  },

  {
    id: "06",
    value: "100%",
    title: "Child-Centred",
    description:
      "Every experience is shaped around each child's growth and confidence.",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=90",
  },
];


const topFacts =
  facts.slice(0, 3);

const bottomFacts =
  facts.slice(3, 6);


/* =========================================================
   FACT CARD
========================================================= */

function FactCard({
  fact,
  duplicate = false,
}) {
  const handleImageError = (event) => {
    const image =
      event.currentTarget;

    image.onerror =
      null;

    image.src =
      fallbackImage;
  };


  return (
    <article
      className="quick-marquee-card"

      aria-hidden={
        duplicate
          ? "true"
          : undefined
      }
    >

      {/* IMAGE */}

      <img
        src={fact.image}

        alt={
          duplicate
            ? ""
            : fact.title
        }

        className="quick-marquee-image"

        loading="eager"

        decoding="async"

        draggable="false"

        onError={
          handleImageError
        }
      />


      {/* OVERLAY */}

      <div
        className="quick-marquee-overlay"
        aria-hidden="true"
      />


      {/* NUMBER */}

      <span className="quick-marquee-number">
        {fact.id}
      </span>


      {/* CONTENT */}

      <div className="quick-marquee-content">

        <strong className="quick-marquee-value">
          {fact.value}
        </strong>


        <h3>
          {fact.title}
        </h3>


        <div className="quick-marquee-description-wrap">

          <p>
            {fact.description}
          </p>

        </div>

      </div>

    </article>
  );
}


/* =========================================================
   FACT GROUP
========================================================= */

function FactGroup({
  items,
  duplicate = false,
}) {
  return (
    <div
      className="quick-marquee-group"

      aria-hidden={
        duplicate
          ? "true"
          : undefined
      }
    >

      {items.map((fact) => (

        <FactCard
          key={`${fact.id}-${
            duplicate
              ? "copy"
              : "original"
          }`}

          fact={fact}

          duplicate={duplicate}
        />

      ))}

    </div>
  );
}


/* =========================================================
   MOBILE AUTO SLIDER
========================================================= */

function createMobileAutoSlider(
  row,
  delay = 3200
) {
  if (!row) {
    return () => {};
  }


  const firstGroup =
    row.querySelector(
      ".quick-marquee-group:not([aria-hidden='true'])"
    );


  if (!firstGroup) {
    return () => {};
  }


  const cards =
    Array.from(
      firstGroup.querySelectorAll(
        ".quick-marquee-card"
      )
    );


  if (cards.length <= 1) {
    return () => {};
  }


  let currentIndex =
    0;

  let interval =
    null;

  let resumeTimeout =
    null;

  let userInteracting =
    false;


  /* =======================================================
     SIDE SPACE
  ======================================================= */

  const getSideSpace = () => {
    const styles =
      window.getComputedStyle(row);

    return (
      parseFloat(
        styles.scrollPaddingLeft
      ) || 0
    );
  };


  /* =======================================================
     SCROLL TO CARD
  ======================================================= */

  const goToCard = (
    index,
    smooth = true
  ) => {
    const card =
      cards[index];

    if (!card) {
      return;
    }


    const rowRect =
      row.getBoundingClientRect();

    const cardRect =
      card.getBoundingClientRect();


    const target =
      row.scrollLeft +
      cardRect.left -
      rowRect.left -
      getSideSpace();


    row.scrollTo({
      left:
        Math.max(
          0,
          target
        ),

      behavior:
        smooth
          ? "smooth"
          : "auto",
    });


    currentIndex =
      index;
  };


  /* =======================================================
     FIND CURRENT CARD AFTER MANUAL SWIPE
  ======================================================= */

  const updateCurrentIndex = () => {
    const rowRect =
      row.getBoundingClientRect();

    const targetX =
      rowRect.left +
      getSideSpace();


    let closestIndex =
      0;

    let closestDistance =
      Infinity;


    cards.forEach(
      (card, index) => {

        const rect =
          card.getBoundingClientRect();


        const distance =
          Math.abs(
            rect.left -
            targetX
          );


        if (
          distance <
          closestDistance
        ) {
          closestDistance =
            distance;

          closestIndex =
            index;
        }

      }
    );


    currentIndex =
      closestIndex;
  };


  /* =======================================================
     NEXT
  ======================================================= */

  const next = () => {
    if (
      userInteracting ||
      document.hidden
    ) {
      return;
    }


    const nextIndex =
      (
        currentIndex + 1
      ) %
      cards.length;


    goToCard(
      nextIndex,
      true
    );
  };


  /* =======================================================
     START
  ======================================================= */

  const start = () => {
    if (interval) {
      clearInterval(
        interval
      );
    }


    interval =
      window.setInterval(
        next,
        delay
      );
  };


  /* =======================================================
     STOP
  ======================================================= */

  const stop = () => {
    if (interval) {
      clearInterval(
        interval
      );

      interval =
        null;
    }
  };


  /* =======================================================
     USER STARTS TOUCHING
  ======================================================= */

  const handlePointerDown = () => {
    userInteracting =
      true;

    stop();


    if (resumeTimeout) {
      clearTimeout(
        resumeTimeout
      );
    }
  };


  /* =======================================================
     USER RELEASES
  ======================================================= */

  const handlePointerUp = () => {
    updateCurrentIndex();


    userInteracting =
      false;


    if (resumeTimeout) {
      clearTimeout(
        resumeTimeout
      );
    }


    /*
      Give user a moment before
      auto sliding continues.
    */

    resumeTimeout =
      window.setTimeout(
        () => {
          start();
        },
        2600
      );
  };


  /* =======================================================
     MANUAL SCROLL
  ======================================================= */

  let scrollFrame =
    null;


  const handleScroll = () => {
    if (scrollFrame) {
      cancelAnimationFrame(
        scrollFrame
      );
    }


    scrollFrame =
      requestAnimationFrame(
        () => {
          updateCurrentIndex();
        }
      );
  };


  /* =======================================================
     PAGE VISIBILITY
  ======================================================= */

  const handleVisibility = () => {
    if (document.hidden) {
      stop();
    } else if (
      !userInteracting
    ) {
      start();
    }
  };


  /* =======================================================
     EVENTS
  ======================================================= */

  row.addEventListener(
    "pointerdown",
    handlePointerDown,
    {
      passive: true,
    }
  );


  window.addEventListener(
    "pointerup",
    handlePointerUp,
    {
      passive: true,
    }
  );


  row.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true,
    }
  );


  document.addEventListener(
    "visibilitychange",
    handleVisibility
  );


  /* =======================================================
     INITIAL POSITION
  ======================================================= */

  requestAnimationFrame(
    () => {
      goToCard(
        0,
        false
      );

      start();
    }
  );


  /* =======================================================
     CLEANUP
  ======================================================= */

  return () => {
    stop();


    if (resumeTimeout) {
      clearTimeout(
        resumeTimeout
      );
    }


    if (scrollFrame) {
      cancelAnimationFrame(
        scrollFrame
      );
    }


    row.removeEventListener(
      "pointerdown",
      handlePointerDown
    );


    window.removeEventListener(
      "pointerup",
      handlePointerUp
    );


    row.removeEventListener(
      "scroll",
      handleScroll
    );


    document.removeEventListener(
      "visibilitychange",
      handleVisibility
    );
  };
}


/* =========================================================
   QUICK FACTS
========================================================= */

export default function QuickFacts() {
  const sectionRef =
    useRef(null);

  const headingRef =
    useRef(null);

  const topRowRef =
    useRef(null);

  const bottomRowRef =
    useRef(null);

  const topTrackRef =
    useRef(null);

  const bottomTrackRef =
    useRef(null);


  /* =========================================================
     ANIMATION
  ========================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;


    if (!section) {
      return;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(() => {

        /* ===================================================
           HEADING
        =================================================== */

        gsap.fromTo(
          headingRef.current,

          {
            opacity:
              0,

            y:
              30,
          },

          {
            opacity:
              1,

            y:
              0,

            duration:
              0.8,

            ease:
              "power4.out",

            scrollTrigger: {
              trigger:
                headingRef.current,

              start:
                "top 90%",

              once:
                true,
            },
          }
        );


        /* ===================================================
           ROW ENTRANCE
        =================================================== */

        gsap.fromTo(
          topRowRef.current,

          {
            opacity:
              0,

            x:
              50,
          },

          {
            opacity:
              1,

            x:
              0,

            duration:
              0.85,

            ease:
              "power4.out",

            scrollTrigger: {
              trigger:
                topRowRef.current,

              start:
                "top 92%",

              once:
                true,
            },
          }
        );


        gsap.fromTo(
          bottomRowRef.current,

          {
            opacity:
              0,

            x:
              -50,
          },

          {
            opacity:
              1,

            x:
              0,

            duration:
              0.85,

            ease:
              "power4.out",

            scrollTrigger: {
              trigger:
                bottomRowRef.current,

              start:
                "top 94%",

              once:
                true,
            },
          }
        );


        /* ===================================================
           DESKTOP CONTINUOUS MARQUEE
        =================================================== */

        mm.add(
          "(min-width: 769px)",

          () => {

            const topTween =
              gsap.fromTo(
                topTrackRef.current,

                {
                  xPercent:
                    0,
                },

                {
                  xPercent:
                    -50,

                  duration:
                    26,

                  repeat:
                    -1,

                  ease:
                    "none",
                }
              );


            const bottomTween =
              gsap.fromTo(
                bottomTrackRef.current,

                {
                  xPercent:
                    -50,
                },

                {
                  xPercent:
                    0,

                  duration:
                    29,

                  repeat:
                    -1,

                  ease:
                    "none",
                }
              );


            /* ===============================================
               DESKTOP VERTICAL DEPTH
            =============================================== */

            gsap.fromTo(
              topRowRef.current,

              {
                y:
                  16,
              },

              {
                y:
                  -16,

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
                    1.2,
                },
              }
            );


            gsap.fromTo(
              bottomRowRef.current,

              {
                y:
                  -12,
              },

              {
                y:
                  14,

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
                    1.25,
                },
              }
            );


            /* ===============================================
               DESKTOP VELOCITY
            =============================================== */

            let settleCall =
              null;


            const trigger =
              ScrollTrigger.create({
                trigger:
                  section,

                start:
                  "top bottom",

                end:
                  "bottom top",

                onUpdate:
                  (self) => {

                    const velocity =
                      Math.abs(
                        self.getVelocity()
                      );


                    const speed =
                      Math.min(
                        1.9,

                        1 +
                        velocity /
                        2800
                      );


                    topTween.timeScale(
                      speed
                    );

                    bottomTween.timeScale(
                      speed
                    );


                    if (settleCall) {
                      settleCall.kill();
                    }


                    settleCall =
                      gsap.delayedCall(
                        0.15,

                        () => {

                          gsap.to(
                            topTween,
                            {
                              timeScale:
                                1,

                              duration:
                                0.75,

                              ease:
                                "power3.out",
                            }
                          );


                          gsap.to(
                            bottomTween,
                            {
                              timeScale:
                                1,

                              duration:
                                0.75,

                              ease:
                                "power3.out",
                            }
                          );

                        }
                      );

                  },
              });


            return () => {
              trigger.kill();


              if (settleCall) {
                settleCall.kill();
              }
            };
          }
        );


        /* ===================================================
           MOBILE AUTO SLIDER
        =================================================== */

        mm.add(
          "(max-width: 768px)",

          () => {

            /*
              Completely remove desktop transforms.
            */

            gsap.set(
              topTrackRef.current,
              {
                clearProps:
                  "transform",
              }
            );


            gsap.set(
              bottomTrackRef.current,
              {
                clearProps:
                  "transform",
              }
            );


            gsap.set(
              topRowRef.current,
              {
                y:
                  0,
              }
            );


            gsap.set(
              bottomRowRef.current,
              {
                y:
                  0,
              }
            );


            /*
              Top slider:
              changes every 3.2 seconds.
            */

            const destroyTop =
              createMobileAutoSlider(
                topRowRef.current,
                3200
              );


            /*
              Bottom slightly offset so
              both rows don't change
              at exactly the same moment.
            */

            const destroyBottom =
              createMobileAutoSlider(
                bottomRowRef.current,
                3700
              );


            return () => {
              destroyTop();
              destroyBottom();
            };
          }
        );

      }, section);


    requestAnimationFrame(
      () => {
        ScrollTrigger.refresh();
      }
    );


    return () => {
      mm.revert();

      ctx.revert();
    };
  }, []);


  return (
    <section
      ref={sectionRef}
      className="quick-facts"
      id="quick-facts"
    >

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="quick-facts-header">

        <h2
          ref={headingRef}
          className="quick-facts-heading"
        >
          Vidya at a glance.
        </h2>

      </div>


      {/* =====================================================
          CARDS
      ====================================================== */}

      <div className="quick-marquee-wall">


        {/* TOP */}

        <div
          ref={topRowRef}

          className="
            quick-marquee-row
            quick-marquee-row--top
          "
        >

          <div
            ref={topTrackRef}
            className="quick-marquee-track"
          >

            <FactGroup
              items={topFacts}
            />


            <FactGroup
              items={topFacts}
              duplicate
            />

          </div>

        </div>


        {/* BOTTOM */}

        <div
          ref={bottomRowRef}

          className="
            quick-marquee-row
            quick-marquee-row--bottom
          "
        >

          <div
            ref={bottomTrackRef}
            className="quick-marquee-track"
          >

            <FactGroup
              items={bottomFacts}
            />


            <FactGroup
              items={bottomFacts}
              duplicate
            />

          </div>

        </div>

      </div>

    </section>
  );
}