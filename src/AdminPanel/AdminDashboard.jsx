import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { 
  Users, MessageSquare, BookOpen, Layers, 
  TrendingUp, Clock, ArrowUpRight 
} from "lucide-react";

export const AdminDashboard = ({ leads = [] }) => {
  const navigate = useNavigate(); // Initialize navigation

  // Logic to calculate stats
  const totalEnquiries = leads.filter(l => l.form_type === 'CONTACT_FORM').length;
  const totalLeads = leads.filter(l => l.form_type === 'LEAD').length;

  const [view, setView] = React.useState('enquiry');
  
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const stats = [
    { 
        label: "Total Enquiries", 
        value: totalEnquiries, 
        icon: <MessageSquare size={24} />, 
        color: "bg-orange-500", 
        shadow: "shadow-orange-200",
        path: "/admin/enquiry" // Update with your actual route
    },
    { 
        label: "Qualified Leads", 
        value: totalLeads, 
        icon: <Users size={24} />, 
        color: "bg-blue-600", 
        shadow: "shadow-blue-200",
        path: "/admin/leads" 
    },
    { 
        label: "Active Courses", 
        value: "5", 
        icon: <BookOpen size={24} />, 
        color: "bg-pink-500", 
        shadow: "shadow-pink-200",
        path: "/admin/courses" 
    },
    { 
        label: "Total Services", 
        value: "8", 
        icon: <Layers size={24} />, 
        color: "bg-cyan-500", 
        shadow: "shadow-cyan-200",
        path: "/admin/services" 
    },
  ];

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }} // Added hover animation
            transition={{ delay: idx * 0.1 }}
            onClick={() => navigate(stat.path)} // NAVIGATION TRIGGER
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group cursor-pointer"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-[0.03] rounded-bl-full transition-all group-hover:scale-110`} />
            
            <div className={`w-12 h-12 ${stat.color} ${stat.shadow} rounded-2xl flex items-center justify-center text-white mb-4`}>
              {stat.icon}
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                    <h4 className="text-3xl font-black text-slate-800 mt-1">{stat.value}</h4>
                </div>
                <ArrowUpRight className="text-slate-300 group-hover:text-slate-600 transition-colors" size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Clock className="text-blue-600" /> Recent Activity
            </h3>
            {/* Clickable View All button */}
            <button 
                onClick={() => navigate('/admin/leads')}
                className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1"
            >
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentLeads.map((item) => (
              <div 
                key={item.id} 
                onClick={() => navigate('/admin/leads')} // Navigate on row click
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${item.form_type === 'LEAD' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                    {item.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.service || "Inquiry"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase ${item.form_type === 'LEAD' ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {item.form_type === 'LEAD' ? 'Lead' : 'Enquiry'}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-200">
          <TrendingUp className="mb-6 opacity-50" size={48} />
          <h3 className="text-2xl font-black mb-2 italic">Business <br />Growth</h3>
          <p className="text-blue-100 text-sm leading-relaxed mb-6">
            You have received <span className="font-bold text-white">{totalLeads} qualified leads</span>. Check your lead management portal.
          </p>
          <button 
            onClick={() => navigate('/admin/leads')}
            className="w-full bg-white text-blue-600 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors"
          >
            Manage Leads
          </button>
        </div>
      </div>
    </div>
  );
};