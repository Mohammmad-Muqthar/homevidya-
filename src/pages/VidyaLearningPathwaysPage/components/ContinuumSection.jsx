import "./ContinuumSection.css";


export default function ContinuumSection({
  programmes,
}) {
  return (
    <section className="continuum-section">

      <div className="continuum-section__inner">

        {/* =========================================
            TITLE
        ========================================= */}

        <h2 className="continuum-section__title pathways-reveal">
          The learning{" "}

          <span>
            continuum
          </span>
        </h2>


        {/* =========================================
            CONTINUUM LINE
        ========================================= */}

        <div className="continuum-section__line pathways-reveal">

          {programmes.map(
            (
              item,
              index
            ) => (
              <article
                key={item.id}
                className={`
                  continuum-section__item
                  continuum-section__item--${index + 1}
                `}
              >

                <span className="continuum-section__dot" />


                <strong>
                  {item.short}
                </strong>


                <span className="continuum-section__ages">
                  {item.ages}
                </span>


                <p>
                  {item.id === "pyp" &&
                    "Every question becomes part of the curriculum."}

                  {item.id === "myp" &&
                    "Every connection across subjects becomes a lesson."}

                  {item.id === "dp" &&
                    "Every idea defended becomes their own."}
                </p>

              </article>
            )
          )}

        </div>


        {/* =========================================
            CLOSING
        ========================================= */}

        <p className="continuum-section__closing pathways-reveal">
          One school. One philosophy. One continuous
          journey of growing independence.
        </p>


        {/* =========================================
            BOTTOM CIRCLES
        ========================================= */}

        <div
          className="continuum-section__symbol pathways-reveal"
          aria-label="Learning continuum"
        >

          <span />

          <span />

          <span />

          <span />

        </div>

      </div>

    </section>
  );
}