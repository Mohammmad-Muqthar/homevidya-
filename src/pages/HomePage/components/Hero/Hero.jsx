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


const Hero = ({
  onVideoReady,
  showContent = true,
}) => {

  /* =========================================================
     REFS
  ========================================================= */

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

  const bottomRef =
    useRef(null);


  /* =========================================================
     STATE
  ========================================================= */

  const [
    videoModal,
    setVideoModal,
  ] = useState(false);


  /* =========================================================
     VIDEO

     Runs immediately.

     Hero video must exist underneath
     the VIDYA intro.

     NO HERO TEXT is required here.
  ========================================================= */

  useLayoutEffect(() => {

    const section =
      sectionRef.current;

    const video =
      videoRef.current;


    if (
      !section ||
      !video
    ) {
      return;
    }


    const ctx =
      gsap.context(() => {

        /* -----------------------------------------------
           VIDEO START
        ------------------------------------------------ */

        gsap.set(
          video,
          {
            scale: 1.065,
          }
        );


        /* -----------------------------------------------
           VIDEO INTRO MOTION
        ------------------------------------------------ */

        gsap.to(
          video,
          {
            scale: 1.02,

            duration: 1.8,

            ease:
              "power4.out",
          }
        );


        /* -----------------------------------------------
           VIDEO PARALLAX
        ------------------------------------------------ */

        gsap.fromTo(
          video,

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

              scrub:
                1.15,

              invalidateOnRefresh:
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
     HERO CONTENT REVEAL

     CRITICAL:

     This effect cannot run while showContent=false
     because the Hero text DOES NOT EXIST in the DOM.

     showContent becomes true only:
     VIDYA finished
          +
     300ms delay
  ========================================================= */

  useLayoutEffect(() => {

    if (!showContent) {
      return;
    }


    const section =
      sectionRef.current;

    const content =
      contentRef.current;

    const title =
      titleRef.current;

    const paragraph =
      paragraphRef.current;

    const buttons =
      buttonsRef.current;

    const bottom =
      bottomRef.current;


    if (
      !section ||
      !content ||
      !title ||
      !paragraph ||
      !buttons
    ) {
      return;
    }


    const ctx =
      gsap.context(() => {

        /* -----------------------------------------------
           INITIAL HIDDEN STATE

           useLayoutEffect runs before paint,
           so there is no text flash.
        ------------------------------------------------ */

        gsap.set(
          title,
          {
            opacity: 0,
            y: 70,
          }
        );


        gsap.set(
          paragraph,
          {
            opacity: 0,
            y: 35,
          }
        );


        gsap.set(
          buttons,
          {
            opacity: 0,
            y: 30,
          }
        );


        if (bottom) {

          gsap.set(
            bottom,
            {
              opacity: 0,
              y: 15,
            }
          );

        }


        /* -----------------------------------------------
           HERO REVEAL
        ------------------------------------------------ */

        const reveal =
          gsap.timeline({

            defaults: {
              ease:
                "power4.out",
            },

          });


        /* TITLE */

        reveal.to(
          title,
          {
            opacity: 1,
            y: 0,

            duration: 1.1,
          },
          0
        );


        /* DESCRIPTION */

        reveal.to(
          paragraph,
          {
            opacity: 1,
            y: 0,

            duration: 0.8,
          },
          0.28
        );


        /* BUTTONS */

        reveal.to(
          buttons,
          {
            opacity: 1,
            y: 0,

            duration: 0.8,
          },
          0.42
        );


        /* BOTTOM */

        if (bottom) {

          reveal.to(
            bottom,
            {
              opacity: 1,
              y: 0,

              duration: 0.7,
            },
            0.52
          );

        }


        /* -----------------------------------------------
           CONTENT PARALLAX

           Created only after Hero content exists.
        ------------------------------------------------ */

        gsap.to(
          content,
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

              invalidateOnRefresh:
                true,

            },

          }
        );


        ScrollTrigger.refresh();

      }, section);


    return () => {

      ctx.revert();

    };

  }, [
    showContent,
  ]);


  /* =========================================================
     MODAL
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


  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <>

      <section

        ref={sectionRef}

        className="raya-hero"

        id="home"

        data-navbar-hero

      >

        {/* =================================================
            VIDEO

            ALWAYS PRESENT
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

            onCanPlay={
              onVideoReady
            }

            onPlaying={
              onVideoReady
            }

          >

            <source
              src="/videos/vidya-hero.mp4"
              type="video/mp4"
            />

          </video>


          <div
            className="raya-hero-overlay"
          />

        </div>


        {/* =================================================
            HERO TEXT

            THIS ENTIRE BLOCK DOES NOT EXIST
            DURING VIDYA INTRO.

            No opacity trick.
            No visibility trick.

            React simply doesn't render it.
        ================================================= */}

        {showContent && (

          <>

            <div className="raya-hero-container">

              <div

                ref={contentRef}

                className="raya-hero-content"

              >

                {/* TITLE */}

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


                {/* DESCRIPTION */}

                <p

                  ref={paragraphRef}

                  className="raya-hero-description"

                >
                  A school where curiosity,
                  confidence and character
                  grow together.
                </p>


                {/* ACTIONS */}

                <div

                  ref={buttonsRef}

                  className="raya-hero-actions"

                >

                  <a

                    href="#about"

                    className="
                      raya-hero-button
                      raya-hero-button-primary
                    "

                  >
                    Explore Vidya
                  </a>


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


            {/* =============================================
                BOTTOM CUE

                Also absent during VIDYA intro.
            ============================================= */}

            <div

              ref={bottomRef}

              className="raya-hero-bottom"

            >

              <span>
                Discover Vidya
              </span>


              <ArrowDown
                size={17}
              />

            </div>

          </>

        )}

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

                duration:
                  0.6,

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