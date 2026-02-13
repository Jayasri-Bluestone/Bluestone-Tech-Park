import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, Trash2, PlusCircle } from 'lucide-react';

export const AddCourses = () => {
  const [formData, setFormData] = useState({
    title: "", category: "Development", description: "", icon_name: "Code"
  });
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["Development", "Mobile", "Marketing", "No-Code"];

  // Fetch list so we can delete them if needed
  const fetchList = async () => {
    const res = await fetch("http://localhost:5003/api/courses");
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => { fetchList(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5003/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      alert("Course Published!");
      setFormData({ title: "", category: "Development", description: "", icon_name: "Code" });
      fetchList();
    }
  };

  const deleteCourse = async (id) => {
    if(!window.confirm("Delete this course?")) return;
    await fetch(`http://localhost:5003/api/courses/${id}`, { method: 'DELETE' });
    fetchList();
  };

  const filteredIcons = Object.keys(LucideIcons)
    .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 20);

  return (
    <div className="flex flex-col gap-8 p-6 max-w-6xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border shadow-sm">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <PlusCircle className="text-pink-600" /> ADD NEW PROGRAM
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input className="w-full p-3 border rounded-xl" placeholder="Course Title" onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title} required />
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
                  <button key={iconName} type="button" onClick={() => setFormData({...formData, icon_name: iconName})} className={`p-2 rounded-lg flex items-center justify-center ${formData.icon_name === iconName ? 'bg-pink-600 text-white' : 'bg-white text-slate-400'}`}>
                    {Icon && <Icon size={20} />}
                  </button>
                )
              })}
            </div>
            <button type="submit" className="w-full py-4 bg-pink-600 text-white font-black rounded-xl hover:bg-pink-700 transition-all uppercase tracking-widest shadow-lg shadow-pink-200">
              Publish Program
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-3xl border shadow-sm">
        <h3 className="font-bold text-slate-400 mb-4 uppercase tracking-widest text-xs">Active Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map(c => (
            <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border">
              <div>
                <p className="font-bold text-slate-800">{c.title}</p>
                <p className="text-xs text-slate-400 uppercase">{c.category}</p>
              </div>
              <button onClick={() => deleteCourse(c.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18}/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};