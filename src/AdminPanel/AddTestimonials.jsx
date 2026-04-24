import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Loader2, Edit3, X, Plus, User, Briefcase, MessageSquare, Quote } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Pagination, StatusToggle, API_BASE } from './Common/AdminUtils';

export const AddTestimonials = () => {
  const initialForm = {
    title: "", // Added specific title field
    name: "",
    role: "",
    content: "",
    image_base64: ""
  };

  const [formData, setFormData] = useState(initialForm);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });



  const fetchTestimonials = async (page = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/testimonials?page=${page}&limit=10&admin=true`);
      const result = await res.json();
      
      const formatted = result.data.map(item => ({
        id: item.id,
        name: item.name,
        role: item.role,
        title: item.title,
        content: item.content,
        image: item.image_data,
        status: item.status
      }));
      
      setTestimonials(formatted);
      setPagination(result.pagination);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(pagination.page); }, [pagination.page]);

  const handleStatusToggle = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/api/testimonials/status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus ? 1 : 0 })
      });
      if (res.ok) {
        setTestimonials(testimonials.map(t => t.id === id ? { ...t, status: newStatus ? 1 : 0 } : t));
        toast.success("Status updated");
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setFormData({
      title: t.title,
      name: t.name,
      role: t.role,
      content: t.content,
      image_base64: t.image
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
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image too large! Max 2MB.');
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
    const loadingToast = toast.loading(isEditing ? "Updating testimonial..." : "Publishing testimonial...");
    
    // Using the dedicated table fields
    const payload = {
      name: formData.name,
      role: formData.role,
      title: formData.title,
      content: formData.content,
      image_data: formData.image_base64
    };

    const url = isEditing 
      ? `${API_BASE}/api/testimonials/${editingId}` 
      : `${API_BASE}/api/testimonials`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(isEditing ? 'Testimonial Updated!' : 'Testimonial Published!', { id: loadingToast });
        cancelEdit();
        fetchTestimonials();
      }
    } catch (err) {
      toast.error('Operation failed.', { id: loadingToast });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    const deletingToast = toast.loading("Deleting...");
    try {
      const res = await fetch(`${API_BASE}/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success("Testimonial removed", { id: deletingToast });
        setTestimonials(testimonials.filter(t => t.id !== id));
        if (editingId === id) cancelEdit();
      }
    } catch (err) {
      toast.error("Delete failed", { id: deletingToast });
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-12 bg-[#f8fafc]/50 min-h-screen">
      <Toaster />
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter mb-2">
            Testimonial <span className="text-blue-600">Engine</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">Manage and publish success stories to your website.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-6 py-3 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-blue-700 font-black text-xs uppercase tracking-widest">{testimonials.length} Stories Live</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-10">
        {/* --- FORM SECTION --- */}
        <div className="flex-1 bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="flex justify-between items-center mb-10 relative z-10">
            <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tight flex items-center gap-3">
              <Plus className="text-blue-600" />
              {editingId ? "Edit Experience" : "New Success Story"}
            </h2>
            {editingId && (
              <button onClick={cancelEdit} className="flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold text-xs uppercase bg-slate-50 hover:bg-red-50 px-4 py-2 rounded-xl transition-all">
                <X size={14} /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-[0.1em]">Testimonial Headline</label>
              <input 
                className="w-full p-5 bg-slate-50/50 border-2 border-slate-100 rounded-3xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300"
                placeholder="e.g. A Game-Changing Experience"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-[0.1em]">Author Name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input 
                    className="w-full p-5 pl-14 bg-slate-50/50 border-2 border-slate-100 rounded-3xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300"
                    placeholder="e.g. Michael Chen"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-[0.1em]">Designation / Company</label>
                <div className="relative">
                  <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input 
                    className="w-full p-5 pl-14 bg-slate-50/50 border-2 border-slate-100 rounded-3xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300"
                    placeholder="e.g. Senior Dev @ Meta"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-[0.1em]">The Story (Content)</label>
              <textarea 
                className="w-full p-6 bg-slate-50/50 border-2 border-slate-100 rounded-3xl h-40 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-600 leading-relaxed placeholder:text-slate-300"
                placeholder="Write the detailed success story here..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
              />
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-[0.1em]">Profile Asset</label>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
                  {formData.image_base64 ? (
                    <img src={formData.image_base64} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <Upload size={24} className="text-slate-300" />
                  )}
                </div>
                <div className="flex-1">
                  <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  <label htmlFor="file-upload" className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-2xl cursor-pointer hover:bg-blue-600 transition-all font-black uppercase text-[10px] tracking-widest shadow-lg shadow-slate-200">
                    Choose Photo
                  </label>
                  <p className="mt-2 text-[10px] text-slate-400 font-medium ml-1 italic">JPG, PNG or WEBP. Recommended size: 400x400px.</p>
                </div>
              </div>
            </div>

            <button className={`w-full py-6 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center justify-center gap-3 ${editingId ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200 hover:-translate-y-1"}`}>
              {editingId ? <Edit3 size={20}/> : <Plus size={20}/>}
              {editingId ? "Update Content" : "Publish to Website"}
            </button>
          </form>
        </div>

        {/* --- PREVIEW SECTION --- */}
        <div className="w-full xl:w-[480px]">
          <div className="sticky top-10 space-y-6">
            <div className="flex items-center justify-between px-6">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Real-time Preview</p>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-200" />
                <div className="w-2 h-2 rounded-full bg-slate-200" />
                <div className="w-2 h-2 rounded-full bg-slate-200" />
              </div>
            </div>
            
            <div className={`relative bg-white p-12 rounded-[3.5rem] border shadow-2xl transition-all duration-500 ${editingId ? 'border-emerald-100 ring-[12px] ring-emerald-50/50' : 'border-slate-50'}`}>
              <div className="flex justify-between items-start mb-10">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-blue-600/80" />)}
                </div>
                <div className="p-3 bg-blue-50 rounded-2xl">
                  <Quote size={24} className="text-blue-600 opacity-40" fill="currentColor" />
                </div>
              </div>
              
              <div className="relative z-10 mb-10 min-h-[120px]">
                {formData.title && <h3 className="text-blue-600 font-black uppercase text-[10px] tracking-[0.2em] mb-4 italic">{formData.title}</h3>}
                <p className="text-slate-800 text-xl font-bold leading-relaxed italic line-clamp-5">
                  "{formData.content || "Experience the transformation. Your amazing success story will be beautifully displayed here for the world to see..."}"
                </p>
              </div>

              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border-4 border-white shadow-xl">
                    {formData.image_base64 ? (
                      <img src={formData.image_base64} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300"><User size={24}/></div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white bg-blue-600" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight leading-none mb-2 truncate max-w-[200px]">
                    {formData.name || "John Doe"}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-[2px] bg-blue-600 rounded-full" />
                    <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest truncate max-w-[180px]">
                      {formData.role || "Future Engineering Lead"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MANAGEMENT TABLE SECTION --- */}
      <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter">Content Repository</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Audit and maintain your published stories</p>
          </div>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
            <input 
              className="bg-slate-50 border-2 border-slate-100 p-3 pl-12 rounded-2xl text-xs font-bold w-full md:w-64 outline-none focus:border-blue-500"
              placeholder="Filter by name..."
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600 w-12 h-12" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Profile</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Headline / Title</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Author Details</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Story Preview</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {testimonials.map((t) => (
                  <tr key={t.id} className={`group hover:bg-blue-50/30 transition-all duration-300 ${editingId === t.id ? 'bg-emerald-50/50' : ''}`}>
                    <td className="px-8 py-6">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white">
                        <img src={t.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-slate-900 text-sm uppercase italic leading-none">{t.title || "Untitled Story"}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">#{t.id}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="font-black text-slate-800 text-sm uppercase">{t.name}</p>
                        <p className="text-blue-600 font-bold text-[9px] uppercase tracking-widest flex items-center gap-2">
                          <span className="w-2 h-[2px] bg-blue-600 rounded-full" />
                          {t.role}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-slate-500 text-xs max-w-[400px] whitespace-normal line-clamp-2 leading-relaxed italic font-medium" title={t.content}>
                        "{t.content}"
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <StatusToggle 
                        status={t.status} 
                        onToggle={(newStatus) => handleStatusToggle(t.id, newStatus)} 
                      />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-3 justify-center">
                        <button 
                          onClick={() => startEdit(t)} 
                          className="p-3 bg-white text-slate-400 rounded-2xl hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm border border-slate-100"
                        >
                          <Edit3 size={18}/>
                        </button>
                        <button 
                          onClick={() => handleDelete(t.id)} 
                          className="p-3 bg-white text-slate-400 rounded-2xl hover:text-red-500 hover:bg-red-50 transition-all shadow-sm border border-slate-100"
                        >
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

            {testimonials.length === 0 && (
              <div className="p-32 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare size={32} className="text-slate-200" />
                </div>
                <p className="text-slate-300 font-black italic uppercase tracking-[0.3em] text-sm">
                  The gallery is currently empty
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
