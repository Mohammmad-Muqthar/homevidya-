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

   2 SECOND HOLD
   SLOW SMOOTH ZOOM
   SOFT WHITE TRANSITION
   TRANSPARENT END
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

  const [started, setStarted] =
    useState(false);

  const [finished, setFinished] =
    useState(false);

  /* =========================================================
     REFS
  ========================================================= */

  const completedRef =
    useRef(false);

  const previousOverflowRef =
    useRef("");

  /* =========================================================
     SVG IDS
  ========================================================= */

  const reactId = useId();

  const cleanId =
    reactId.replace(/:/g, "");

  const maskId =
    `vidya-intro-mask-${cleanId}`;

  const blackFilterId =
    `vidya-black-filter-${cleanId}`;

  /* =========================================================
     SVG SIZE
  ========================================================= */

  const viewWidth =
    isMobile ? 1000 : 1920;

  const viewHeight =
    isMobile ? 1600 : 1080;

  const centerX =
    viewWidth / 2;

  const centerY =
    viewHeight / 2;

  /* =========================================================
     LOGO SIZE
  ========================================================= */

  const logoWidth =
    isMobile ? 320 : 430;

  const logoHeight =
    isMobile ? 344 : 463;

  const logoX =
    centerX - logoWidth / 2;

  const logoY =
    centerY - logoHeight / 2;

  /* =========================================================
     ZOOM ORIGIN

     Zoom toward upper transparent
     part of the logo.
  ========================================================= */

  const zoomOriginX =
    centerX;

  const zoomOriginY =
    logoY + logoHeight * 0.23;

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
        previousOverflowRef.current || "";

      document.body.classList.remove(
        "vidya-page-intro-active"
      );
    };
  }, []);

  /* =========================================================
     START INTRO
  ========================================================= */

  useEffect(() => {
    if (started) {
      return;
    }

    let cancelled = false;
    let fallbackTimer;
    let frame1;
    let frame2;

    const startIntro = () => {
      if (cancelled) {
        return;
      }

      frame1 =
        requestAnimationFrame(() => {
          frame2 =
            requestAnimationFrame(() => {
              if (!cancelled) {
                setStarted(true);
              }
            });
        });
    };

    if (ready) {
      startIntro();
    } else {
      fallbackTimer =
        window.setTimeout(
          startIntro,
          160
        );
    }

    return () => {
      cancelled = true;

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
  ]);

  /* =========================================================
     COMPLETE INTRO
  ========================================================= */

  const completeIntro =
    useCallback(() => {
      if (completedRef.current) {
        return;
      }

      completedRef.current = true;

      document.body.classList.remove(
        "vidya-page-intro-active"
      );

      document.body.style.overflow =
        previousOverflowRef.current || "";

      setFinished(true);

      onComplete?.();
    }, [
      onComplete,
    ]);

  /* =========================================================
     SAFETY TIMER
  ========================================================= */

  useEffect(() => {
    if (!started) {
      return;
    }

    const timer =
      window.setTimeout(
        completeIntro,
        isMobile
          ? 5600
          : 6000
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [
    started,
    isMobile,
    completeIntro,
  ]);

  /* =========================================================
     FINISH AFTER ZOOM
  ========================================================= */

  const handleZoomEnd =
    useCallback(
      (event) => {
        if (
          event.animationName ===
            "vidyaLogoZoomDesktop" ||
          event.animationName ===
            "vidyaLogoZoomMobile"
        ) {
          completeIntro();
        }
      },
      [
        completeIntro,
      ]
    );

  /* =========================================================
     SSR / FINISHED
  ========================================================= */

  if (
    typeof document === "undefined" ||
    finished
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

          {/* =================================================
              LOGO -> BLACK MASK

              Black = transparent opening
          ================================================= */}

          <filter
            id={blackFilterId}

            x="-50%"
            y="-50%"

            width="200%"
            height="200%"

            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix
              type="matrix"

              values="
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 1 0
              "
            />
          </filter>

          {/* =================================================
              MASK
          ================================================= */}

          <mask
            id={maskId}

            x="0"
            y="0"

            width={viewWidth}
            height={viewHeight}

            maskUnits="userSpaceOnUse"

            maskContentUnits="userSpaceOnUse"

            style={{
              maskType: "luminance",
            }}
          >
            <rect
              x="0"
              y="0"

              width={viewWidth}
              height={viewHeight}

              fill="#ffffff"
            />

            <g
              className="vidya-logo-opening"

              style={{
                transformOrigin:
                  `${zoomOriginX}px ${zoomOriginY}px`,
              }}

              onAnimationEnd={
                handleZoomEnd
              }
            >
              <image
                href="/images/vidya-logo-transparent.png"

                x={logoX}
                y={logoY}

                width={logoWidth}
                height={logoHeight}

                preserveAspectRatio="xMidYMid meet"

                filter={
                  `url(#${blackFilterId})`
                }
              />
            </g>

          </mask>

        </defs>

        {/* =================================================
            WHITE INTRO COVER
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