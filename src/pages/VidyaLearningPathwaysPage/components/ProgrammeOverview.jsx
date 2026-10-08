import "./ProgrammeOverview.css";


const learningStages = [
  {
    id: "kindergarten",

    range:
      "LKG – UKG",

    title:
      "Kindergarten",

    summary:
      "A joyful beginning where curiosity, play, language and confidence become the foundation for learning.",
  },

  {
    id: "primary-middle",

    range:
      "GRADE 1 – 8",

    title:
      "Primary & Middle School",

    summary:
      "Strong foundations grow into deeper understanding, creativity, collaboration and independent thinking.",
  },

  {
    id: "senior-school",

    range:
      "GRADE 9 – 12",

    title:
      "Senior School",

    summary:
      "Focused learning, deeper thinking and greater responsibility prepare students confidently for what comes next.",
  },
];


function ArrowIcon() {
  return (
    <svg
      className="programme-overview__arrow"
      width="15"
      height="15"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 9H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M10 5L14 9L10 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export default function ProgrammeOverview() {
  return (
    <section
      className="programme-overview"
      aria-label="Learning journey from LKG to Grade 12"
    >

      <div className="programme-overview__grid">

        {learningStages.map(
          (item) => (
            <article
              key={item.id}
              className="programme-overview__card pathways-reveal"
            >

              <div className="programme-overview__top">

                <span className="programme-overview__range">
                  {item.range}
                </span>


                <h2 className="programme-overview__name">
                  {item.title}
                </h2>

              </div>


              <div
                className="programme-overview__divider"
              />


              <p className="programme-overview__summary">
                {item.summary}
              </p>


              <a
                href={`#${item.id}`}
                className="programme-overview__link"
              >

                <span className="programme-overview__link-text">
                  Explore
                </span>


                <ArrowIcon />

              </a>

            </article>
          )
        )}

      </div>

    </section>
  );
}