import React, { useState } from 'react';

// --- Komponen Toggle Switch (Saklar) - SUDAH DIPERBAIKI ---
const Toggle = ({ label, enabled, onChange }) => (
  <div className="flex items-center gap-4 mb-5 last:mb-0">
    <button
      onClick={onChange}
      className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? 'bg-[#16DBCC]' : 'bg-[#CBD5E1]'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
    <span className="text-[15px] text-[#718EBF] leading-tight">{label}</span>
  </div>
);

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Edit Profile');
  
  // State untuk Toggle di Preferences
  const [notifDigital, setNotifDigital] = useState(true);
  const [notifMerchant, setNotifMerchant] = useState(false);
  const [notifRecommend, setNotifRecommend] = useState(true);

  // State untuk Toggle di Security
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const tabs = [
    { id: 'Edit Profile', label: 'Edit Profile' },
    { id: 'Preferences', label: 'Preferences' },
    { id: 'Security', label: 'Security' }
  ];

  return (
    <div className="p-6 md:p-8 bg-[#F5F7FA] min-h-screen">
      <div className="bg-white rounded-[25px] p-6 md:p-10 shadow-sm">
        
        {/* --- TABS NAVIGATION --- */}
        <div className="flex border-b border-[#F2F4F7] mb-10 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-8 text-[16px] font-medium relative whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'text-[#1814F3]' : 'text-[#718EBF] hover:text-[#1814F3]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1814F3] rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* --- KONTEN EDIT PROFILE --- */}
        {activeTab === 'Edit Profile' && (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Foto Profil */}
            <div className="flex flex-col items-center lg:items-start flex-shrink-0">
               <img 
                 src="https://i.pravatar.cc/150?img=47" 
                 className="w-[120px] h-[120px] rounded-full object-cover" 
                 alt="Profile" 
               />
            </div>
            
            {/* Grid Form Input */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { label: "Your Name", value: "Charlene Reed" },
                  { label: "User Name", value: "Charlene Reed" },
                  { label: "Email", value: "charlenereed@gmail.com", type: "email" },
                  { label: "Password", value: "**********", type: "password" },
                  { label: "Date of Birth", value: "25 January 1990" },
                  { label: "Present Address", value: "San Jose, California, USA" },
                  { label: "Permanent Address", value: "San Jose, California, USA" },
                  { label: "City", value: "San Jose" },
                  { label: "Postal Code", value: "45962" },
                  { label: "Country", value: "USA" }
                ].map((input, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <label className="text-[15px] text-[#232323]">{input.label}</label>
                    <input 
                      type={input.type || "text"} 
                      defaultValue={input.value} 
                      className="w-full border border-[#DFEAF2] rounded-[15px] px-5 py-3 text-[15px] text-[#718EBF] outline-none focus:border-[#1814F3] transition-all" 
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-10">
                <button className="bg-[#1814F3] text-white px-14 py-3.5 rounded-[15px] font-medium hover:bg-blue-700 transition-all w-full md:w-auto">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- KONTEN PREFERENCES --- */}
        {activeTab === 'Preferences' && (
          <div className="max-w-4xl">
            
            {/* 1. SEKSI CURRENCY & TIME ZONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
               <div className="flex flex-col gap-2">
                  <label className="text-[15px] text-[#232323]">Currency</label>
                  <input 
                    type="text" 
                    defaultValue="USD" 
                    className="w-full bg-white border border-[#DFEAF2] rounded-[15px] px-5 py-3 text-[15px] text-[#718EBF] outline-none focus:border-[#1814F3] transition-all" 
                  />
               </div>
               <div className="flex flex-col gap-2">
                  <label className="text-[15px] text-[#232323]">Time Zone</label>
                  <input 
                    type="text" 
                    defaultValue="(GMT-12:00) International Date Line West" 
                    className="w-full bg-white border border-[#DFEAF2] rounded-[15px] px-5 py-3 text-[15px] text-[#718EBF] outline-none focus:border-[#1814F3] transition-all" 
                  />
               </div>
            </div>

            {/* 2. SEKSI NOTIFICATION */}
            <div>
              <h4 className="text-[17px] font-medium text-[#333B69] mb-6">Notification</h4>
              
              <div className="flex flex-col">
                <Toggle 
                  label="I receive digital currency" 
                  enabled={notifDigital} 
                  onChange={() => setNotifDigital(!notifDigital)} 
                />
                <Toggle 
                  label="I receive merchant order" 
                  enabled={notifMerchant} 
                  onChange={() => setNotifMerchant(!notifMerchant)} 
                />
                {/* Tombol ke-3 ini yang sebelumnya bermasalah, sekarang sudah aman */}
                <Toggle 
                  label="There are recommendation my account" 
                  enabled={notifRecommend} 
                  onChange={() => setNotifRecommend(!notifRecommend)} 
                />
              </div>
            </div>

            <div className="flex justify-end mt-12">
              <button className="bg-[#1814F3] text-white px-14 py-3.5 rounded-[15px] text-[16px] font-medium hover:bg-blue-700 transition-all w-full md:w-auto">
                Save
              </button>
            </div>

          </div>
        )}

        {/* --- KONTEN SECURITY --- */}
        {activeTab === 'Security' && (
          <div className="max-w-4xl">
            
            {/* Two-factor Authentication */}
            <div className="mb-8">
              <h4 className="text-[17px] font-medium text-[#333B69] mb-5">Two-factor Authentication</h4>
              <Toggle 
                label="Enable or disable two factor authentication" 
                enabled={twoFactorAuth} 
                onChange={() => setTwoFactorAuth(!twoFactorAuth)} 
              />
            </div>

            {/* Change Password */}
            <div>
              <h4 className="text-[17px] font-medium text-[#333B69] mb-5">Change Password</h4>
              <div className="flex flex-col gap-6 max-w-xl">
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] text-[#232323]">Current Password</label>
                  <input 
                    type="password" 
                    defaultValue="**********" 
                    className="w-full bg-white border border-[#DFEAF2] rounded-[15px] px-5 py-3 text-[15px] text-[#718EBF] outline-none focus:border-[#1814F3] transition-all" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] text-[#232323]">New Password</label>
                  <input 
                    type="password" 
                    defaultValue="**********" 
                    className="w-full bg-white border border-[#DFEAF2] rounded-[15px] px-5 py-3 text-[15px] text-[#718EBF] outline-none focus:border-[#1814F3] transition-all" 
                  />
                </div>
              </div>
            </div>

            {/* Tombol Save */}
            <div className="flex justify-end mt-12">
              <button className="bg-[#1814F3] text-white px-14 py-3.5 rounded-[15px] text-[16px] font-medium hover:bg-blue-700 transition-all w-full md:w-auto">
                Save
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}