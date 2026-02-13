import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export const CategorySettings = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Fetch Categories
  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5003/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => { fetchCategories(); }, []);

  // 2. Add Category
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory) return;
    setLoading(true);
    try {
      await fetch("http://localhost:5003/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory })
      });
      setNewCategory("");
      fetchCategories();
    } finally { setLoading(false); }
  };

  // 3. Delete Category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This might affect existing services/courses.")) {
      await fetch(`http://localhost:5003/api/categories/${id}`, { method: "DELETE" });
      fetchCategories();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
          <Tag className="text-blue-600" /> Define New Category
        </h3>
        <form onSubmit={handleAdd} className="flex gap-4">
          <input 
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="e.g. Cloud Computing, AI, UI/UX"
            className="flex-1 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            {loading ? "Adding..." : <><Plus size={20}/> Add</>}
          </button>
        </form>
      </div>

      {/* List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {categories.map((cat) => (
  <option key={cat.id} value={cat.name}> {/* Use .name, NOT .title */}
    {cat.name}
  </option>
))}
      </div>
    </div>
  );
};