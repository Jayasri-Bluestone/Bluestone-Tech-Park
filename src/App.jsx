import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Services } from "./components/Services";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { TechParkFeatures } from "./components/TechParkFeatures";
import { Courses } from "./components/Courses";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
//import BluestoneExperience from "./components/Home";
import { AdminPanel } from "./AdminPanel/Adminpanel";
import { Hero } from "./components/Hero";
import { InnovationTimeline } from "./components/Timeline";
import { SimulationSection } from "./components/Simul";
import { EcosystemGrid } from "./components/Ecosystem";
import { AcademySection } from "./components/Academy";


// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout Wrapper to hide Navbar/Footer on Admin Route
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden flex flex-col">
      {!isAdminPath && <Navbar />} {/* Hide Navbar on Admin */}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPath && <Footer />} {/* Hide Footer on Admin */}
    </div>
  );
};

// Component Composition for Routes
const HomePage = () => (
  <>
      <Hero />
      <TechParkFeatures/>
      <InnovationTimeline />
      <SimulationSection/>
      <Services />
      <EcosystemGrid />
      <AcademySection />
      <Contact/>
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
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* 2. ADD ADMIN ROUTE */}
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </Router>
  );
}