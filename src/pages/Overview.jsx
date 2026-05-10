import React, { useState } from 'react';
import { Send, ChevronRight, CreditCard, DollarSign } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, Sector,
  AreaChart, Area
} from 'recharts';

// ================= DATA =================
const weeklyData = [
  { name: 'Sat', diposit: 240, withdraw: 480 },
  { name: 'Sun', diposit: 130, withdraw: 350 },
  { name: 'Mon', diposit: 260, withdraw: 330 },
  { name: 'Tue', diposit: 370, withdraw: 480 },
  { name: 'Wed', diposit: 240, withdraw: 150 },
  { name: 'Thu', diposit: 240, withdraw: 390 },
  { name: 'Fri', diposit: 340, withdraw: 400 },
];

const balanceData = [
  { name: 'Jul', balance: 120 },
  { name: 'Aug', balance: 320 },
  { name: 'Sep', balance: 250 },
  { name: 'Oct', balance: 780 },
  { name: 'Nov', balance: 220 },
  { name: 'Dec', balance: 580 },
  { name: 'Jan', balance: 250 },
];

const expenseData = [
  { name: 'Bill Expense', value: 15, color: '#FC7900' },  
  { name: 'Entertainment', value: 30, color: '#343C6A' }, 
  { name: 'Others', value: 35, color: '#1814F3' },        
  { name: 'Investment', value: 20, color: '#FA00FF' },    
];

// ================= RENDERERS =================
const renderCustomLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex justify-end gap-4 md:gap-6 pb-4">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
          <span className="text-[12px] md:text-[14px] text-[#718EBF] font-medium capitalize">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55; 
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ pointerEvents: 'none' }}>
      <tspan x={x} dy="-0.5em" className="text-[12px] md:text-[15px] font-bold">{`${(percent * 100).toFixed(0)}%`}</tspan>
      <tspan x={x} dy="1.4em" className="text-[10px] md:text-[12px] font-medium">{name}</tspan>
    </text>
  );
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  
  const expandedOuterRadius = outerRadius + 8; 
  const labelRadius = innerRadius + (expandedOuterRadius - innerRadius) * 0.55;
  const lx = cx + labelRadius * cos;
  const ly = cy + labelRadius * sin;

  return (
    <g>
      <Sector
        cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={expandedOuterRadius}
        startAngle={startAngle} endAngle={endAngle} fill={fill}
        style={{ transition: 'all 0.3s ease' }}
      />
      <text x={lx} y={ly} fill="white" textAnchor="middle" dominantBaseline="central" style={{ pointerEvents: 'none' }}>
        <tspan x={lx} dy="-0.5em" className="text-[14px] md:text-[17px] font-bold">{`${(percent * 100).toFixed(0)}%`}</tspan>
        <tspan x={lx} dy="1.4em" className="text-[11px] md:text-[13px] font-medium">{payload.name}</tspan>
      </text>
    </g>
  );
};

const ExpensePieChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={expenseData}
          cx="50%" cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="90%"
          innerRadius={0}
          dataKey="value"
          stroke="#ffffff" 
          strokeWidth={4}  
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {expenseData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip cursor={{fill: 'transparent'}}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

// ================= KOMPONEN UTAMA =================
export default function Overview() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 bg-[#F5F7FA]">
      
      {/* BARIS 1: CARDS & TRANSACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* MY CARDS */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[18px] md:text-[22px] font-semibold text-[#343C6A]">My Cards</h3>
            <button className="text-[14px] md:text-[16px] font-semibold text-[#343C6A] hover:text-[#2D60FF]">See All</button>
          </div>
          
          <div className="flex md:grid md:grid-cols-2 gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* BLUE CARD */}
            <div className="min-w-[280px] md:min-w-full rounded-[20px] md:rounded-[25px] bg-[#2D60FF] text-white flex flex-col justify-between min-h-[200px] md:min-h-[235px] overflow-hidden relative shadow-lg">
              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[11px] md:text-[13px] font-light text-white/80">Balance</p>
                    <p className="text-[18px] md:text-[24px] font-semibold mt-1">$5,756</p>
                  </div>
                  <svg width="30" height="30" viewBox="0 0 35 35" fill="none" className="md:w-[35px] md:h-[35px]">
                    <rect x="5" y="9" width="25" height="17" rx="3" stroke="white" strokeWidth="2"/>
                    <path d="M13 9V26M22 9V26M5 17.5H13M22 17.5H30" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="flex gap-10 mt-4 md:mt-6">
                  <div>
                    <p className="text-[10px] md:text-[12px] font-light text-white/80">CARD HOLDER</p>
                    <p className="text-[13px] md:text-[16px] font-semibold mt-1">Eddy Cusuma</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-[12px] font-light text-white/80">VALID THRU</p>
                    <p className="text-[13px] md:text-[16px] font-semibold mt-1">12/22</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-b from-white/15 to-white/0 px-5 md:px-6 py-3 md:py-4 flex justify-between items-center border-t border-white/10">
                <p className="text-[15px] md:text-[22px] font-semibold tracking-widest">3778 **** **** 1234</p>
                <div className="flex items-center">
                  <div className="h-[24px] w-[24px] md:h-[30px] md:w-[30px] rounded-full bg-white/50 relative z-10"></div>
                  <div className="h-[24px] w-[24px] md:h-[30px] md:w-[30px] rounded-full bg-white/50 -ml-3 md:-ml-4 relative z-0"></div>
                </div>
              </div>
            </div>

            {/* WHITE CARD */}
            <div className="min-w-[280px] md:min-w-full rounded-[20px] md:rounded-[25px] bg-white border border-[#DFEAF2] text-[#343C6A] flex flex-col justify-between min-h-[200px] md:min-h-[235px] overflow-hidden">
              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[11px] md:text-[13px] font-medium text-[#718EBF]">Balance</p>
                    <p className="text-[18px] md:text-[24px] font-bold mt-1">$5,756</p>
                  </div>
                  <svg width="30" height="30" viewBox="0 0 35 35" fill="none">
                    <rect x="5" y="9" width="25" height="17" rx="3" stroke="#343C6A" strokeWidth="2"/>
                    <path d="M13 9V26M22 9V26M5 17.5H13M22 17.5H30" stroke="#343C6A" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="flex gap-10 mt-4 md:mt-6">
                  <div>
                    <p className="text-[10px] md:text-[12px] font-medium text-[#718EBF]">CARD HOLDER</p>
                    <p className="text-[13px] md:text-[16px] font-bold mt-1">Eddy Cusuma</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-[12px] font-medium text-[#718EBF]">VALID THRU</p>
                    <p className="text-[13px] md:text-[16px] font-bold mt-1">12/22</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-[#DFEAF2] px-5 md:px-6 py-3 md:py-4 flex justify-between items-center">
                <p className="text-[15px] md:text-[22px] font-bold tracking-widest text-[#343C6A]">3778 **** **** 1234</p>
                <div className="flex items-center">
                  <div className="h-[24px] w-[24px] md:h-[30px] md:w-[30px] rounded-full bg-[#9199AF]/30 relative z-10"></div>
                  <div className="h-[24px] w-[24px] md:h-[30px] md:w-[30px] rounded-full bg-[#9199AF]/30 -ml-3 md:-ml-4 relative z-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT TRANSACTION - UPDATED ICONS */}
        <div>
          <h3 className="mb-4 text-[18px] md:text-[22px] font-semibold text-[#343C6A]">Recent Transaction</h3>
          <div className="flex flex-col justify-center gap-4 md:gap-5 rounded-[20px] md:rounded-[25px] bg-white p-5 md:p-6 shadow-sm h-[200px] md:h-[235px]">
            {[
              { 
                label: "Deposit from my Card", 
                date: "28 January 2021", 
                amount: "-$850", 
                color: "text-[#FF4B4A]", 
                bg: "bg-[#FFF5D9]", 
                icon: <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-[#FFBB38]" /> 
              },
              { 
                label: "Deposit Paypal", 
                date: "25 January 2021", 
                amount: "+$2,500", 
                color: "text-[#41D4A8]", 
                bg: "bg-[#E7EDFF]", 
                icon: <span className="text-[16px] md:text-[18px] font-bold text-[#396AFF] italic">P</span> 
              },
              { 
                label: "Jemi Wilson", 
                date: "21 January 2021", 
                amount: "+$5,400", 
                color: "text-[#41D4A8]", 
                bg: "bg-[#DCFAF8]", 
                icon: <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-[#16DBCC]" /> 
              }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`flex h-[40px] w-[40px] md:h-[50px] md:w-[50px] items-center justify-center rounded-full ${item.bg}`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[14px] md:text-[16px] font-medium text-[#232323] truncate max-w-[120px] md:max-w-none">{item.label}</p>
                    <p className="text-[12px] md:text-[14px] text-[#718EBF]">{item.date}</p>
                  </div>
                </div>
                <p className={`text-[14px] md:text-[16px] font-medium ${item.color}`}>{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BARIS 2: ACTIVITY & STATISTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-[18px] md:text-[22px] font-semibold text-[#343C6A]">Weekly Activity</h3>
          <div className="rounded-[20px] md:rounded-[25px] bg-white p-4 md:p-6 shadow-sm h-[280px] md:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F3F5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#718EBF', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#718EBF', fontSize: 12}} />
                <Tooltip cursor={{fill: '#F5F7FA'}}/>
                <Legend content={renderCustomLegend} verticalAlign="top" align="right" />
                <Bar dataKey="withdraw" fill="#1814F3" radius={[10, 10, 10, 10]} barSize={15} />
                <Bar dataKey="diposit" fill="#16DBCC" radius={[10, 10, 10, 10]} barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[18px] md:text-[22px] font-semibold text-[#343C6A]">Expense Statistics</h3>
          <div className="rounded-[20px] md:rounded-[25px] bg-white p-4 shadow-sm h-[280px] md:h-[320px]">
             <ExpensePieChart />
          </div>
        </div>
      </div>

      {/* BARIS 3: TRANSFER & HISTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-5">
          <h3 className="mb-4 text-[18px] md:text-[22px] font-semibold text-[#343C6A]">Quick Transfer</h3>
          <div className="rounded-[20px] md:rounded-[25px] bg-white p-6 md:p-8 shadow-sm h-[240px] md:h-[276px] flex flex-col justify-center">
            <div className="flex items-center justify-between mb-6 md:mb-8 overflow-x-auto pb-2 gap-4">
              {[
                { name: "Livia Bator", role: "CEO", img: "5" },
                { name: "Randy Press", role: "Director", img: "11" },
                { name: "Workman", role: "Designer", img: "12" }
              ].map((user, i) => (
                <div key={i} className="flex flex-col items-center min-w-[70px] md:min-w-[80px]">
                  <img src={`https://i.pravatar.cc/150?img=${user.img}`} className="h-[50px] w-[50px] md:h-[65px] md:w-[65px] rounded-full object-cover mb-2" />
                  <p className="text-[12px] md:text-[14px] font-medium text-[#232323] whitespace-nowrap">{user.name}</p>
                  <p className="text-[11px] md:text-[12px] text-[#718EBF]">{user.role}</p>
                </div>
              ))}
              <button className="h-[40px] w-[40px] rounded-full bg-white shadow-md flex items-center justify-center shrink-0">
                <ChevronRight className="h-5 w-5 text-[#718EBF]" />
              </button>
            </div>
            
            <div className="flex items-center gap-3 md:gap-6">
              <span className="text-[12px] md:text-[15px] text-[#718EBF] whitespace-nowrap">Write Amount</span>
              <div className="relative flex-1 bg-[#EDF1F7] rounded-full flex items-center h-[40px] md:h-[45px]">
                <input 
                  type="text" 
                  defaultValue="525.50"
                  className="w-full bg-transparent pl-4 pr-[85px] md:pr-[110px] text-[13px] md:text-[15px] font-semibold text-[#343C6A] outline-none"
                />
                <button className="absolute right-0 top-0 bottom-0 flex items-center justify-center gap-1.5 md:gap-2 rounded-full bg-[#1814F3] px-4 md:px-6 text-white hover:bg-[#0A06F4] shadow-md transition-all">
                  <span className="text-[13px] md:text-[15px] font-medium">Send</span>
                  <Send className="h-3.5 w-3.5 md:h-4 md:w-4 fill-current" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <h3 className="mb-4 text-[18px] md:text-[22px] font-semibold text-[#343C6A]">Balance History</h3>
          <div className="rounded-[20px] md:rounded-[25px] bg-white p-4 md:p-6 shadow-sm h-[240px] md:h-[276px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1814F3" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#1814F3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFEAF2" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#718EBF', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#718EBF', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="balance" stroke="#1814F3" strokeWidth={3} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}