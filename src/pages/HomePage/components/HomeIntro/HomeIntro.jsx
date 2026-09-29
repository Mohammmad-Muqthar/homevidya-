import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import "./HomeIntro.css";


function IntroReveal({
  ready = false,
  onComplete,
}) {

  const [started, setStarted] =
    useState(false);


  const [isMobile] =
    useState(() => {

      if (
        typeof window ===
        "undefined"
      ) {
        return false;
      }

      return window.matchMedia(
        "(max-width: 768px)"
      ).matches;

    });


  const completedRef =
    useRef(false);


  const previousOverflowRef =
    useRef("");


  /* =========================================================
     UNIQUE MASK ID
  ========================================================= */

  const reactId =
    useId();


  const cleanId =
    reactId.replace(
      /:/g,
      ""
    );


  const maskId =
    `vidya-video-mask-${cleanId}`;


  /* =========================================================
     PAGE LOCK
  ========================================================= */

  useEffect(() => {

    previousOverflowRef.current =
      document.body.style.overflow;


    document.body.style.overflow =
      "hidden";


    document.body.classList.add(
      "vidya-page-intro-active"
    );


    return () => {

      document.body.style.overflow =
        previousOverflowRef.current;


      document.body.classList.remove(
        "vidya-page-intro-active"
      );

    };

  }, []);


  /* =========================================================
     START

     Wait for Hero video + font.

     Then give browser two frames before animation.

     This is important for smooth first motion.
  ========================================================= */

  useEffect(() => {

    if (started) {
      return;
    }


    let cancelled =
      false;


    let fallbackTimer;

    let frame1;
    let frame2;


    const startIntro =
      async () => {

        /* ---------------------------------------------
           FONT
        --------------------------------------------- */

        if (
          document.fonts?.load
        ) {

          try {

            await Promise.race([

              document.fonts.load(
                '800 270px "Manrope"'
              ),

              new Promise(
                (resolve) => {

                  window.setTimeout(
                    resolve,
                    180
                  );

                }
              ),

            ]);

          } catch {
            // continue
          }

        }


        if (cancelled) {
          return;
        }


        /* ---------------------------------------------
           ALLOW VIDEO + MASK TO PAINT
        --------------------------------------------- */

        frame1 =
          requestAnimationFrame(() => {

            frame2 =
              requestAnimationFrame(() => {

                if (!cancelled) {

                  setStarted(
                    true
                  );

                }

              });

          });

      };


    /* =======================================================
       NORMAL
    ======================================================= */

    if (ready) {

      startIntro();

    } else {

      /*
        Safety only.
      */

      fallbackTimer =
        window.setTimeout(
          startIntro,
          450
        );

    }


    return () => {

      cancelled =
        true;


      if (
        fallbackTimer
      ) {

        window.clearTimeout(
          fallbackTimer
        );

      }


      if (frame1) {

        cancelAnimationFrame(
          frame1
        );

      }


      if (frame2) {

        cancelAnimationFrame(
          frame2
        );

      }

    };

  }, [
    ready,
    started,
  ]);


  /* =========================================================
     COMPLETE
  ========================================================= */

  const completeIntro =
    useCallback(() => {

      if (
        completedRef.current
      ) {
        return;
      }


      completedRef.current =
        true;


      document.body.classList.remove(
        "vidya-page-intro-active"
      );


      document.body.style.overflow =
        previousOverflowRef.current || "";


      onComplete?.();

    }, [
      onComplete,
    ]);


  /* =========================================================
     SAFETY COMPLETE
  ========================================================= */

  useEffect(() => {

    if (!started) {
      return;
    }


    const timer =
      window.setTimeout(
        completeIntro,
        2600
      );


    return () => {

      window.clearTimeout(
        timer
      );

    };

  }, [
    started,
    completeIntro,
  ]);


  /* =========================================================
     ZOOM END
  ========================================================= */

  const handleZoomEnd =
    useCallback(
      (event) => {

        if (
          event.animationName ===
          "vidyaVideoOpeningZoom"
        ) {

          completeIntro();

        }

      },
      [completeIntro]
    );


  if (
    typeof document ===
    "undefined"
  ) {
    return null;
  }


  /* =========================================================
     SVG DIMENSIONS
  ========================================================= */

  const viewWidth =
    isMobile
      ? 1000
      : 1920;


  const viewHeight =
    isMobile
      ? 1600
      : 1080;


  const centerX =
    viewWidth / 2;


  const centerY =
    viewHeight / 2;


  /* =========================================================
     VIDYA SIZE

     Fixed textLength keeps the word completely stable.
  ========================================================= */

  const textWidth =
    isMobile
      ? 790
      : 1040;


  const fontSize =
    isMobile
      ? 205
      : 270;


  /* =========================================================
     RENDER
  ========================================================= */

  return createPortal(

    <div

      className={[
        "vidya-intro",

        started
          ? "vidya-intro--started"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}

    >

      <svg

        className="vidya-intro-svg"

        viewBox={
          `0 0 ${viewWidth} ${viewHeight}`
        }

        preserveAspectRatio="xMidYMid slice"

        aria-hidden="true"

      >

        <defs>

          <mask

            id={maskId}

            x="0"
            y="0"

            width={viewWidth}
            height={viewHeight}

            maskUnits="userSpaceOnUse"

            maskContentUnits="userSpaceOnUse"

          >

            {/* =================================================
                WHITE SCREEN
            ================================================= */}

            <rect

              x="0"
              y="0"

              width={viewWidth}
              height={viewHeight}

              fill="#ffffff"

            />


            {/* =================================================
                EXACTLY ONE TRANSPARENT OPENING

                NO SECOND D
                NO RECTANGLE
                NO CIRCLE
                NO EXTRA MASK

                THIS IS THE SAME PRINCIPLE AS
                YOUR REFERENCE VIDEO.
            ================================================= */}

            <g

              className="vidya-video-opening"

              onAnimationEnd={
                handleZoomEnd
              }

            >

              <text

                className="vidya-intro-text"

                x={centerX}
                y={centerY}

                textAnchor="middle"

                dominantBaseline="central"

                fill="#000000"

                fontSize={fontSize}

                textLength={textWidth}

                lengthAdjust="spacingAndGlyphs"

              >
                VIDYA
              </text>

            </g>

          </mask>

        </defs>


        {/* =================================================
            WHITE COVER

            Hero video already exists underneath.
        ================================================= */}

        <rect

          className="vidya-white-cover"

          x="0"
          y="0"

          width={viewWidth}
          height={viewHeight}

          fill="#ffffff"

          mask={
            `url(#${maskId})`
          }

        />

      </svg>

    </div>,

    document.body

  );

}


export default IntroReveal;