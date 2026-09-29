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
     DEVICE
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
     STATE
  ========================================================= */

  const [started, setStarted] =
    useState(false);


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
    `vidya-mask-${cleanId}`;


  /* =========================================================
     SVG VALUES
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
     LOCK PAGE
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
     FIND D TRANSPARENT AREA
  ========================================================= */

  useEffect(() => {

    let cancelled =
      false;


    let frame1;
    let frame2;


    const prepare =
      async () => {

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
                    160
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
                    D = character index 2
                  */

                  const dBox =
                    text.getExtentOfChar(
                      2
                    );


                  /*
                    Inside D's thick left stroke.

                    This is the transparent/video area,
                    NOT the white hollow area.
                  */

                  const originX =
                    dBox.x +
                    dBox.width * 0.085;


                  const originY =
                    dBox.y +
                    dBox.height * 0.50;


                  setZoomOrigin({
                    x: originX,
                    y: originY,
                  });

                } catch {

                  setZoomOrigin({

                    x:
                      isMobile
                        ? 452
                        : 872,

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
        2300
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
     COMPLETE AT END OF ZOOM
  ========================================================= */

  const handleZoomEnd =
    useCallback(
      (event) => {

        if (
          event.animationName ===
          "vidyaOpeningZoom"
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

            {/* =============================================
                WHITE SCREEN
            ============================================= */}

            <rect

              x="0"
              y="0"

              width={viewWidth}
              height={viewHeight}

              fill="#ffffff"

            />


            {/* =============================================
                TRANSPARENT VIDYA
            ============================================= */}

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


        {/* ===============================================
            WHITE COVER

            Becomes transparent near beginning
            of zoom and NEVER comes back.
        =============================================== */}

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