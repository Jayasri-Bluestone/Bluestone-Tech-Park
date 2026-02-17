import React from 'react';
import { Trash2, ArrowRightCircle, MessageSquare, AlertCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export const AdminEnquiry = ({ leads, refresh }) => {
  // Filter only contact form submissions
  const enquiries = leads.filter(l => l.form_type === 'CONTACT_FORM');

  // 1. The actual API logic
  const executeAction = async (id, type) => {
    const url = type === 'move' 
      ? `https://bluestoneinternationalpreschool.com/techpark_api/api/enquiry/move/${id}`
      : `https://bluestoneinternationalpreschool.com/techpark_api/api/enquiry/${id}`;
    
    const method = type === 'move' ? 'PATCH' : 'DELETE';
    const loadingToast = toast.loading(type === 'move' ? "Approving lead..." : "Deleting...");

    try {
      const res = await fetch(url, { method });
      if (res.ok) {
        toast.success(
          type === 'move' ? "Lead moved to Active Leads!" : "Enquiry deleted successfully", 
          { id: loadingToast }
        );
        refresh(); // Refresh the parent state
      } else {
        toast.error("Action failed. Please check server.", { id: loadingToast });
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Is the backend running?", { id: loadingToast });
    }
  };

  // 2. The Confirmation Toast Trigger
  const confirmAction = (id, type) => {
    toast((t) => (
      <div className="flex items-center gap-4 p-1">
        <div className={`p-2 rounded-full ${type === 'move' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          <AlertCircle size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">
            {type === 'move' ? "Move to Active Leads?" : "Are you sure?"}
          </p>
          <p className="text-[11px] text-slate-500 mb-2">This action cannot be undone.</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                executeAction(id, type);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm transition-transform active:scale-95 ${
                type === 'move' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-transform active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ), {
      duration: 6000,
      position: 'top-center',
      style: {
        minWidth: '300px',
        borderRadius: '16px',
        background: '#fff',
        color: '#333',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Container for all toast notifications */}
      <Toaster />

      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-widest">Username</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-widest">Phone Number</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-widest">Email Id</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-widest">Service</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-widest">Message</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {enquiries.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                {/* Username */}
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-800 uppercase italic leading-none">{item.name}</p>
                  <span className="text-[10px] text-gray-400 font-medium tracking-tight">Lead ID: #{item.id}</span>
                </td>

                {/* Contact Info */}
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-gray-700">{item.phone}</p>
                  
                </td>

                 <td className="px-6 py-4">
                  <p className="px-6 py-4 text-blue-600 font-medium">{item.email}</p>
                  
                </td>

                {/* Service */}
                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                    {item.service}
                  </span>
                </td>

                {/* Message */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm max-w-[250px] truncate">
                    <MessageSquare size={14} className="flex-shrink-0 text-gray-300" />
                    <span className="truncate" title={item.message}>{item.message || "No message"}</span>
                  </div>
                </td>

                {/* Action Buttons */}
                <td className="px-6 py-4">
                  <div className="flex gap-3 justify-center">
                    <button 
                      onClick={() => confirmAction(item.id, 'move')} 
                      className="p-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg shadow-green-200 transition-all active:scale-90"
                      title="Approve Lead"
                    >
                      <ArrowRightCircle size={18}/>
                    </button>
                    <button 
                      onClick={() => confirmAction(item.id, 'delete')} 
                      className="p-2.5 bg-white border border-red-100 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all active:scale-90"
                      title="Delete Entry"
                    >
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {enquiries.length === 0 && (
           <div className="p-24 text-center">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-gray-200" size={32} />
             </div>
             <p className="text-gray-300 font-black italic uppercase tracking-widest text-sm">
               Inbox is Empty
             </p>
           </div>
        )}
      </div>
    </div>
  );
};