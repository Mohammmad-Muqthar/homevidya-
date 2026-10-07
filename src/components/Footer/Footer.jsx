import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   MASCOT VIDEO
========================================================= */

const MASCOT_VIDEO =
  "/mascot-doll1.webm";


/* =========================================================
   SCHOOL DETAILS
========================================================= */

const SCHOOL = {
  location:
    "Kundapura, Karnataka, India",

  phone:
    "+91 00000 00000",

  email:
    "admissions@vidyaacademy.edu",

  whatsapp:
    "",
};


/* =========================================================
   FOOTER LINKS
========================================================= */

const footerColumns = [
  {
    title:
      "School",

    links: [
      {
        label:
          "About us",
        href:
          "#about",
      },
      {
        label:
          "Campus",
        href:
          "#about",
      },
      {
        label:
          "Experience",
        href:
          "#life-at-school",
      },
      {
        label:
          "Programmes",
        href:
          "#academic-programs",
      },
      {
        label:
          "The Vidya Way",
        href:
          "#the-way",
      },
      {
        label:
          "Quick facts",
        href:
          "#quick-facts",
      },
    ],
  },

  {
    title:
      "Admissions",

    links: [
      {
        label:
          "Admission enquiry",
        href:
          "#faq",
      },
      {
        label:
          "Contact admissions",
        href:
          "#faq",
      },
      {
        label:
          "FAQs",
        href:
          "#faq",
      },
      {
        label:
          "Fees & finance",
        href:
          "#faq",
      },
    ],
  },

  {
    title:
      "Connect",

    links: [
      {
        label:
          "Instagram",
        href:
          "#footer",
      },
      {
        label:
          "LinkedIn",
        href:
          "#footer",
      },
      {
        label:
          "YouTube",
        href:
          "#footer",
      },
      {
        label:
          "Parent login",
        href:
          "#footer",
      },
      {
        label:
          "Careers",
        href:
          "#footer",
      },
    ],
  },
];


/* =========================================================
   ICONS
========================================================= */

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.5 11.65a8.48 8.48 0 0 1-12.55 7.43L3 20.45l1.34-4.82a8.47 8.47 0 1 1 16.16-3.98Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M8.16 7.72c.25-.43.52-.44.76-.45h.45c.18 0 .37.07.47.33l.82 1.98c.1.24.08.43-.06.63l-.62.82c-.12.16-.12.3-.03.47.37.74.94 1.39 1.61 1.91.66.51 1.36.87 2.12 1.08.2.06.35 0 .48-.16l.77-.93c.16-.2.36-.25.59-.16l1.93.87c.26.12.39.27.41.48.04.44-.16 1.17-.48 1.58-.45.6-1.21.99-2.05.99-1.05 0-2.87-.55-4.87-2.24-1.63-1.38-2.83-3.03-3.33-4.4-.37-.93-.28-1.89.03-2.8.1-.28.2-.51.34-.75Z"
        fill="currentColor"
      />
    </svg>
  );
}


function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 10.5C20 15.5 12 22 12 22S4 15.5 4 10.5a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="12"
        cy="10"
        r="2.5"
        fill="currentColor"
      />
    </svg>
  );
}


