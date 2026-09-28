import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./LifeAtSchool.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   LIFE AT SCHOOL DATA
========================================================= */

const lifeCards = [
  {
    id: 1,

    label: "ACADEMICS",

    title: "Learning with curiosity",

    description:
      "Thoughtful classrooms encourage students to question, explore and understand ideas with confidence.",

    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90",
  },

  {
    id: 2,

    label: "SPORTS",

    title: "Energy beyond the classroom",

    description:
      "Movement, teamwork and healthy competition help students build resilience and confidence.",

    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1800&q=90",
  },

  {
    id: 3,

    label: "ARTS",

    title: "Space to create",

    description:
      "Art gives students room to express ideas, experiment freely and discover their creative voice.",

    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1800&q=90",
  },

  {
    id: 4,

    label: "COMMUNITY",

    title: "Growing together",

    description:
      "School life is shaped by friendships, collaboration and the feeling of belonging to a community.",

    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=90",
  },

  {
    id: 5,

    label: "INNOVATION",

    title: "Ideas become possibilities",

    description:
      "Students are encouraged to experiment, solve problems and turn curiosity into meaningful ideas.",

    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1800&q=90",
  },

  {
    id: 6,

    label: "EVERYDAY LIFE",

    title: "Moments that become memories",

    description:
      "The everyday moments between lessons often become some of the most meaningful parts of school.",

    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=90",
  },
];


export default function LifeAtSchool() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const sliderWrapRef = useRef(null);
  const sliderRef = useRef(null);

  const [progress, setProgress] =
    useState(0);

  const dragRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });


  /* =========================================================
     ENTRANCE ANIMATION
  ========================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;


    const ctx =
      gsap.context(() => {

        /* HEADING */

        gsap.fromTo(
          headingRef.current,

          {
            opacity: 0,
            y: 36,
          },

          {
            opacity: 1,
            y: 0,

            duration: 0.85,

            ease:
              "power4.out",

            scrollTrigger: {
              trigger:
                headingRef.current,

              start:
                "top 88%",

              once: true,
            },
          }
        );


        /* SLIDER */

        gsap.fromTo(
          sliderWrapRef.current,

          {
            opacity: 0,
            y: 45,
          },

          {
            opacity: 1,
            y: 0,

            duration: 0.95,

            ease:
              "power4.out",

            scrollTrigger: {
              trigger:
                sliderWrapRef.current,

              start:
                "top 90%",

              once: true,
            },
          }
        );

      }, section);


    return () => {
      ctx.revert();
    };
  }, []);


  /* =========================================================
     SCROLL PROGRESS
  ========================================================= */

  const updateProgress = () => {
    const slider =
      sliderRef.current;

    if (!slider) return;


    const maxScroll =
      slider.scrollWidth -
      slider.clientWidth;


    if (maxScroll <= 0) {
      setProgress(0);

      return;
    }


    const value =
      slider.scrollLeft /
      maxScroll;


    setProgress(
      Math.min(
        Math.max(
          value,
          0
        ),
        1
      )
    );
  };


  /* =========================================================
     DESKTOP DRAG
  ========================================================= */

  const handlePointerDown = (
    event
  ) => {
    const slider =
      sliderRef.current;

    if (!slider) return;


    /*
      Let phones/tablets use
      native touch scrolling.
    */

    if (
      event.pointerType ===
      "touch"
    ) {
      return;
    }


    dragRef.current.active =
      true;

    dragRef.current.startX =
      event.clientX;

    dragRef.current.startScrollLeft =
      slider.scrollLeft;


    slider.classList.add(
      "is-dragging"
    );


    slider.setPointerCapture?.(
      event.pointerId
    );
  };


  const handlePointerMove = (
    event
  ) => {
    const slider =
      sliderRef.current;


    if (
      !slider ||
      !dragRef.current.active
    ) {
      return;
    }


    const distance =
      event.clientX -
      dragRef.current.startX;


    slider.scrollLeft =
      dragRef.current
        .startScrollLeft -
      distance * 1.08;
  };


  const stopDragging = (
    event
  ) => {
    const slider =
      sliderRef.current;


    dragRef.current.active =
      false;


    if (!slider) return;


    slider.classList.remove(
      "is-dragging"
    );


    if (
      event?.pointerId !==
      undefined
    ) {
      try {
        slider.releasePointerCapture?.(
          event.pointerId
        );
      } catch {
        // Nothing needed.
      }
    }
  };


  return (
    <section
      ref={sectionRef}
      className="life-school"
      id="life-at-school"
    >

      {/* =====================================================
          HEADING
      ====================================================== */}

      <div className="life-school-header">

        <h2
          ref={headingRef}
          className="life-school-title"
        >
          Life happens{" "}

          <span>
            everywhere.
          </span>
        </h2>

      </div>


      {/* =====================================================
          CARDS
      ====================================================== */}

      <div
        ref={sliderWrapRef}
        className="life-school-slider-wrap"
      >

        <div
          ref={sliderRef}

          className="life-school-slider"

          onScroll={
            updateProgress
          }

          onPointerDown={
            handlePointerDown
          }

          onPointerMove={
            handlePointerMove
          }

          onPointerUp={
            stopDragging
          }

          onPointerCancel={
            stopDragging
          }

          onPointerLeave={(
            event
          ) => {
            if (
              dragRef.current.active
            ) {
              stopDragging(
                event
              );
            }
          }}
        >

          {lifeCards.map(
            (
              card,
              index
            ) => (

              <article
                key={card.id}
                className="life-school-card"
                tabIndex={0}
              >

                {/* IMAGE */}

                <img
                  src={card.image}

                  alt={card.title}

                  className="life-school-card-image"

                  loading="lazy"

                  draggable="false"
                />


                {/* DEFAULT DARK GRADIENT */}

                <div
                  className="life-school-card-gradient"
                  aria-hidden="true"
                />


                {/* GREEN HOVER OVERLAY */}

                <div
                  className="life-school-card-hover-overlay"
                  aria-hidden="true"
                />


                {/* NUMBER */}

                <span className="life-school-card-number">

                  {String(
                    index + 1
                  ).padStart(
                    2,
                    "0"
                  )}

                </span>


                {/* CONTENT */}

                <div className="life-school-card-content">

                  <span className="life-school-card-label">
                    {card.label}
                  </span>


                  <h3>
                    {card.title}
                  </h3>


                  <div className="life-school-card-description-wrap">

                    <p className="life-school-card-description">
                      {card.description}
                    </p>

                  </div>

                </div>

              </article>

            )
          )}

        </div>

      </div>


      {/* =====================================================
          BOTTOM
      ====================================================== */}

      <div className="life-school-bottom">

        <div className="life-school-progress">

          <div className="life-school-progress-track">

            <span
              className="life-school-progress-fill"

              style={{
                transform:
                  `scaleX(${
                    Math.max(
                      progress,
                      0.06
                    )
                  })`,
              }}
            />

          </div>

        </div>


        <div className="life-school-drag">

          <span className="life-school-drag-line" />

          <span>
            DRAG TO EXPLORE
          </span>

        </div>

      </div>

    </section>
  );
}