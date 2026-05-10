import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/Overview';
import Settings from './pages/Settings';
import Loans from './pages/Loans'

const BelumDibuat = ({ namaHalaman }) => (
  <div className="p-8 text-xl">Halaman <span className="font-bold text-[#1814F3]">{namaHalaman}</span> belum kita koding.</div>
);

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard': return <Overview />;
      case 'Loans': return <Loans />;
      case 'Setting': return <Settings />;
      default: return <Overview />;
    }
  };

  const getHeaderTitle = () => {
    if (activePage === 'Dashboard') return 'Overview';
    return activePage;
  };

  return (
    // PENTING: flex h-screen agar tinggi pas se-layar dan tidak meluber
    <div className="flex h-screen w-full bg-[#F5F7FA] overflow-hidden">
      
      {/* 1. SIDEBAR: Harus diluar pembungkus utama agar tetap di kiri */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      {/* 2. AREA KANAN (Header + Konten) */}
      {/* flex-1 artinya mengambil sisa layar, min-w-0 penting agar tidak numpuk */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        {/* HEADER: Selalu di atas */}
        <Header 
          title={getHeaderTitle()} 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
        />
        
        {/* MAIN CONTENT: Area ini saja yang bisa di-scroll */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-[1400px] mx-auto">
             {renderContent()}
          </div>
        </main>
        
      </div>

    </div>
  );
}