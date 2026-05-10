import React from 'react';
import { 
  FaHome, FaUser, FaCreditCard, FaHandHoldingUsd, 
  FaTools, FaFileInvoiceDollar, FaChartBar 
} from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { BsLightbulbFill } from 'react-icons/bs';
import { X } from 'lucide-react'; // Import ikon silang (close)

const BankkuLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="20" height="14" rx="3" stroke="#1814F3" strokeWidth="2.5" />
    <rect x="8" y="12" width="20" height="14" rx="3" fill="white" stroke="#1814F3" strokeWidth="2.5" />
    <path d="M12 16.5H16" stroke="#FF4B4A" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Terima isOpen dan setIsOpen dari App.jsx
export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  const menuItems = [
    { name: 'Dashboard', icon: FaHome },
    { name: 'Transactions', icon: FaFileInvoiceDollar },
    { name: 'Accounts', icon: FaUser },
    { name: 'Investments', icon: FaChartBar },
    { name: 'Credit Cards', icon: FaCreditCard },
    { name: 'Loans', icon: FaHandHoldingUsd },
    { name: 'Services', icon: FaTools },
    { name: 'My Privileges', icon: BsLightbulbFill },
    { name: 'Setting', icon: MdSettings },
  ];

  return (
    <>
      {/* OVERLAY: Bayangan hitam di belakang menu kalau di HP */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* SIDEBAR CONTAINER */}
      {/* Menggunakan fixed di HP agar melayang, dan static di laptop agar menempel */}
      <div className={`fixed inset-y-0 left-0 z-50 w-[250px] bg-white border-r border-[#F3F5F7] flex flex-col py-8 transition-transform duration-300 md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Tombol Silang (Close) Khusus Layar HP */}
        <button 
          className="absolute top-6 right-6 md:hidden text-gray-500 hover:text-[#FF4B4A]" 
          onClick={() => setIsOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 px-8 mb-12">
          <BankkuLogo />
          <h1 className="text-[#343C6A] text-[25px] font-extrabold">Bankku.</h1>
        </div>

        <nav className="flex flex-col gap-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.name;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActivePage(item.name); // Ganti halaman
                  setIsOpen(false); // Otomatis tutup sidebar di HP setelah diklik
                }}
                className="relative flex items-center gap-5 px-8 py-3 w-full transition-all"
              >
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-[6px] bg-[#1814F3] rounded-r-[10px]"></div>
                )}
                <Icon className={`text-2xl transition-colors ${isActive ? 'text-[#1814F3]' : 'text-[#B1B1B1]'}`} />
                <span className={`text-[16px] font-medium transition-colors ${isActive ? 'text-[#1814F3]' : 'text-[#B1B1B1]'}`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}