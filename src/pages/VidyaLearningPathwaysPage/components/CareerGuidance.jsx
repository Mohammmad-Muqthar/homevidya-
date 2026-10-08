import "./CareerGuidance.css";


export default function CareerGuidance() {
  return (
    <section className="career-guidance">

      <div className="career-guidance__inner">

        {/* =========================================
            IMAGE
        ========================================= */}

        <figure className="career-guidance__media pathways-media pathways-reveal">

          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=90"
            alt="Open school courtyard"
          />

        </figure>


        {/* =========================================
            CONTENT
        ========================================= */}

        <div className="career-guidance__copy pathways-reveal">

          {/* University & career guidance removed */}


          <h2>
            A university should fit the student.
            <span>
              Not the other way around.
            </span>
          </h2>


          <p>
            Guidance starts with a different question:
            what holds a student’s attention so fully
            that they lose track of time? From there,
            counselling can build outward around genuine
            strengths, interests and long-term goals.
          </p>


          <p>
            The work begins early and becomes more
            individual as students approach senior school.
            The aim is not to collect impressive names,
            but to help each learner make a thoughtful,
            well-supported next step.
          </p>


          <ul>

            <li>
              <span className="career-guidance__dot" />
              Begins before senior school
            </li>

            <li>
              <span className="career-guidance__dot" />
              Built around the student
            </li>

            <li>
              <span className="career-guidance__dot" />
              One-to-one guidance
            </li>

          </ul>

        </div>

      </div>

    </section>
  );
}