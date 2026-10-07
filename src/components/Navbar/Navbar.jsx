import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

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
   MOTION LINK
========================================================= */

const MotionLink = motion.create(Link);


/* =========================================================
   NAVBAR DATA
========================================================= */

const navbarData = {
  logo: {
    src: "/images/logo.png",
    alt: "Vidya Academy",
    to: "/",
  },

  links: [
    {
      label: "HOME",
      to: "/",
    },
    {
      label: "CAMPUS",
      to: "/campus",
    },
    {
      label: "MOTION-IN",
      to: "/motion",
    },
    {
      label: "PROGRAMS",
      to: "/life-at-school",
    },
    {
      label: "ABOUT",
      to: "/about",
    },
    
    
  ],

  cta: {
    label: "Enquire",
    to: "/admissions",
  },
};


/* =========================================================
   NAVBAR
========================================================= */

const Navbar = () => {
  const location = useLocation();

  const [
    insideHero,
    setInsideHero,
  ] = useState(true);

  const [
    heroScrolled,
    setHeroScrolled,
  ] = useState(false);

  const [
    visible,
    setVisible,
  ] = useState(true);

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const lastScrollY =
    useRef(0);

  const ticking =
    useRef(false);


  /* =========================================================
     FIND CURRENT PAGE HERO
  ========================================================= */

  const getCurrentHero = () => {
    const customHero =
      document.querySelector(
        "[data-navbar-hero]"
      );

    if (customHero) {
      return customHero;
    }


    const homeHero =
      document.getElementById(
        "home"
      );

    if (homeHero) {
      return homeHero;
    }


    const campusHero =
      document.querySelector(
        ".campus-hero"
      );

    if (campusHero) {
      return campusHero;
    }


    const pageHero =
      document.querySelector(
        ".page-hero"
      );

    if (pageHero) {
      return pageHero;
    }


    return null;
  };


  /* =========================================================
     ROUTE CHANGE
  ========================================================= */

  useEffect(() => {
    setMenuOpen(false);

    setVisible(true);

    setHeroScrolled(false);


    if (location.hash) {
      requestAnimationFrame(
        () => {
          const element =
            document.querySelector(
              location.hash
            );

          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      );

      return;
    }


    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [
    location.pathname,
    location.hash,
  ]);


  /* =========================================================
     SCROLL LOGIC
  ========================================================= */

  useEffect(() => {
    const updateNavbar = () => {
      const currentY =
        window.scrollY;

      const hero =
        getCurrentHero();

      let isInsideHero =
        false;


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
         INSIDE HERO
      ===================================================== */

      if (isInsideHero) {
        const heroRect =
          hero.getBoundingClientRect();

        const heroScrolledAmount =
          Math.max(
            0,
            -heroRect.top
          );

        const hasScrolledHero =
          heroScrolledAmount >
          38;


        setHeroScrolled(
          hasScrolledHero
        );

        setVisible(true);

        lastScrollY.current =
          currentY;

        ticking.current =
          false;

        return;
      }


      /* =====================================================
         OUTSIDE HERO
      ===================================================== */

      setHeroScrolled(false);


      const delta =
        currentY -
        lastScrollY.current;


      /* MICRO SCROLL */

      if (
        Math.abs(delta) < 6
      ) {
        ticking.current =
          false;

        return;
      }


      /* SCROLL DOWN */

      if (delta > 0) {
        setVisible(false);
      }


      /* SCROLL UP */

      if (delta < 0) {
        setVisible(true);
      }


      /* VERY TOP */

      if (currentY <= 5) {
        setVisible(true);
      }


      lastScrollY.current =
        currentY;

      ticking.current =
        false;
    };


    const handleScroll =
      () => {
        if (
          ticking.current
        ) {
          return;
        }


        ticking.current =
          true;


        requestAnimationFrame(
          updateNavbar
        );
      };


    const handleResize =
      () => {
        requestAnimationFrame(
          updateNavbar
        );
      };


    const initialFrame =
      requestAnimationFrame(
        () => {
          lastScrollY.current =
            window.scrollY;

          updateNavbar();
        }
      );


    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );


    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {
      cancelAnimationFrame(
        initialFrame
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [
    location.pathname,
  ]);


  /* =========================================================
     BODY LOCK WHEN MOBILE MENU OPEN
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
  }, [
    menuOpen,
  ]);


  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    const handleKeyDown =
      (event) => {
        if (
          event.key ===
          "Escape"
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
     CLOSE MOBILE MENU ON DESKTOP
  ========================================================= */

  useEffect(() => {
    const handleResize =
      () => {
        if (
          window.innerWidth >
          1080
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
     CLOSE MOBILE MENU
  ========================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* =========================================================
     ACTIVE ROUTE
  ========================================================= */

  const isActiveRoute = (
    to
  ) => {
    if (
      to.includes("#")
    ) {
      return (
        location.pathname +
        location.hash
      ) === to;
    }


    if (
      to === "/"
    ) {
      return (
        location.pathname ===
        "/"
      );
    }


    return (
      location.pathname ===
        to ||
      location.pathname.startsWith(
        `${to}/`
      )
    );
  };


  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}

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

          <Link
            to={
              navbarData.logo.to
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
          </Link>


          {/* =================================================
              DESKTOP LINKS
          ================================================= */}

          <nav
            className="vidya-nav-links"
            aria-label="Main navigation"
          >
            {navbarData.links.map(
              (link) => {
                const active =
                  isActiveRoute(
                    link.to
                  );


                return (
                  <Link
                    key={
                      link.label
                    }
                    to={
                      link.to
                    }
                    className={`
                      vidya-nav-link
                      ${
                        active
                          ? "is-active"
                          : ""
                      }
                    `}
                  >
                    <span>
                      {link.label}
                    </span>
                  </Link>
                );
              }
            )}
          </nav>


          {/* =================================================
              RIGHT ACTIONS
          ================================================= */}

          <div className="vidya-nav-actions">

            {/* DESKTOP ENQUIRE */}

            <Link
              to={
                navbarData.cta.to
              }
              className="vidya-nav-cta"
              onClick={
                closeMenu
              }
            >
              {
                navbarData.cta.label
              }
            </Link>


            {/* MOBILE MENU */}

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
                      duration:
                        0.18,
                    }}
                  >
                    <X
                      size={20}
                      strokeWidth={
                        1.8
                      }
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
                      duration:
                        0.18,
                    }}
                  >
                    <Menu
                      size={21}
                      strokeWidth={
                        1.8
                      }
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

              {/* MOBILE LINKS */}

              <nav
                className="vidya-mobile-menu-links"
                aria-label="Mobile navigation"
              >
                {navbarData.links.map(
                  (
                    link,
                    index
                  ) => {
                    const active =
                      isActiveRoute(
                        link.to
                      );


                    return (
                      <MotionLink
                        key={
                          link.label
                        }
                        to={
                          link.to
                        }
                        onClick={
                          closeMenu
                        }
                        className={
                          active
                            ? "is-active"
                            : ""
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
                          {
                            link.label
                          }
                        </span>

                        <ArrowUpRight
                          size={16}
                          strokeWidth={
                            1.6
                          }
                        />
                      </MotionLink>
                    );
                  }
                )}
              </nav>


              {/* MOBILE FOOTER */}

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


                <Link
                  to={
                    navbarData.cta.to
                  }
                  onClick={
                    closeMenu
                  }
                  className="vidya-mobile-menu-cta"
                >
                  <span>
                    {
                      navbarData.cta.label
                    }
                  </span>

                  <ArrowUpRight
                    size={16}
                    strokeWidth={
                      1.7
                    }
                  />
                </Link>

              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default Navbar;