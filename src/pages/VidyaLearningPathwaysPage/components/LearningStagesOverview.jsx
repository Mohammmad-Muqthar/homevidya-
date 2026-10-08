import "./LearningStagesOverview.css";

export default function LearningStagesOverview({
  stages,
}) {
  return (
    <section
      className="learning-stages"
      aria-label="Learning stages from LKG to Grade 12"
    >

      <div className="learning-stages__grid">

        {stages.map(
          (stage) => (
            <article
              key={stage.id}
              className="learning-stages__card pathways-reveal"
            >

              <div>

                <span className="learning-stages__number">
                  {stage.number}
                </span>


                <span className="learning-stages__label">
                  {stage.label}
                </span>


                <h2 className="learning-stages__title">
                  {stage.cardTitle}
                </h2>

              </div>


              <div
                className="learning-stages__divider"
              />


              <p className="learning-stages__summary">
                {stage.cardSummary}
              </p>


              <a
                href={`#${stage.id}`}
                className="learning-stages__link"
              >
                Explore
                <span aria-hidden="true">
                  ↘
                </span>
              </a>


              <div className="learning-stages__mark">
                <span />
                {stage.label}
              </div>

            </article>
          )
        )}

      </div>

    </section>
  );
}
