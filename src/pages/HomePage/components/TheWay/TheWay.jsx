import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./TheWay.css";


gsap.registerPlugin(
  ScrollTrigger
);


/* =========================================================
   THE VIDYA WAY DATA
========================================================= */

const wayItems = [
  {
    id: "01",

    title:
      "Curiosity",

    description:
      "We encourage children to ask questions, explore ideas and discover the joy of learning for themselves.",

    image:
      "https://images.pexels.com/photos/8471830/pexels-photo-8471830.jpeg?auto=compress&cs=tinysrgb&w=1800&q=90",

    reverse:
      false,
  },

  {
    id: "02",

    title:
      "Confidence",

    description:
      "Children learn to express themselves, take initiative and believe in their ability to move forward.",

    image:
      "https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg?auto=compress&cs=tinysrgb&w=1800&q=90",

    reverse:
      true,
  },

  {
    id: "03",

    title:
      "Character",

    description:
      "Respect, responsibility and empathy shape everyday experiences and help students grow into thoughtful individuals.",

    image:
      "https://images.pexels.com/photos/8535215/pexels-photo-8535215.jpeg?auto=compress&cs=tinysrgb&w=1800&q=90",

    reverse:
      false,
  },

  {
    id: "04",

    title:
      "Creativity",

    description:
      "Students are given room to imagine, experiment and turn their ideas into something meaningful.",

    image:
      "https://images.pexels.com/photos/8613094/pexels-photo-8613094.jpeg?auto=compress&cs=tinysrgb&w=1800&q=90",

    reverse:
      true,
  },
];


/* =========================================================
   COMPONENT
========================================================= */

export default function TheWay() {

  const sectionRef =
    useRef(null);

  const headingRef =
    useRef(null);

  const cardsRef =
    useRef([]);


  /* =========================================================
     ANIMATIONS
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

        /* =====================================================
           HEADING
        ===================================================== */

        gsap.fromTo(
          headingRef.current,

          {
            opacity:
              0,

            y:
              40,
          },

          {
            opacity:
              1,

            y:
              0,

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


        /* =====================================================
           DESKTOP CARDS
        ===================================================== */

        mm.add(
          "(min-width: 769px)",

          () => {

            const cards =
              cardsRef.current.filter(
                Boolean
              );


            if (!cards.length) {
              return;
            }


            const animation =
              gsap.fromTo(
                cards,

                {
                  opacity:
                    0,

                  y:
                    55,
                },

                {
                  opacity:
                    1,

                  y:
                    0,

                  duration:
                    0.9,

                  stagger:
                    0.09,

                  ease:
                    "power4.out",

                  scrollTrigger: {

                    trigger:
                      cards[0],

                    start:
                      "top 90%",

                    once:
                      true,

                  },

                }
              );


            return () => {

              animation.kill();

            };

          }
        );


        /* =====================================================
           MOBILE

           REMOVE GSAP TRANSFORMS
        ===================================================== */

        mm.add(
          "(max-width: 768px)",

          () => {

            const cards =
              cardsRef.current.filter(
                Boolean
              );


            gsap.set(
              cards,

              {
                opacity:
                  1,

                clearProps:
                  "transform",
              }
            );

          }
        );

      }, section);


    return () => {

      mm.revert();

      ctx.revert();

    };

  }, []);


  /* =========================================================
     RETURN
  ========================================================= */

  return (

    <section
      ref={sectionRef}

      className="vidya-way"

      id="the-way"
    >

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="vidya-way-header"
      >

        <h2
          ref={headingRef}

          className="vidya-way-heading"
        >

          <span
            className="vidya-way-heading-dark"
          >
            The Vidya
          </span>

          {" "}

          <span
            className="vidya-way-heading-light"
          >
            Way.
          </span>

        </h2>

      </div>


      {/* =====================================================
          CARDS
      ====================================================== */}

      <div
        className="vidya-way-cards"
      >

        {wayItems.map(
          (
            item,
            index
          ) => (

            <article
              key={
                item.id
              }

              ref={(
                element
              ) => {

                cardsRef.current[
                  index
                ] =
                  element;

              }}

              className={`
                vidya-way-card

                ${
                  item.reverse
                    ? "is-reverse"
                    : ""
                }
              `}
            >

              {/* =================================================
                  IMAGE

                  NUMBERS REMOVED
              ================================================= */}

              <div
                className="vidya-way-card-image-wrap"
              >

                <img
                  src={
                    item.image
                  }

                  alt={
                    item.title
                  }

                  className="vidya-way-card-image"

                  loading="lazy"

                  draggable="false"
                />

              </div>


              {/* =================================================
                  CONTENT
              ================================================= */}

              <div
                className="vidya-way-card-content"
              >

                <div>

                  <h3>
                    {item.title}
                  </h3>


                  <p>
                    {item.description}
                  </p>

                </div>


                <span
                  className="vidya-way-card-link"
                >
                  DISCOVER MORE
                </span>

              </div>

            </article>

          )
        )}

      </div>

    </section>

  );

}