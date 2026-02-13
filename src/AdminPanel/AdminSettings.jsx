import React, { useState, useEffect } from 'react';
import { Shield, Lock, User, Save, Eye, EyeOff } from 'lucide-react';

export const AdminSettings = () => {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5003/api/admin/profile")
            .then(res => res.json())
            .then(data => setUsername(data.username));
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return alert("Passwords do not match!");
        }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5003/api/admin/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, newPassword })
            });

            if (res.ok) {
                alert("Security settings updated!");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    <Shield className="text-blue-600" size={32} />
                    Admin Settings
                </h1>
                <p className="text-slate-500 mt-2">Manage your access credentials and security preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: Info Section */}
                <div className="md:col-span-1">
                    <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-200">
                        <Lock className="mb-4 opacity-50" size={40} />
                        <h3 className="font-bold text-xl mb-2">Security Tip</h3>
                        <p className="text-sm text-blue-100 leading-relaxed">
                            Use a combination of uppercase, lowercase, numbers, and symbols for a stronger password.
                        </p>
                    </div>
                </div>

                {/* Right: Form Section */}
                <div className="md:col-span-2">
                    <form onSubmit={handleUpdate} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Admin Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input 
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">New Password</label>
                                <div className="relative">
                                    <input 
                                        type={showPass ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Confirm Password</label>
                                <input 
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-blue-200"
                            >
                                {loading ? "Updating..." : "Save Changes"}
                                <Save size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};