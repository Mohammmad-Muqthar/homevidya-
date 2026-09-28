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
} from "lucide-react";

import "./Navbar.css";


/* =========================================================
   NAVBAR DATA

   FAKE DATA FOR NOW.
   Replace paths/text later.
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

  const [visible, setVisible] =
    useState(true);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const lastScrollY =
    useRef(0);

  const ticking =
    useRef(false);


  /* =========================================================
     NAVBAR SCROLL BEHAVIOUR
  ========================================================= */

  useEffect(() => {
    const updateNavbar = () => {
      const currentY =
        window.scrollY;


      const hero =
        document.getElementById(
          "home"
        );


      /* =====================================================
         HERO DETECTION
      ===================================================== */

      let isInsideHero =
        true;


      if (hero) {
        const heroRect =
          hero.getBoundingClientRect();


        isInsideHero =
          heroRect.bottom > 90;
      }


      setInsideHero(
        isInsideHero
      );


      /* =====================================================
         HERO

         Always visible.
         Transparent.
      ===================================================== */

      if (isInsideHero) {
        setVisible(true);


        lastScrollY.current =
          currentY;


        ticking.current =
          false;


        return;
      }


      /* =====================================================
         IGNORE MICRO SCROLL
      ===================================================== */

      const delta =
        currentY -
        lastScrollY.current;


      if (
        Math.abs(delta) < 6
      ) {
        ticking.current =
          false;

        return;
      }


      /* =====================================================
         SCROLL DOWN
      ===================================================== */

      if (
        currentY >
        lastScrollY.current
      ) {
        setVisible(false);
      }


      /* =====================================================
         SCROLL UP
      ===================================================== */

      if (
        currentY <
        lastScrollY.current
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
     MOBILE MENU LOCK
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
     CLOSE MENU
  ========================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* =========================================================
     JSX
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

            onClick={closeMenu}

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
                  key={link.label}

                  href={link.href}

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
              RIGHT
          ================================================= */}

          <div className="vidya-nav-actions">

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
                MOBILE BUTTON
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
                      rotate: -90,
                      scale: 0.8,
                    }}

                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}

                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.8,
                    }}

                    transition={{
                      duration: 0.28,

                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >

                    <X size={23} />

                  </motion.span>

                ) : (

                  <motion.span
                    key="menu"

                    initial={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.8,
                    }}

                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}

                    exit={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.8,
                    }}

                    transition={{
                      duration: 0.28,

                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >

                    <Menu size={23} />

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
              clipPath:
                "inset(0 0 100% 0)",
            }}

            animate={{
              clipPath:
                "inset(0 0 0% 0)",
            }}

            exit={{
              clipPath:
                "inset(0 0 100% 0)",
            }}

            transition={{
              duration: 0.78,

              ease: [
                0.76,
                0,
                0.24,
                1,
              ],
            }}
          >

            <div className="vidya-mobile-menu-inner">

              {/* ===============================================
                  MOBILE LINKS
              =============================================== */}

              <nav className="vidya-mobile-menu-links">

                {navbarData.links.map(
                  (
                    link,
                    index
                  ) => (

                    <motion.a
                      key={link.label}

                      href={link.href}

                      onClick={
                        closeMenu
                      }

                      initial={{
                        opacity: 0,
                        y: 55,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      exit={{
                        opacity: 0,
                        y: 20,
                      }}

                      transition={{
                        duration:
                          0.65,

                        delay:
                          0.12 +
                          index *
                            0.055,

                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >

                      {link.label}

                    </motion.a>

                  )
                )}

              </nav>


              {/* ===============================================
                  MOBILE BOTTOM
              =============================================== */}

              <motion.div
                className="vidya-mobile-menu-footer"

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.46,
                  duration: 0.65,
                }}
              >

                <span>
                  Vidya Academy
                </span>


                <a
                  href={
                    navbarData.cta.href
                  }

                  onClick={
                    closeMenu
                  }
                >

                  {
                    navbarData.cta.label
                  }

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