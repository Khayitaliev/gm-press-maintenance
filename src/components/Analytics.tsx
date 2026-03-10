import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Download, FileSpreadsheet, FileText, Filter } from 'lucide-react';

const lineData = [
  { name: 'Tandem 1', issues: 12 },
  { name: 'Tandem 2', issues: 8 },
  { name: 'Tandem 3', issues: 15 },
  { name: 'Tandem 4', issues: 5 },
  { name: 'Small A', issues: 20 },
  { name: 'Small B', issues: 18 },
];

const typeData = [
  { name: 'Mexanik', value: 45 },
  { name: 'Elektr', value: 35 },
  { name: 'PLC', value: 20 },
];

const trendData = [
  { name: 'Dush', issues: 4 },
  { name: 'Sesh', issues: 7 },
  { name: 'Chor', issues: 5 },
  { name: 'Pay', issues: 10 },
  { name: 'Jum', issues: 8 },
  { name: 'Shan', issues: 3 },
  { name: 'Yak', issues: 2 },
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b'];

export default function Analytics() {
  const [period, setPeriod] = React.useState('Haftalik');

  const stats = {
    daily: { total: 4, resolved: 3, pending: 1 },
    weekly: { total: 28, resolved: 22, pending: 6 },
    monthly: { total: 112, resolved: 95, pending: 17 }
  };

  const currentStats = period === 'Kunlik' ? stats.daily : period === 'Haftalik' ? stats.weekly : stats.monthly;

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <select 
              className="bg-transparent border-none focus:ring-0 text-sm font-bold text-black"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option>Kunlik</option>
              <option>Haftalik</option>
              <option>Oylik</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-emerald-700 transition-all">
            <FileSpreadsheet size={18} /> Excel
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-red-700 transition-all">
            <FileText size={18} /> PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-bold text-slate-500 uppercase mb-2">Jami muammolar</p>
          <p className="text-4xl font-black text-slate-900">{currentStats.total}</p>
          <p className="text-xs text-slate-400 mt-2">{period} ko'rsatkich</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-bold text-emerald-600 uppercase mb-2">Hal qilingan</p>
          <p className="text-4xl font-black text-emerald-600">{currentStats.resolved}</p>
          <p className="text-xs text-emerald-500/60 mt-2">Muvaffaqiyatli yopilgan</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-bold text-amber-600 uppercase mb-2">Kutilmoqda</p>
          <p className="text-4xl font-black text-amber-600">{currentStats.pending}</p>
          <p className="text-xs text-amber-500/60 mt-2">Hali yopilmagan</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-6">Liniyalar bo'yicha muammolar soni</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="issues" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-6">Muammo turlari tahlili</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-6">Haftalik trendlar</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="issues" stroke="#2563eb" strokeWidth={3} dot={{r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
