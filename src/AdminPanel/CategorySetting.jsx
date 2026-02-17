import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, Edit3, X, Save, Loader2, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export const CategorySettings = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);

  // --- TOP POPUP STATE ---
  const [showConfirm, setShowConfirm] = useState(false);
  const [targetCat, setTargetCat] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://bluestoneinternationalpreschool.com/techpark_api/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
    // Close popup on Escape key
    const handleEsc = (e) => { if (e.key === 'Escape') setShowConfirm(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // 1. ADD CATEGORY
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://bluestoneinternationalpreschool.com/techpark_api/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory })
      });
      if (res.ok) {
        setNewCategory("");
        fetchCategories();
        toast.success("Category added!");
      }
    } finally { setLoading(false); }
  };

  // 2. UPDATE CATEGORY
  const handleUpdate = async (id) => {
    if (!editValue.trim()) return;
    const t = toast.loading("Saving...");
    try {
      const res = await fetch(`https://bluestoneinternationalpreschool.com/techpark_api/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editValue })
      });
      if (res.ok) {
        setEditingId(null);
        fetchCategories();
        toast.success("Updated", { id: t });
      }
    } catch (err) { toast.error("Error updating", { id: t }); }
  };

  // 3. EXECUTE DELETE (Called from Top Popup)
  const executeDelete = async () => {
    if (!targetCat) return;
    const t = toast.loading("Deleting...");
    try {
      const res = await fetch(`https://bluestoneinternationalpreschool.com/techpark_api/api/categories/${targetCat.id}`, { 
        method: "DELETE" 
      });
      if (res.ok) {
        toast.success("Category removed", { id: t });
        setShowConfirm(false);
        setTargetCat(null);
        fetchCategories();
      } else {
        toast.error("Could not delete. Check dependencies.", { id: t });
      }
    } catch (err) { toast.error("Network error", { id: t }); }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      <Toaster />

      {/* --- TOP FIXED POPUP CONFIRMATION --- */}
      {showConfirm && (
        <div className="fixed top-0 left-0 right-0 z-[999] flex justify-center p-4">
          {/* Subtle Background Overlay */}
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]" onClick={() => setShowConfirm(false)} />
          
          <div className="relative bg-slate-900 text-white px-8 py-5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-8 border border-white/10 animate-in slide-in-from-top-full duration-500">
            <div className="flex items-center gap-4">
              <div className="bg-red-500/20 p-2 rounded-full text-red-400">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm Deletion</p>
                <p className="text-sm font-bold italic">Delete "{targetCat?.name}" permanently?</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 border-l border-white/10 pl-8">
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 hover:text-white text-slate-400 text-xs font-black uppercase transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={executeDelete}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl text-xs font-black uppercase transition-all shadow-lg shadow-red-900/20"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-10 mt-16">
        {/* ADD CATEGORY SECTION */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3 italic uppercase">
            <Tag className="text-blue-600" /> Manage Categories
          </h3>
          <form onSubmit={handleAdd} className="flex gap-4">
            <input 
              type="text" value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category..."
              className="flex-1 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold transition-all"
            />
            <button 
              type="submit" disabled={loading}
              className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 disabled:bg-slate-200 transition-all uppercase text-xs tracking-widest"
            >
              {loading ? <Loader2 className="animate-spin" size={18}/> : "Add Category"}
            </button>
          </form>
        </div>

        {/* LIST SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className={`group bg-white p-5 rounded-3xl border transition-all flex items-center justify-between ${editingId === cat.id ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-100 shadow-sm hover:shadow-md'}`}>
              
              {editingId === cat.id ? (
                <div className="flex items-center gap-2 w-full">
                  <input 
                    autoFocus value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdate(cat.id)}
                    className="flex-1 bg-blue-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-blue-700 outline-none"
                  />
                  <button onClick={() => handleUpdate(cat.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"><Save size={20} /></button>
                  <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"><X size={20} /></button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300">
                      <Tag size={20} />
                    </div>
                    <span className="font-bold text-slate-700 uppercase italic text-sm tracking-tight">{cat.name}</span>
                  </div>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => { setEditingId(cat.id); setEditValue(cat.name); }}
                      className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => { setTargetCat(cat); setShowConfirm(true); }}
                      className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {categories.length === 0 && !loading && <p className="col-span-full text-center text-slate-400 italic py-10">No categories found.</p>}
        </div>
      </div>
    </div>
  );
};