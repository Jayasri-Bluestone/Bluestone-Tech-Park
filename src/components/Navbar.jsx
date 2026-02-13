import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg py-3 border-b border-slate-100"
          : "bg-transparent py-5 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        
        {/* Logo Section - Shrinks slightly on mobile to save space */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 z-[110]">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-blue-600 shadow-sm">
            <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg md:text-xl font-black text-blue-600 italic tracking-tighter leading-none">
            BLUESTONE <span className="text-black">TECHPARK</span>
          </span>
        </Link>

        {/* Desktop Menu - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className="relative px-3 py-2 text-[11px] lg:text-xs font-black uppercase tracking-[0.2em] transition-colors group"
              >
                <span className={isActive ? "text-blue-600" : "text-slate-900 group-hover:text-blue-600"}>
                  {link.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600"
                  />
                )}
              </Link>
            );
          })}
          
          <Link 
            to="/courses" 
            className="ml-4 px-6 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-all shadow-md active:scale-95"
          >
            Enroll
          </Link>
        </div>

        {/* Mobile Menu Button - High Z-index to stay above menu */}
        <button
          className="md:hidden z-[110] p-2 text-slate-900 bg-white/50 backdrop-blur-sm rounded-full"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[100] md:hidden"
          >
            {/* Background Decorative Element */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[30%] bg-blue-50 rounded-full blur-[100px] opacity-60" />

            <div className="flex flex-col justify-center h-full px-10 space-y-5 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={`text-xl font-black uppercase tracking-tighter block ${
                      location.pathname === link.href ? "text-blue-600" : "text-slate-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.4 }}
                className="pt-10 border-t border-slate-100"
              >
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-4">Start your journey</p>
                <Link to="/contact" className="text-2xl text-blue-600 font-black italic flex items-center gap-2">
                  ENROLL <span className="text-3xl">→</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};