import "./LearningJourney.css";

export default function LearningJourney({
  stages,
}) {
  return (
    <section className="learning-journey">

      <div className="learning-journey__inner">

        <span className="learning-journey__eyebrow pathways-reveal">
          LKG TO GRADE 12
        </span>


        <h2 className="learning-journey__title pathways-reveal">
          One school.
          <br />
          One continuous journey.
        </h2>


        <div className="learning-journey__timeline pathways-reveal">

          {stages.map(
            (stage) => (
              <article
                key={stage.id}
                className="learning-journey__item"
              >

                <span className="learning-journey__dot" />


                <strong>
                  {stage.cardTitle}
                </strong>


                <span>
                  {stage.label}
                </span>

              </article>
            )
          )}

        </div>


        <p className="learning-journey__closing pathways-reveal">
          From first discoveries to independent
          decisions, each stage is designed to
          prepare students naturally for the next.
        </p>

      </div>

    </section>
  );
}
