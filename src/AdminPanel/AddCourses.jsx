import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, Trash2, PlusCircle, Edit3, X, Save } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

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

  const categories = ["Development", "Mobile", "Marketing", "No-Code"];

  const fetchList = async () => {
    try {
      const res = await fetch("http://localhost:5003/api/courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      toast.error("Failed to load courses");
    }
  };

  useEffect(() => { fetchList(); }, []);

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
      ? `http://localhost:5003/api/courses/${editingId}` 
      : "http://localhost:5003/api/courses";
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
    const res = await fetch(`http://localhost:5003/api/courses/${id}`, { method: 'DELETE' });
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

      <div className="bg-white p-8 rounded-3xl border shadow-sm">
        <h3 className="font-bold text-slate-400 mb-4 uppercase tracking-widest text-xs">Active Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map(c => (
            <div key={c.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${editingId === c.id ? 'bg-blue-50 border-blue-200' : 'bg-slate-50'}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {LucideIcons[c.icon_name] ? React.createElement(LucideIcons[c.icon_name], { size: 18, className: "text-pink-600" }) : <PlusCircle size={18}/>}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm leading-tight">{c.title}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black">{c.category}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(c)} className="text-blue-400 hover:text-blue-600 p-2 transition-colors"><Edit3 size={16}/></button>
                <button onClick={() => deleteCourse(c.id)} className="text-red-400 hover:text-red-600 p-2 transition-colors"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
          {courses.length === 0 && <p className="text-slate-400 italic text-sm">No programs found.</p>}
        </div>
      </div>
    </div>
  );
};