import React, { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Upload, Link, Save, ImageIcon, Trash2, Edit3, X, Eye, Crop as CropIcon } from 'lucide-react';

export const MediaManagement = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [mediaList, setMediaList] = useState([]);
  const [sourceType, setSourceType] = useState('file');
  const [urlInput, setUrlInput] = useState("");
  const [fileBase64, setFileBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [sections, setSections] = useState([]); // Dynamic Tabs

  // --- CROPPING STATE ---
  const [tempImage, setTempImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const aspect = activeTab === 'hero' ? 16 / 9 : 1 / 1;

  // --- FETCH TABS ---
  const fetchSections = async () => {
    try {
      const res = await fetch(`http://localhost:5003/api/sections`);
      const data = await res.json();
      setSections(data);
      if (data.length > 0 && !activeTab) setActiveTab(data[0].name);
    } catch (err) { console.error("Tab fetch failed"); }
  };

  useEffect(() => { 
    fetchSections(); 
  }, []);

  useEffect(() => { 
    if (activeTab) fetchMedia(); 
  }, [activeTab]);

  // --- API: FETCH ---
  const fetchMedia = async () => {
    try {
      const res = await fetch(`http://localhost:5003/api/media/${activeTab}`);
      const data = await res.json();
      setMediaList(Array.isArray(data) ? data : []);
    } catch (err) {
      setMediaList([]);
    }
  };

  useEffect(() => { fetchMedia(); }, [activeTab]);

  // --- ACTION: VIEW ---
  const handleView = (url) => {
    window.open(url, '_blank');
  };

  // --- ACTION: DELETE ---
  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this media?")) return;
    try {
      const res = await fetch(`http://localhost:5003/api/media/delete/${id}`, { 
        method: "DELETE" 
      });
      if (res.ok) {
        fetchMedia();
        alert("Deleted successfully");
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  // --- ACTION: EDIT (Handles both URL and File) ---
  const startEdit = (item) => {
    setEditingId(item.id); 
    
    if (item.image_url) {
      // Logic for URL edit
      setSourceType('url');
      setUrlInput(item.image_url);
      setFileBase64(null);
    } else {
      // Logic for File/Crop edit
      setSourceType('file');
      setFileBase64(item.image_data);
      setTempImage(item.image_data); 
      setUrlInput("");
    }
    
    // Jump to top so user sees the edit form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- FILE HANDLING & CROP ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempImage(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((border, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const applyCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels);
      setFileBase64(croppedImage);
      setShowCropper(false);
      setUrlInput("");
    } catch (e) {
      console.error("Crop failed", e);
    }
  };

  

  // --- ACTION: SAVE (POST or PUT) ---
  const handleSave = async () => {
    if (sourceType === 'url' && !urlInput) return alert("Please enter a URL");
    if (sourceType === 'file' && !fileBase64) return alert("Please upload and crop an image");

    setLoading(true);
    const payload = {
      section_key: activeTab,
      image_data: sourceType === 'file' ? fileBase64 : null,
      image_url: sourceType === 'url' ? urlInput : null,
      title: `${activeTab} media`,
    };

    const endpoint = editingId 
      ? `http://localhost:5003/api/media/update/${editingId}` 
      : "http://localhost:5003/api/media/upload";

    try {
      const res = await fetch(endpoint, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        resetForm();
        fetchMedia();
        alert(editingId ? "Media Updated!" : "Media Published!");
      }
    } catch (error) {
      alert("Error saving media");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFileBase64(null);
    setUrlInput("");
    setTempImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 font-sans text-slate-900">

        {/* DYNAMIC TABS */}
      <div className="flex bg-slate-100 p-1 rounded-2xl overflow-x-auto scrollbar-hide">
        {sections.map(section => (
          <button 
            key={section.name} 
            onClick={() => {setActiveTab(section.name); resetForm();}} 
            className={`flex-1 min-w-[120px] py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${activeTab === section.name ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            {section.label}
          </button>
        ))}
        
        {/* ADD NEW TAB BUTTON (OPTIONAL UI) */}
        <button 
          onClick={() => {
            const newName = prompt("Enter new section name (lowercase):");
            if (newName) {
                // Here you would call a POST /api/sections to save it
                alert("Section logic added! Refresh to see.");
            }
          }}
          className="px-4 text-blue-600 font-bold text-xl hover:scale-110 transition-transform"
        >
          +
        </button>
      </div>
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* INPUT PANEL */}
        <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 h-fit sticky top-4">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-slate-800 uppercase text-sm">{editingId ? 'Editing Media' : 'Add New Media'}</h3>
            {editingId && <button onClick={resetForm} className="text-red-500 bg-red-50 p-1 rounded-full"><X size={18}/></button>}
          </div>
          
          <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
            <button onClick={() => setSourceType('file')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${sourceType === 'file' ? "bg-slate-900 text-white" : "text-slate-500"}`}><Upload size={14}/> File</button>
            <button onClick={() => setSourceType('url')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${sourceType === 'url' ? "bg-slate-900 text-white" : "text-slate-500"}`}><Link size={14}/> URL</button>
          </div>

          {sourceType === 'file' ? (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center bg-slate-50">
                <input type="file" accept="image/*" onChange={handleFileChange} className="text-[10px] w-full file:bg-blue-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded-full cursor-pointer" />
              </div>
              {fileBase64 && (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video group">
                   <img src={fileBase64} alt="Preview" className="w-full h-full object-cover" />
                   <button onClick={() => setShowCropper(true)} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                      <Edit3 size={14} className="mr-1"/> Modify Crop
                   </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
               <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Paste Image URL..." className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 border border-transparent" />
               {urlInput && <img src={urlInput} alt="External" className="w-full aspect-video object-cover rounded-xl border border-slate-100" onError={(e) => e.target.style.display='none'}/>}
            </div>
          )}

          <button onClick={handleSave} disabled={loading || (!fileBase64 && !urlInput)} className={`w-full py-4 rounded-xl font-black text-white transition-all shadow-lg active:scale-95 disabled:opacity-50 ${editingId ? "bg-orange-500 shadow-orange-100" : "bg-blue-600 shadow-blue-100"}`}>
            {loading ? "Saving..." : editingId ? "Update Changes" : "Upload to Gallery"}
          </button>
        </div>

        {/* GALLERY PANEL */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
            <ImageIcon size={14}/> {activeTab} Gallery ({mediaList.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mediaList.map((item) => (
              // Ensure "group" is present here
<div key={item.id} className="group relative bg-white border border-slate-100 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                   <img src={item.image_url || item.image_data} alt="entry" className="w-full h-full object-cover" />
                   
                   {/* ACTION OVERLAY */}
                   <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                      <button onClick={() => handleView(item.image_url || item.image_data)} title="View Full" className="p-3 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-full transition-all"><Eye size={20}/></button>
                      <button onClick={() => startEdit(item)} title="Edit Media" className="p-3 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-full transition-all"><Edit3 size={20}/></button>
                      <button onClick={() => handleDelete(item.id)} title="Delete Media" className="p-3 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-all"><Trash2 size={20}/></button>
                   </div>
                </div>
                <div className="p-4 flex justify-between items-center bg-white border-t border-slate-50">
                   <span className="text-[10px] font-bold text-slate-400 uppercase">ID: #{item.id}</span>
                   <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${item.image_url ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>
                    {item.image_url ? 'External Link' : 'Cropped File'}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CROPPER MODAL */}
      {showCropper && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b flex justify-between items-center">
                <h3 className="font-black text-slate-800 uppercase text-sm">Fine-tune Image</h3>
                <button onClick={() => setShowCropper(false)} className="text-slate-400 hover:text-red-500"><X/></button>
            </div>
            <div className="relative h-[400px] w-full bg-slate-100">
              <Cropper image={tempImage} crop={crop} zoom={zoom} aspect={aspect} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} />
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase">Zoom</span>
                <input type="range" value={zoom} min={1} max={3} step={0.1} onChange={(e) => setZoom(e.target.value)} className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
              <button onClick={applyCrop} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:bg-blue-700 transition-all">
                 <CropIcon size={18}/> Apply Crop & Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// HELPER: CANVAS PROCESSING
async function getCroppedImg(imageSrc, pixelCrop) {
  const image = new Image();
  image.src = imageSrc;
  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    image.onerror = reject;
  });
}