import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./AboutLeadership.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   LEADERS
========================================================= */

const leaders = [
  {
    id: "01",
    name: "Leadership Name",
    role: "Chairman",

    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=92",

    quote:
      "Education should help children discover who they are, what they care about and how they can contribute meaningfully to the world around them.",

    bio:
      "Committed to building a school culture where learning, character and curiosity develop together.",
  },

  {
    id: "02",
    name: "Leadership Name",
    role: "Founder",

    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1400&q=92",

    quote:
      "A school should give children the confidence to ask questions, explore possibilities and discover learning for themselves.",

    bio:
      "Focused on creating an educational experience that connects academics with creativity, confidence and real-world thinking.",
  },

  {
    id: "03",
    name: "Leadership Name",
    role: "Head of School",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=92",

    quote:
      "Every child carries a different story. Our responsibility is to create the space in which that story can unfold with confidence.",

    bio:
      "Works closely with students and teachers to build a thoughtful, joyful and inclusive learning environment.",
  },

  {
    id: "04",
    name: "Leadership Name",
    role: "Head of Curriculum",

    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=92",

    quote:
      "Learning becomes powerful when children can connect what they know with what they see, question and experience.",

    bio:
      "Focused on developing learning journeys that bring together knowledge, inquiry, creativity and application.",
  },

  {
    id: "05",
    name: "Leadership Name",
    role: "Academic Director",

    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1400&q=92",

    quote:
      "The strongest classrooms are places where children feel confident enough to try, fail, reflect and try again.",

    bio:
      "Supports academic planning and teaching practices that encourage curiosity, reflection and continual growth.",
  },

  {
    id: "06",
    name: "Leadership Name",
    role: "Student Experience",

    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=92",

    quote:
      "A child's experience of school is shaped by every conversation, every friendship and every place they feel they belong.",

    bio:
      "Helps shape student experiences beyond academics through community, activities and meaningful relationships.",
  },

  {
    id: "07",
    name: "Leadership Name",
    role: "Learning & Development",

    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=92",

    quote:
      "When teachers continue to learn, the entire school continues to grow.",

    bio:
      "Works with educators to strengthen teaching practice, professional learning and collaborative growth.",
  },

  {
    id: "08",
    name: "Leadership Name",
    role: "Operations",

    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=92",

    quote:
      "Good systems should make it easier for people, ideas and learning to take centre stage.",

    bio:
      "Supports the systems, spaces and operations that allow the school experience to work seamlessly.",
  },
];


/* =========================================================
   COMPONENT
========================================================= */

const AboutLeadership = () => {
  const sectionRef =
    useRef(null);

  const headerRef =
    useRef(null);

  const cardRefs =
    useRef([]);


  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const header =
      headerRef.current;


    if (!section || !header) {
      return;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(() => {

        /* =====================================================
           HEADER
        ===================================================== */

        const headerItems =
          header.querySelectorAll(
            "[data-leadership-reveal]"
          );


        gsap.fromTo(
          headerItems,
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
                header,

              start:
                "top 84%",

              once:
                true,
            },
          }
        );


        /* =====================================================
           DESKTOP / TABLET
        ===================================================== */

        mm.add(
          "(min-width: 769px)",
          () => {

            const cards =
              cardRefs.current.filter(
                Boolean
              );


            cards.forEach(
              (
                card,
                index
              ) => {

                const image =
                  card.querySelector(
                    ".about-leader-image img"
                  );


                gsap.fromTo(
                  card,
                  {
                    opacity: 0,

                    y:
                      38 +
                      (index % 4) * 5,
                  },
                  {
                    opacity: 1,

                    y: 0,

                    ease:
                      "none",

                    scrollTrigger: {
                      trigger:
                        card,

                      start:
                        "top 93%",

                      end:
                        "top 76%",

                      scrub:
                        0.45,
                    },
                  }
                );


                if (image) {
                  gsap.fromTo(
                    image,
                    {
                      scale:
                        1.045,

                      yPercent:
                        -2,
                    },
                    {
                      scale:
                        1,

                      yPercent:
                        2,

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
                          0.55,
                      },
                    }
                  );
                }

              }
            );

          }
        );


        /* =====================================================
           MOBILE
        ===================================================== */

        mm.add(
          "(max-width: 768px)",
          () => {

            const cards =
              cardRefs.current.filter(
                Boolean
              );


            cards.forEach(
              (
                card,
                index
              ) => {

                gsap.fromTo(
                  card,
                  {
                    opacity: 0,
                    y: 26,
                  },
                  {
                    opacity: 1,
                    y: 0,

                    duration:
                      0.7,

                    delay:
                      (index % 2) *
                      0.04,

                    ease:
                      "power3.out",

                    scrollTrigger: {
                      trigger:
                        card,

                      start:
                        "top 91%",

                      once:
                        true,
                    },
                  }
                );

              }
            );

          }
        );

      }, section);


    /* =====================================================
       REFRESH
    ===================================================== */

    let resizeTimer;

    let previousWidth =
      window.innerWidth;


    const refresh = () => {
      ScrollTrigger.refresh();
    };


    const handleResize = () => {
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


    requestAnimationFrame(() => {
      requestAnimationFrame(
        refresh
      );
    });


    return () => {
      clearTimeout(
        resizeTimer
      );


      window.removeEventListener(
        "resize",
        handleResize
      );


      mm.revert();

      ctx.revert();
    };

  }, []);


  return (
    <section
      ref={sectionRef}
      className="about-leadership"
    >

      <div className="about-leadership-inner">

        {/* =================================================
            HEADER
        ================================================= */}

        <header
          ref={headerRef}
          className="about-leadership-header"
        >

          <h2
            className="about-leadership-title"
            data-leadership-reveal
          >

            <span className="about-leadership-title-main">
              The hands
            </span>

            {" "}

            <span className="about-leadership-title-soft">
              behind
            </span>

            {" "}

            <span className="about-leadership-title-soft">
              Vidya.
            </span>

          </h2>


          <p
            className="about-leadership-intro"
            data-leadership-reveal
          >
            A team of educators and leaders
            shaping a school where curiosity,
            confidence and character grow
            together.
          </p>

        </header>


        {/* =================================================
            GRID
        ================================================= */}

        <div className="about-leadership-grid">

          {leaders.map(
            (
              leader,
              index
            ) => (

              <article
                key={
                  leader.id
                }

                ref={
                  (element) => {
                    cardRefs.current[
                      index
                    ] =
                      element;
                  }
                }

                className="about-leader-card"
              >

                <figure className="about-leader-image">

                  <img
                    src={
                      leader.image
                    }

                    alt={
                      leader.name
                    }

                    loading="lazy"

                    decoding="async"

                    draggable="false"
                  />

                </figure>


                <div className="about-leader-content">

                  <div className="about-leader-heading">

                    <h3 className="about-leader-name">
                      {leader.name}
                    </h3>


                    <span className="about-leader-role">
                      {leader.role}
                    </span>

                  </div>


                  <blockquote className="about-leader-quote">
                    “{leader.quote}”
                  </blockquote>


                  <p className="about-leader-bio">
                    {leader.bio}
                  </p>

                </div>

              </article>

            )
          )}

        </div>

      </div>

    </section>
  );
};


export default AboutLeadership;