import React from 'react';
import { Trash2, Download, MessageSquare, Mail, Phone, MessageCircle } from "lucide-react";
import toast from "react-hot-toast"; // Ensure Toaster is rendered in your parent component

export const AdminLeads = ({ leads, refresh }) => {
  // Filter for approved leads
  const activeLeads = leads.filter(l => l.form_type === 'LEAD');

  // --- CSV Export Function ---
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Service", "Message", "Date"];
    const rows = activeLeads.map(l => [
      l.name,
      l.email,
      l.phone,
      l.service || "General",
      `"${(l.message || "").replace(/"/g, '""')}"`,
      new Date(l.created_at).toLocaleString()
    ].join(","));

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Bluestone_Leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleDelete = async (id) => {
    // 1. Trigger the confirmation toast
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold text-slate-800">
          Delete this lead? This cannot be undone.
        </p>
        <div className="flex gap-2">
          {/* CONFIRM BUTTON */}
          <button
            onClick={async () => {
              toast.dismiss(t.id); // Remove the question
              const loadingToast = toast.loading("Deleting...");

              try {
                const res = await fetch(`https://bluestoneinternationalpreschool.com/techpark_api/api/enquiry/${id}`, { 
                  method: 'DELETE' 
                });

                if (res.ok) {
                  toast.success("Lead removed.", { id: loadingToast });
                  refresh(); // Triggers the list update
                } else {
                  toast.error("Server error. Try again.", { id: loadingToast });
                }
              } catch (err) {
                toast.error("Network error.", { id: loadingToast });
              }
            }}
            className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase"
          >
            Confirm
          </button>

          {/* CANCEL BUTTON */}
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold uppercase"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
    });
  };

  return (
    <div className="space-y-4">
      {/* Header with Export */}
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-black text-slate-800 italic uppercase tracking-tight ml-2">Verified Leads</h2>
        <button 
          onClick={exportToCSV}
          className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-blue-600 transition-all"
        >
          <Download size={14} /> EXPORT CSV
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-widest">Username</th>
                <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-widest">Phone</th>
                <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-widest">Email</th>
                <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-widest">Service Interest</th>
                <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-widest">Messages</th>
                <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {activeLeads.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-700 uppercase italic">{item.name}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{item.phone}</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">{item.email}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                      {item.service || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm max-w-[200px] truncate" title={item.message}>
                      <MessageSquare size={14} className="flex-shrink-0" />
                      {item.message || "No message provided"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <a 
                        href={`https://wa.me/${item.phone.replace(/\D/g, '')}`} 
                        target="_blank" rel="noreferrer"
                        className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"
                        title="WhatsApp"
                      >
                        <MessageCircle size={18}/>
                      </a>
                      <a 
                        href={`mailto:${item.email}`}
                        className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                        title="Send Email"
                      >
                        <Mail size={18}/>
                      </a>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="p-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {activeLeads.length === 0 && (
            <div className="p-20 text-center text-gray-300 font-black italic uppercase tracking-widest">
              No Approved Leads Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};