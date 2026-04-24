import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Loader2, Edit3, X, Plus, Layout, ExternalLink, Tag, Info, Monitor, ChevronRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Pagination, StatusToggle, API_BASE } from './Common/AdminUtils';

export const AddProjects = () => {
  const initialForm = {
    title: "",
    category: "",
    description: "",
    live_link: "",
    tech_stack: "",
    image_base64: ""
  };

  const [formData, setFormData] = useState(initialForm);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });



  const fetchProjects = async (page = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/projects?page=${page}&limit=10&admin=true`);
      const result = await res.json();
      setProjects(result.data);
      setPagination(result.pagination);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(pagination.page); }, [pagination.page]);

  const handleStatusToggle = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/api/projects/status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus ? 1 : 0 })
      });
      if (res.ok) {
        setProjects(projects.map(p => p.id === id ? { ...p, status: newStatus ? 1 : 0 } : p));
        toast.success("Status updated");
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      category: p.category,
      description: p.description,
      live_link: p.live_link || "",
      tech_stack: p.tech_stack || "",
      image_base64: p.image_data
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { // Increased to 5MB for projects
      toast.error('Image too large! Max 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setFormData({ ...formData, image_base64: reader.result });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image_base64) return toast.error('Please upload an image');

    const isEditing = editingId !== null;
    const loadingToast = toast.loading(isEditing ? "Updating project..." : "Adding project...");
    
    const payload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      live_link: formData.live_link,
      tech_stack: formData.tech_stack,
      image_data: formData.image_base64
    };

    const url = isEditing 
      ? `${API_BASE}/api/projects/${editingId}` 
      : `${API_BASE}/api/projects`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(isEditing ? 'Project Updated!' : 'Project Added!', { id: loadingToast });
        cancelEdit();
        fetchProjects();
      }
    } catch (err) {
      toast.error('Operation failed.', { id: loadingToast });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const deletingToast = toast.loading("Deleting...");
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success("Project removed", { id: deletingToast });
        setProjects(projects.filter(p => p.id !== id));
        if (editingId === id) cancelEdit();
      }
    } catch (err) {
      toast.error("Delete failed", { id: deletingToast });
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-12 bg-[#f8fafc]/50 min-h-screen font-sans">
      <Toaster />
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter mb-2">
            Project <span className="text-blue-600">Showcase</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">Manage and exhibit the projects developed by Bluestone Tech Park.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-6 py-3 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-blue-700 font-black text-xs uppercase tracking-widest">{projects.length} Projects Live</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-10">
        {/* --- FORM --- */}
        <div className="flex-1 bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="flex justify-between items-center mb-10 relative z-10">
            <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tight flex items-center gap-3">
              <Plus className="text-blue-600" />
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>
            {editingId && (
              <button onClick={cancelEdit} className="flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold text-xs uppercase bg-slate-50 hover:bg-red-50 px-4 py-2 rounded-xl transition-all">
                <X size={14} /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-[0.1em]">Project Title</label>
                <div className="relative">
                  <Layout className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input 
                    className="w-full p-5 pl-14 bg-slate-50/50 border-2 border-slate-100 rounded-3xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300"
                    placeholder="e.g. Bluestone Preschool Portal"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-[0.1em]">Category</label>
                <div className="relative">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input 
                    className="w-full p-5 pl-14 bg-slate-50/50 border-2 border-slate-100 rounded-3xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300"
                    placeholder="e.g. Web Platform / Mobile App"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-[0.1em]">Project Description</label>
              <div className="relative">
                <Info className="absolute left-5 top-6 text-slate-300" size={20} />
                <textarea 
                  className="w-full p-6 pl-14 bg-slate-50/50 border-2 border-slate-100 rounded-3xl h-32 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-600 leading-relaxed placeholder:text-slate-300"
                  placeholder="Tell us about the project goals and features..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-[0.1em]">Live Link (Optional)</label>
                <div className="relative">
                  <ExternalLink className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input 
                    className="w-full p-5 pl-14 bg-slate-50/50 border-2 border-slate-100 rounded-3xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300"
                    placeholder="https://example.com"
                    value={formData.live_link}
                    onChange={(e) => setFormData({...formData, live_link: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-[0.1em]">Tech Stack (Comma Separated)</label>
                <div className="relative">
                  <Monitor className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input 
                    className="w-full p-5 pl-14 bg-slate-50/50 border-2 border-slate-100 rounded-3xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300"
                    placeholder="e.g. React, Node.js, MySQL"
                    value={formData.tech_stack}
                    onChange={(e) => setFormData({...formData, tech_stack: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-[0.1em]">Project Image</label>
              <div className="flex items-center gap-6">
                <div className="w-40 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
                  {formData.image_base64 ? (
                    <img src={formData.image_base64} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <Upload size={24} className="text-slate-300" />
                  )}
                </div>
                <div className="flex-1">
                  <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  <label htmlFor="file-upload" className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-2xl cursor-pointer hover:bg-blue-600 transition-all font-black uppercase text-[10px] tracking-widest shadow-lg shadow-slate-200">
                    Choose Project Banner
                  </label>
                  <p className="mt-2 text-[10px] text-slate-400 font-medium ml-1 italic">High resolution JPG or PNG recommended.</p>
                </div>
              </div>
            </div>

            <button className={`w-full py-6 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center justify-center gap-3 ${editingId ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200 hover:-translate-y-1"}`}>
              {editingId ? <Edit3 size={20}/> : <Plus size={20}/>}
              {editingId ? "Update Project" : "Launch Project"}
            </button>
          </form>
        </div>

        {/* --- PREVIEW --- */}
        <div className="w-full xl:w-[480px]">
          <div className="sticky top-10 space-y-6">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-6">Live Card Preview</p>
            
            <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-50 group transition-all duration-500">
              <div className="h-64 bg-slate-100 relative">
                {formData.image_base64 ? (
                  <img src={formData.image_base64} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200">
                    <Monitor size={48} />
                  </div>
                )}
                <div className="absolute top-6 right-6">
                   <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg">
                      <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest">{formData.category || "Category"}</p>
                   </div>
                </div>
              </div>
              
              <div className="p-10 space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-3">{formData.title || "Project Title"}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3">
                    {formData.description || "The project description will appear here. It should be concise yet detailed enough to capture the project's essence..."}
                  </p>
                </div>

                {formData.tech_stack && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tech_stack.split(',').map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-bold uppercase rounded-lg border border-blue-100">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Bluestone Tech Park</span>
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-blue-600">
                      <ChevronRight size={18} />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter">Project Inventory</h2>
          <div className="flex gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                <Monitor size={18} />
             </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600 w-12 h-12" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Project</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Description</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Tech Stack</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {projects.map((p) => (
                  <tr key={p.id} className="group hover:bg-blue-50/30 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-12 rounded-xl overflow-hidden shadow-md">
                          <img src={p.image_data} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-sm uppercase italic">{p.title}</p>
                          <p className="text-blue-600 font-bold text-[9px] uppercase tracking-widest">{p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-slate-500 text-xs max-w-[300px] truncate font-medium">{p.description}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        {p.tech_stack?.split(',').slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-[8px] font-black uppercase rounded-md">{tech.trim()}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <StatusToggle 
                        status={p.status} 
                        onToggle={(newStatus) => handleStatusToggle(p.id, newStatus)} 
                      />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-3 justify-center">
                        <button onClick={() => startEdit(p)} className="p-3 bg-white text-slate-400 rounded-2xl hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-100">
                          <Edit3 size={18}/>
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-3 bg-white text-slate-400 rounded-2xl hover:text-red-500 hover:bg-red-50 transition-all border border-slate-100">
                          <Trash2 size={18}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <Pagination 
              currentPage={pagination.page} 
              totalPages={pagination.totalPages} 
              onPageChange={(page) => setPagination(prev => ({ ...prev, page }))} 
            />

            {projects.length === 0 && (
               <div className="p-20 text-center text-slate-300 uppercase italic font-black text-sm tracking-widest">
                  No projects launched yet
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
