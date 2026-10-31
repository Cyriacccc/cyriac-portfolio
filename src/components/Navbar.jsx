
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Navbar = () => {
  return (
    <motion.header
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
        <a href="#creative">Vidéo</a>
        <a href="#about">À propos</a>
      </nav>

      <a href="#contact" className="contact-link">
        Me contacter <ArrowUpRight size={16} />
      </a>
    </motion.header>
  );
};

export default Navbar;
