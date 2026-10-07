import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./AboutStatement.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   STATEMENT
========================================================= */

const statement =
  "We believe a school should be more than a place children come to study. It should be where they discover what excites them, learn to ask better questions, build confidence through experience and find joy in becoming who they are. Every space, every lesson and every interaction should help make that possible. So we built Vidya around it.";


const words =
  statement.split(/\s+/);


const accentStart =
  words.length - 6;


/* =========================================================
   COMPONENT
========================================================= */

const AboutStatement = () => {
  const sectionRef =
    useRef(null);

  const textRef =
    useRef(null);


  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const text =
      textRef.current;


    if (
      !section ||
      !text
    ) {
      return;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(() => {

        const normalWords =
          text.querySelectorAll(
            ".about-statement-word:not(.about-statement-word--accent)"
          );


        const accentWords =
          text.querySelectorAll(
            ".about-statement-word--accent"
          );


        /* =====================================================
           INITIAL COLORS
        ===================================================== */

        gsap.set(
          normalWords,
          {
            color:
              "rgba(11, 130, 85, 0.14)",
          }
        );


        gsap.set(
          accentWords,
          {
            color:
              "rgba(38, 180, 116, 0.15)",
          }
        );


        /* =====================================================
           WORD REVEAL
        ===================================================== */

        gsap.to(
          normalWords,
          {
            color:
              "#0b8255",

            stagger: {
              each: 0.011,
            },

            ease:
              "none",

            scrollTrigger: {
              trigger:
                section,

              start:
                "top 74%",

              end:
                "bottom 34%",

              scrub:
                0.65,

              invalidateOnRefresh:
                true,
            },
          }
        );


        /* =====================================================
           LAST PHRASE
        ===================================================== */

        gsap.to(
          accentWords,
          {
            color:
              "#26b474",

            stagger: {
              each: 0.025,
            },

            ease:
              "none",

            scrollTrigger: {
              trigger:
                section,

              start:
                "55% 69%",

              end:
                "bottom 34%",

              scrub:
                0.55,

              invalidateOnRefresh:
                true,
            },
          }
        );


        /* =====================================================
           DESKTOP SUBTLE MOVEMENT
        ===================================================== */

        mm.add(
          "(min-width: 769px)",
          () => {
            gsap.fromTo(
              text,
              {
                y: 12,
              },
              {
                y: -12,

                ease:
                  "none",

                scrollTrigger: {
                  trigger:
                    section,

                  start:
                    "top bottom",

                  end:
                    "bottom top",

                  scrub:
                    0.8,
                },
              }
            );
          }
        );

      }, section);


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
      className="about-statement"
    >

      <div className="about-statement-inner">

        <p
          ref={textRef}
          className="about-statement-text"
        >

          {words.map(
            (
              word,
              index
            ) => {

              const isAccent =
                index >=
                accentStart;


              return (
                <span
                  key={`${word}-${index}`}

                  className={`
                    about-statement-word

                    ${
                      isAccent
                        ? "about-statement-word--accent"
                        : ""
                    }
                  `}
                >
                  {word}{" "}
                </span>
              );
            }
          )}

        </p>

      </div>

    </section>
  );
};


export default AboutStatement;