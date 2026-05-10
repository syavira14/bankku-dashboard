import React from 'react';

// --- DATA UNTUK KARTU OVERVIEW ---
const overviewData = [
  {
    id: 1,
    title: 'Personal Loans',
    value: '$50,000',
    bg: 'bg-[#E7EDFF]', // Perbaikan penulisan class bg
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#396AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Corporate Loans',
    value: '$100,000',
    bg: 'bg-[#FFF5D9]',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB110" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Business Loans',
    value: '$500,000',
    bg: 'bg-[#FFE0EB]',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF82AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"></path>
        <path d="m19 9-5 5-4-4-3 3"></path>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Custom Loans',
    value: 'Choose Money',
    bg: 'bg-[#DCFAF8]',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16DBCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
  },
];

// --- DATA UNTUK TABEL LOANS ---
const activeLoans = [
  { id: '01.', money: '$100,000', left: '$40,500', duration: '8 Months', interest: '12%', installment: '$2,000 / month' },
  { id: '02.', money: '$500,000', left: '$250,000', duration: '36 Months', interest: '10%', installment: '$8,000 / month' },
  { id: '03.', money: '$900,000', left: '$40,500', duration: '12 Months', interest: '12%', installment: '$5,000 / month' },
  { id: '04.', money: '$50,000', left: '$40,500', duration: '25 Months', interest: '5%', installment: '$2,000 / month' },
  { id: '05.', money: '$50,000', left: '$40,500', duration: '5 Months', interest: '16%', installment: '$10,000 / month' },
  { id: '06.', money: '$80,000', left: '$25,500', duration: '14 Months', interest: '8%', installment: '$2,000 / month' },
  { id: '07.', money: '$12,000', left: '$5,500', duration: '9 Months', interest: '13%', installment: '$500 / month' },
  { id: '08.', money: '$160,000', left: '$100,800', duration: '3 Months', interest: '12%', installment: '$900 / month' },
];

export default function Loans() {
  return (
    <div className="flex flex-col gap-8 bg-[#F5F7FA]">
      
      {/* --- OVERVIEW CARDS (BISA SCROLL KIRI KANAN DI MOBILE) --- */}
      <div className="flex overflow-x-auto gap-6 pb-4 md:grid md:grid-cols-4 md:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {overviewData.map((item) => (
          <div key={item.id} className="min-w-[260px] md:min-w-full bg-white rounded-[25px] p-6 flex items-center gap-4 shadow-[0_4px_15px_rgba(0,0,0,0.02)] border border-gray-50">
            {/* Lingkaran Ikon dengan warna dinamis */}
            <div className={`flex w-[60px] h-[60px] items-center justify-center rounded-full shrink-0 ${item.bg}`}>
              {item.icon}
            </div>
            <div>
              <p className="text-[14px] md:text-[15px] text-[#718EBF] mb-1 whitespace-nowrap">{item.title}</p>
              <p className="text-[20px] md:text-[22px] font-semibold text-[#343C6A]">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- ACTIVE LOANS TABLE --- */}
      <div className="mb-8">
        <h3 className="mb-5 text-[22px] font-semibold text-[#343C6A]">Active Loans</h3>
        <div className="bg-white rounded-[25px] shadow-[0_4px_15px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Tambahkan overflow-x-auto agar tabel tidak pecah di mobile */}
          <div className="overflow-x-auto p-4 md:p-6">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-[#F2F4F7]">
                  <th className="py-4 px-4 text-[15px] font-medium text-[#718EBF]">SL No</th>
                  <th className="py-4 px-4 text-[15px] font-medium text-[#718EBF]">Loan Money</th>
                  <th className="py-4 px-4 text-[15px] font-medium text-[#718EBF]">Left to repay</th>
                  <th className="py-4 px-4 text-[15px] font-medium text-[#718EBF]">Duration</th>
                  <th className="py-4 px-4 text-[15px] font-medium text-[#718EBF]">Interest rate</th>
                  <th className="py-4 px-4 text-[15px] font-medium text-[#718EBF]">Installment</th>
                  <th className="py-4 px-4 text-[15px] font-medium text-[#718EBF] text-center">Repay</th>
                </tr>
              </thead>
              <tbody>
                {activeLoans.map((loan, index) => (
                  <tr key={index} className="border-b border-[#F2F4F7] last:border-none">
                    <td className="py-4 px-4 text-[15px] text-[#343C6A]">{loan.id}</td>
                    <td className="py-4 px-4 text-[15px] text-[#343C6A] font-medium">{loan.money}</td>
                    <td className="py-4 px-4 text-[15px] text-[#343C6A]">{loan.left}</td>
                    <td className="py-4 px-4 text-[15px] text-[#343C6A]">{loan.duration}</td>
                    <td className="py-4 px-4 text-[15px] text-[#343C6A]">{loan.interest}</td>
                    <td className="py-4 px-4 text-[15px] text-[#343C6A]">{loan.installment}</td>
                    <td className="py-4 px-4 text-center">
                      <button className="px-6 py-2 rounded-full border border-[#343C6A] text-[#343C6A] text-[14px] font-medium hover:bg-[#343C6A] hover:text-white transition-all">
                        Repay
                      </button>
                    </td>
                  </tr>
                ))}
                {/* --- TOTAL ROW --- */}
                <tr className="border-t-2 border-[#F2F4F7] bg-gray-50/30">
                  <td className="py-5 px-4 text-[16px] font-semibold text-[#FF4B4A]">Total</td>
                  <td className="py-5 px-4 text-[16px] font-semibold text-[#FF4B4A]">$1,250,000</td>
                  <td className="py-5 px-4 text-[16px] font-semibold text-[#FF4B4A]">$750,000</td>
                  <td className="py-5 px-4 text-[16px] text-[#343C6A]">-</td>
                  <td className="py-5 px-4 text-[16px] text-[#343C6A]">-</td>
                  <td className="py-5 px-4 text-[16px] font-semibold text-[#FF4B4A]">$50,000 / month</td>
                  <td className="py-5 px-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}