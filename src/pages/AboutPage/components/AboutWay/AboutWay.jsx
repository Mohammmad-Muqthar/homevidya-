import {
  useLayoutEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./AboutWay.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   SVG
========================================================= */

const CX = 500;
const CY = 500;


/* =========================================================
   HELPERS
========================================================= */

const polarToCartesian = (
  cx,
  cy,
  radius,
  angle
) => {
  const radians =
    ((angle - 90) * Math.PI) /
    180;


  return {
    x:
      cx +
      radius *
        Math.cos(radians),

    y:
      cy +
      radius *
        Math.sin(radians),
  };
};


const createDonutPath = (
  innerRadius,
  outerRadius,
  startAngle,
  endAngle
) => {
  const outerStart =
    polarToCartesian(
      CX,
      CY,
      outerRadius,
      startAngle
    );


  const outerEnd =
    polarToCartesian(
      CX,
      CY,
      outerRadius,
      endAngle
    );


  const innerEnd =
    polarToCartesian(
      CX,
      CY,
      innerRadius,
      endAngle
    );


  const innerStart =
    polarToCartesian(
      CX,
      CY,
      innerRadius,
      startAngle
    );


  const difference =
    (
      (
        (
          endAngle -
          startAngle
        ) %
        360
      ) +
      360
    ) %
    360;


  const largeArcFlag =
    difference > 180
      ? 1
      : 0;


  return `
    M ${outerStart.x} ${outerStart.y}
    A ${outerRadius} ${outerRadius}
    0 ${largeArcFlag} 1
    ${outerEnd.x} ${outerEnd.y}

    L ${innerEnd.x} ${innerEnd.y}

    A ${innerRadius} ${innerRadius}
    0 ${largeArcFlag} 0
    ${innerStart.x} ${innerStart.y}

    Z
  `;
};


const createTextArc = (
  radius,
  startAngle,
  endAngle,
  manualReverse = false
) => {
  const middle =
    (
      startAngle +
      endAngle
    ) /
    2;


  const normalized =
    (
      middle +
      360
    ) %
    360;


  /*
    Reverse bottom/left text
    so it stays readable.
  */

  const autoReverse =
    normalized >
      90 &&
    normalized <
      270;


  const reverse =
    manualReverse ||
    autoReverse;


  const difference =
    Math.abs(
      endAngle -
      startAngle
    );


  const largeArcFlag =
    difference > 180
      ? 1
      : 0;


  if (
    reverse
  ) {
    const start =
      polarToCartesian(
        CX,
        CY,
        radius,
        endAngle
      );


    const end =
      polarToCartesian(
        CX,
        CY,
        radius,
        startAngle
      );


    return `
      M ${start.x} ${start.y}
      A ${radius} ${radius}
      0 ${largeArcFlag} 0
      ${end.x} ${end.y}
    `;
  }


  const start =
    polarToCartesian(
      CX,
      CY,
      radius,
      startAngle
    );


  const end =
    polarToCartesian(
      CX,
      CY,
      radius,
      endAngle
    );


  return `
    M ${start.x} ${start.y}
    A ${radius} ${radius}
    0 ${largeArcFlag} 1
    ${end.x} ${end.y}
  `;
};


const CurvedText = ({
  id,
  radius,
  start,
  end,
  className,
  children,
  reverse = false,
  dy = 0,
}) => {
  return (
    <>
      <path
        id={id}

        d={createTextArc(
          radius,
          start,
          end,
          reverse
        )}

        className="about-way-text-guide"
      />


      <text
        className={className}

        dy={dy}
      >
        <textPath
          href={`#${id}`}

          startOffset="50%"

          textAnchor="middle"
        >
          {children}
        </textPath>
      </text>
    </>
  );
};


/* =========================================================
   OUTER RING

   Everything is now inside a segment.

   No floating outer text.
   No small radial tick lines.
========================================================= */

const outerRing = [
  {
    id:
      "curriculum",

    label:
      "COMPREHENSIVE CURRICULUM",

    start:
      -44,

    end:
      44,
  },

  {
    id:
      "community",

    label:
      "LEADERSHIP • COMMUNITY",

    start:
      46,

    end:
      134,
  },

  {
    id:
      "experiences",

    label:
      "ARTS • SPORT • SERVICE",

    start:
      136,

    end:
      224,
  },

  {
    id:
      "connection",

    label:
      "INQUIRY • CONNECTION",

    start:
      226,

    end:
      314,
  },
];


/* =========================================================
   CONCEPT RING
========================================================= */

const conceptRing = [
  {
    id:
      "key-concepts",

    label:
      "KEY CONCEPTS",

    start:
      -44,

    end:
      44,
  },

  {
    id:
      "skills",

    label:
      "SKILLS / COMMAND TERMS",

    start:
      46,

    end:
      134,
  },

  {
    id:
      "attitudes",

    label:
      "ATTITUDES",

    start:
      136,

    end:
      224,
  },

  {
    id:
      "action",

    label:
      "ACTION / IMPACT",

    start:
      226,

    end:
      314,
  },
];


/* =========================================================
   EXPERIENCE RING
========================================================= */

const experienceRing = [
  {
    id:
      "awaken",

    title:
      "AWAKEN",

    subtitle:
      "DISCOVERY • WONDER",

    start:
      -42,

    end:
      42,
  },

  {
    id:
      "extended",

    title:
      "EXTENDED ESSAY",

    subtitle:
      "VOICE • CHOICE",

    start:
      48,

    end:
      132,
  },

  {
    id:
      "exhibition",

    title:
      "PYP EXHIBITION",

    subtitle:
      "EXPERIENCE • REFLECTION",

    start:
      138,

    end:
      222,
  },

  {
    id:
      "personal",

    title:
      "PERSONAL PROJECT",

    subtitle:
      "INQUIRY • CURIOSITY",

    start:
      228,

    end:
      312,
  },
];


/* =========================================================
   LEARNER DIMENSIONS
========================================================= */

const learnerDimensions = [
  {
    id:
      "physical",

    label:
      "PHYSICAL",

    start:
      -34,

    end:
      34,
  },

  {
    id:
      "social",

    label:
      "SOCIAL",

    start:
      38,

    end:
      106,
  },

  {
    id:
      "mental",

    label:
      "MENTAL",

    start:
      110,

    end:
      178,
  },

  {
    id:
      "emotional",

    label:
      "EMOTIONAL",

    start:
      182,

    end:
      250,
  },

  {
    id:
      "cognitive",

    label:
      "COGNITIVE",

    start:
      254,

    end:
      322,
  },
];


/* =========================================================
   COMPONENT
========================================================= */

const AboutWay = () => {
  const sectionRef =
    useRef(null);

  const headerRef =
    useRef(null);

  const wheelRef =
    useRef(null);


  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const header =
      headerRef.current;

    const wheel =
      wheelRef.current;


    if (
      !section ||
      !header ||
      !wheel
    ) {
      return;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(() => {

        /* =====================================================
           HEADER
        ===================================================== */

        const headerItems =
          header.querySelectorAll(
            "[data-way-header]"
          );


        gsap.fromTo(
          headerItems,

          {
            opacity:
              0,

            y:
              24,
          },

          {
            opacity:
              1,

            y:
              0,

            duration:
              0.8,

            stagger:
              0.06,

            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                header,

              start:
                "top 84%",

              once:
                true,
            },
          }
        );


        /* =====================================================
           WHEEL
        ===================================================== */

        gsap.fromTo(
          wheel,

          {
            opacity:
              0,

            y:
              48,

            scale:
              0.975,
          },

          {
            opacity:
              1,

            y:
              0,

            scale:
              1,

            duration:
              1,

            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                wheel,

              start:
                "top 88%",

              once:
                true,
            },
          }
        );


        /* =====================================================
           RINGS
        ===================================================== */

        const parts =
          wheel.querySelectorAll(
            "[data-wheel-part]"
          );


        gsap.fromTo(
          parts,

          {
            opacity:
              0,
          },

          {
            opacity:
              1,

            duration:
              0.55,

            stagger:
              0.035,

            ease:
              "power2.out",

            scrollTrigger: {
              trigger:
                wheel,

              start:
                "top 82%",

              once:
                true,
            },
          }
        );


        /* =====================================================
           DESKTOP DEPTH
        ===================================================== */

        mm.add(
          "(min-width: 769px)",

          () => {
            const tween =
              gsap.fromTo(
                wheel,

                {
                  yPercent:
                    1,
                },

                {
                  yPercent:
                    -2,

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
                      0.7,
                  },
                }
              );


            return () => {
              tween.kill();
            };
          }
        );

      }, section);


    /* =====================================================
       REFRESH
    ===================================================== */

    let resizeTimer;

    let previousWidth =
      window.innerWidth;


    const refresh =
      () => {
        ScrollTrigger.refresh();
      };


    const handleResize =
      () => {
        const currentWidth =
          window.innerWidth;


        /*
          Ignore browser address bar
          height-only changes on mobile.
        */

        if (
          Math.abs(
            currentWidth -
            previousWidth
          ) <
          3
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
        passive:
          true,
      }
    );


    requestAnimationFrame(
      () => {
        requestAnimationFrame(
          refresh
        );
      }
    );


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

      className="about-way"
    >

      <div className="about-way-inner">

        {/* =================================================
            HEADER

            SMALL "HOW WE LEARN" REMOVED
        ================================================= */}

        <header
          ref={headerRef}

          className="about-way-header"
        >

          <h2
            className="about-way-title"

            data-way-header
          >

            <span className="about-way-title-main">
              The Vidya
            </span>

            {" "}

            <span className="about-way-title-accent">
              Way.
            </span>

          </h2>


          <p
            className="about-way-intro"

            data-way-header
          >
            A connected learning framework
            designed around curiosity,
            confidence, character and
            meaningful experiences.
          </p>

        </header>


        {/* =================================================
            WHEEL SHELL

            Keeps mobile wheel centred without
            CSS transforms interfering with GSAP.
        ================================================= */}

        <div className="about-way-wheel-shell">

          <div
            ref={wheelRef}

            className="about-way-wheel"
          >

            <svg
              className="about-way-wheel-svg"

              viewBox="0 0 1000 1000"

              role="img"

              aria-label="The Vidya Way learning framework"
            >

              <defs>

                <clipPath id="vidya-way-main-clip">

                  <circle
                    cx="500"
                    cy="500"
                    r="444"
                  />

                </clipPath>

              </defs>


              {/* =================================================
                  BASE
              ================================================= */}

              <circle
                cx="500"
                cy="500"
                r="444"

                className="about-way-svg-base"
              />


              <circle
                cx="500"
                cy="500"
                r="444"

                className="about-way-svg-border"
              />


              <g
                clipPath="url(#vidya-way-main-clip)"
              >

                {/* =================================================
                    OUTERMOST BAND

                    No separate divider/tick lines.
                ================================================= */}

                <g data-wheel-part>

                  {outerRing.map(
                    (
                      item,
                      index
                    ) => (

                      <g
                        key={
                          item.id
                        }
                      >

                        <path
                          d={createDonutPath(
                            400,
                            440,
                            item.start,
                            item.end
                          )}

                          className={`
                            about-way-outer-segment
                            about-way-outer-segment--${index + 1}
                          `}
                        />


                        <CurvedText
                          id={`outer-${item.id}`}

                          radius={
                            421
                          }

                          start={
                            item.start +
                            8
                          }

                          end={
                            item.end -
                            8
                          }

                          className="about-way-outer-label"
                        >
                          {item.label}
                        </CurvedText>

                      </g>

                    )
                  )}

                </g>


                {/* =================================================
                    CONCEPT BAND
                ================================================= */}

                <g data-wheel-part>

                  {conceptRing.map(
                    (
                      item,
                      index
                    ) => (

                      <g
                        key={
                          item.id
                        }
                      >

                        <path
                          d={createDonutPath(
                            337,
                            392,
                            item.start,
                            item.end
                          )}

                          className={`
                            about-way-concept-segment
                            about-way-concept-segment--${index + 1}
                          `}
                        />


                        <CurvedText
                          id={`concept-${item.id}`}

                          radius={
                            365
                          }

                          start={
                            item.start +
                            10
                          }

                          end={
                            item.end -
                            10
                          }

                          className="about-way-concept-label"
                        >
                          {item.label}
                        </CurvedText>

                      </g>

                    )
                  )}

                </g>


                {/* =================================================
                    EXPERIENCE BAND
                ================================================= */}

                <g data-wheel-part>

                  {experienceRing.map(
                    (
                      item,
                      index
                    ) => (

                      <g
                        key={
                          item.id
                        }
                      >

                        <path
                          d={createDonutPath(
                            248,
                            327,
                            item.start,
                            item.end
                          )}

                          className={`
                            about-way-experience-segment
                            about-way-experience-segment--${index + 1}
                          `}
                        />


                        <CurvedText
                          id={`experience-${item.id}`}

                          radius={
                            299
                          }

                          start={
                            item.start +
                            12
                          }

                          end={
                            item.end -
                            12
                          }

                          className="about-way-experience-title"
                        >
                          {item.title}
                        </CurvedText>


                        <CurvedText
                          id={`experience-sub-${item.id}`}

                          radius={
                            272
                          }

                          start={
                            item.start +
                            16
                          }

                          end={
                            item.end -
                            16
                          }

                          className="about-way-experience-subtitle"
                        >
                          {item.subtitle}
                        </CurvedText>

                      </g>

                    )
                  )}

                </g>


                {/* =================================================
                    LEARNER DIMENSIONS
                ================================================= */}

                <g data-wheel-part>

                  {learnerDimensions.map(
                    (
                      item,
                      index
                    ) => (

                      <g
                        key={
                          item.id
                        }
                      >

                        <path
                          d={createDonutPath(
                            135,
                            237,
                            item.start,
                            item.end
                          )}

                          className={`
                            about-way-dimension-segment
                            about-way-dimension-segment--${index + 1}
                          `}
                        />


                        <CurvedText
                          id={`dimension-${item.id}`}

                          radius={
                            187
                          }

                          start={
                            item.start +
                            9
                          }

                          end={
                            item.end -
                            9
                          }

                          className="about-way-dimension-label"
                        >
                          {item.label}
                        </CurvedText>

                      </g>

                    )
                  )}

                </g>


                {/* =================================================
                    CENTRE
                ================================================= */}

                <g data-wheel-part>

                  <circle
                    cx="500"
                    cy="500"
                    r="127"

                    className="about-way-centre-outer"
                  />


                  <circle
                    cx="500"
                    cy="500"
                    r="106"

                    className="about-way-centre-inner"
                  />


                  <text
                    x="500"
                    y="449"

                    textAnchor="middle"

                    className="about-way-centre-eyebrow"
                  >
                    VIDYA'S MISSION
                  </text>


                  <text
                    x="500"
                    y="479"

                    textAnchor="middle"

                    className="about-way-centre-value"
                  >
                    CURIOUS
                  </text>


                  <text
                    x="500"
                    y="503"

                    textAnchor="middle"

                    className="about-way-centre-value"
                  >
                    CONFIDENT
                  </text>


                  <text
                    x="500"
                    y="527"

                    textAnchor="middle"

                    className="about-way-centre-value"
                  >
                    CREATIVE
                  </text>


                  <text
                    x="500"
                    y="560"

                    textAnchor="middle"

                    className="about-way-centre-main"
                  >
                    LEARNER
                  </text>


                  <text
                    x="500"
                    y="584"

                    textAnchor="middle"

                    className="about-way-centre-eyebrow"
                  >
                    CHARACTER • PURPOSE
                  </text>

                </g>

              </g>

            </svg>

          </div>

        </div>

      </div>

    </section>
  );
};


export default AboutWay;