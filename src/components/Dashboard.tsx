import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Equipment } from '../types';
import { Settings, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onSelectEquipment: (id: string) => void;
  equipmentData: Equipment[];
}

export default function Dashboard({ onSelectEquipment, equipmentData }: DashboardProps) {
  const [filter, setFilter] = useState('All');
  const lines = ['All', ...Array.from(new Set(equipmentData.map(e => e.line)))];

  const filteredEquipment = filter === 'All' 
    ? equipmentData 
    : equipmentData.filter(e => e.line === filter);

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2 gap-4 no-scrollbar">
        <div className="flex gap-2">
          {lines.map(line => (
            <button
              key={line}
              onClick={() => setFilter(line)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === line 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {line}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEquipment.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectEquipment(item.id)}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${item.status === 'OK' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                <Settings size={24} className={item.status === 'OK' ? '' : 'animate-spin-slow'} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                item.status === 'OK' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {item.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{item.line}</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                {item.status === 'OK' ? (
                  <CheckCircle2 size={16} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={16} className="text-amber-500" />
                )}
                <span className="text-xs font-medium text-slate-600">
                  {item.status === 'OK' ? 'Ishchi holatda' : 'Ta\'mirlashda'}
                </span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
