import "./LearningStageSection.css";

export default function LearningStageSection({
  stage,
  theme = "cream",
  reverse = false,
}) {
  return (
    <section
      id={stage.id}
      className={`learning-stage learning-stage--${theme}`}
    >

      <div
        className={`learning-stage__main ${
          reverse
            ? "learning-stage__main--reverse"
            : ""
        }`}
      >

        <div className="learning-stage__copy pathways-reveal">

          {/* Programme-name eyebrow intentionally removed */}

          <span className="learning-stage__grade">
            {stage.label}
          </span>


          <h2 className="learning-stage__title">
            {stage.sectionTitle}
          </h2>


          <div className="learning-stage__body">

            {stage.paragraphs.map(
              (paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              )
            )}

          </div>


          <div className="learning-stage__tags">

            {stage.tags.map(
              (tag) => (
                <span key={tag}>
                  {tag}
                </span>
              )
            )}

          </div>

        </div>


        <figure className="learning-stage__media pathways-media pathways-reveal">

          <img
            src={stage.image}
            alt={stage.imageAlt}
          />

        </figure>

      </div>


      <div className="learning-stage__lower">

        <blockquote className="learning-stage__quote pathways-reveal">

          <span className="learning-stage__quote-mark">
            “
          </span>

          <p>
            {stage.quote}
          </p>

          <footer>
            {stage.quoteMeta}
          </footer>

        </blockquote>


        <div className="learning-stage__highlights pathways-reveal">

          {stage.highlights.map(
            (
              highlight,
              index
            ) => (
              <div
                key={highlight}
                className="learning-stage__highlight"
              >

                <span>
                  0{index + 1}
                </span>

                <strong>
                  {highlight}
                </strong>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
}
