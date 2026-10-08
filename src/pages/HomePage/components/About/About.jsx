import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./About.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   GALLERY DATA
========================================================= */

const galleryImages = [
  {
    id: "01",
    badge: "LEARN",
    image:
      "https://volzero.com/volzero/public/img/article/102576_44670.jpg",
    fallback:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=90",
    alt:
      "Indian school open veranda and corridor overlooking a landscaped courtyard",
  },

  {
    id: "02",
    badge: "EXPLORE",
    image:
      "https://vivekanandschooldharuhera.com/upload/gallery_images/697b375d83c61-1aeeb0ee-bf26-45ba-bd0e-5166197a1be7.jpg",
    fallback:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=90",
    alt:
      "Indian school covered veranda opening into a green landscaped courtyard",
  },

  {
    id: "03",
    badge: "GROW",
    image:
      "https://static.wixstatic.com/media/78b34a_a65467ed0859454ab347cb9e98d774f0~mv2.jpg/v1/fill/w_1200%2Ch_746%2Cq_90/78b34a_a65467ed0859454ab347cb9e98d774f0~mv2.jpg",
    fallback:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1800&q=90",
    alt:
      "Indian school campus corridor with columns, courtyard and greenery",
  },
];

/* =========================================================
   CURVES
========================================================= */

const curveLevels = [
  { inset: -120, apex: 8 },
  { inset: -82, apex: 42 },
  { inset: -44, apex: 76 },
  { inset: -6, apex: 110 },

  { inset: 32, apex: 144 },
  { inset: 70, apex: 178 },
  { inset: 108, apex: 212 },
  { inset: 146, apex: 246 },

  { inset: 184, apex: 280 },
  { inset: 222, apex: 314 },
  { inset: 260, apex: 348 },
  { inset: 298, apex: 382 },

  { inset: 336, apex: 416 },
  { inset: 374, apex: 450 },
  { inset: 412, apex: 484 },
  { inset: 450, apex: 518 },

  { inset: 488, apex: 552 },
  { inset: 526, apex: 586 },
  { inset: 564, apex: 620 },
  { inset: 602, apex: 654 },

  { inset: 640, apex: 688 },
  { inset: 678, apex: 722 },
];

const buildReverseUPath = (inset, apex) => {
  const left = inset;
  const right = 1600 - inset;
  const center = 800;
  const bottom = 1000;

  const shoulder = Math.min(
    850,
    Math.max(apex + 185, 220)
  );

  const innerControl = Math.max(
    80,
    (right - left) * 0.19
  );

  return `
    M ${left} ${bottom}

    C
      ${left}
      ${shoulder}

      ${center - innerControl}
      ${apex}

      ${center}
      ${apex}

    C
      ${center + innerControl}
      ${apex}

      ${right}
      ${shoulder}

      ${right}
      ${bottom}
  `;
};

const secondaryCurveLevels = curveLevels
  .slice(0, -1)
  .map((current, index) => {
    const next = curveLevels[index + 1];

    return {
      inset:
        (current.inset + next.inset) / 2,

      apex:
        (current.apex + next.apex) / 2,
    };
  });

/* =========================================================
   CURVE COMPONENT
========================================================= */

function AboutCurveLines() {
  return (
    <svg
      className="vidya-about-curves"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g className="vidya-about-curves-main">
        {curveLevels.map((curve, index) => (
          <path
            key={`main-${index}`}
            d={buildReverseUPath(
              curve.inset,
              curve.apex
            )}
          />
        ))}
      </g>

      <g className="vidya-about-curves-secondary">
        {secondaryCurveLevels.map(
          (curve, index) => (
            <path
              key={`secondary-${index}`}
              d={buildReverseUPath(
                curve.inset,
                curve.apex
              )}
            />
          )
        )}
      </g>
    </svg>
  );
}

/* =========================================================
   ABOUT
========================================================= */

