import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import "./Navbar.css";


/* =========================================================
   NAVBAR DATA
========================================================= */

const navbarData = {
  logo: {
    src: "/images/logo.png",
    alt: "Vidya Academy",
    href: "#home",
  },

  links: [
    {
      label: "About",
      href: "#about",
    },

    {
      label: "Academics",
      href: "#academic-programs",
    },

    {
      label: "Life at School",
      href: "#life-at-school",
    },

    {
      label: "The Way",
      href: "#the-way",
    },

    {
      label: "Quick Facts",
      href: "#quick-facts",
    },

    {
      label: "FAQs",
      href: "#faq",
    },
  ],

  cta: {
    label: "Enquire",
    href: "#faq",
  },
};


/* =========================================================
   NAVBAR
========================================================= */

const Navbar = () => {
  const [insideHero, setInsideHero] =
    useState(true);

  const [heroScrolled, setHeroScrolled] =
    useState(false);

  const [visible, setVisible] =
    useState(true);

  const [menuOpen, setMenuOpen] =
    useState(false);


  const lastScrollY =
    useRef(0);

  const ticking =
    useRef(false);


  /* =========================================================
     SCROLL LOGIC
  ========================================================= */

  useEffect(() => {
    const updateNavbar = () => {
      const currentY =
        window.scrollY;


      const hero =
        document.getElementById(
          "home"
        );


      let isInsideHero =
        false;


      /* =====================================================
         DETECT HERO
      ===================================================== */

      if (hero) {
        const heroRect =
          hero.getBoundingClientRect();


        isInsideHero =
          heroRect.bottom > 80;
      }


      setInsideHero(
        isInsideHero
      );


      /* =====================================================
         HERO

         AT HERO TOP:
         navbar visible

         AFTER USER STARTS SCROLLING:
         WHOLE NAVBAR disappears
      ===================================================== */

      if (isInsideHero) {
        const hasScrolledHero =
          currentY > 38;


        setHeroScrolled(
          hasScrolledHero
        );


        /*
          Keep visible state true.

          heroScrolled CSS is responsible
          for hiding the complete navbar.
        */

        setVisible(true);


        lastScrollY.current =
          currentY;


        ticking.current =
          false;


        return;
      }


      /* =====================================================
         LEFT HERO
      ===================================================== */

      setHeroScrolled(false);


      const delta =
        currentY -
        lastScrollY.current;


      /* =====================================================
         IGNORE MICRO SCROLL
      ===================================================== */

      if (
        Math.abs(delta) < 6
      ) {
        ticking.current =
          false;

        return;
      }


      /* =====================================================
         PAGE SCROLL DOWN
      ===================================================== */

      if (
        delta > 0
      ) {
        setVisible(false);
      }


      /* =====================================================
         PAGE SCROLL UP
      ===================================================== */

      if (
        delta < 0
      ) {
        setVisible(true);
      }


      lastScrollY.current =
        currentY;


      ticking.current =
        false;
    };


    const handleScroll = () => {
      if (ticking.current) {
        return;
      }


      ticking.current =
        true;


      requestAnimationFrame(
        updateNavbar
      );
    };


    lastScrollY.current =
      window.scrollY;


    updateNavbar();


    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );


    window.addEventListener(
      "resize",
      updateNavbar
    );


    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );


      window.removeEventListener(
        "resize",
        updateNavbar
      );
    };
  }, []);


  /* =========================================================
     LOCK BODY WHEN MOBILE MENU OPEN
  ========================================================= */

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }


    return () => {
      document.body.style.overflow =
        "";
    };
  }, [menuOpen]);


  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (
      event
    ) => {
      if (
        event.key === "Escape"
      ) {
        setMenuOpen(false);
      }
    };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);


  /* =========================================================
     CLOSE MOBILE MENU WHEN RETURNING DESKTOP
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth > 1080
      ) {
        setMenuOpen(false);
      }
    };


    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);


  /* =========================================================
     CLOSE MENU
  ========================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <header
        className={`
          vidya-nav

          ${
            insideHero
              ? "is-hero"
              : "is-page"
          }

          ${
            heroScrolled
              ? "is-hero-scrolled"
              : ""
          }

          ${
            visible
              ? "is-visible"
              : "is-hidden"
          }

          ${
            menuOpen
              ? "is-menu-open"
              : ""
          }
        `}
      >

        <div className="vidya-nav-inner">


          {/* =================================================
              LOGO
          ================================================= */}

          <a
            href={
              navbarData.logo.href
            }

            className="vidya-nav-brand"

            onClick={
              closeMenu
            }

            aria-label="Vidya Academy home"
          >

            <img
              src={
                navbarData.logo.src
              }

              alt={
                navbarData.logo.alt
              }

              className="vidya-nav-logo"
            />

          </a>


          {/* =================================================
              DESKTOP LINKS
          ================================================= */}

          <nav
            className="vidya-nav-links"

            aria-label="Main navigation"
          >

            {navbarData.links.map(
              (link) => (

                <a
                  key={
                    link.label
                  }

                  href={
                    link.href
                  }

                  className="vidya-nav-link"
                >

                  <span>
                    {link.label}
                  </span>

                </a>

              )
            )}

          </nav>


          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="vidya-nav-actions">


            {/* ===============================================
                DESKTOP ENQUIRE
            =============================================== */}

            <a
              href={
                navbarData.cta.href
              }

              className="vidya-nav-cta"
            >

              {
                navbarData.cta.label
              }

            </a>


            {/* ===============================================
                MOBILE MENU BUTTON
            =============================================== */}

            <button
              type="button"

              className="vidya-nav-mobile-toggle"

              onClick={() =>
                setMenuOpen(
                  (value) =>
                    !value
                )
              }

              aria-expanded={
                menuOpen
              }

              aria-label={
                menuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
            >

              <AnimatePresence
                mode="wait"
                initial={false}
              >

                {menuOpen ? (

                  <motion.span
                    key="close"

                    initial={{
                      opacity: 0,
                      rotate: -20,
                    }}

                    animate={{
                      opacity: 1,
                      rotate: 0,
                    }}

                    exit={{
                      opacity: 0,
                      rotate: 20,
                    }}

                    transition={{
                      duration: 0.18,
                    }}
                  >

                    <X
                      size={20}
                      strokeWidth={1.8}
                    />

                  </motion.span>

                ) : (

                  <motion.span
                    key="menu"

                    initial={{
                      opacity: 0,
                    }}

                    animate={{
                      opacity: 1,
                    }}

                    exit={{
                      opacity: 0,
                    }}

                    transition={{
                      duration: 0.18,
                    }}
                  >

                    <Menu
                      size={21}
                      strokeWidth={1.8}
                    />

                  </motion.span>

                )}

              </AnimatePresence>

            </button>

          </div>

        </div>

      </header>


      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            className="vidya-mobile-menu"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >

            <div className="vidya-mobile-menu-inner">


              {/* ===============================================
                  MOBILE NAVIGATION
              =============================================== */}

              <nav
                className="vidya-mobile-menu-links"

                aria-label="Mobile navigation"
              >

                {navbarData.links.map(
                  (
                    link,
                    index
                  ) => (

                    <motion.a
                      key={
                        link.label
                      }

                      href={
                        link.href
                      }

                      onClick={
                        closeMenu
                      }

                      initial={{
                        opacity: 0,
                        y: 10,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      transition={{
                        duration:
                          0.3,

                        delay:
                          index *
                          0.025,

                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >

                      <span>
                        {link.label}
                      </span>


                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.6}
                      />

                    </motion.a>

                  )
                )}

              </nav>


              {/* ===============================================
                  MOBILE FOOTER
              =============================================== */}

              <motion.div
                className="vidya-mobile-menu-footer"

                initial={{
                  opacity: 0,
                  y: 8,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 0.3,
                  delay: 0.12,
                }}
              >

                <p>
                  Discover more about
                  Vidya Academy.
                </p>


                <a
                  href={
                    navbarData.cta.href
                  }

                  onClick={
                    closeMenu
                  }

                  className="vidya-mobile-menu-cta"
                >

                  <span>
                    Enquire
                  </span>


                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.7}
                  />

                </a>

              </motion.div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
};


export default Navbar;