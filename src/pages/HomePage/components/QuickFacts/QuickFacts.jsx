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
  const handleImageError = (
    event
  ) => {
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

      {items.map(
        (fact) => (

          <FactCard
            key={`${fact.id}-${
              duplicate
                ? "copy"
                : "original"
            }`}

            fact={fact}

            duplicate={
              duplicate
            }
          />

        )
      )}

    </div>
  );
}


/* =========================================================
   MOBILE AUTO SLIDER
========================================================= */

function createMobileAutoSlider(
  row,
  delay = 3400
) {
  if (!row) {
    return () => {};
  }


  const group =
    row.querySelector(
      ".quick-marquee-group:not([aria-hidden='true'])"
    );


  if (!group) {
    return () => {};
  }


  const cards =
    Array.from(
      group.querySelectorAll(
        ".quick-marquee-card"
      )
    );


  if (
    cards.length <= 1
  ) {
    return () => {};
  }


  let currentIndex =
    0;

  let intervalId =
    null;

  let resumeTimer =
    null;

  let scrollFrame =
    null;

  let interacting =
    false;


  /* =======================================================
     SCROLL PADDING
  ======================================================= */

  const getPadding = () => {
    const styles =
      window.getComputedStyle(
        row
      );


    return (
      parseFloat(
        styles.scrollPaddingLeft
      ) || 0
    );
  };


  /* =======================================================
     GO TO CARD
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
      getPadding();


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
     FIND ACTIVE CARD
  ======================================================= */

  const updateCurrentIndex =
    () => {
      const rowRect =
        row.getBoundingClientRect();


      const targetX =
        rowRect.left +
        getPadding();


      let closest =
        0;

      let closestDistance =
        Infinity;


      cards.forEach(
        (
          card,
          index
        ) => {
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

            closest =
              index;
          }
        }
      );


      currentIndex =
        closest;
    };


  /* =======================================================
     NEXT
  ======================================================= */

  const next = () => {
    if (
      interacting ||
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
     START AUTO
  ======================================================= */

  const start = () => {
    if (intervalId) {
      clearInterval(
        intervalId
      );
    }


    intervalId =
      window.setInterval(
        next,
        delay
      );
  };


  /* =======================================================
     STOP AUTO
  ======================================================= */

  const stop = () => {
    if (!intervalId) {
      return;
    }


    clearInterval(
      intervalId
    );


    intervalId =
      null;
  };


  /* =======================================================
     USER TOUCHES CARD
  ======================================================= */

  const handlePointerDown =
    () => {
      interacting =
        true;


      stop();


      if (resumeTimer) {
        clearTimeout(
          resumeTimer
        );
      }
    };


  /* =======================================================
     USER RELEASES
  ======================================================= */

  const handlePointerEnd =
    () => {
      updateCurrentIndex();


      interacting =
        false;


      if (resumeTimer) {
        clearTimeout(
          resumeTimer
        );
      }


      resumeTimer =
        window.setTimeout(
          () => {
            start();
          },
          3000
        );
    };


  /* =======================================================
     MANUAL HORIZONTAL SCROLL
  ======================================================= */

  const handleScroll = () => {
    if (scrollFrame) {
      cancelAnimationFrame(
        scrollFrame
      );
    }


    scrollFrame =
      requestAnimationFrame(
        updateCurrentIndex
      );
  };


  /* =======================================================
     PAGE VISIBILITY
  ======================================================= */

  const handleVisibility =
    () => {
      if (
        document.hidden
      ) {
        stop();
      } else if (
        !interacting
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
    handlePointerEnd,
    {
      passive: true,
    }
  );


  window.addEventListener(
    "pointercancel",
    handlePointerEnd,
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

     Wait two frames so mobile layout
     has its real width before measuring.
  ======================================================= */

  let frameOne =
    null;

  let frameTwo =
    null;


  frameOne =
    requestAnimationFrame(
      () => {
        frameTwo =
          requestAnimationFrame(
            () => {
              row.scrollLeft =
                0;


              currentIndex =
                0;


              start();
            }
          );
      }
    );


  /* =======================================================
     CLEANUP
  ======================================================= */

  return () => {
    stop();


    if (resumeTimer) {
      clearTimeout(
        resumeTimer
      );
    }


    if (scrollFrame) {
      cancelAnimationFrame(
        scrollFrame
      );
    }


    if (frameOne) {
      cancelAnimationFrame(
        frameOne
      );
    }


    if (frameTwo) {
      cancelAnimationFrame(
        frameTwo
      );
    }


    row.removeEventListener(
      "pointerdown",
      handlePointerDown
    );


    window.removeEventListener(
      "pointerup",
      handlePointerEnd
    );


    window.removeEventListener(
      "pointercancel",
      handlePointerEnd
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

  const topRowRef =
    useRef(null);

  const bottomRowRef =
    useRef(null);

  const topTrackRef =
    useRef(null);

  const bottomTrackRef =
    useRef(null);


  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const topRow =
      topRowRef.current;

    const bottomRow =
      bottomRowRef.current;

    const topTrack =
      topTrackRef.current;

    const bottomTrack =
      bottomTrackRef.current;


    if (
      !section ||
      !topRow ||
      !bottomRow ||
      !topTrack ||
      !bottomTrack
    ) {
      return;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(() => {

        /* =====================================================
           BASELINE

           Never start hidden or translated.

           This removes the first-load broken state.
        ===================================================== */

        gsap.set(
          [
            topRow,
            bottomRow,
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
          }
        );


        /* =====================================================
           DESKTOP
        ===================================================== */

        mm.add(
          "(min-width: 769px)",

          () => {

            /* ===============================================
               RESET
            =============================================== */

            topRow.scrollLeft =
              0;

            bottomRow.scrollLeft =
              0;


            gsap.set(
              topTrack,
              {
                xPercent: 0,
              }
            );


            gsap.set(
              bottomTrack,
              {
                xPercent: -50,
              }
            );


            /* ===============================================
               CONTINUOUS MARQUEE
            =============================================== */

            const topTween =
              gsap.to(
                topTrack,
                {
                  xPercent: -50,

                  duration: 26,

                  repeat: -1,

                  ease: "none",
                }
              );


            const bottomTween =
              gsap.to(
                bottomTrack,
                {
                  xPercent: 0,

                  duration: 29,

                  repeat: -1,

                  ease: "none",
                }
              );


            /* ===============================================
               SUBTLE VERTICAL DEPTH
            =============================================== */

            const topDepth =
              gsap.fromTo(
                topRow,

                {
                  y: 14,
                },

                {
                  y: -14,

                  ease: "none",

                  scrollTrigger: {
                    trigger:
                      section,

                    start:
                      "top bottom",

                    end:
                      "bottom top",

                    scrub:
                      1.15,

                    invalidateOnRefresh:
                      true,
                  },
                }
              );


            const bottomDepth =
              gsap.fromTo(
                bottomRow,

                {
                  y: -10,
                },

                {
                  y: 12,

                  ease: "none",

                  scrollTrigger: {
                    trigger:
                      section,

                    start:
                      "top bottom",

                    end:
                      "bottom top",

                    scrub:
                      1.2,

                    invalidateOnRefresh:
                      true,
                  },
                }
              );


            /* ===============================================
               SCROLL VELOCITY
            =============================================== */

            let settleCall =
              null;


            const velocityTrigger =
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
                        1.8,

                        1 +
                          velocity /
                            3000
                      );


                    topTween.timeScale(
                      speed
                    );


                    bottomTween.timeScale(
                      speed
                    );


                    if (
                      settleCall
                    ) {
                      settleCall.kill();
                    }


                    settleCall =
                      gsap.delayedCall(
                        0.16,

                        () => {
                          gsap.to(
                            topTween,
                            {
                              timeScale:
                                1,

                              duration:
                                0.65,

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
                                0.65,

                              ease:
                                "power3.out",
                            }
                          );
                        }
                      );
                  },
              });


            return () => {
              topTween.kill();

              bottomTween.kill();

              topDepth.kill();

              bottomDepth.kill();

              velocityTrigger.kill();


              if (
                settleCall
              ) {
                settleCall.kill();
              }


              gsap.set(
                [
                  topTrack,
                  bottomTrack,
                  topRow,
                  bottomRow,
                ],
                {
                  clearProps:
                    "transform",
                }
              );
            };
          }
        );


        /* =====================================================
           MOBILE

           NO DESKTOP GSAP TRANSFORMS.
           NATIVE CARD SCROLLING.
        ===================================================== */

        mm.add(
          "(max-width: 768px)",

          () => {
            gsap.killTweensOf(
              [
                topTrack,
                bottomTrack,
                topRow,
                bottomRow,
              ]
            );


            gsap.set(
              [
                topTrack,
                bottomTrack,
                topRow,
                bottomRow,
              ],
              {
                clearProps:
                  "transform",
              }
            );


            topRow.scrollLeft =
              0;

            bottomRow.scrollLeft =
              0;


            let destroyTop =
              () => {};

            let destroyBottom =
              () => {};


            let frameOne =
              null;

            let frameTwo =
              null;


            /*
              Double frame prevents measuring
              cards before mobile layout settles.
            */

            frameOne =
              requestAnimationFrame(
                () => {
                  frameTwo =
                    requestAnimationFrame(
                      () => {
                        destroyTop =
                          createMobileAutoSlider(
                            topRow,
                            3600
                          );


                        destroyBottom =
                          createMobileAutoSlider(
                            bottomRow,
                            4100
                          );
                      }
                    );
                }
              );


            return () => {
              if (frameOne) {
                cancelAnimationFrame(
                  frameOne
                );
              }


              if (frameTwo) {
                cancelAnimationFrame(
                  frameTwo
                );
              }


              destroyTop();

              destroyBottom();


              topRow.scrollLeft =
                0;

              bottomRow.scrollLeft =
                0;
            };
          }
        );

      }, section);


    /* =====================================================
       KEEP SCROLLTRIGGER CORRECT AFTER
       FONT / IMAGE / LAYOUT CHANGES
    ===================================================== */

    let refreshFrame =
      null;

    let refreshTimeout =
      null;


    const refresh =
      () => {
        if (refreshFrame) {
          cancelAnimationFrame(
            refreshFrame
          );
        }


        refreshFrame =
          requestAnimationFrame(
            () => {
              ScrollTrigger.refresh();
            }
          );
      };


    /*
      Initial refresh after browser has
      completed first layout.
    */

    refreshTimeout =
      window.setTimeout(
        refresh,
        120
      );


    /*
      Fonts can alter measurements after
      the first React render.
    */

    if (
      document.fonts &&
      document.fonts.ready
    ) {
      document.fonts.ready.then(
        refresh
      );
    }


    window.addEventListener(
      "load",
      refresh
    );


    window.addEventListener(
      "resize",
      refresh
    );


    /* =====================================================
       WATCH SECTION SIZE CHANGES
    ===================================================== */

    let resizeObserver =
      null;


    if (
      "ResizeObserver" in window
    ) {
      resizeObserver =
        new ResizeObserver(
          () => {
            refresh();
          }
        );


      resizeObserver.observe(
        section
      );
    }


    return () => {
      clearTimeout(
        refreshTimeout
      );


      if (refreshFrame) {
        cancelAnimationFrame(
          refreshFrame
        );
      }


      window.removeEventListener(
        "load",
        refresh
      );


      window.removeEventListener(
        "resize",
        refresh
      );


      if (
        resizeObserver
      ) {
        resizeObserver.disconnect();
      }


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

        <h2 className="quick-facts-heading">
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