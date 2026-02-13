import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { Upload, X, CheckCircle2, AlertCircle, Search, Trash2, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export const AddServices = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon_name: "Globe",
    image_base64: ""
  });
  
  const [services, setServices] = useState([]); // List of existing services
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch existing services on load
  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5003/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

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

  // 2. Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image_base64) return toast.error('Please upload an image');

    const loadingToast = toast.loading("Publishing service...");
    try {
      const res = await fetch("http://localhost:5003/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Service Published!', { id: loadingToast });
        setFormData({ title: "", description: "", icon_name: "Globe", image_base64: "" });
        fetchServices(); // Refresh list
      }
    } catch (err) {
      toast.error('Database connection failed.', { id: loadingToast });
    }
  };

  // 3. Delete Handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    
    const deletingToast = toast.loading("Deleting...");
    try {
      const res = await fetch(`http://localhost:5003/api/services/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast.success("Service removed", { id: deletingToast });
        setServices(services.filter(s => s.id !== id));
      }
    } catch (err) {
      toast.error("Delete failed", { id: deletingToast });
    }
  };

  const SelectedIcon = LucideIcons[formData.icon_name] || LucideIcons.Globe;
  const allIconNames = Object.keys(LucideIcons).filter(key => typeof LucideIcons[key] !== 'undefined');
  const filteredIcons = allIconNames.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 48);

  return (
    <div className="p-4 max-w-[1600px] mx-auto space-y-12">
      <Toaster />
      
      <div className="flex flex-col xl:flex-row gap-10">
        {/* --- FORM SECTION --- */}
        <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
          <h2 className="text-3xl font-black text-slate-800 mb-8 italic uppercase tracking-tighter">Add Service</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold"
                placeholder="Service Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <div className="relative">
                <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                <label htmlFor="file-upload" className="flex items-center justify-center w-full p-4 bg-blue-50 text-blue-600 border-2 border-dashed border-blue-200 rounded-2xl cursor-pointer hover:bg-blue-100 transition-all font-bold text-sm text-center">
                  <Upload size={18} className="mr-2" /> {formData.image_base64 ? "Change Image" : "Upload Image"}
                </label>
              </div>
            </div>

            <textarea 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl h-32 outline-none focus:border-blue-500 font-medium text-slate-600"
              placeholder="Description..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />

            <div className="space-y-4">
              <div className="flex items-center bg-slate-100 px-4 py-2 rounded-xl">
                <Search size={16} className="text-slate-400 mr-2" />
                <input className="bg-transparent text-sm w-full outline-none p-1" placeholder="Search icons..." onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2 max-h-40 overflow-y-auto p-3 bg-slate-50 rounded-2xl border border-slate-100">
                {filteredIcons.map(name => {
                  const Icon = LucideIcons[name];
                  return (
                    <button key={name} type="button" onClick={() => setFormData({...formData, icon_name: name})}
                      className={`p-2 rounded-lg transition-all ${formData.icon_name === name ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-slate-400 hover:text-slate-800"}`}>
                      <Icon size={20} />
                    </button>
                  )
                })}
              </div>
            </div>

            <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">
              Publish Service
            </button>
          </form>
        </div>

        {/* --- LIVE PREVIEW --- */}
        <div className="w-full xl:w-[450px]">
          <div className="sticky top-10">
            <p className="text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Frontend Live View</p>
            <div className="relative h-[550px] w-full bg-black rounded-[3.5rem] overflow-hidden shadow-2xl ring-8 ring-white">
              {formData.image_base64 ? (
                <img src={formData.image_base64} className="w-full h-full object-cover opacity-70" alt="Preview" />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 italic text-sm font-bold text-center p-10">Upload an image to see preview</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-10 w-full text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                    <SelectedIcon size={32} />
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter truncate">{formData.title || "Service Title"}</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">{formData.description || "Your service description..."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- DELETE / MANAGEMENT SECTION --- */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
        <h2 className="text-2xl font-black text-slate-800 mb-6 italic uppercase tracking-tighter">Manage Existing Services</h2>
        {loading ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(service => {
              const Icon = LucideIcons[service.icon_name] || LucideIcons.Globe;
              return (
                <div key={service.id} className="group relative bg-slate-50 rounded-3xl p-4 border border-slate-100 hover:border-blue-200 transition-all">
                  <div className="h-32 w-full mb-4 rounded-2xl overflow-hidden bg-slate-200">
                    <img src={service.image_base64} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon size={18} className="text-blue-600" />
                    <h4 className="font-bold text-slate-800 truncate text-sm uppercase">{service.title}</h4>
                  </div>
                  <button 
                    onClick={() => handleDelete(service.id)}
                    className="absolute top-6 right-6 p-2 bg-red-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                    title="Delete Service"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )
            })}
            {services.length === 0 && <p className="text-slate-400 italic">No services published yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};