import "./About.css";


/* =========================================================
   GALLERY
========================================================= */

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=88";

const galleryImages = [
  {
    id: "01",
    badge: "LEARN",
    image:
      "https://media.istockphoto.com/id/1343473005/photo/teacher-teaching-concepts-of-windmill-in-the-classroom-to-students.webp?a=1&b=1&s=612x612&w=0&k=20&c=5Fg8kxgI9HIz7TSA4I8L0adzprCs4uLXNq4T_EgvyJA=",
    alt:
      "Indian school students in traditional uniforms engaged in classroom learning",
  },
  {
    id: "02",
    badge: "EXPLORE",
    image:
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1800&q=90",
    alt:
      "School building architecture with a classic open veranda and corridor",
  },
  {
    id: "03",
    badge: "GROW",
    image:
      "https://images.unsplash.com/photo-1600792170156-7fdc12ed6733?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluZGlhbiUyMHNjaG9vbHN8ZW58MHx8MHx8fDA%3D",
    alt:
      "Students playing and having fun on the school ground campus",
  },
];

/* =========================================================
   CURVE DATA
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


/* =========================================================
   CURVE PATH
========================================================= */

const buildReverseUPath = (
  inset,
  apex
) => {
  const left =
    inset;

  const right =
    1600 - inset;

  const center =
    800;

  const bottom =
    1000;


  const shoulder =
    Math.min(
      850,
      Math.max(
        apex + 185,
        220
      )
    );


  const innerControl =
    Math.max(
      80,
      (
        right -
        left
      ) *
        0.19
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


/* =========================================================
   SECONDARY CURVES
========================================================= */

const secondaryCurveLevels =
  curveLevels
    .slice(
      0,
      -1
    )
    .map(
      (
        current,
        index
      ) => {
        const next =
          curveLevels[
            index + 1
          ];


        return {
          inset:
            (
              current.inset +
              next.inset
            ) /
            2,

          apex:
            (
              current.apex +
              next.apex
            ) /
            2,
        };
      }
    );


/* =========================================================
   CURVE SVG
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

        {curveLevels.map(
          (
            curve,
            index
          ) => (

            <path
              key={`main-${index}`}
              d={
                buildReverseUPath(
                  curve.inset,
                  curve.apex
                )
              }
            />

          )
        )}

      </g>


      <g className="vidya-about-curves-secondary">

        {secondaryCurveLevels.map(
          (
            curve,
            index
          ) => (

            <path
              key={`secondary-${index}`}
              d={
                buildReverseUPath(
                  curve.inset,
                  curve.apex
                )
              }
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


  /* =========================================================
     IMAGE FALLBACK
  ========================================================= */

  const handleImageError =
    (
      event
    ) => {
      const image =
        event.currentTarget;


      if (
        image.dataset.fallbackApplied ===
        "true"
      ) {
        return;
      }


      image.dataset.fallbackApplied =
        "true";


      image.src =
        FALLBACK_IMAGE;
    };


  return (
    <section
      className="vidya-about"
      id="about"
    >

      {/* =====================================================
          WHITE CONTENT SECTION
      ===================================================== */}

      <section className="vidya-about-intro">

        <div className="vidya-about-intro-inner">

          {/* ===============================================
              TITLE
          =============================================== */}

          <h2 className="vidya-about-intro-title">

            <span className="vidya-about-title-dark">
              Our Learning
            </span>

            {" "}

            <span className="vidya-about-title-light">
              Philosophy.
            </span>

          </h2>


          {/* ===============================================
              DIVIDER
          =============================================== */}

          <div className="vidya-about-intro-divider" />


          {/* ===============================================
              CONTENT
          =============================================== */}

          <div className="vidya-about-copy-grid">

            <p>
              At Vidya Academy, learning goes beyond
              the classroom. Every child is encouraged
              to explore ideas with curiosity and
              confidence through meaningful discussions,
              practical activities, creative experiences
              and collaborative learning.
            </p>


            <p>
              We believe children learn best when they
              are actively involved in the process.
              Our learning environment encourages
              students to ask questions, communicate
              their ideas, work with others and discover
              different ways of approaching a challenge.
            </p>


            <p>
              Alongside academic learning, students are
              encouraged to become thoughtful,
              independent and confident learners.
              Each experience helps them connect
              knowledge with everyday life, develop
              their own perspective and continue
              growing with purpose.
            </p>


            <p>
              Our approach creates opportunities for
              children to reflect on what they learn,
              understand their individual strengths and
              apply their knowledge with confidence.
              Through purposeful experiences, students
              build resilience, awareness and the habits
              needed for life beyond the classroom.
            </p>

          </div>


          {/* ===============================================
              CLOSING COPY
          =============================================== */}

          <p className="vidya-about-intro-closing">

            Learning becomes meaningful when children
            have the freedom to question, connect,
            create and apply what they know.

          </p>


          {/* ===============================================
              VALUES
          =============================================== */}

          <div className="vidya-about-intro-values">

            <span>
              LEARN
            </span>

            <i />

            <span>
              EXPLORE
            </span>

            <i />

            <span>
              GROW
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          GREEN IMAGE SECTION

          NORMAL FLOW.
          NO PARALLAX.
          NO STICKY.
          NO PIN.
          NO FAKE SCROLL HEIGHT.
      ===================================================== */}

      <section className="vidya-about-story">

        {/* ===============================================
            CURVED LINE BACKGROUND
        =============================================== */}

        <div
          className="vidya-about-green-lines"
          aria-hidden="true"
        >

          <AboutCurveLines />

        </div>


        {/* ===============================================
            IMAGE GRID
        =============================================== */}

        <div className="vidya-about-gallery">

          {galleryImages.map(
            (
              item,
              index
            ) => (

              <article
                key={
                  item.id
                }

                className={`
                  vidya-about-gallery-card
                  vidya-about-gallery-card--${
                    index + 1
                  }
                `}
              >

                <img
                  src={
                    item.image
                  }

                  alt={
                    item.alt
                  }

                  loading="lazy"

                  decoding="async"

                  draggable="false"

                  onError={
                    handleImageError
                  }
                />


                <div className="vidya-about-gallery-overlay" />


                <div className="vidya-about-gallery-badge">

                  <span>
                    {
                      item.badge
                    }
                  </span>

                </div>

              </article>

            )
          )}

        </div>

      </section>

    </section>
  );
};


export default About;