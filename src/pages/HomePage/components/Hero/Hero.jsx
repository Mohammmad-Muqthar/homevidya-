import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  ArrowDown,
  Play,
  X,
} from "lucide-react";

import { gsap } from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import "./Hero.css";


gsap.registerPlugin(
  ScrollTrigger
);


const Hero = () => {
  const sectionRef =
    useRef(null);

  const videoRef =
    useRef(null);

  const contentRef =
    useRef(null);

  const titleRef =
    useRef(null);

  const paragraphRef =
    useRef(null);

  const buttonsRef =
    useRef(null);

  const [videoModal, setVideoModal] =
    useState(false);


  /* =========================================================
     INTRO + PARALLAX
  ========================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;


    if (!section) return;


    const ctx =
      gsap.context(() => {

        /* -----------------------------------------------
           INITIAL STATE
        ------------------------------------------------ */

        gsap.set(
          titleRef.current,
          {
            opacity: 0,
            y: 70,
          }
        );


        gsap.set(
          paragraphRef.current,
          {
            opacity: 0,
            y: 35,
          }
        );


        gsap.set(
          buttonsRef.current,
          {
            opacity: 0,
            y: 30,
          }
        );


        gsap.set(
          videoRef.current,
          {
            scale: 1.065,
          }
        );


        /* -----------------------------------------------
           INTRO TIMELINE
        ------------------------------------------------ */

        const intro =
          gsap.timeline({
            defaults: {
              ease:
                "power4.out",
            },
          });


        intro.to(
          videoRef.current,
          {
            scale: 1.02,
            duration: 1.8,
          },
          0
        );


        intro.to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
          },
          0.2
        );


        intro.to(
          paragraphRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          0.46
        );


        intro.to(
          buttonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          0.58
        );


        /* -----------------------------------------------
           VIDEO PARALLAX
        ------------------------------------------------ */

        gsap.fromTo(
          videoRef.current,

          {
            yPercent: -3,
            scale: 1.02,
          },

          {
            yPercent: 8,
            scale: 1.1,

            ease: "none",

            scrollTrigger: {
              trigger:
                section,

              start:
                "top top",

              end:
                "bottom top",

              scrub: 1.15,

              invalidateOnRefresh:
                true,
            },
          }
        );


        /* -----------------------------------------------
           CONTENT PARALLAX
        ------------------------------------------------ */

        gsap.to(
          contentRef.current,
          {
            y: -70,

            opacity: 0.15,

            ease: "none",

            scrollTrigger: {
              trigger:
                section,

              start:
                "15% top",

              end:
                "bottom top",

              scrub: 1,
            },
          }
        );

      }, section);


    return () => {
      ctx.revert();
    };
  }, []);


  /* =========================================================
     VIDEO MODAL
  ========================================================= */

  const openVideo = () => {
    setVideoModal(true);

    document.body.style.overflow =
      "hidden";
  };


  const closeVideo = () => {
    setVideoModal(false);

    document.body.style.overflow =
      "";
  };


  return (
    <>
      <section
        ref={sectionRef}
        className="raya-hero"
        id="home"
      >

        {/* ================================================
            BACKGROUND VIDEO
        ================================================= */}

        <div className="raya-hero-media">

          <video
            ref={videoRef}
            className="raya-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="/videos/vidya-hero.mp4"
              type="video/mp4"
            />
          </video>


          <div className="raya-hero-overlay" />

        </div>


        {/* ================================================
            CONTENT
        ================================================= */}

        <div className="raya-hero-container">

          <div
            ref={contentRef}
            className="raya-hero-content"
          >

            {/* EYEBROW REMOVED */}


            <h1
              ref={titleRef}
              className="raya-hero-title"
            >

              <span className="raya-title-main">
                Learning that
              </span>

              <span className="raya-title-accent">
                moves with them.
              </span>

            </h1>


            <p
              ref={paragraphRef}
              className="raya-hero-description"
            >
              A school where curiosity,
              confidence and character
              grow together.
            </p>


            <div
              ref={buttonsRef}
              className="raya-hero-actions"
            >

              {/* PRIMARY */}

              <a
                href="#about"
                className="
                  raya-hero-button
                  raya-hero-button-primary
                "
              >
                Explore Vidya
              </a>


              {/* VIDEO */}

              <button
                type="button"

                className="
                  raya-hero-button
                  raya-hero-button-video
                "

                onClick={
                  openVideo
                }
              >

                <span className="raya-hero-play">

                  <Play
                    size={15}
                    fill="currentColor"
                  />

                </span>

                Watch our story

              </button>

            </div>

          </div>

        </div>


        {/* ================================================
            BOTTOM
        ================================================= */}

        <div className="raya-hero-bottom">

          <span>
            Discover Vidya
          </span>

          <ArrowDown size={17} />

        </div>

      </section>


      {/* =====================================================
          VIDEO MODAL
      ====================================================== */}

      <AnimatePresence>

        {videoModal && (

          <motion.div
            className="raya-video-modal"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            transition={{
              duration: 0.45,
            }}
          >

            <motion.div
              className="raya-video-modal-inner"

              initial={{
                scale: 0.94,
                opacity: 0,
              }}

              animate={{
                scale: 1,
                opacity: 1,
              }}

              exit={{
                scale: 0.96,
                opacity: 0,
              }}

              transition={{
                duration: 0.6,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >

              <video
                className="raya-video-modal-video"
                autoPlay
                controls
                playsInline
              >
                <source
                  src="/videos/vidya-hero.mp4"
                  type="video/mp4"
                />
              </video>

            </motion.div>


            <button
              type="button"
              className="raya-video-close"

              onClick={
                closeVideo
              }

              aria-label="Close video"
            >
              <X size={24} />
            </button>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
};


export default Hero;