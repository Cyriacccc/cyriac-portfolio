
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Navbar = () => {
  return (
    <m.header
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <a href="/" className="logo">
        CYRIAC<span>.</span>
      </a>

      <nav className="nav-links">
        <a href="#projects">Projets</a>
        <a href="#skills">Compétences</a>
        <a href="#creative">Vidéo</a>
        <a href="#about">À propos</a>
      </nav>

      <a href="#contact" className="contact-link">
        Me contacter <ArrowUpRight size={16} />
      </a>
    </m.header>
  );
};

export default Navbar;
