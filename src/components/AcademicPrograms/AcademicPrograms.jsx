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


gsap.registerPlugin(ScrollTrigger);


const programs = [
  {
    id: 1,
    title: "Early Years",
    age: "Ages 3 — 5",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1800&q=90",
  },

  {
    id: 2,
    title: "Primary Years",
    age: "Grades 1 — 5",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90",
  },

  {
    id: 3,
    title: "Middle Years",
    age: "Grades 6 — 8",
    image:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1800&q=90",
  },

  {
    id: 4,
    title: "Senior Years",
    age: "Grades 9 — 12",
    image:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1800&q=90",
  },
];


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
        ${active ? "is-active" : ""}
      `}
      tabIndex={0}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      <img
        src={program.image}
        alt=""
        className="academic-card-image"
        loading="lazy"
      />

      <div className="academic-card-overlay" />

      <div className="academic-card-top">
        <span className="academic-card-age">
          {program.age}
        </span>
      </div>

      <div className="academic-card-content">
        <h3>
          {program.title}
        </h3>

        <span className="academic-card-arrow">
          <ArrowUpRight size={20} />
        </span>
      </div>
    </article>
  );
};


export default function AcademicPrograms() {
  const sectionRef =
    useRef(null);

  const headingRef =
    useRef(null);

  const [activeCard, setActiveCard] =
    useState(null);

  const [isMobile, setIsMobile] =
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

    if (!section) return;


    const ctx = gsap.context(() => {

      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,

          duration: 0.9,

          ease: "power4.out",

          scrollTrigger: {
            trigger:
              headingRef.current,

            start: "top 88%",

            once: true,
          },
        }
      );


      gsap.fromTo(
        ".academic-card",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,

          duration: 0.85,

          stagger: 0.08,

          ease: "power4.out",

          scrollTrigger: {
            trigger:
              ".academic-cards-area",

            start: "top 86%",

            once: true,
          },
        }
      );


      /* DESKTOP IMAGE PARALLAX ONLY */

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
              (card, index) => {

                const image =
                  card.querySelector(
                    ".academic-card-image"
                  );


                gsap.fromTo(
                  image,
                  {
                    yPercent: -4,
                    scale: 1.08,
                  },
                  {
                    yPercent:
                      4 +
                      index,

                    scale: 1.02,

                    ease: "none",

                    scrollTrigger: {
                      trigger: card,

                      start:
                        "top bottom",

                      end:
                        "bottom top",

                      scrub: 1,
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
  }, [isMobile]);


  return (
    <section
      ref={sectionRef}
      className="academic-programs"
      id="programs"
    >
      <div className="academic-programs-container">

        {/* HEADING */}

        <div className="academic-programs-header">

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
        ================================================== */}

        <div className="academic-cards-area">

          {/* ===============================================
              DESKTOP
          ================================================ */}

          {!isMobile && (

            <div className="academic-cards">

              {programs.map(
                (program) => (

                  <ProgramCard
                    key={program.id}

                    program={program}

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
          ================================================ */}

          {isMobile && (

            <Swiper
              className="academic-mobile-swiper"

              modules={[
                Pagination,
              ]}

              slidesPerView={1.12}

              spaceBetween={16}

              speed={650}

              grabCursor={true}

              resistance={true}

              resistanceRatio={0.82}

              touchRatio={1}

              threshold={5}

              pagination={{
                clickable: true,
              }}

              onSlideChange={(
                swiper
              ) => {
                setActiveCard(
                  programs[
                    swiper.activeIndex
                  ]?.id ?? null
                );
              }}
            >

              {programs.map(
                (program, index) => (

                  <SwiperSlide
                    key={program.id}
                  >

                    <ProgramCard
                      program={
                        program
                      }

                      active={
                        activeCard
                          ? activeCard ===
                            program.id
                          : index === 0
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