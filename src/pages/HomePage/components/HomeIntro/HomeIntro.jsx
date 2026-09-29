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

  /* =========================================================
     MOBILE
  ========================================================= */

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


  /* =========================================================
     INTRO STATE
  ========================================================= */

  const [started, setStarted] =
    useState(false);


  /*
    Exact zoom origin inside the left solid stroke
    of the D.

    Null until SVG text is measured.
  */

  const [zoomOrigin, setZoomOrigin] =
    useState(null);


  /* =========================================================
     REFS
  ========================================================= */

  const wordRef =
    useRef(null);


  const completedRef =
    useRef(false);


  const previousOverflowRef =
    useRef("");


  /* =========================================================
     UNIQUE MASK
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


  const textWidth =
    isMobile
      ? 790
      : 1040;


  const fontSize =
    isMobile
      ? 205
      : 270;


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
     PREPARE + MEASURE D

     Important:

     Character indexes:

     V = 0
     I = 1
     D = 2
     Y = 3
     A = 4

     We measure the actual rendered D.

     Then choose a point only 9% inside its width.

     That puts the transform origin inside the
     thick LEFT vertical stroke of D.

     NOT in D's white hollow centre.
  ========================================================= */

  useEffect(() => {

    let cancelled =
      false;


    let frame1;
    let frame2;


    const prepare =
      async () => {

        /* ---------------------------------------------
           WAIT FOR MANROPE
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
            // continue with fallback
          }

        }


        if (cancelled) {
          return;
        }


        /* ---------------------------------------------
           ALLOW SVG TEXT TO LAYOUT
        --------------------------------------------- */

        frame1 =
          requestAnimationFrame(() => {

            frame2 =
              requestAnimationFrame(() => {

                if (cancelled) {
                  return;
                }


                const text =
                  wordRef.current;


                if (!text) {
                  return;
                }


                try {

                  /*
                    Real rendered bounding box of D.
                  */

                  const dBox =
                    text.getExtentOfChar(
                      2
                    );


                  /*
                    LEFT STEM OF D.

                    9% into D width:
                    safely inside black glyph stroke.

                    50% vertically:
                    middle of D's strong left stroke.
                  */

                  const originX =
                    dBox.x +
                    dBox.width * 0.09;


                  const originY =
                    dBox.y +
                    dBox.height * 0.50;


                  setZoomOrigin({
                    x: originX,
                    y: originY,
                  });

                } catch {

                  /*
                    Fallback tuned for VIDYA.

                    Still positioned LEFT of D's
                    hollow centre.
                  */

                  setZoomOrigin({

                    x:
                      isMobile
                        ? 456
                        : 878,

                    y:
                      centerY,

                  });

                }

              });

          });

      };


    prepare();


    return () => {

      cancelled =
        true;


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
    centerY,
    isMobile,
  ]);


  /* =========================================================
     START

     Start only after:
     - D origin exists
     - Hero is ready

     There is still a small fallback if Hero takes too long.
  ========================================================= */

  useEffect(() => {

    if (
      started ||
      !zoomOrigin
    ) {
      return;
    }


    let cancelled =
      false;


    let fallbackTimer;

    let frame1;
    let frame2;


    const start =
      () => {

        if (cancelled) {
          return;
        }


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


    if (ready) {

      start();

    } else {

      fallbackTimer =
        window.setTimeout(
          start,
          400
        );

    }


    return () => {

      cancelled =
        true;


      if (fallbackTimer) {

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
    zoomOrigin,
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
        2200
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
     ZOOM FINISHED
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
                WHITE BACKGROUND
            ================================================= */}

            <rect

              x="0"
              y="0"

              width={viewWidth}
              height={viewHeight}

              fill="#ffffff"

            />


            {/* =================================================
                ONE SINGLE VIDYA OPENING

                No box.
                No circle.
                No extra D.
                No second mask.

                Only the real VIDYA text zooms.
            ================================================= */}

            <g

              className="vidya-video-opening"

              style={{

                transformOrigin:
                  zoomOrigin
                    ? `${zoomOrigin.x}px ${zoomOrigin.y}px`
                    : "50% 50%",

              }}

              onAnimationEnd={
                handleZoomEnd
              }

            >

              <text

                ref={wordRef}

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

            Real Hero video sits underneath.
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