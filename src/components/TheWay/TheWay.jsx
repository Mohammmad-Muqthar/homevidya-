import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./TheWay.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   THE VIDYA WAY
========================================================= */

const wayItems = [
  {
    id: "01",

    title: "Curiosity",

    description:
      "We encourage children to ask questions, explore ideas and discover the joy of learning for themselves.",

    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=90",

    reverse: false,
  },

  {
    id: "02",

    title: "Confidence",

    description:
      "Children learn to express themselves, take initiative and believe in their ability to move forward.",

    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=90",

    reverse: true,
  },

  {
    id: "03",

    title: "Character",

    description:
      "Respect, responsibility and empathy shape everyday experiences and help students grow into thoughtful individuals.",

    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1600&q=90",

    reverse: false,
  },

  {
    id: "04",

    title: "Creativity",

    description:
      "Students are given room to imagine, experiment and turn their ideas into something meaningful.",

    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1600&q=90",

    reverse: true,
  },
];


export default function TheWay() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);


  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;


    const ctx = gsap.context(() => {

      /* =====================================================
         HEADING
      ===================================================== */

      gsap.fromTo(
        headingRef.current,

        {
          opacity: 0,
          y: 40,
        },

        {
          opacity: 1,
          y: 0,

          duration: 0.85,

          ease: "power4.out",

          scrollTrigger: {
            trigger:
              headingRef.current,

            start:
              "top 88%",

            once: true,
          },
        }
      );


      /* =====================================================
         CARDS
      ===================================================== */

      const cards =
        cardsRef.current.filter(
          Boolean
        );


      if (cards.length) {
        gsap.fromTo(
          cards,

          {
            opacity: 0,
            y: 55,
          },

          {
            opacity: 1,
            y: 0,

            duration: 0.9,

            stagger: 0.09,

            ease:
              "power4.out",

            scrollTrigger: {
              trigger:
                cards[0],

              start:
                "top 90%",

              once: true,
            },
          }
        );
      }

    }, section);


    return () => {
      ctx.revert();
    };
  }, []);


  return (
    <section
      ref={sectionRef}
      className="vidya-way"
      id="the-way"
    >

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="vidya-way-header">

        <h2
          ref={headingRef}
          className="vidya-way-heading"
        >
          The way we help

          <span>
            every child grow.
          </span>
        </h2>

      </div>


      {/* =====================================================
          FOUR CARDS
      ====================================================== */}

      <div className="vidya-way-cards">

        {wayItems.map(
          (
            item,
            index
          ) => (

            <article
              key={item.id}

              ref={(element) => {
                cardsRef.current[
                  index
                ] = element;
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

              {/* IMAGE */}

              <div className="vidya-way-card-image-wrap">

                <img
                  src={item.image}

                  alt={item.title}

                  className="vidya-way-card-image"

                  loading="lazy"
                />


                <span className="vidya-way-number">
                  {item.id}
                </span>

              </div>


              {/* CONTENT */}

              <div className="vidya-way-card-content">

                <div>

                  <h3>
                    {item.title}
                  </h3>


                  <p>
                    {item.description}
                  </p>

                </div>


                <span className="vidya-way-card-link">
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