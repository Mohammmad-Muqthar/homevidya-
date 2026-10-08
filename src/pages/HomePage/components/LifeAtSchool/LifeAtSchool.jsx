import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./LifeAtSchool.css";


gsap.registerPlugin(
  ScrollTrigger
);


/* =========================================================
   LIFE AT SCHOOL DATA
========================================================= */

const lifeCards = [
  {
    id: 1,

    label:
      "ACADEMICS",

    title:
      "Learning with curiosity",

    description:
      "Thoughtful classrooms encourage students to question, explore and understand ideas with confidence.",

    image:
      "https://plus.unsplash.com/premium_photo-1661963297627-92799f5658fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYyfHxzY2hvb2xzfGVufDB8fDB8fHww",
  },

  {
    id: 2,

    label:
      "SPORTS",

    title:
      "Energy beyond the classroom",

    description:
      "Movement, teamwork and healthy competition help students build resilience and confidence.",

    image:
      "https://images.unsplash.com/photo-1771257807779-a72e74deaa11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHNwb3J0cyUyMHNjaG9vbHN8ZW58MHx8MHx8fDA%3D",
  },

  {
    id: 3,

    label:
      "ARTS",

    title:
      "Space to create",

    description:
      "Art gives students room to express ideas, experiment freely and discover their creative voice.",

    image:
      "https://images.unsplash.com/photo-1770096679844-57ca92c2b64b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGFydHMlMjBpbiUyMHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D",
  },

  {
    id: 4,

    label:
      "COMMUNITY",

    title:
      "Growing together",

    description:
      "School life is shaped by friendships, collaboration and the feeling of belonging to a community.",

    image:
      "https://images.unsplash.com/photo-1761039807514-292d7d33059f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGNvbW11bml0eSUyMCclMjBzY2hvb2x8ZW58MHx8MHx8fDA%3D",
  },

  {
    id: 5,

    label:
      "INNOVATION",

    title:
      "Ideas become possibilities",

    description:
      "Students are encouraged to experiment, solve problems and turn curiosity into meaningful ideas.",

    image:
      "https://plus.unsplash.com/premium_photo-1682124399858-022a1cf3aa71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGlubm92YXRpb24lMjBzY2hvb2x8ZW58MHx8MHx8fDA%3D",
  },

  {
    id: 6,

    label:
      "EVERYDAY LIFE",

    title:
      "Moments that become memories",

    description:
      "The everyday moments between lessons often become some of the most meaningful parts of school.",

    image:
      "https://plus.unsplash.com/premium_photo-1770505495978-51e36b2f8040?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGV2ZXJ5ZGF5aW4lMjBzY2hvb2wlMjBsaWZlJTIwc2Nob29sJTIwd2l0aCUyMGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D",
  },
];


/* =========================================================
   COMPONENT
========================================================= */

