import {
  useLayoutEffect,
  useRef,
} from "react";

import {
  Link,
} from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./MotionCategoryDetail.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   BACK ARROW
========================================================= */

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 10H5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M8.5 6.5L5 10L8.5 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/* =========================================================
   COMPONENT
========================================================= */

const MotionCategoryDetail = ({
  data,
}) => {
  const pageRef =
    useRef(null);

  const heroRef =
    useRef(null);

  const heroImageRef =
    useRef(null);

  const heroContentRef =
    useRef(null);

  const storyRef =
    useRef(null);

  const storyInnerRef =
    useRef(null);

  const copyRef =
    useRef(null);

  const galleryRef =
    useRef(null);

  const imageRefs =
    useRef([]);


  /* =========================================================
     GSAP
  ========================================================= */

  useLayoutEffect(() => {
    const page =
      pageRef.current;

    const hero =
      heroRef.current;

    const heroImage =
      heroImageRef.current;

    const heroContent =
      heroContentRef.current;

    const story =
      storyRef.current;

    const storyInner =
      storyInnerRef.current;

    const copy =
      copyRef.current;

    const gallery =
      galleryRef.current;


    if (
      !page ||
      !hero ||
      !heroImage ||
      !heroContent ||
      !story ||
      !storyInner ||
      !copy ||
      !gallery
    ) {
      return undefined;
    }


    const mm =
      gsap.matchMedia();


    const ctx =
      gsap.context(() => {

        /* =====================================================
           HERO IMAGE INTRO
        ===================================================== */

        gsap.fromTo(
          heroImage,
          {
            scale: 1.075,
          },
          {
            scale: 1.04,

            duration: 1.4,

            ease:
              "power3.out",
          }
        );


        /* =====================================================
           HERO COPY INTRO
        ===================================================== */

        gsap.fromTo(
          heroContent.children,
          {
            opacity: 0,

            y: 24,
          },
          {
            opacity: 1,

            y: 0,

            duration: 0.82,

            stagger: 0.065,

            ease:
              "power3.out",
          }
        );


        /* =====================================================
           DESKTOP
        ===================================================== */

        mm.add(
          "(min-width: 769px)",
          () => {

            /* ===============================================
               HERO PARALLAX
            =============================================== */

            gsap.fromTo(
              heroImage,
              {
                yPercent: -2,
              },
              {
                yPercent: 4,

                ease: "none",

                scrollTrigger: {
                  trigger: hero,

                  start:
                    "top top",

                  end:
                    "bottom top",

                  scrub: 0.9,

                  invalidateOnRefresh:
                    true,
                },
              }
            );


            /* ===============================================
               LEFT CONTENT PIN

               THIS IS THE IMPORTANT PART.

               Starts when story reaches viewport.

               Ends ONLY when the bottom of the
               image gallery reaches the bottom
               of the viewport.

               Therefore the copy remains in place
               through all four images.
            =============================================== */

            ScrollTrigger.create({
              trigger:
                storyInner,

              start:
                "top 110px",

              endTrigger:
                gallery,

              end:
                "bottom bottom",

              pin:
                copy,

              pinSpacing:
                false,

              anticipatePin:
                1,

              invalidateOnRefresh:
                true,
            });

          }
        );


        /* =====================================================
           LEFT CONTENT REVEAL

           Animate CHILDREN only.

           Never animate copyRef itself because
           GSAP pins that element.
        ===================================================== */

        gsap.fromTo(
          copy.children,
          {
            opacity: 0,

            y: 16,
          },
          {
            opacity: 1,

            y: 0,

            duration: 0.7,

            stagger: 0.065,

            ease:
              "power3.out",

            scrollTrigger: {
              trigger: story,

              start:
                "top 82%",

              once: true,
            },
          }
        );


        /* =====================================================
           GALLERY
        ===================================================== */

        const galleryItems =
          imageRefs.current.filter(
            Boolean
          );


        galleryItems.forEach(
          (
            item,
            index
          ) => {

            const image =
              item.querySelector(
                "img"
              );


            if (!image) {
              return;
            }


            /* ===============================================
               IMAGE FRAME REVEAL
            =============================================== */

            gsap.fromTo(
              item,
              {
                opacity: 0,

                y: 26,
              },
              {
                opacity: 1,

                y: 0,

                duration: 0.75,

                delay:
                  index === 0
                    ? 0.05
                    : 0,

                ease:
                  "power3.out",

                scrollTrigger: {
                  trigger: item,

                  start:
                    "top 94%",

                  once: true,
                },
              }
            );


            /* ===============================================
               DESKTOP IMAGE MOVEMENT

               The image frame moves normally
               with scrolling.

               The image itself slowly moves
               inside the frame.
            =============================================== */

            mm.add(
              "(min-width: 769px)",
              () => {

                gsap.fromTo(
                  image,
                  {
                    scale: 1.08,

                    yPercent: -4,
                  },
                  {
                    scale: 1.025,

                    yPercent: 4,

                    ease: "none",

                    scrollTrigger: {
                      trigger: item,

                      start:
                        "top bottom",

                      end:
                        "bottom top",

                      scrub: 0.9,

                      invalidateOnRefresh:
                        true,
                    },
                  }
                );

              }
            );


            /* ===============================================
               MOBILE IMAGE MOVEMENT
            =============================================== */

            mm.add(
              "(max-width: 768px)",
              () => {

                gsap.fromTo(
                  image,
                  {
                    scale: 1.04,
                  },
                  {
                    scale: 1,

                    ease: "none",

                    scrollTrigger: {
                      trigger: item,

                      start:
                        "top bottom",

                      end:
                        "bottom top",

                      scrub: 0.4,

                      invalidateOnRefresh:
                        true,
                    },
                  }
                );

              }
            );

          }
        );

      }, page);


    /* =====================================================
       REFRESH
    ===================================================== */

    let resizeTimer;

    let previousWidth =
      window.innerWidth;


    const refresh =
      () => {
        ScrollTrigger.refresh();
      };


    const handleResize =
      () => {
        const currentWidth =
          window.innerWidth;


        if (
          Math.abs(
            currentWidth -
            previousWidth
          ) < 3
        ) {
          return;
        }


        previousWidth =
          currentWidth;


        clearTimeout(
          resizeTimer
        );


        resizeTimer =
          setTimeout(
            refresh,
            150
          );
      };


    const images =
      page.querySelectorAll(
        "img"
      );


    images.forEach(
      (image) => {

        if (!image.complete) {
          image.addEventListener(
            "load",
            refresh
          );
        }

      }
    );


    document.fonts
      ?.ready
      ?.then(refresh);


    window.addEventListener(
      "resize",
      handleResize,
      {
        passive: true,
      }
    );


    requestAnimationFrame(() => {
      requestAnimationFrame(
        refresh
      );
    });


    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      clearTimeout(
        resizeTimer
      );


      images.forEach(
        (image) => {
          image.removeEventListener(
            "load",
            refresh
          );
        }
      );


      window.removeEventListener(
        "resize",
        handleResize
      );


      mm.revert();

      ctx.revert();
    };

  }, []);


  /* =========================================================
     JSX
  ========================================================= */

  return (
    <main
      ref={pageRef}
      className="motion-detail"
    >

      {/* =====================================================
          FULL SCREEN HERO

          Navbar stays transparent over image.
      ===================================================== */}

      <section
        ref={heroRef}
        className="motion-detail-hero"
        data-navbar-hero
      >

        <img
          ref={heroImageRef}
          src={data.heroImage}
          alt={data.title}
          className="motion-detail-hero-image"
          loading="eager"
          decoding="async"
          draggable="false"
        />


        <div
          className="motion-detail-hero-shade"
          aria-hidden="true"
        />


        <div
          ref={heroContentRef}
          className="motion-detail-hero-content"
        >

          <span className="motion-detail-eyebrow">
            {data.category}
          </span>


          <h1 className="motion-detail-title">
            {data.title}
          </h1>


          <div className="motion-detail-meta">

            <span>
              {data.date}
            </span>


            <span
              className="motion-detail-meta-dot"
              aria-hidden="true"
            />


            <span>
              {data.time}
            </span>


            <span
              className="motion-detail-meta-dot"
              aria-hidden="true"
            />


            <span>
              {data.access}
            </span>

          </div>


          <p className="motion-detail-intro">
            {data.intro}
          </p>

        </div>

      </section>


      {/* =====================================================
          STORY SECTION

          LEFT CONTENT:
          PINNED

          RIGHT:
          4 FULL-SCREEN IMAGES SCROLL
      ===================================================== */}

      <section
        ref={storyRef}
        className="motion-detail-story"
      >

        <div
          ref={storyInnerRef}
          className="motion-detail-story-inner"
        >

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <aside className="motion-detail-copy-column">

            <div
              ref={copyRef}
              className="motion-detail-copy"
            >

              <span className="motion-detail-copy-category">
                {data.category}
              </span>


              <h2>
                {data.storyTitle}
              </h2>


              <div className="motion-detail-copy-body">

                {data.paragraphs.map(
                  (
                    paragraph,
                    index
                  ) => (

                    <p
                      key={`${data.category}-paragraph-${index}`}
                    >
                      {paragraph}
                    </p>

                  )
                )}

              </div>


              <Link
                to="/motion"
                className="motion-detail-back"
              >

                <ArrowLeftIcon />


                <span>
                  Back to Motion
                </span>

              </Link>

            </div>

          </aside>


          {/* =================================================
              RIGHT IMAGES
          ================================================= */}

          <div
            ref={galleryRef}
            className="motion-detail-gallery"
          >

            {data.gallery.map(
              (
                image,
                index
              ) => (

                <figure
                  key={`${data.category}-gallery-${index}`}

                  ref={(element) => {
                    imageRefs.current[
                      index
                    ] =
                      element;
                  }}

                  className="motion-detail-image"
                >

                  <img
                    src={image}
                    alt={`${data.category} ${index + 1}`}
                    loading={
                      index < 2
                        ? "eager"
                        : "lazy"
                    }
                    decoding="async"
                    draggable="false"
                  />

                </figure>

              )
            )}

          </div>

        </div>

      </section>

    </main>
  );
};


export default MotionCategoryDetail;