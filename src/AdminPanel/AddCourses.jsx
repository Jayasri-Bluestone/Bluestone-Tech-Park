import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, Trash2, PlusCircle, Edit3, X, Save } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Pagination, StatusToggle, API_BASE } from './Common/AdminUtils';

const categories = ["Development", "Mobile", "Marketing", "No-Code"];

export const AddCourses = () => {
  const initialForm = {
    title: "", 
    category: "Development", 
    description: "", 
    icon_name: "Code"
  };

  const [formData, setFormData] = useState(initialForm);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null); // Track which course is being edited
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });



  const fetchList = async (page = 1) => {
    try {
      const res = await fetch(`${API_BASE}/api/courses?page=${page}&limit=10&admin=true`);
      const result = await res.json();
      setCourses(result.data);
      setPagination(result.pagination);
    } catch (err) {
      toast.error("Failed to load courses");
    }
  };

  useEffect(() => { fetchList(pagination.page); }, [pagination.page]);

  const handleStatusToggle = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/api/courses/status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus ? 1 : 0 })
      });
      if (res.ok) {
        setCourses(courses.map(c => c.id === id ? { ...c, status: newStatus ? 1 : 0 } : c));
        toast.success("Status updated");
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // --- ACTIVATE EDIT MODE ---
  const handleEdit = (course) => {
    setEditingId(course.id);
    setFormData({
      title: course.title,
      category: course.category,
      description: course.description,
      icon_name: course.icon_name
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- CANCEL EDIT ---
  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEditing = editingId !== null;
    const loadingToast = toast.loading(isEditing ? "Updating course..." : "Publishing course...");

    // Switch between PUT (Update) and POST (Create)
    const url = isEditing 
      ? `${API_BASE}/api/courses/${editingId}` 
      : `${API_BASE}/api/courses`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success(isEditing ? "Course Updated!" : "Course Published!", { id: loadingToast });
        cancelEdit();
        fetchList();
      } else {
        toast.error("Action failed", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Database connection error", { id: loadingToast });
    }
  };

  const deleteCourse = async (id) => {
    if(!window.confirm("Delete this course?")) return;
    const deleting = toast.loading("Deleting...");
    const res = await fetch(`${API_BASE}/api/courses/${id}`, { method: 'DELETE' });
    if(res.ok) {
      toast.success("Course deleted", { id: deleting });
      if (editingId === id) cancelEdit();
      fetchList();
    }
  };

  const filteredIcons = Object.keys(LucideIcons)
    .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 20);

  return (
    <div className="flex flex-col gap-8 p-6 max-w-6xl mx-auto">
      <Toaster />
      
      <div className={`bg-white p-8 rounded-3xl border shadow-sm transition-all ${editingId ? 'ring-2 ring-pink-500 border-transparent' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black flex items-center gap-2">
            <PlusCircle className={editingId ? "text-blue-600" : "text-pink-600"} /> 
            {editingId ? "EDIT PROGRAM" : "ADD NEW PROGRAM"}
          </h2>
          {editingId && (
            <button onClick={cancelEdit} className="flex items-center gap-1 text-slate-400 hover:text-red-500 font-bold text-xs uppercase">
              <X size={16} /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input className="w-full p-3 border rounded-xl font-bold" placeholder="Course Title" onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title} required />
            <select className="w-full p-3 border rounded-xl" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <textarea className="w-full p-3 border rounded-xl h-32" placeholder="Description" onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData.description} required />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl">
              <Search size={18} className="ml-2 text-slate-400" />
              <input className="bg-transparent outline-none w-full p-1" placeholder="Search icon name..." onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="grid grid-cols-5 gap-2 h-40 overflow-y-auto p-2 border rounded-xl bg-slate-50">
              {filteredIcons.map(iconName => {
                const Icon = LucideIcons[iconName];
                return (
                  <button key={iconName} type="button" onClick={() => setFormData({...formData, icon_name: iconName})} className={`p-2 rounded-lg flex items-center justify-center transition-all ${formData.icon_name === iconName ? 'bg-pink-600 text-white shadow-md' : 'bg-white text-slate-400 hover:text-slate-600'}`}>
                    {Icon && <Icon size={20} />}
                  </button>
                )
              })}
            </div>
            <button type="submit" className={`w-full py-4 text-white font-black rounded-xl transition-all uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 ${editingId ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-pink-600 hover:bg-pink-700 shadow-pink-200'}`}>
              {editingId ? <Save size={18}/> : null}
              {editingId ? "Update Changes" : "Publish Program"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-3xl border shadow-sm overflow-hidden">
        <h3 className="font-bold text-slate-400 mb-6 uppercase tracking-widest text-xs">Active Programs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Program</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Description</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Category</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {courses.map((c) => {
                const Icon = LucideIcons[c.icon_name] || LucideIcons.PlusCircle;
                return (
                  <tr key={c.id} className="group hover:bg-blue-50/30 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg shadow-sm text-pink-600">
                          <Icon size={18} />
                        </div>
                        <p className="font-bold text-slate-800 text-sm uppercase">{c.title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-500 text-xs max-w-[300px] truncate font-medium">{c.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] text-blue-600 uppercase font-black bg-blue-50 px-3 py-1 rounded-full">{c.category}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusToggle 
                        status={c.status} 
                        onToggle={(newStatus) => handleStatusToggle(c.id, newStatus)} 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => handleEdit(c)} className="p-2 bg-white text-blue-400 hover:text-blue-600 rounded-lg border border-slate-100 shadow-sm"><Edit3 size={16}/></button>
                        <button onClick={() => deleteCourse(c.id)} className="p-2 bg-white text-red-400 hover:text-red-600 rounded-lg border border-slate-100 shadow-sm"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <Pagination 
            currentPage={pagination.page} 
            totalPages={pagination.totalPages} 
            onPageChange={(page) => setPagination(prev => ({ ...prev, page }))} 
          />

          {courses.length === 0 && <p className="text-slate-400 italic text-sm p-10 text-center">No programs found.</p>}
        </div>
      </div>
    </div>
  );
};