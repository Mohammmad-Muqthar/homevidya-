import "./ProgrammeSection.css";


function TagList({ tags = [] }) {
  if (!tags.length) {
    return null;
  }

  return (
    <div className="programme-detail__tags">
      {tags.map((tag) => (
        <span key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}


function LinkList({ links = [] }) {
  if (!links.length) {
    return null;
  }

  return (
    <div className="programme-detail__links">
      {links.map((link) => (
        <a
          href="#programme-resources"
          key={link}
        >
          <span>
            {link}
          </span>

          <span
            className="programme-detail__link-arrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}


/* =========================================================
   TITLE HIGHLIGHT

   GREY PHRASES:
   - not an answer.
   - opens doors.
========================================================= */

function HighlightedTitle({ title }) {
  if (!title) {
    return null;
  }


  const phrases = [
    "not an answer.",
    "opens doors.",
  ];


  const lowerTitle =
    title.toLowerCase();


  let matchedPhrase =
    null;

  let phraseIndex =
    -1;


  for (const phrase of phrases) {
    const index =
      lowerTitle.indexOf(
        phrase
      );


    if (index !== -1) {
      matchedPhrase =
        phrase;

      phraseIndex =
        index;

      break;
    }
  }


  if (
    !matchedPhrase ||
    phraseIndex === -1
  ) {
    return title;
  }


  const before =
    title.slice(
      0,
      phraseIndex
    );


  const highlighted =
    title.slice(
      phraseIndex,
      phraseIndex +
        matchedPhrase.length
    );


  const after =
    title.slice(
      phraseIndex +
        matchedPhrase.length
    );


  return (
    <>
      {before}

      <span className="programme-detail__title-muted">
        {highlighted}
      </span>

      {after}
    </>
  );
}


function QuoteCard({
  programme,
}) {
  if (!programme.quote) {
    return null;
  }


  const initials =
    programme.quoteName
      ?.split(" ")
      .filter(Boolean)
      .map(
        (part) =>
          part[0]
      )
      .join("")
      .slice(0, 2) ||
    "VA";


  return (
    <blockquote className="programme-detail__quote">

      <span className="programme-detail__quote-label">
        A student speaks
      </span>


      <p>
        “{programme.quote}”
      </p>


      <footer>

        <span className="programme-detail__avatar">
          {initials}
        </span>


        <span className="programme-detail__quote-person">

          <strong>
            {programme.quoteName ||
              "A Vidya student"}
          </strong>

        </span>

      </footer>

    </blockquote>
  );
}


function Stats({
  stats = [],
}) {
  if (!stats.length) {
    return null;
  }


  return (
    <div className="programme-detail__stats pathways-reveal">

      {stats.map(
        (stat) => (
          <div
            key={stat.label}
            className="programme-detail__stat"
          >

            <strong>
              {stat.value}
            </strong>


            <span>
              {stat.label}
            </span>

          </div>
        )
      )}

    </div>
  );
}


export default function ProgrammeSection({
  programme,
  theme = "cream",
  reverse = false,
}) {
  return (
    <section
      id={programme.id}
      className={`
        programme-detail
        programme-detail--${theme}
        programme-detail--${programme.id}
      `}
    >

      {/* =========================================
          MAIN
      ========================================= */}

      <div
        className={`programme-detail__main ${
          reverse
            ? "programme-detail__main--reverse"
            : ""
        }`}
      >

        {/* =======================================
            CONTENT
        ======================================== */}

        <div className="programme-detail__copy pathways-reveal">

          <h2 className="programme-detail__title">

            <HighlightedTitle
              title={
                programme.title
              }
            />

          </h2>


          <div className="programme-detail__body">

            {programme.paragraphs?.map(
              (paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              )
            )}

          </div>


          <TagList
            tags={
              programme.tags
            }
          />


          <LinkList
            links={
              programme.links
            }
          />


          <QuoteCard
            programme={
              programme
            }
          />

        </div>


        {/* =======================================
            IMAGE
        ======================================== */}

        <figure className="programme-detail__media pathways-media pathways-reveal">

          <img
            src={
              programme.image
            }
            alt={
              programme.imageAlt ||
              ""
            }
          />

        </figure>

      </div>


      {/* =========================================
          STATS
      ========================================= */}

      <div className="programme-detail__stats-wrap">

        <Stats
          stats={
            programme.stats
          }
        />

      </div>

    </section>
  );
}