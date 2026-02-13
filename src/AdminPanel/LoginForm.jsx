import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, ShieldCheck, ArrowRight } from "lucide-react";

export const LoginForm = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ user: "", pass: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Mimicking a slight delay for realism
    setTimeout(() => {
      if (loginData.user === "admin" && loginData.pass === "admin123") {
        onLogin();
      } else {
        setError("Invalid username or password. Please try again.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-cyan-100/50 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-200/50 border border-slate-100 p-8 md:p-10">
          {/* Logo Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4 text-white">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight italic">
              BLUESTONE <span className="text-blue-600">ADMIN</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2">Secure access to your management portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div className="relative">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter admin ID" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-700 font-medium"
                  onChange={(e) => setLoginData({...loginData, user: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-700 font-medium"
                  onChange={(e) => setLoginData({...loginData, pass: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl border border-red-100"
              >
                {error}
              </motion.div>
            )}

            {/* Login Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all ${
                isLoading ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-300"
              }`}
            >
              {isLoading ? "Authenticating..." : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400 font-medium">
              Forgot credentials? Contact system developer.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};