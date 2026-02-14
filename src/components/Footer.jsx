import React from "react";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950 text-slate-300 pt-16 pb-8 border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="text-2xl font-bold text-white tracking-tighter mb-6 block"
            >
              BLUESTONE <span className="text-white">TECHPARK</span>
            </Link>
            <p className="text-slate-300 leading-relaxed mb-6">
              Empowering businesses with cutting-edge technology and shaping the
              future of developers through world-class education.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/bluestone-techpark" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/bluestone_techpark" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@bluestonetechpark" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://www.facebook.com/bluestonetechpark" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center hover:bg-blue-800 hover:text-white transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 underline decoration-blue-500 underline-offset-8">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info - Replaced Popular Courses */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 underline decoration-blue-500 underline-offset-8">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin size={20} className="text-blue-400 shrink-0 group-hover:text-white transition-colors" />
                <a 
                  href="https://maps.google.com/?q=Renaissance+Terrace+Coimbatore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-sm leading-relaxed"
                >
                  Renaissance Terrace, 126 L, Race Course, Coimbatore, TN 641018
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={20} className="text-blue-400 shrink-0 group-hover:text-white transition-colors" />
                <a href="tel:+917092614666" className="hover:text-white transition-colors text-sm">
                  +91 70926 14666
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail size={20} className="text-blue-400 shrink-0 group-hover:text-white transition-colors" />
                <a href="mailto:info@bluestonetechpark.com" className="hover:text-white transition-colors text-sm">
                  info@bluestonetechpark.com
                </a>
              </li>
            </ul>
          </div>

          {/* Optional: Newsletter or extra space */}
          <div className="flex flex-col justify-center">
             <div className="p-4 rounded-xl bg-blue-800/20 border border-blue-700/30">
               <p className="text-white font-medium text-sm mb-2">Ready to start?</p>
               <p className="text-xs text-slate-400 mb-4">Transform your business with our expertise.</p>
               <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-all">
                 Get Started →
               </Link>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800/50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Bluestone Tech Park. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};