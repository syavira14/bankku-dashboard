import React from 'react';
import { Search, Settings, Bell, Menu } from 'lucide-react';

export default function Header({ title, onOpenSidebar }) {
  return (
    <header className="flex flex-col md:flex-row h-auto md:h-24 items-center justify-between border-b border-[#F3F5F7] bg-white px-4 md:px-8 shrink-0 py-4 md:py-0 gap-4 md:gap-0">
      
      {/* --- BARIS UTAMA (Mobile & Desktop) --- */}
      <div className="flex w-full items-center justify-between md:w-auto">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu (Hanya Mobile) */}
          <button 
            onClick={onOpenSidebar}
            className="p-2 text-[#718EBF] hover:text-[#1814F3] md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <h2 className="text-xl md:text-[28px] font-semibold text-[#343C6A] capitalize">
            {title}
          </h2>
        </div>

        {/* Profile (Hanya muncul di pojok kanan saat Mobile - image_ecbe54) */}
        <div className="md:hidden">
          <img 
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
            alt="Profile" 
            className="h-9 w-9 rounded-full object-cover"
          />
        </div>
      </div>
      
      {/* --- KANAN: Search & Icons (Desktop Cluster - image_ecc15f) --- */}
      <div className="flex flex-col md:flex-row w-full md:w-auto items-center gap-4 md:gap-6">
        
        {/* Search Bar - Full width di mobile, tetap di kanan Cluster di desktop */}
        <div className="relative w-full md:w-[250px]">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#718EBF]" />
          <input 
            type="text" 
            placeholder="Search for something" 
            className="w-full rounded-full bg-[#F5F7FA] py-3 pl-12 pr-4 text-[15px] text-[#718EBF] outline-none focus:ring-2 focus:ring-[#1814F3]/20 transition-all"
          />
        </div>

        {/* Icons & Profile (Hanya muncul di Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <button className="rounded-full bg-[#F5F7FA] p-3 text-[#718EBF] hover:bg-[#E6E9F4] transition-colors">
            <Settings className="h-6 w-6" />
          </button>
          
          {/* Bell Icon dengan Notifikasi Merah sesuai Figma */}
          <button className="relative rounded-full bg-[#F5F7FA] p-3 text-[#FE5C73] hover:bg-[#FFE0EB] transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
          </button>

          <img 
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
            alt="Profile" 
            className="h-14 w-14 rounded-full object-cover border border-gray-100"
          />
        </div>
      </div>
      
    </header>
  );
}