const About = () => {
  const sectionRef = useRef(null);
  const storyRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const story = storyRef.current;

    if (!section || !story) return;

    const ctx = gsap.context(() => {
      /* =====================================================
         INTRO CONTENT REVEAL
      ===================================================== */

      const introItems =
        section.querySelectorAll(
          [
            ".vidya-about-intro-title",
            ".vidya-about-intro-divider",
            ".vidya-about-intro-copy",
            ".vidya-about-intro-values",
          ].join(",")
        );

      gsap.fromTo(
        introItems,
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      /* =====================================================
         GALLERY SLIDE OVER EFFECT
         
         The GREEN gallery block rises over the cream
         philosophy section.
      ===================================================== */

      gsap.fromTo(
        story,
        {
          y: 130,
        },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: story,
            start: "top bottom",
            end: "top 55%",
            scrub: 1,
          },
        }
      );

      /* =====================================================
         IMAGE PARALLAX

         IMPORTANT:
         Only the IMAGE moves.
         The card does NOT move.

         Small movement prevents the image from disappearing.
      ===================================================== */

      const cards =
        story.querySelectorAll(
          ".vidya-about-gallery-card"
        );

      cards.forEach((card) => {
        const image =
          card.querySelector(
            ".vidya-about-gallery-image"
          );

        const badge =
          card.querySelector(
            ".vidya-about-gallery-badge"
          );

        if (!image) return;

        gsap.fromTo(
          image,
          {
            yPercent: -5,
            scale: 1.055,
          },
          {
            yPercent: 5,
            scale: 1.035,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          }
        );

        /* Badge has a very small independent movement */

        if (badge) {
          gsap.fromTo(
            badge,
            {
              y: -6,
            },
            {
              y: 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.3,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      /* =====================================================
         CURVE PARALLAX
      ===================================================== */

      const curves =
        story.querySelector(
          ".vidya-about-curves"
        );

      if (curves) {
        gsap.fromTo(
          curves,
          {
            yPercent: 3,
          },
          {
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: story,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }
    }, section);

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener(
      "resize",
      refresh
    );

    requestAnimationFrame(refresh);

    return () => {
      window.removeEventListener(
        "resize",
        refresh
      );

      ctx.revert();
    };
  }, []);

  /* =========================================================
     IMAGE FALLBACK
  ========================================================= */

  const handleImageError = (
    event,
    fallback
  ) => {
    const image = event.currentTarget;

    if (
      image.dataset.fallbackUsed === "true"
    ) {
      image.style.display = "none";
      return;
    }

    image.dataset.fallbackUsed = "true";

    image.src = fallback;
  };

  return (
    <section
      ref={sectionRef}
      className="vidya-about"
      id="about"
    >
      <div className="vidya-about-stage">

        {/* =================================================
            PHILOSOPHY
        ================================================= */}

        <div className="vidya-about-intro">

          <div className="vidya-about-intro-inner">

            {/* LEFT */}
            <div className="vidya-about-intro-heading">

              <h2 className="vidya-about-intro-title">

                <span className="vidya-about-title-dark">
                  Our Learning
                </span>

                <span className="vidya-about-title-light">
                  Philosophy.
                </span>

              </h2>

              <div className="vidya-about-intro-divider" />

            </div>

            {/* RIGHT */}
            <div className="vidya-about-intro-content">

              <div className="vidya-about-intro-copy">

                <p className="vidya-about-copy-lead">
                  At Vidya Academy, learning goes beyond
                  the classroom. Every child is encouraged
                  to explore ideas with curiosity and
                  confidence through meaningful discussions,
                  practical activities, creative experiences
                  and collaborative learning.
                </p>

                <p className="vidya-about-intro-extra">
                  We believe children learn best when they
                  are actively involved in the process.
                  Our learning environment encourages
                  students to ask questions, communicate
                  their ideas, work with others and discover
                  different ways of approaching a challenge.
                </p>

                <p className="vidya-about-intro-extra">
                  Alongside academic learning, students are
                  encouraged to become thoughtful,
                  independent and confident learners.
                  Each experience helps them connect
                  knowledge with everyday life, develop
                  their own perspective and continue
                  growing with purpose.
                </p>

                <p className="vidya-about-desktop-extra">
                  Our approach also creates opportunities for
                  children to reflect on what they learn,
                  understand their individual strengths and
                  apply their knowledge with confidence.
                  Through consistent guidance and purposeful
                  experiences, students develop the habits,
                  resilience and awareness needed to become
                  capable learners prepared for the world
                  beyond the classroom.
                </p>

              </div>

              <div className="vidya-about-intro-values">

                <span>LEARN</span>

                <i />

                <span>EXPLORE</span>

                <i />

                <span>GROW</span>

              </div>

            </div>
          </div>
        </div>

        {/* =================================================
            GALLERY THAT SLIDES OVER THE ABOVE SECTION
        ================================================= */}

        <div
          ref={storyRef}
          className="vidya-about-story"
        >

          <div
            className="vidya-about-green-lines"
            aria-hidden="true"
          >
            <AboutCurveLines />
          </div>

          <div className="vidya-about-gallery">

            {galleryImages.map(
              (item, index) => (
                <article
                  key={item.id}
                  className={`
                    vidya-about-gallery-card
                    vidya-about-gallery-card--${index + 1}
                  `}
                >

                  <div className="vidya-about-gallery-image-wrap">

                    <img
                      className="vidya-about-gallery-image"
                      src={item.image}
                      alt={item.alt}
                      loading={
                        index === 0
                          ? "eager"
                          : "lazy"
                      }
                      decoding="async"
                      onError={(event) =>
                        handleImageError(
                          event,
                          item.fallback
                        )
                      }
                    />

                  </div>

                  <div className="vidya-about-gallery-overlay" />

                  <div className="vidya-about-gallery-badge">
                    <span>
                      {item.badge}
                    </span>
                  </div>

                </article>
              )
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;