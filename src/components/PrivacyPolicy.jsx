import React, { useState } from "react";
import { 
  ShieldCheck, Database, UserCheck, History, Mail, 
  ExternalLink, Scale, Cookie, Lock, ChevronRight,
  Info, ShieldAlert, Globe, Trash2, Users
} from "lucide-react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("intro");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const sections = [
    { id: "intro", title: "Introduction", icon: <Info size={18} /> },
    { id: "definitions", title: "Definitions", icon: <Scale size={18} /> },
    { id: "collection", title: "Data Collection", icon: <Database size={18} /> },
    { id: "usage", title: "Use of Data", icon: <UserCheck size={18} /> },
    { id: "retention", title: "Retention", icon: <History size={18} /> },
    { id: "transfer", title: "Data Transfer", icon: <Globe size={18} /> },
    { id: "deletion", title: "Your Rights", icon: <Trash2 size={18} /> },
    { id: "security", title: "Security", icon: <Lock size={18} /> },
    { id: "children", title: "Children's Privacy", icon: <ShieldAlert size={18} /> },
    { id: "contact", title: "Contact", icon: <Mail size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100">
   

      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row gap-12">
        {/* Navigation Sidebar */}
        <aside className="lg:w-72 flex-shrink-0">
          <nav className="sticky top-32 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-4">Policy Sections</p>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeSection === section.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100 translate-x-1" 
                  : "text-slate-500 hover:bg-white hover:text-blue-600"
                }`}
              >
                {section.icon}
                {section.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Text Content */}
        <main className="flex-1 space-y-12 pb-24">
          <article className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 md:p-16 prose prose-slate max-w-none prose-headings:font-black prose-p:leading-relaxed prose-li:my-1">
            
            <section id="intro" className="scroll-mt-36">
              <p className="text-xl text-slate-600 font-medium italic border-l-4 border-blue-600 pl-6 py-2">
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
              </p>
              <p className="mt-6">
                We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </section>

            <hr className="my-12 border-slate-100" />

            <section id="definitions" className="scroll-mt-32">
              <h2 className="flex items-center gap-3 text-slate-900 uppercase italic tracking-tighter">
                <span className="text-blue-600">01.</span> Interpretation & Definitions
              </h2>
              <h3>Interpretation</h3>
              <p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
              
              <h3 className="mt-8">Definitions</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {[
                  { l: "Account", d: "A unique account created for You to access our Service or parts of our Service." },
                  { l: "Affiliate", d: "An entity that controls, is controlled by, or is under common control with a party (50%+ ownership)." },
                  { l: "Company", d: "Bluestone Techpark, 2nd floor, Renaissance Terrace, 126L, Gopalapuram, Coimbatore." },
                  { l: "Cookies", d: "Small files placed on Your device containing details of Your browsing history." },
                  { l: "Personal Data", d: "Any information that relates to an identified or identifiable individual." },
                  { l: "Service Provider", d: "Any natural or legal person who processes the data on behalf of the Company." }
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col">
                    <span className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">{item.l}</span>
                    <p className="text-sm leading-snug m-0 text-slate-600">{item.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="collection" className="scroll-mt-32 pt-16">
              <h2 className="flex items-center gap-3 text-slate-900 uppercase italic tracking-tighter">
                <span className="text-blue-600">02.</span> Collecting Your Data
              </h2>
              <h3>Types of Data Collected</h3>
              <h4>Personal Data</h4>
              <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information:</p>
              <ul className="flex flex-wrap gap-2 list-none p-0">
                {["Email address", "First name and last name", "Phone number", "Usage Data"].map(tag => (
                  <li key={tag} className="m-0 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-100">
                    {tag}
                  </li>
                ))}
              </ul>

              <h4 className="mt-8">Usage Data</h4>
              <p>Usage Data is collected automatically. This includes Your Device's IP address, browser type, browser version, the pages You visit, and the time spent on those pages.</p>

              <div className="bg-slate-900 rounded-3xl p-8 text-white mt-10 not-prose">
                <div className="flex items-center gap-3 mb-4">
                  <Cookie className="text-blue-400" />
                  <h3 className="text-xl font-black uppercase italic tracking-tight m-0">Tracking Technologies</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-0">
                  We use Cookies, Web Beacons, and similar tracking technologies to track activity. 
                  We use both <strong>Session Cookies</strong> (deleted when you close your browser) 
                  and <strong>Persistent Cookies</strong> (remain on your device when you go offline).
                </p>
              </div>
            </section>

            <section id="usage" className="scroll-mt-32 pt-16">
              <h2 className="flex items-center gap-3 text-slate-900 uppercase italic tracking-tighter">
                <span className="text-blue-600">03.</span> Use of Personal Data
              </h2>
              <p>The Company may use Personal Data for the following purposes:</p>
              <div className="grid gap-4 mt-6">
                {[
                  { t: "Maintenance", d: "To provide and maintain our Service, including to monitor usage." },
                  { t: "Account Management", d: "To manage Your registration as a user of the Service." },
                  { t: "Contract Performance", d: "Compliance and undertaking of purchase contracts." },
                  { t: "Communication", d: "To contact You by email, phone, or SMS regarding updates." },
                  { t: "Business Transfers", d: "To evaluate mergers, divestitures, or asset transfers." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start border-b border-slate-50 pb-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                      <ChevronRight size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <strong className="text-slate-900 uppercase text-xs tracking-wider">{item.t}</strong>
                      <p className="m-0 text-slate-600 text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="retention" className="scroll-mt-32 pt-16">
              <h2 className="flex items-center gap-3 text-slate-900 uppercase italic tracking-tighter">
                <span className="text-blue-600">04.</span> Data Retention
              </h2>
              <p>We apply different retention periods to different categories of Personal Data based on the purpose of processing:</p>
              <div className="not-prose overflow-hidden rounded-2xl border border-slate-200 mt-6">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 italic text-slate-600">
                    <tr><td className="px-6 py-4 font-bold">User Accounts</td><td className="px-6 py-4">Relationship duration + up to 24 months</td></tr>
                    <tr><td className="px-6 py-4 font-bold">Support Tickets</td><td className="px-6 py-4">Up to 24 months from closure</td></tr>
                    <tr><td className="px-6 py-4 font-bold">Analytics Data</td><td className="px-6 py-4">Up to 24 months from collection</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="transfer" className="scroll-mt-32 pt-16">
              <h2 className="flex items-center gap-3 text-slate-900 uppercase italic tracking-tighter">
                <span className="text-blue-600">05.</span> Transfer of Data
              </h2>
              <p>Your information is processed at the Company's operating offices and in any other places where the parties involved are located. This means information may be transferred to computers located outside of Your jurisdiction where data protection laws may differ.</p>
              <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy.</p>
            </section>

            <section id="deletion" className="scroll-mt-32 pt-16">
              <h2 className="flex items-center gap-3 text-slate-900 uppercase italic tracking-tighter">
                <span className="text-blue-600">06.</span> Delete Your Data
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-2xl">
                <p className="m-0 font-bold text-blue-900">You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
                <p className="mt-4 text-blue-800 text-sm">You may update, amend, or delete Your information at any time by signing in to Your Account or contacting us directly. Please note that We may need to retain certain information when we have a legal obligation to do so.</p>
              </div>
            </section>

            <section id="security" className="scroll-mt-32 pt-16">
              <h2 className="flex items-center gap-3 text-slate-900 uppercase italic tracking-tighter">
                <span className="text-blue-600">07.</span> Security of Data
              </h2>
              <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
            </section>

            <section id="children" className="scroll-mt-32 pt-16">
              <h2 className="flex items-center gap-3 text-slate-900 uppercase italic tracking-tighter">
                <span className="text-blue-600">08.</span> Children's Privacy
              </h2>
              <p>Our Service does not address anyone under the age of 16. We do not knowingly collect personally identifiable information from anyone under the age of 16. If We become aware that We have collected data from anyone under 16 without parental consent, We take steps to remove it.</p>
            </section>

            <section id="contact" className="scroll-mt-32 pt-16">
              <h2 className="flex items-center gap-3 text-slate-900 uppercase italic tracking-tighter">
                <span className="text-blue-600">09.</span> Contact Us
              </h2>
              <div className="not-prose bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white text-center">
                <Users className="mx-auto mb-6 text-blue-400" size={48} />
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Contact our Team</h3>
                <p className="text-slate-400 max-w-lg mx-auto mb-8">If you have any questions about this Privacy Policy, our Data Protection Officer is ready to help.</p>
                <a 
                  href="mailto:info@bluestonetechpark.com" 
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 group"
                >
                  <Mail size={18} /> 
                  info@bluestonetechpark.com 
                  <ExternalLink size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </section>

          </article>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Bluestone Techpark • Coimbatore, India
          </p>
          <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-slate-900">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;