function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.5 3.5 9 3l2 5-2.5 1.8c1.1 2.3 2.9 4.1 5.2 5.2l1.8-2.5 5 2-.5 2.5c-.3 1.5-1.6 2.5-3.1 2.5C10.7 19.5 4.5 13.3 4.5 5.1c0-1.5 1-2.8 2-1.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const footerRef =
    useRef(null);

  const containerRef =
    useRef(null);

  const mascotRef =
    useRef(null);


  /* =========================================================
     VIDEO
  ========================================================= */

  const handleVideoReady =
    (event) => {
      const video =
        event.currentTarget;

      video.muted =
        true;

      video
        .play()
        .catch(
          () => {}
        );
    };


  /* =========================================================
     MASCOT VISIBILITY
  ========================================================= */

  useEffect(() => {
    const mascot =
      mascotRef.current;

    if (
      !mascot
    ) {
      return undefined;
    }


    let frameId =
      null;


    const updateMascot =
      () => {
        if (
          frameId
        ) {
          cancelAnimationFrame(
            frameId
          );
        }


        frameId =
          requestAnimationFrame(
            () => {
              const hero =
                document.querySelector(
                  [
                    ".raya-hero",
                    "[data-navbar-hero]",
                    ".campus-hero",
                    ".page-hero",
                  ].join(",")
                );


              let heroVisible =
                false;


              if (
                hero
              ) {
                const heroRect =
                  hero.getBoundingClientRect();


                heroVisible =
                  heroRect.bottom >
                    80 &&
                  heroRect.top <
                    window.innerHeight;
              }


              const introActive =
                document.body.classList.contains(
                  "vidya-page-intro-active"
                );


              if (
                heroVisible ||
                introActive
              ) {
                mascot.classList.remove(
                  "vidya-site-mascot--visible"
                );

                return;
              }


              mascot.classList.add(
                "vidya-site-mascot--visible"
              );
            }
          );
      };


    updateMascot();


    window.addEventListener(
      "scroll",
      updateMascot,
      {
        passive:
          true,
      }
    );


    window.addEventListener(
      "resize",
      updateMascot
    );


    const observer =
      new MutationObserver(
        updateMascot
      );


    observer.observe(
      document.body,
      {
        childList:
          true,

        subtree:
          true,
      }
    );


    return () => {
      if (
        frameId
      ) {
        cancelAnimationFrame(
          frameId
        );
      }


      window.removeEventListener(
        "scroll",
        updateMascot
      );


      window.removeEventListener(
        "resize",
        updateMascot
      );


      observer.disconnect();
    };

  }, []);


  /* =========================================================
     FOOTER ANIMATIONS

     IMPORTANT FIX:
     NEVER MOVE THE FOOTER ROOT.

     ONLY MOVE THE INNER CONTENT.
  ========================================================= */

  useLayoutEffect(() => {
    const footer =
      footerRef.current;

    const container =
      containerRef.current;


    if (
      !footer ||
      !container
    ) {
      return undefined;
    }


    /* remove any old GSAP transform
       that may still exist on footer */

    gsap.set(
      footer,
      {
        clearProps:
          "transform",
      }
    );


    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    const ctx =
      gsap.context(() => {
        if (
          reducedMotion
        ) {
          return;
        }


        /* =====================================================
           FOOTER INNER REVEAL
        ===================================================== */

        gsap.fromTo(
          container,

          {
            yPercent:
              2,
          },

          {
            yPercent:
              0,

            ease:
              "none",

            scrollTrigger: {
              trigger:
                footer,

              start:
                "top bottom",

              end:
                "top 82%",

              scrub:
                1.8,

              invalidateOnRefresh:
                true,
            },
          }
        );


        /* =====================================================
           LEFT INFO
        ===================================================== */

        gsap.fromTo(
          ".vidya-footer-info",

          {
            y:
              18,

            opacity:
              0.65,
          },

          {
            y:
              0,

            opacity:
              1,

            ease:
              "power2.out",

            scrollTrigger: {
              trigger:
                footer,

              start:
                "top 91%",

              end:
                "top 72%",

              scrub:
                1.5,
            },
          }
        );


        /* =====================================================
           COLUMNS
        ===================================================== */

        gsap.fromTo(
          ".vidya-footer-column",

          {
            y:
              14,

            opacity:
              0.55,
          },

          {
            y:
              0,

            opacity:
              1,

            stagger:
              0.07,

            ease:
              "power2.out",

            scrollTrigger: {
              trigger:
                footer,

              start:
                "top 90%",

              end:
                "top 72%",

              scrub:
                1.5,
            },
          }
        );


        /* =====================================================
           WORDMARK
        ===================================================== */

        gsap.fromTo(
          ".vidya-footer-large-name",

          {
            y:
              14,

            opacity:
              0.55,
          },

          {
            y:
              0,

            opacity:
              1,

            ease:
              "power2.out",

            scrollTrigger: {
              trigger:
                ".vidya-footer-brand",

              start:
                "top 98%",

              end:
                "top 80%",

              scrub:
                1.3,
            },
          }
        );


        /* =====================================================
           BOTTOM
        ===================================================== */

        gsap.fromTo(
          ".vidya-footer-bottom",

          {
            y:
              10,

            opacity:
              0.55,
          },

          {
            y:
              0,

            opacity:
              1,

            ease:
              "power2.out",

            scrollTrigger: {
              trigger:
                ".vidya-footer-bottom",

              start:
                "top 98%",

              end:
                "top 86%",

              scrub:
                1.4,
            },
          }
        );

      }, footer);


    let resizeTimer;


    const handleResize =
      () => {
        clearTimeout(
          resizeTimer
        );


        resizeTimer =
          setTimeout(
            () => {
              ScrollTrigger.refresh();
            },
            120
          );
      };


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
          () => {
            ScrollTrigger.refresh();
          }
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


      ctx.revert();
    };

  }, []);


  /* =========================================================
     WHATSAPP
  ========================================================= */

  const whatsappNumber =
    SCHOOL.whatsapp.replace(
      /\D/g,
      ""
    );


  const whatsappHref =
    whatsappNumber
      ? `https://wa.me/${whatsappNumber}`
      : "#faq";


  const hasWhatsapp =
    Boolean(
      whatsappNumber
    );


  /* =========================================================
     BACK TO TOP
  ========================================================= */

  const handleGoToTop =
    () => {
      window.scrollTo({
        top:
          0,

        behavior:
          "smooth",
      });
    };


  /* =========================================================
     JSX
  ========================================================= */

  return (
    <>

      {/* =====================================================
          FIXED MASCOT
      ===================================================== */}

      <button
        ref={mascotRef}
        type="button"
        className="vidya-site-mascot"
        onClick={handleGoToTop}
        aria-label="Back to top"
      >

        <video
          className="vidya-site-mascot-video"
          src={MASCOT_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          onCanPlay={handleVideoReady}
        />

      </button>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        ref={footerRef}
        id="footer"
        className="vidya-footer"
      >

        <div
          ref={containerRef}
          className="vidya-footer-container"
        >

          {/* =================================================
              MAIN
          ================================================= */}

          <div className="vidya-footer-main">

            {/* ===============================================
                SCHOOL INFO
            =============================================== */}

            <div className="vidya-footer-info">

              <p className="vidya-footer-description">
                A vibrant learning community where
                curiosity leads to confidence and every
                child is inspired to grow.
              </p>


              <div className="vidya-footer-details">

                <div className="vidya-footer-detail">

                  <span className="detail-icon">
                    <LocationIcon />
                  </span>

                  <span>
                    {SCHOOL.location}
                  </span>

                </div>


                <div className="vidya-footer-detail">

                  <span className="detail-icon">
                    <PhoneIcon />
                  </span>

                  <span>
                    {SCHOOL.phone}
                  </span>

                </div>


                <div className="vidya-footer-detail">

                  <span className="detail-icon">
                    <EmailIcon />
                  </span>

                  <span>
                    {SCHOOL.email}
                  </span>

                </div>

              </div>


              <div className="vidya-footer-actions">

                <a
                  className="vidya-footer-whatsapp"
                  href={whatsappHref}
                  target={
                    hasWhatsapp
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    hasWhatsapp
                      ? "noopener noreferrer"
                      : undefined
                  }
                >

                  <WhatsAppIcon />

                  <span>
                    Chat on WhatsApp
                  </span>

                </a>

              </div>

            </div>


            {/* ===============================================
                NAVIGATION
            =============================================== */}

            <nav
              className="vidya-footer-navigation"
              aria-label="Footer navigation"
            >

              {footerColumns.map(
                (column) => (

                  <div
                    className="vidya-footer-column"
                    key={column.title}
                  >

                    <h3>
                      {column.title}
                    </h3>


                    <ul>

                      {column.links.map(
                        (link) => (

                          <li
                            key={
                              `${column.title}-${link.label}`
                            }
                          >

                            <a
                              href={link.href}
                            >
                              {link.label}
                            </a>

                          </li>

                        )
                      )}

                    </ul>

                  </div>

                )
              )}

            </nav>

          </div>


          {/* =================================================
              LARGE VIDYA ACADEMY
          ================================================= */}

          <div className="vidya-footer-brand">

            <div className="vidya-footer-wordmark-window">

              <h2 className="vidya-footer-large-name">
                VIDYA ACADEMY
              </h2>

            </div>

          </div>


          {/* =================================================
              BOTTOM
          ================================================= */}

          <div className="vidya-footer-bottom">

            <p className="vidya-footer-copyright">
              ©{" "}
              {new Date().getFullYear()}{" "}
              Vidya Academy. All rights reserved.
            </p>


            <div className="vidya-footer-bottom-links">

              <a href="#footer">
                Privacy policy
              </a>

              <span>
                |
              </span>

              <a href="#footer">
                Terms of use
              </a>

              <span>
                |
              </span>

              <a href="#footer">
                Sitemap
              </a>

            </div>

          </div>

        </div>

      </footer>

    </>
  );
}