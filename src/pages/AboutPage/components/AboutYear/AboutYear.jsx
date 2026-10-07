import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./AboutYear.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   EVENTS
========================================================= */

const events = [
  {
    date: "2026-10-05",

    title: "Founders' Day",

    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=92",

    description:
      "A day celebrating the people, ideas and values that continue to shape the Vidya Academy community.",
  },

  {
    date: "2026-10-10",

    title: "Learning Exhibition",

    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=92",

    description:
      "Students share projects, experiments and ideas developed through classroom learning, collaboration and hands-on exploration.",
  },

  {
    date: "2026-10-26",

    title: "Sports Day",

    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=92",

    description:
      "A day of movement, teamwork and healthy competition, bringing together students, teachers and families.",
  },

  {
    date: "2026-10-29",

    title: "Creative Arts Showcase",

    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1600&q=92",

    description:
      "Music, visual arts, performance and student creativity come together in an evening celebrating expression and imagination.",
  },

  {
    date: "2026-11-14",

    title: "Children's Day",

    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=92",

    description:
      "A joyful school celebration centred on students, friendship, creativity and the experiences that make school memorable.",
  },

  {
    date: "2027-01-18",

    title: "Community Week",

    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=92",

    description:
      "A week of collaborative activities designed to strengthen relationships between students, families and the wider community.",
  },
];


/* =========================================================
   MONTHS
========================================================= */

const months = [
  {
    year: 2026,
    month: 8,
  },

  {
    year: 2026,
    month: 9,
  },

  {
    year: 2026,
    month: 10,
  },

  {
    year: 2026,
    month: 11,
  },

  {
    year: 2027,
    month: 0,
  },

  {
    year: 2027,
    month: 1,
  },
];


const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


const dayNames = [
  "S",
  "M",
  "T",
  "W",
  "T",
  "F",
  "S",
];


/* =========================================================
   HELPERS
========================================================= */

const makeDateKey = (
  year,
  month,
  day
) => {
  const monthString =
    String(
      month + 1
    ).padStart(
      2,
      "0"
    );


  const dayString =
    String(
      day
    ).padStart(
      2,
      "0"
    );


  return `${year}-${monthString}-${dayString}`;
};


const formatLongDate = (
  dateString
) => {
  const date =
    new Date(
      `${dateString}T12:00:00`
    );


  return date.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
};


const getFirstEventForMonth = (
  year,
  month
) => {
  return events.find(
    (
      event
    ) => {
      const [
        eventYear,
        eventMonth,
      ] =
        event.date
          .split("-")
          .map(Number);


      return (
        eventYear === year &&
        eventMonth - 1 === month
      );
    }
  );
};


/* =========================================================
   COMPONENT
========================================================= */

