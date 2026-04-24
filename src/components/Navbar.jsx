import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dbServices, setDbServices] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("https://bluestoneinternationalpreschool.com/techpark_api/api/services");
        const data = await res.json();
        setDbServices(data);
      } catch (err) {
        console.error("Navbar services fetch error:", err);
      }
    };
    fetchServices();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { 
      name: "Services", 
      href: "/services",
      dropdown: dbServices.map(s => ({ name: s.title, href: `/services/${s.id}` }))
    },
    { name: "Projects", href: "/projects" },
    { name: "Courses", href: "/courses" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg py-3"
          : "bg-transparent py-5 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2 md:gap-3 z-[110]">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shadow-sm">
            <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg md:text-xl font-black text-blue-600 italic tracking-tighter leading-none uppercase">
            BLUESTONE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600">TECHPARK</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || (link.dropdown && link.dropdown.some(d => location.pathname === d.href));
            
            if (link.dropdown && link.dropdown.length > 0) {
              return (
                <div 
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <Link
                    to={link.href}
                    className="flex items-center gap-1 px-3 py-2 text-[11px] lg:text-xs font-black uppercase tracking-[0.2em] transition-colors"
                  >
                    <span className={isActive ? "text-blue-600" : "text-slate-900 group-hover:text-blue-600"}>
                      {link.name}
                    </span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`} />
                  </Link>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden"
                      >
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

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

        <button
          className="md:hidden z-[110] p-2 text-slate-900 bg-white/50 backdrop-blur-sm rounded-full"
          onClick={() => setIsOpen(!isOpen)}
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
            className="fixed inset-0 bg-white z-[100] md:hidden overflow-y-auto"
          >
            <div className="flex flex-col pt-32 pb-20 px-10 space-y-6">
              {navLinks.map((link, i) => (
                <div key={link.name}>
                  <Link
                    to={link.href}
                    className={`text-2xl font-black uppercase tracking-tighter block mb-2 ${
                      location.pathname === link.href ? "text-blue-600" : "text-slate-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                  
                  {link.dropdown && (
                    <div className="pl-4 space-y-3 border-l-2 border-slate-100">
                      {link.dropdown.map(sub => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          className="block text-sm font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-10 border-t border-slate-100">
                <Link to="/contact" className="text-2xl text-blue-600 font-black italic flex items-center gap-2">
                  ENROLL <span className="text-3xl">→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};