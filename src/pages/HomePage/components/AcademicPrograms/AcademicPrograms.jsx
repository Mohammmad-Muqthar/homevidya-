import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowUpRight,
} from "lucide-react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./AcademicPrograms.css";


gsap.registerPlugin(
  ScrollTrigger
);


/* =========================================================
   PROGRAM DATA
========================================================= */
const programs = [
  {
    id: 1,

    title:
      "Early Years",

    age:
      "LKG — UKG",

    image:
      "https://velammalnexus.edu.in/assets/images/mogappair-west-kids-home/kids-west-about.jpg",
  },

  {
    id: 2,

    title:
      "Primary Years",

    age:
      "Grades 1 — 5",

    image:
      "https://azimpremjiuniversity.edu.in/imager/photos/Communication/Outdoor-Pics/1490951/6-2.f1729879149_4b32b63c5c28c858e051e9d1a2a717a1.JPG",
  },

  {
    id: 3,

    title:
      "Middle Years",

    age:
      "Grades 6 — 8",

    image:
      "https://www.nmajs.edu.in/sites/nmajs/files/2025-01/myp-sec1.webp",
  },

  {
    id: 4,

    title:
      "Senior Years",

    age:
      "Grades 9 — 12",

    image:
      "https://svssac.in/uploads/colleges/banner_1780574578_63917903.jpg",
  },
];

/* =========================================================
   PROGRAM CARD
========================================================= */

const ProgramCard = ({
  program,
  active,
  onEnter,
  onLeave,
}) => {

  return (

    <article
      className={`
        academic-card

        ${
          active
            ? "is-active"
            : ""
        }
      `}

      tabIndex={0}

      onMouseEnter={
        onEnter
      }

      onMouseLeave={
        onLeave
      }

      onFocus={
        onEnter
      }

      onBlur={
        onLeave
      }
    >

      {/* =================================================
          IMAGE
      ================================================= */}

      <img
        src={
          program.image
        }

        alt=""

        className="academic-card-image"

        loading="lazy"
      />


      {/* =================================================
          OVERLAY
      ================================================= */}

      <div
        className="academic-card-overlay"
      />


      {/* =================================================
          AGE BADGE
      ================================================= */}

      <div
        className="academic-card-top"
      >

        <span
          className="academic-card-age"
        >
          {program.age}
        </span>

      </div>


      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="academic-card-content"
      >

        <h3>
          {program.title}
        </h3>


        <span
          className="academic-card-arrow"
        >

          <ArrowUpRight
            size={20}
          />

        </span>

      </div>

    </article>

  );

};


/* =========================================================
   ACADEMIC PROGRAMS
========================================================= */

export default function AcademicPrograms() {

  const sectionRef =
    useRef(null);

  const headingRef =
    useRef(null);


  const [
    activeCard,
    setActiveCard,
  ] =
    useState(null);


  const [
    isMobile,
    setIsMobile,
  ] =
    useState(
      () =>
        typeof window !==
          "undefined" &&
        window.innerWidth <= 768
    );


  /* =========================================================
     MOBILE DETECTION
  ========================================================= */

  useEffect(() => {

    const handleResize = () => {

      setIsMobile(
        window.innerWidth <= 768
      );

    };


    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

    };

  }, []);


  /* =========================================================
     SECTION ANIMATION
  ========================================================= */

  useLayoutEffect(() => {

    const section =
      sectionRef.current;


    if (!section) {
      return;
    }


    const ctx =
      gsap.context(() => {

        /* =================================================
           HEADING ENTER
        ================================================= */

        gsap.fromTo(
          headingRef.current,

          {
            opacity: 0,

            y: 45,
          },

          {
            opacity: 1,

            y: 0,

            duration:
              0.9,

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


        /* =================================================
           CARDS ENTER
        ================================================= */

        gsap.fromTo(
          ".academic-card",

          {
            opacity: 0,

            y: 45,
          },

          {
            opacity: 1,

            y: 0,

            duration:
              0.85,

            stagger:
              0.08,

            ease:
              "power4.out",

            scrollTrigger: {

              trigger:
                ".academic-cards-area",

              start:
                "top 86%",

              once:
                true,

            },

          }
        );


        /* =================================================
           DESKTOP IMAGE PARALLAX
        ================================================= */

        const mm =
          gsap.matchMedia();


        mm.add(
          "(min-width: 769px)",

          () => {

            gsap.utils
              .toArray(
                ".academic-card"
              )
              .forEach(
                (
                  card,
                  index
                ) => {

                  const image =
                    card.querySelector(
                      ".academic-card-image"
                    );


                  gsap.fromTo(
                    image,

                    {
                      yPercent:
                        -4,

                      scale:
                        1.08,
                    },

                    {
                      yPercent:
                        4 +
                        index,

                      scale:
                        1.02,

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
                          1,

                      },

                    }
                  );

                }
              );

          }
        );


        return () =>
          mm.revert();

      }, section);


    return () => {

      ctx.revert();

    };

  }, [
    isMobile,
  ]);


  /* =========================================================
     RETURN
  ========================================================= */

  return (

    <section
      ref={sectionRef}

      className="academic-programs"

      id="programs"
    >

      <div
        className="academic-programs-container"
      >

        {/* =================================================
            HEADING
        ================================================= */}

        <div
          className="academic-programs-header"
        >

          <h2
            ref={headingRef}

            className="academic-programs-title"
          >

            Academic

            <span>
              programmes.
            </span>

          </h2>

        </div>


        {/* =================================================
            CARDS AREA
        ================================================= */}

        <div
          className="academic-cards-area"
        >

          {/* ===============================================
              DESKTOP
          =============================================== */}

          {!isMobile && (

            <div
              className="academic-cards"
            >

              {programs.map(
                (
                  program
                ) => (

                  <ProgramCard
                    key={
                      program.id
                    }

                    program={
                      program
                    }

                    active={
                      activeCard ===
                      program.id
                    }

                    onEnter={() =>
                      setActiveCard(
                        program.id
                      )
                    }

                    onLeave={() =>
                      setActiveCard(
                        null
                      )
                    }
                  />

                )
              )}

            </div>

          )}


          {/* ===============================================
              MOBILE SWIPER
          =============================================== */}

          {isMobile && (

            <Swiper
              className="academic-mobile-swiper"

              modules={[
                Pagination,
              ]}

              slidesPerView={
                1.12
              }

              spaceBetween={
                16
              }

              speed={
                650
              }

              grabCursor={
                true
              }

              resistance={
                true
              }

              resistanceRatio={
                0.82
              }

              touchRatio={
                1
              }

              threshold={
                5
              }

              pagination={{
                clickable:
                  true,
              }}

              onSlideChange={(
                swiper
              ) => {

                setActiveCard(
                  programs[
                    swiper.activeIndex
                  ]?.id ??
                    null
                );

              }}
            >

              {programs.map(
                (
                  program,
                  index
                ) => (

                  <SwiperSlide
                    key={
                      program.id
                    }
                  >

                    <ProgramCard
                      program={
                        program
                      }

                      active={
                        activeCard
                          ? activeCard ===
                            program.id
                          : index ===
                            0
                      }

                      onEnter={() =>
                        setActiveCard(
                          program.id
                        )
                      }

                      onLeave={() => {}}
                    />

                  </SwiperSlide>

                )
              )}

            </Swiper>

          )}

        </div>

      </div>

    </section>

  );

}