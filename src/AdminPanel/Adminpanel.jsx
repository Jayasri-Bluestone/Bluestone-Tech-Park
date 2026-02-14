import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, MessageSquare, Users, PlusCircle, 
  BookOpen, Settings, LogOut 
} from "lucide-react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Import your components
import { AdminDashboard } from "./AdminDashboard";
import { AdminEnquiry } from "./AdminEnquiry";
import { AdminLeads } from "./AdminLeads";
import { AddServices } from "./AddServices";
import { AddCourses } from "./AddCourses";
import { LoginForm } from "./LoginForm";
import { AdminSettings } from "./AdminSettings";
import { CategorySettings } from "./CategorySetting";
import { MediaManagement } from "./AdminMedia";

export const AdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("bluestone_admin_auth") === "true";
  });
  
  const [leads, setLeads] = useState([]);

  // 2. Auth Handlers (MUST BE INSIDE THE COMPONENT)
  const handleLogin = () => {
    localStorage.setItem("bluestone_admin_auth", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("bluestone_admin_auth");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home on logout
  };

  // 3. Data Fetching
  const fetchLeads = async () => {
    try {
      const res = await fetch("http://localhost:5003/api/leads");
      const data = await res.json();
      setLeads(data);
    } catch (err) { 
      console.error("Fetch error:", err); 
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchLeads();
  }, [isLoggedIn]);

  // 4. Menu Config
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} />, color: "text-blue-400" },
    { name: "Enquiry", path: "/admin/enquiry", icon: <MessageSquare size={20} />, color: "text-orange-400" },
    { name: "Leads", path: "/admin/leads", icon: <Users size={20} />, color: "text-green-400" },
    { name: "Categories", path: "/admin/categories", icon: <Users size={20} />, color: "text-purple-400" },
    { name: "Add Services", path: "/admin/services", icon: <PlusCircle size={20} />, color: "text-cyan-400" },
    { name: "Add Courses", path: "/admin/courses", icon: <BookOpen size={20} />, color: "text-pink-400" },
    { name: "Media Management", path: "/admin/media", icon: <Settings size={20} />, color: "text-slate-400" },
    { name: "Admin Settings", path: "/admin/settings", icon: <Settings size={20} />, color: "text-slate-400" },
  ];

  // Helper to get active name for header
  const getActiveTabName = () => {
    const item = menuItems.find(item => item.path === location.pathname);
    return item ? item.name : "Dashboard";
  };

  if (!isLoggedIn) return <LoginForm onLogin={handleLogin} />;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col fixed h-full shadow-2xl z-50">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl text-white">B</div>
            <div>
              <h1 className="text-sm font-black tracking-widest uppercase italic text-white leading-none">Bluestone</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">TECHPARK</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group ${
                location.pathname === item.path 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`${location.pathname === item.path ? "text-white" : item.color}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-bold tracking-tight">{item.name}</span>
              </div>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-4 px-4 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all font-bold text-sm"
          >
            <LogOut size={20} /> Logout Account
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-10 bg-slate-50 min-h-screen">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{getActiveTabName()}</h2>
            <p className="text-slate-400 text-sm font-medium">Manage your data here.</p>
          </div>
        </header>

        <div className="relative">
          <Routes>
            <Route path="/" element={<AdminDashboard leads={leads} />} />
            <Route path="/enquiry" element={<AdminEnquiry leads={leads} refresh={fetchLeads} />} />
            <Route path="/leads" element={<AdminLeads leads={leads} refresh={fetchLeads} />} />
            <Route path="/categories" element={<CategorySettings />} />
            <Route path="/services" element={<AddServices />} />
            <Route path="/courses" element={<AddCourses />} />
            <Route path="/media" element={<MediaManagement />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};