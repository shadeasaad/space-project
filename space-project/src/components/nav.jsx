import { useState, useEffect, useRef } from "react";
import logo from "../assets/shared/logo.svg";
import { useLocation, Link } from "react-router-dom";

const navItems = [
  { section: "home", number: "00", label: "HOME" },
  { section: "destination", number: "01", label: "DESTINATION" },
  { section: "crew", number: "02", label: "CREW" },
  { section: "technology", number: "03", label: "TECHNOLOGY" },
];

function NavBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const menuButtonRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    setIsOpen((prev) => (prev ? false : prev));
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  const renderLinks = (onClick) =>
    navItems.map((item) => {
      const itemPath = item.section === "home" ? "/" : `/${item.section}`;
      const isActive = location.pathname === itemPath;

      return (
        <li key={item.section}>
          <Link
            to={itemPath}
            onClick={onClick}
            className={`text-base font-bold tracking-wide flex items-center text-white/30 gap-3 cursor-pointer font-condensed pb-2 border-b-2 transition-all duration-500 ${
              isActive
                ? "border-white text-white/100"
                : "border-transparent hover:border-white/30"
            }`}
          >
            <span className={`${isActive ? "text-white/100" : "text-white/50"}`}>
              {item.number}
            </span>
            {item.label}
          </Link>
        </li>
      );
    });

  return (
    <nav className="flex justify-between h-fit py-6 lg:py-10 items-center relative">
      <div className="nav-icon ml-4 lg:ml-9 z-50">
        <img src={logo} alt="logo" />
      </div>

      <div className="line hidden lg:block h-[0.1px] bg-muted/50 fixed right-130 z-10 lg:w-100 xl:w-130"></div>
      <ul className="hidden lg:flex backdrop-blur-sm bg-white/3 items-center w-fit gap-12 h-18 px-8 text-white">
        {renderLinks()}
      </ul>

      <button
        ref={menuButtonRef}
        className="flex lg:hidden mr-6 z-50 text-white"
        aria-label="Open menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div
        role="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close menu"
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(false);
          }
        }}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-500 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs z-50 bg-gradient-to-b from-white/15 to-white/0 backdrop-blur-2xl transition-transform duration-500 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          ref={closeButtonRef}
          className="absolute top-8 right-6 text-white"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <ul className="flex flex-col gap-8 text-white mt-24 px-8">
          {renderLinks(() => setIsOpen(false))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;