import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./FAQ.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   FAQ DATA
========================================================= */

const faqItems = [
  {
    question:
      "What curriculum does Vidya Academy follow?",

    answer:
      "Vidya Academy offers a structured learning programme designed to build strong academic foundations while encouraging curiosity, creativity and independent thinking.",
  },

  {
    question:
      "What age groups does the school admit?",

    answer:
      "Admissions are available across different learning stages, from the early years through senior grades, subject to seat availability.",
  },

  {
    question:
      "How does the admission process work?",

    answer:
      "Families can begin by submitting an admission enquiry. Our admissions team will then guide you through the next steps.",
  },

  {
    question:
      "Does the school provide transport?",

    answer:
      "Transport services are available across selected routes. Routes, timings and availability can be confirmed with the admissions team.",
  },

  {
    question:
      "What activities are available beyond academics?",

    answer:
      "Students have opportunities across sports, arts, creativity, collaborative projects and experiences beyond the classroom.",
  },

  {
    question:
      "Can parents visit the campus before applying?",

    answer:
      "Yes. Families can request a campus visit through the admissions team before continuing with the admission process.",
  },
];


/* =========================================================
   COMPONENT
========================================================= */

export default function FAQ() {
  /*
    First question open from the beginning.
  */
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [formOpen, setFormOpen] =
    useState(false);

  const sectionRef =
    useRef(null);

  const headingRef =
    useRef(null);

  const listRef =
    useRef(null);

  const overlayRef =
    useRef(null);

  const panelRef =
    useRef(null);

  const closeRef =
    useRef(null);

  const scrollPositionRef =
    useRef(0);


  /* =========================================================
     FAQ ENTRANCE

     No Y movement on the FAQ list.
     This means the first question stays aligned with
     the left column from the first frame.
  ========================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }


    const ctx =
      gsap.context(() => {

        /* LEFT */

        gsap.fromTo(
          headingRef.current,

          {
            opacity: 0,
          },

          {
            opacity: 1,

            duration: 0.75,

            ease: "power3.out",

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


        /* RIGHT */

        gsap.fromTo(
          listRef.current,

          {
            opacity: 0,
          },

          {
            opacity: 1,

            duration: 0.75,

            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                listRef.current,

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
     REFRESH WHEN FAQ HEIGHT CHANGES
  ========================================================= */

  useEffect(() => {
    const call =
      gsap.delayedCall(
        0.52,

        () => {
          ScrollTrigger.refresh();
        }
      );


    return () => {
      call.kill();
    };
  }, [activeIndex]);


  /* =========================================================
     MODAL BACKGROUND LOCK
  ========================================================= */

  useEffect(() => {
    if (!formOpen) {
      return;
    }


    const html =
      document.documentElement;

    const body =
      document.body;


    const scrollY =
      window.scrollY ||
      window.pageYOffset;


    scrollPositionRef.current =
      scrollY;


    const oldBody = {
      position:
        body.style.position,

      top:
        body.style.top,

      left:
        body.style.left,

      right:
        body.style.right,

      width:
        body.style.width,

      overflow:
        body.style.overflow,

      paddingRight:
        body.style.paddingRight,
    };


    const oldHtmlOverflow =
      html.style.overflow;


    const scrollbarWidth =
      window.innerWidth -
      html.clientWidth;


    html.classList.add(
      "admission-modal-open"
    );

    body.classList.add(
      "admission-modal-open"
    );


    html.style.overflow =
      "hidden";

    body.style.position =
      "fixed";

    body.style.top =
      `-${scrollY}px`;

    body.style.left =
      "0";

    body.style.right =
      "0";

    body.style.width =
      "100%";

    body.style.overflow =
      "hidden";


    if (
      scrollbarWidth > 0
    ) {
      body.style.paddingRight =
        `${scrollbarWidth}px`;
    }


    /* =====================================================
       OPEN ANIMATION
    ===================================================== */

    requestAnimationFrame(() => {
      const overlay =
        overlayRef.current;

      const panel =
        panelRef.current;


      if (
        !overlay ||
        !panel
      ) {
        return;
      }


      panel.scrollTop =
        0;


      const fields =
        panel.querySelectorAll(
          ".admission-field"
        );


      const timeline =
        gsap.timeline();


      timeline.fromTo(
        overlay,

        {
          opacity: 0,
        },

        {
          opacity: 1,

          duration: 0.28,

          ease:
            "power2.out",
        }
      );


      timeline.fromTo(
        panel,

        {
          opacity: 0,

          y: 38,

          scale: 0.988,
        },

        {
          opacity: 1,

          y: 0,

          scale: 1,

          duration: 0.58,

          ease:
            "power4.out",
        },

        "-=0.1"
      );


      timeline.fromTo(
        fields,

        {
          opacity: 0,

          y: 9,
        },

        {
          opacity: 1,

          y: 0,

          duration: 0.38,

          stagger: 0.03,

          ease:
            "power3.out",
        },

        "-=0.35"
      );


      timeline.add(() => {
        closeRef.current?.focus();
      });
    });


    /* =====================================================
       RESTORE PAGE
    ===================================================== */

    return () => {
      html.classList.remove(
        "admission-modal-open"
      );

      body.classList.remove(
        "admission-modal-open"
      );


      html.style.overflow =
        oldHtmlOverflow;


      body.style.position =
        oldBody.position;

      body.style.top =
        oldBody.top;

      body.style.left =
        oldBody.left;

      body.style.right =
        oldBody.right;

      body.style.width =
        oldBody.width;

      body.style.overflow =
        oldBody.overflow;

      body.style.paddingRight =
        oldBody.paddingRight;


      window.scrollTo(
        0,
        scrollPositionRef.current
      );


      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
  }, [formOpen]);


  /* =========================================================
     OPEN FORM
  ========================================================= */

  const openForm = () => {
    setFormOpen(true);
  };


  /* =========================================================
     CLOSE FORM
  ========================================================= */

  const closeForm = () => {
    const overlay =
      overlayRef.current;

    const panel =
      panelRef.current;


    if (
      !overlay ||
      !panel
    ) {
      setFormOpen(false);

      return;
    }


    gsap
      .timeline({
        onComplete: () => {
          setFormOpen(false);
        },
      })

      .to(
        panel,

        {
          opacity: 0,

          y: 28,

          scale: 0.992,

          duration: 0.32,

          ease:
            "power3.inOut",
        }
      )

      .to(
        overlay,

        {
          opacity: 0,

          duration: 0.2,

          ease:
            "power2.inOut",
        },

        "-=0.14"
      );
  };


  /* =========================================================
     ESCAPE
  ========================================================= */

  useEffect(() => {
    const handleKeyDown =
      (event) => {
        if (
          event.key ===
            "Escape" &&
          formOpen
        ) {
          closeForm();
        }
      };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [formOpen]);


  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit =
    (event) => {
      event.preventDefault();
    };


  return (
    <>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section
        ref={sectionRef}
        className="faq-section"
        id="faq"
      >

        <div className="faq-layout">


          {/* =================================================
              LEFT
          ================================================= */}

          <div className="faq-left-column">

            <div
              ref={headingRef}
              className="faq-sticky"
            >

              <h2 className="faq-title">
                Questions parents

                <span>
                  often ask.
                </span>
              </h2>


              <p className="faq-intro-copy">
                Everything you may want to
                know before beginning your
                journey with Vidya.
              </p>


              <button
                type="button"

                className="faq-admission-button"

                onClick={
                  openForm
                }
              >

                <span>
                  Start admission enquiry
                </span>


                <span className="faq-admission-arrow">
                  ↗
                </span>

              </button>

            </div>

          </div>


          {/* =================================================
              QUESTIONS
          ================================================= */}

          <div
            ref={listRef}
            className="faq-list"
          >

            {faqItems.map(
              (
                item,
                index
              ) => {

                const isOpen =
                  activeIndex ===
                  index;


                return (
                  <article
                    key={
                      item.question
                    }

                    className={`
                      faq-item
                      ${
                        isOpen
                          ? "is-open"
                          : ""
                      }
                    `}
                  >

                    <button
                      type="button"

                      className="faq-question"

                      aria-expanded={
                        isOpen
                      }

                      onClick={() =>
                        setActiveIndex(
                          isOpen
                            ? -1
                            : index
                        )
                      }
                    >

                      <span className="faq-number">

                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}

                      </span>


                      <span className="faq-question-copy">
                        {
                          item.question
                        }
                      </span>


                      <span
                        className="faq-plus"
                        aria-hidden="true"
                      >
                        <span />
                        <span />
                      </span>

                    </button>


                    <div className="faq-answer">

                      <div>

                        <p>
                          {
                            item.answer
                          }
                        </p>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          ADMISSION MODAL
      ====================================================== */}

      {formOpen && (

        <div
          ref={overlayRef}

          className="admission-overlay"

          onPointerDown={(
            event
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeForm();
            }
          }}
        >

          <div
            ref={panelRef}

            className="admission-panel"

            role="dialog"

            aria-modal="true"

            aria-labelledby="admission-title"

            onPointerDown={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              ref={closeRef}

              type="button"

              className="admission-close"

              onClick={
                closeForm
              }

              aria-label="Close admission form"
            >
              <span />
              <span />
            </button>


            {/* =================================================
                FORM INTRO
            ================================================= */}

            <div className="admission-panel-left">

              <span className="admission-panel-label">
                VIDYA ADMISSIONS
              </span>


              <h2 id="admission-title">
                Begin your

                <span>
                  Vidya journey.
                </span>
              </h2>


              <p>
                Share a few details and
                our admissions team will
                help you with the next step.
              </p>


              <div className="admission-step-list">

                <div className="admission-step">
                  <span>
                    01
                  </span>

                  <p>
                    Send your enquiry
                  </p>
                </div>


                <div className="admission-step">
                  <span>
                    02
                  </span>

                  <p>
                    Connect with our team
                  </p>
                </div>


                <div className="admission-step">
                  <span>
                    03
                  </span>

                  <p>
                    Plan your campus visit
                  </p>
                </div>

              </div>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <div className="admission-panel-right">

              <form
                className="admission-form"

                onSubmit={
                  handleSubmit
                }
              >

                <div className="admission-field">

                  <label htmlFor="childName">
                    Child's name
                  </label>

                  <input
                    id="childName"
                    type="text"
                    placeholder="Enter child's name"
                    required
                  />

                </div>


                <div className="admission-field">

                  <label htmlFor="parentName">
                    Parent / guardian
                  </label>

                  <input
                    id="parentName"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />

                </div>


                <div className="admission-field">

                  <label htmlFor="mobile">
                    Mobile number
                  </label>

                  <input
                    id="mobile"
                    type="tel"
                    inputMode="tel"
                    placeholder="+91"
                    required
                  />

                </div>


                <div className="admission-field">

                  <label htmlFor="email">
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    required
                  />

                </div>


                <div className="admission-field">

                  <label htmlFor="grade">
                    Grade
                  </label>

                  <select
                    id="grade"
                    defaultValue=""
                    required
                  >

                    <option
                      value=""
                      disabled
                    >
                      Select grade
                    </option>

                    <option>
                      Early Years
                    </option>

                    <option>
                      Grade 1
                    </option>

                    <option>
                      Grade 2
                    </option>

                    <option>
                      Grade 3
                    </option>

                    <option>
                      Grade 4
                    </option>

                    <option>
                      Grade 5
                    </option>

                    <option>
                      Grade 6
                    </option>

                    <option>
                      Grade 7
                    </option>

                    <option>
                      Grade 8
                    </option>

                    <option>
                      Grade 9
                    </option>

                    <option>
                      Grade 10
                    </option>

                    <option>
                      Grade 11
                    </option>

                    <option>
                      Grade 12
                    </option>

                  </select>

                </div>


                <div className="admission-field">

                  <label htmlFor="academicYear">
                    Academic year
                  </label>

                  <select
                    id="academicYear"
                    defaultValue=""
                    required
                  >

                    <option
                      value=""
                      disabled
                    >
                      Select year
                    </option>

                    <option>
                      2026 – 2027
                    </option>

                    <option>
                      2027 – 2028
                    </option>

                  </select>

                </div>


                <div className="admission-field admission-field-full">

                  <label htmlFor="message">
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows="3"
                    placeholder="Anything you'd like us to know?"
                  />

                </div>


                <div className="admission-field admission-field-full">

                  <button
                    type="submit"

                    className="admission-submit"
                  >
                    <span>
                      Submit enquiry
                    </span>

                    <span>
                      ↗
                    </span>
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

    </>
  );
}