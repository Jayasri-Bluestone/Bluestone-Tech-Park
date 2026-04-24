import React from 'react';
import { motion } from 'framer-motion';

export const API_BASE = window.location.hostname === 'localhost' 
  ? "http://localhost:5003" 
  : "https://bluestoneinternationalpreschool.com/techpark_api";

export const StatusToggle = ({ status, onToggle, loading = false }) => {
  const isActive = status === 1;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!loading) onToggle(!isActive);
      }}
      disabled={loading}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
        isActive ? 'bg-emerald-500' : 'bg-slate-300'
      } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <motion.div
        animate={{ x: isActive ? 24 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  );
};

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase text-slate-600 disabled:opacity-50 hover:bg-slate-50 transition-all"
      >
        Previous
      </button>
      
      <div className="flex gap-1">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase text-slate-600 disabled:opacity-50 hover:bg-slate-50 transition-all"
      >
        Next
      </button>
    </div>
  );
};
