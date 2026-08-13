import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import logo from "../assets/logo.png";
import wordmark from "../assets/sparkText.jpg";
import wordmarkDark from "../assets/sparkText.white.png";
//import wordmarkAsset from "../assets/placement-spark-wordmark.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/pricing", label: "Pricing" },
  { to: "/resources", label: "Resources" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-40 transition-all duration-300 " +
        (scrolled
          ? "bg-white/90 backdrop-blur border-b border-black/5 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.15)]"
          : "bg-white/60 backdrop-blur-sm")
      }
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <img
            src={logo}
            alt="Placement Spark logo"
            className="h-8 w-8 rounded-md object-contain"
          />
          <img
  src={wordmarkDark}
  alt="Placement Spark"
  className="h-10 w-auto object-contain dark:hidden"
/>

<img
  src={wordmark}
  alt="Placement Spark"
  className="hidden h-6 w-auto object-contain dark:block"
/>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="relative px-3 py-2 text-sm font-medium text-black/80 hover:text-black transition-colors"
              activeProps={{ className: "text-black" }}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle className="ml-1" />
          <Link to="/contact" className="btn-primary ml-2 text-sm">Register Free</Link>
        </nav>

        <div className="lg:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden border-t border-black/5 bg-white"
          >
            <div className="container-x flex flex-col py-3 gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-black/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/contact" className="btn-primary mt-2 text-sm" onClick={() => setOpen(false)}>
                Register Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
