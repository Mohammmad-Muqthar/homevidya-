import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import "./HomeIntro.css";

/* =========================================================
   VIDYA ACADEMY HOME INTRO
========================================================= */

export default function IntroReveal({
  ready = false,
  onComplete,
}) {
  /* =========================================================
     DEVICE
  ========================================================= */

  const [isMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(
      "(max-width: 768px)"
    ).matches;
  });

  /* =========================================================
     STATE
  ========================================================= */

  const [started, setStarted] = useState(false);

  const [zoomOrigin, setZoomOrigin] = useState(null);

  /* =========================================================
     REFS
  ========================================================= */

  const wordRef = useRef(null);

  const completedRef = useRef(false);

  const previousOverflowRef = useRef("");

  /* =========================================================
     UNIQUE SVG MASK
  ========================================================= */

  const reactId = useId();

  const cleanId = reactId.replace(/:/g, "");

  const maskId = `vidya-mask-${cleanId}`;

  /* =========================================================
     SVG DIMENSIONS
  ========================================================= */

  const viewWidth = isMobile ? 1000 : 1920;

  const viewHeight = isMobile ? 1600 : 1080;

  const centerX = viewWidth / 2;

  const centerY = viewHeight / 2;

  const textWidth = isMobile ? 790 : 1040;

  const fontSize = isMobile ? 205 : 270;

  /* =========================================================
     PAGE LOCK
  ========================================================= */

  useEffect(() => {
    previousOverflowRef.current =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

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
     FIND ZOOM ORIGIN

     CHANGED:
     ZOOM TOWARDS THE WHITE SPACE
     BETWEEN I AND D
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    let frame1;
    let frame2;

    const prepare = async () => {
      if (document.fonts?.load) {
        try {
          await Promise.race([
            document.fonts.load(
              '800 270px "Manrope"'
            ),

            new Promise((resolve) => {
              window.setTimeout(resolve, 120);
            }),
          ]);
        } catch {
          // Continue with available font.
        }
      }

      if (cancelled) {
        return;
      }

      frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          if (cancelled) {
            return;
          }

          const text = wordRef.current;

          if (!text) {
            return;
          }

          try {
            /*
              VIDYA CHARACTER INDEXES

              V = 0
              I = 1
              D = 2

              Calculate the white gap between
              I and D using the rendered font.
            */

            const iBox = text.getExtentOfChar(1);

            const dBox = text.getExtentOfChar(2);

            const gapStart =
              iBox.x + iBox.width;

            const gapEnd = dBox.x;

            let originX;

            if (gapEnd > gapStart) {
              originX =
                (gapStart + gapEnd) / 2;
            } else {
              /*
                Fallback for fonts where SVG
                includes character spacing
                inside the measured boxes.
              */

              const characterDistance =
                Math.abs(dBox.x - iBox.x);

              originX =
                dBox.x -
                Math.min(
                  fontSize * 0.07,
                  characterDistance * 0.25
                );
            }

            const originY =
              dBox.y + dBox.height * 0.5;

            setZoomOrigin({
              x: originX,
              y: originY,
            });
          } catch {
            /*
              Fallback if character
              measurements are unavailable.
            */

            setZoomOrigin({
              x: isMobile ? 410 : 780,
              y: centerY,
            });
          }
        });
      });
    };

    prepare();

    return () => {
      cancelled = true;

      if (frame1) {
        cancelAnimationFrame(frame1);
      }

      if (frame2) {
        cancelAnimationFrame(frame2);
      }
    };
  }, [
    centerY,
    fontSize,
    isMobile,
  ]);

  /* =========================================================
     START INTRO

     INITIAL HOLD IS CONTROLLED BY CSS
  ========================================================= */

  useEffect(() => {
    if (started || !zoomOrigin) {
      return;
    }

    let cancelled = false;

    let fallbackTimer;

    let frame1;
    let frame2;

    const start = () => {
      if (cancelled) {
        return;
      }

      frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          if (!cancelled) {
            setStarted(true);
          }
        });
      });
    };

    if (ready) {
      start();
    } else {
      fallbackTimer = window.setTimeout(
        start,
        250
      );
    }

    return () => {
      cancelled = true;

      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }

      if (frame1) {
        cancelAnimationFrame(frame1);
      }

      if (frame2) {
        cancelAnimationFrame(frame2);
      }
    };
  }, [
    ready,
    started,
    zoomOrigin,
  ]);

  /* =========================================================
     COMPLETE INTRO
  ========================================================= */

  const completeIntro = useCallback(() => {
    if (completedRef.current) {
      return;
    }

    completedRef.current = true;

    document.body.classList.remove(
      "vidya-page-intro-active"
    );

    document.body.style.overflow =
      previousOverflowRef.current || "";

    onComplete?.();
  }, [onComplete]);

  /* =========================================================
     SAFETY COMPLETION

     DESKTOP:
     1.05 SECOND HOLD
     2.25 SECOND ZOOM

     MOBILE:
     0.85 SECOND HOLD
     1.95 SECOND ZOOM
  ========================================================= */

  useEffect(() => {
    if (!started) {
      return;
    }

    const timer = window.setTimeout(
      completeIntro,
      isMobile ? 3800 : 4300
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    started,
    completeIntro,
    isMobile,
  ]);

  /* =========================================================
     COMPLETE WHEN ZOOM FINISHES
  ========================================================= */

  const handleZoomEnd = useCallback(
    (event) => {
      if (
        event.animationName ===
          "vidyaOpeningZoom" ||
        event.animationName ===
          "vidyaOpeningZoomMobile"
      ) {
        completeIntro();
      }
    },
    [completeIntro]
  );

  /* =========================================================
     SSR
  ========================================================= */

  if (typeof document === "undefined") {
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
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* ===============================================
              TRANSPARENCY MASK
          =============================================== */}

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

                ZOOM ORIGIN:
                WHITE GAP BETWEEN I AND D
            ============================================= */}

            <g
              className="vidya-video-opening"
              style={{
                transformOrigin: zoomOrigin
                  ? `${zoomOrigin.x}px ${zoomOrigin.y}px`
                  : "50% 50%",
              }}
              onAnimationEnd={handleZoomEnd}
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

            FADES COMPLETELY BEFORE
            THE FINAL PART OF THE ZOOM
        =============================================== */}

        <rect
          className="vidya-white-cover"
          x="0"
          y="0"
          width={viewWidth}
          height={viewHeight}
          fill="#ffffff"
          mask={`url(#${maskId})`}
        />
      </svg>
    </div>,
    document.body
  );
}