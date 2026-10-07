import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./MotionEvents.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   FILTERS
========================================================= */

const filters = [
  "All",
  "Community",
  "Academic",
  "Arts",
  "Sports",
];


/* =========================================================
   CATEGORY ROUTES

   LEARN MORE WILL USE THESE ROUTES
========================================================= */

const categoryRoutes = {
  Community:
    "/motion/community",

  Academic:
    "/motion/academic",

  Arts:
    "/motion/arts",

  Sports:
    "/motion/sports",
};


/* =========================================================
   EVENTS
========================================================= */

const events = [
  {
    id: 1,

    category:
      "Community",

    month:
      "Sep",

    day:
      "27",

    year:
      "2026",

    title:
      "Vidya Community Day",

    description:
      "A day of shared experiences, activities and meaningful connections across the Vidya community.",

    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1500&q=90",
  },

  {
    id: 2,

    category:
      "Sports",

    month:
      "Sep",

    day:
      "19",

    year:
      "2026",

    title:
      "Annual Sports Meet",

    description:
      "Students come together for a celebration of movement, teamwork, confidence and healthy competition.",

    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1500&q=90",
  },

  {
    id: 3,

    category:
      "Academic",

    month:
      "Oct",

    day:
      "04",

    year:
      "2026",

    title:
      "Young Innovators Science Expo",

    description:
      "An opportunity for young thinkers to present ideas, experiments and solutions developed through curiosity.",

    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1500&q=90",
  },

  {
    id: 4,

    category:
      "Arts",

    month:
      "Oct",

    day:
      "12",

    year:
      "2026",

    title:
      "Expressions — Student Arts Showcase",

    description:
      "A showcase of student creativity across visual art, performance, design and storytelling.",

    image:
      "https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=1500&q=90",
  },

  {
    id: 5,

    category:
      "Community",

    month:
      "Oct",

    day:
      "20",

    year:
      "2026",

    title:
      "Family Learning Weekend",

    description:
      "Families join students and educators for workshops, activities and shared learning experiences.",

    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1500&q=90",
  },

  {
    id: 6,

    category:
      "Academic",

    month:
      "Nov",

    day:
      "02",

    year:
      "2026",

    title:
      "Model United Nations",

    description:
      "Students explore diplomacy, public speaking and global issues through collaborative debate.",

    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1500&q=90",
  },

  {
    id: 7,

    category:
      "Sports",

    month:
      "Nov",

    day:
      "14",

    year:
      "2026",

    title:
      "Inter-House Championship",

    description:
      "A spirited inter-house competition bringing together skill, teamwork and school pride.",

    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1500&q=90",
  },

  {
    id: 8,

    category:
      "Arts",

    month:
      "Nov",

    day:
      "21",

    year:
      "2026",

    title:
      "Music, Theatre & Movement",

    description:
      "A vibrant student production celebrating expression through music, theatre and movement.",

    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1500&q=90",
  },

  {
    id: 9,

    category:
      "Community",

    month:
      "Dec",

    day:
      "05",

    year:
      "2026",

    title:
      "Vidya Winter Carnival",

    description:
      "A joyful campus gathering with student activities, performances and community experiences.",

    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1500&q=90",
  },
];


/* =========================================================
   ARROW ICON
========================================================= */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M11.5 6.5L15 10L11.5 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/* =========================================================
   COMPONENT
========================================================= */