const AboutYear = () => {
  const sectionRef =
    useRef(null);

  const leftRef =
    useRef(null);

  const calendarRef =
    useRef(null);


  /* =========================================================
     DEFAULT — OCTOBER 2026
  ========================================================= */

  const [
    monthIndex,
    setMonthIndex,
  ] =
    useState(1);


  const [
    selectedDate,
    setSelectedDate,
  ] =
    useState(
      "2026-10-10"
    );


  const currentMonth =
    months[
      monthIndex
    ];


  const selectedEvent =
    events.find(
      (
        event
      ) =>
        event.date ===
        selectedDate
    ) ||
    events[1];


  /* =========================================================
     DAYS
  ========================================================= */

  const calendarDays =
    useMemo(
      () => {
        const {
          year,
          month,
        } =
          currentMonth;


        const firstDay =
          new Date(
            year,
            month,
            1
          ).getDay();


        const daysInMonth =
          new Date(
            year,
            month + 1,
            0
          ).getDate();


        const result =
          [];


        for (
          let index = 0;
          index < firstDay;
          index += 1
        ) {
          result.push({
            empty: true,

            key:
              `empty-${index}`,
          });
        }


        for (
          let day = 1;
          day <= daysInMonth;
          day += 1
        ) {
          const dateKey =
            makeDateKey(
              year,
              month,
              day
            );


          const event =
            events.find(
              (
                item
              ) =>
                item.date ===
                dateKey
            );


          result.push({
            empty: false,

            key:
              dateKey,

            day,

            dateKey,

            event,
          });
        }


        return result;
      },

      [
        currentMonth,
      ]
    );


  /* =========================================================
     MONTH NAVIGATION
  ========================================================= */

  const changeMonth = (
    nextIndex
  ) => {
    if (
      nextIndex < 0 ||
      nextIndex >=
        months.length
    ) {
      return;
    }


    setMonthIndex(
      nextIndex
    );


    const nextMonth =
      months[
        nextIndex
      ];


    const firstEvent =
      getFirstEventForMonth(
        nextMonth.year,
        nextMonth.month
      );


    if (
      firstEvent
    ) {
      setSelectedDate(
        firstEvent.date
      );
    }
  };


  const goPrevious =
    () => {
      changeMonth(
        monthIndex - 1
      );
    };


  const goNext =
    () => {
      changeMonth(
        monthIndex + 1
      );
    };


  const handleDateClick =
    (
      item
    ) => {
      if (
        !item.event
      ) {
        return;
      }


      setSelectedDate(
        item.dateKey
      );
    };


  /* =========================================================
     ANIMATION
  ========================================================= */

  useLayoutEffect(
    () => {
      const section =
        sectionRef.current;

      const left =
        leftRef.current;

      const calendar =
        calendarRef.current;


      if (
        !section ||
        !left ||
        !calendar
      ) {
        return;
      }


      const ctx =
        gsap.context(
          () => {

            const items =
              left.querySelectorAll(
                "[data-year-reveal]"
              );


            gsap.fromTo(
              items,

              {
                opacity: 0,
                y: 28,
              },

              {
                opacity: 1,
                y: 0,

                duration: 0.85,

                stagger: 0.07,

                ease:
                  "power3.out",

                scrollTrigger: {
                  trigger:
                    left,

                  start:
                    "top 84%",

                  once: true,
                },
              }
            );


            gsap.fromTo(
              calendar,

              {
                opacity: 0,
                y: 42,
              },

              {
                opacity: 1,
                y: 0,

                duration: 0.95,

                ease:
                  "power3.out",

                scrollTrigger: {
                  trigger:
                    calendar,

                  start:
                    "top 87%",

                  once: true,
                },
              }
            );

          },

          section
        );


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


      document.fonts
        ?.ready
        ?.then(
          refresh
        );


      window.addEventListener(
        "resize",
        handleResize,
        {
          passive: true,
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


        window.removeEventListener(
          "resize",
          handleResize
        );


        ctx.revert();
      };

    },

    []
  );


  /* =========================================================
     JSX
  ========================================================= */

  return (
    <section
      ref={sectionRef}

      className="about-year"
    >

      <div className="about-year-inner">

        <div className="about-year-layout">

          {/* =================================================
              LEFT
          ================================================= */}

          <div
            ref={leftRef}

            className="about-year-left"
          >

            {/* =================================================
                TITLE
            ================================================= */}

            <div
              className="about-year-heading-wrap"

              data-year-reveal
            >

              <h2 className="about-year-heading">

                <span className="about-year-heading-main">
                  A year at{" "}
                </span>


                <span className="about-year-heading-accent">
                  Vidya.
                </span>

              </h2>


              <p className="about-year-intro">
                A school year shaped around
                learning, exploration,
                celebration and time to grow.
              </p>

            </div>


            {/* =================================================
                EVENT
            ================================================= */}

            <article
              className="about-year-event"

              data-year-reveal
            >

              <figure className="about-year-event-image">

                <img
                  key={
                    selectedEvent.image
                  }

                  src={
                    selectedEvent.image
                  }

                  alt={
                    selectedEvent.title
                  }

                  loading="lazy"

                  decoding="async"

                  draggable="false"
                />

              </figure>


              <div className="about-year-event-copy">

                <span className="about-year-event-date">
                  {
                    formatLongDate(
                      selectedEvent.date
                    )
                  }
                </span>


                <h3>
                  {
                    selectedEvent.title
                  }
                </h3>


                <p>
                  {
                    selectedEvent.description
                  }
                </p>

              </div>

            </article>


            {/* =================================================
                DOWNLOAD
            ================================================= */}

            <a
              href="#calendar"

              className="about-year-download"

              data-year-reveal

              onClick={
                (
                  event
                ) =>
                  event.preventDefault()
              }
            >

              <span className="about-year-download-copy">

                <strong>
                  Download Academic Calendar
                </strong>

                <span>
                  2026–27 School Year
                </span>

              </span>


              <span className="about-year-download-icon">

                <svg
                  viewBox="0 0 24 24"

                  aria-hidden="true"
                >
                  <path
                    d="
                      M12 3
                      V15

                      M7.5 10.5
                      L12 15
                      L16.5 10.5

                      M5 19
                      H19
                    "
                  />
                </svg>

              </span>

            </a>

          </div>


          {/* =================================================
              RIGHT
          ================================================= */}

          <div className="about-year-calendar-column">

            <div
              ref={calendarRef}

              className="about-year-calendar"

              id="calendar"
            >

              {/* =================================================
                  LARGE HEADER
              ================================================= */}

              <div className="about-year-calendar-header">

                <div className="about-year-calendar-title">

                  <span className="about-year-calendar-year">
                    {
                      currentMonth.year
                    }
                  </span>


                  <h3>
                    {
                      monthNames[
                        currentMonth.month
                      ]
                    }
                  </h3>

                </div>


                <div className="about-year-calendar-nav">

                  <button
                    type="button"

                    className="about-year-arrow"

                    onClick={
                      goPrevious
                    }

                    disabled={
                      monthIndex === 0
                    }

                    aria-label="Previous month"
                  >
                    <span>
                      ←
                    </span>
                  </button>


                  <button
                    type="button"

                    className="about-year-arrow"

                    onClick={
                      goNext
                    }

                    disabled={
                      monthIndex ===
                      months.length - 1
                    }

                    aria-label="Next month"
                  >
                    <span>
                      →
                    </span>
                  </button>

                </div>

              </div>


              {/* =================================================
                  BODY
              ================================================= */}

              <div className="about-year-calendar-body">

                {/* WEEKDAYS */}

                <div className="about-year-weekdays">

                  {dayNames.map(
                    (
                      day,
                      index
                    ) => (

                      <span
                        key={
                          `${day}-${index}`
                        }
                      >
                        {day}
                      </span>

                    )
                  )}

                </div>


                {/* DAYS */}

                <div className="about-year-days">

                  {calendarDays.map(
                    (
                      item
                    ) => {

                      if (
                        item.empty
                      ) {
                        return (
                          <div
                            key={
                              item.key
                            }

                            className="
                              about-year-day
                              about-year-day--empty
                            "
                          />
                        );
                      }


                      const hasEvent =
                        Boolean(
                          item.event
                        );


                      const isSelected =
                        item.dateKey ===
                        selectedDate;


                      return (
                        <button
                          key={
                            item.key
                          }

                          type="button"

                          className={`
                            about-year-day

                            ${
                              hasEvent
                                ? "has-event"
                                : ""
                            }

                            ${
                              isSelected
                                ? "is-selected"
                                : ""
                            }
                          `}

                          onClick={
                            () =>
                              handleDateClick(
                                item
                              )
                          }

                          disabled={
                            !hasEvent
                          }

                          aria-pressed={
                            isSelected
                          }
                        >

                          <span>
                            {item.day}
                          </span>


                          {hasEvent && (
                            <i
                              aria-hidden="true"
                            />
                          )}

                        </button>
                      );

                    }
                  )}

                </div>


                {/* =================================================
                    CALENDAR FOOTER
                ================================================= */}

                <div className="about-year-calendar-footer">

                  <div className="about-year-calendar-legend">

                    <div>
                      <span className="about-year-dot about-year-dot--event" />

                      <span>
                        School event
                      </span>
                    </div>


                    <div>
                      <span className="about-year-dot about-year-dot--selected" />

                      <span>
                        Selected
                      </span>
                    </div>

                  </div>


                  <span className="about-year-calendar-note">
                    Select an event date
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};


export default AboutYear;