export default function LifeAtSchool() {

  const sectionRef =
    useRef(null);

  const headingRef =
    useRef(null);

  const sliderWrapRef =
    useRef(null);

  const sliderRef =
    useRef(null);


  const [
    progress,
    setProgress,
  ] =
    useState(0);


  const dragRef =
    useRef({
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


    if (!section) {
      return;
    }


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

            duration:
              0.85,

            ease:
              "power4.out",

            scrollTrigger: {

              trigger:
                headingRef.current,

              start:
                "top 88%",

              once:
                true,

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

            duration:
              0.95,

            ease:
              "power4.out",

            scrollTrigger: {

              trigger:
                sliderWrapRef.current,

              start:
                "top 90%",

              once:
                true,

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


    if (!slider) {
      return;
    }


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
     CARD SCROLL AMOUNT
  ========================================================= */

  const getCardScrollAmount = () => {

    const slider =
      sliderRef.current;


    if (!slider) {
      return 0;
    }


    const card =
      slider.querySelector(
        ".life-school-card"
      );


    if (!card) {
      return 0;
    }


    const styles =
      window.getComputedStyle(
        slider
      );


    const gap =
      parseFloat(
        styles.columnGap ||
        styles.gap
      ) || 16;


    const cardWidth =
      card.getBoundingClientRect()
        .width;


    return (
      cardWidth +
      gap
    );

  };


  /* =========================================================
     PREVIOUS
  ========================================================= */

  const handlePrevious = () => {

    const slider =
      sliderRef.current;


    if (!slider) {
      return;
    }


    const amount =
      getCardScrollAmount();


    if (!amount) {
      return;
    }


    const maxScroll =
      slider.scrollWidth -
      slider.clientWidth;


    const nearStart =
      slider.scrollLeft <= 10;


    if (nearStart) {

      slider.scrollTo({
        left:
          maxScroll,

        behavior:
          "smooth",
      });

      return;

    }


    slider.scrollBy({
      left:
        -amount,

      behavior:
        "smooth",
    });

  };


  /* =========================================================
     NEXT
  ========================================================= */

  const handleNext = () => {

    const slider =
      sliderRef.current;


    if (!slider) {
      return;
    }


    const amount =
      getCardScrollAmount();


    if (!amount) {
      return;
    }


    const maxScroll =
      slider.scrollWidth -
      slider.clientWidth;


    const nearEnd =
      slider.scrollLeft >=
      maxScroll - 10;


    if (nearEnd) {

      slider.scrollTo({
        left: 0,

        behavior:
          "smooth",
      });

      return;

    }


    slider.scrollBy({
      left:
        amount,

      behavior:
        "smooth",
    });

  };


  /* =========================================================
     DESKTOP DRAG
  ========================================================= */

  const handlePointerDown = (
    event
  ) => {

    const slider =
      sliderRef.current;


    if (!slider) {
      return;
    }


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


  /* =========================================================
     POINTER MOVE
  ========================================================= */

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


  /* =========================================================
     STOP DRAG
  ========================================================= */

  const stopDragging = (
    event
  ) => {

    const slider =
      sliderRef.current;


    dragRef.current.active =
      false;


    if (!slider) {
      return;
    }


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


  /* =========================================================
     RETURN
  ========================================================= */

  return (

    <section
      ref={sectionRef}

      className="life-school"

      id="life-at-school"
    >

      {/* =====================================================
          HEADING
      ====================================================== */}

      <div
        className="life-school-header"
      >

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
          SLIDER
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
              card
            ) => (

              <article
                key={
                  card.id
                }

                className="life-school-card"

                tabIndex={0}
              >

                <img
                  src={
                    card.image
                  }

                  alt={
                    card.title
                  }

                  className="life-school-card-image"

                  loading="lazy"

                  draggable="false"
                />


                <div
                  className="life-school-card-gradient"

                  aria-hidden="true"
                />


                <div
                  className="life-school-card-hover-overlay"

                  aria-hidden="true"
                />


                {/* NO NUMBERS */}

                <div
                  className="life-school-card-content"
                >

                  <span
                    className="life-school-card-label"
                  >
                    {card.label}
                  </span>


                  <h3>
                    {card.title}
                  </h3>


                  <div
                    className="life-school-card-description-wrap"
                  >

                    <p
                      className="life-school-card-description"
                    >
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

      <div
        className="life-school-bottom"
      >

        {/* PROGRESS */}

        <div
          className="life-school-progress"
        >

          <div
            className="life-school-progress-track"
          >

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


        {/* TWO ARROWS */}

        <div
          className="life-school-arrows"
        >

          <button
            type="button"

            className="
              life-school-arrow-button
              life-school-arrow-button--prev
            "

            onClick={
              handlePrevious
            }

            aria-label="Previous Life at School card"
          >

            <ArrowLeft
              size={21}

              strokeWidth={1.8}
            />

          </button>


          <button
            type="button"

            className="
              life-school-arrow-button
              life-school-arrow-button--next
            "

            onClick={
              handleNext
            }

            aria-label="Next Life at School card"
          >

            <ArrowRight
              size={21}

              strokeWidth={1.8}
            />

          </button>

        </div>

      </div>

    </section>

  );

}