const MotionEvents = () => {
  const sectionRef =
    useRef(null);

  const filterRef =
    useRef(null);

  const cardRefs =
    useRef([]);


  const [
    activeFilter,
    setActiveFilter,
  ] =
    useState("All");


  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredEvents =
    activeFilter === "All"
      ? events
      : events.filter(
          (event) =>
            event.category ===
            activeFilter
        );


  /* =========================================================
     FILTER REVEAL
  ========================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const filter =
      filterRef.current;


    if (
      !section ||
      !filter
    ) {
      return;
    }


    const ctx =
      gsap.context(() => {

        gsap.fromTo(
          filter,

          {
            opacity:
              0,

            y:
              16,
          },

          {
            opacity:
              1,

            y:
              0,

            duration:
              0.75,

            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                section,

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
     CARD ANIMATION

     RUNS AGAIN AFTER FILTER CHANGE
  ========================================================= */

  useEffect(() => {
    const cards =
      cardRefs.current.filter(
        Boolean
      );


    if (
      !cards.length
    ) {
      return;
    }


    gsap.killTweensOf(
      cards
    );


    gsap.fromTo(
      cards,

      {
        opacity:
          0,

        y:
          22,

        scale:
          0.99,
      },

      {
        opacity:
          1,

        y:
          0,

        scale:
          1,

        duration:
          0.58,

        stagger:
          0.055,

        ease:
          "power3.out",

        clearProps:
          "transform",
      }
    );


    requestAnimationFrame(
      () => {
        ScrollTrigger.refresh();
      }
    );

  }, [activeFilter]);


  /* =========================================================
     FILTER
  ========================================================= */

  const handleFilter =
    (filter) => {

      if (
        filter ===
        activeFilter
      ) {
        return;
      }


      cardRefs.current =
        [];


      setActiveFilter(
        filter
      );
    };


  /* =========================================================
     JSX
  ========================================================= */

  return (
    <section
      ref={sectionRef}
      id="motion-events"
      className="motion-events"
    >

      <div className="motion-events-inner">

        {/* =================================================
            FILTERS
        ================================================= */}

        <div
          ref={filterRef}
          className="motion-events-filter-wrap"
        >

          <div className="motion-events-filter">

            {filters.map(
              (filter) => {

                const isActive =
                  activeFilter ===
                  filter;


                return (
                  <button
                    key={filter}

                    type="button"

                    className={`
                      motion-events-filter-button
                      ${
                        isActive
                          ? "motion-events-filter-button--active"
                          : ""
                      }
                    `}

                    onClick={() =>
                      handleFilter(
                        filter
                      )
                    }

                    aria-pressed={
                      isActive
                    }
                  >

                    <span>
                      {filter}
                    </span>

                  </button>
                );

              }
            )}

          </div>

        </div>


        {/* =================================================
            EVENTS GRID
        ================================================= */}

        <div className="motion-events-grid">

          {filteredEvents.map(
            (
              event,
              index
            ) => {

              /*
                This decides where Learn More goes.

                Sports     -> /motion/sports
                Arts       -> /motion/arts
                Academic   -> /motion/academic
                Community  -> /motion/community
              */

              const destination =
                categoryRoutes[
                  event.category
                ];


              return (

                <article
                  key={event.id}

                  ref={(element) => {
                    cardRefs.current[
                      index
                    ] =
                      element;
                  }}

                  className="motion-event-card"
                >

                  {/* =========================================
                      IMAGE
                  ========================================= */}

                  <div className="motion-event-media">

                    <img
                      src={event.image}

                      alt={event.title}

                      className="motion-event-image"

                      loading={
                        index < 3
                          ? "eager"
                          : "lazy"
                      }

                      decoding="async"

                      draggable="false"
                    />


                    {/* =======================================
                        DATE
                    ======================================= */}

                    <div className="motion-event-date">

                      <span className="motion-event-date-month">
                        {event.month}
                      </span>


                      <strong className="motion-event-date-day">
                        {event.day}
                      </strong>


                      <span className="motion-event-date-year">
                        {event.year}
                      </span>

                    </div>

                  </div>


                  {/* =========================================
                      CONTENT
                  ========================================= */}

                  <div className="motion-event-content">

                    <span className="motion-event-category">
                      {event.category}
                    </span>


                    <h2 className="motion-event-title">
                      {event.title}
                    </h2>


                    <p className="motion-event-description">
                      {event.description}
                    </p>


                    {/* =======================================
                        LEARN MORE

                        REAL CATEGORY NAVIGATION
                    ======================================= */}

                    <Link
                      to={destination}

                      className="motion-event-button"
                    >

                      <span>
                        Learn more
                      </span>


                      <ArrowIcon />

                    </Link>

                  </div>

                </article>

              );

            }
          )}

        </div>

      </div>

    </section>
  );
};


export default MotionEvents;