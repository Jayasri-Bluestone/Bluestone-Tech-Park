import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { TechParkFeatures } from "./components/TechParkFeatures";
import { Courses } from "./components/Courses";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Component Composition for Routes
const HomePage = () => (
  <>
    <Hero />
    <TechParkFeatures />
    <WhyChooseUs/>
     <Services />
    <Courses />
    <Contact />
  </>
);

const AboutPage = () => (
  <div className="pt-20">
    <WhyChooseUs />
    <TechParkFeatures />
  </div>
);

const ServicesPage = () => (
  <div className="pt-20">
    <Services />
    <WhyChooseUs />
  </div>
);

const CoursesPage = () => (
  <div className="pt-20">
    <Courses />
  </div>
);

const ContactPage = () => (
  <div className="pt-20">
    <Contact />
  </div>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
