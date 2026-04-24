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
import PrivacyPolicy from "./components/PrivacyPolicy";
import SEO from "./common/SEO";
import { SuccessStories } from "./components/SuccessStories";
import { LearningJourney } from "./components/LearningJourney";
import { StatsSection } from "./components/StatsSection";
import { TechStack } from "./components/TechStack";
import { StickyScroll } from "./components/StickyScroll";
import { motion, useScroll, useSpring } from "framer-motion";
import { ServiceDetail } from "./components/ServiceDetail";
import { Projects } from "./components/Projects";


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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-slate-50 min-h-screen font-sans overflow-x-hidden flex flex-col">
      {!isAdminPath && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
          style={{ scaleX }}
        />
      )}
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
    <SEO
      title="Bluestone Tech Park | Software Excellence Center"
      description="Master the future of Full-Stack Development at Bluestone Tech Park. Enroll in our elite tech ecosystem for software excellence."
      canonical="/"
    />
    <Hero />
    <TechParkFeatures />
    <InnovationTimeline />
    <SimulationSection />
    <StickyScroll />
    <LearningJourney />
    <Services />
    <TechStack />
    <SuccessStories />
    <EcosystemGrid />
    <AcademySection />
    <Contact />
  </>
);

const ProjectsPage = () => (
  <>
    <SEO
      title="Our Projects | Portfolio"
      description="Explore the projects developed by Bluestone Tech Park. From mobile apps to web platforms, see our work in action."
      canonical="/projects"
    />
    <Projects />
  </>
);

const AboutPage = () => (
  <div className="pt-20">
    <SEO
      title="About Us"
      description="Learn why Bluestone Tech Park is the leading tech ecosystem for innovation and software development training."
      canonical="/about"
    />
    <WhyChooseUs />
    <TechParkFeatures />
  </div>
);

const ServicesPage = () => (
  <div className="pt-20">
    <SEO
      title="Our Services"
      description="Explore the wide range of tech services offered by Bluestone Tech Park, from development to innovation ecosystems."
      canonical="/services"
    />
    <Services />
  </div>
);

const CoursesPage = () => (
  <div className="pt-20">
    <SEO
      title="Professional Tech Courses"
      description="Join our expert-led courses in Full-Stack Development and other emerging technologies at Bluestone Tech Park."
      canonical="/courses"
    />
    <Courses />
  </div>
);

const ContactPage = () => (
  <div className="pt-20">
    <SEO
      title="Contact Us"
      description="Get in touch with Bluestone Tech Park for enrollment, inquiries, and partnerships. Start your tech journey today."
      canonical="/contact"
    />
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
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={
            <>
              <SEO
                title="Privacy Policy"
                description="Read the privacy policy of Bluestone Tech Park to understand how we handle your data."
                canonical="/privacy-policy"
              />
              <PrivacyPolicy />
            </>
          } />


          {/* 2. ADD ADMIN ROUTE */}
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </Router>
  );
}