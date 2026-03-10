import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Settings, 
  History, 
  ChevronLeft,
  Shield,
  Cpu,
  Wrench,
  BookOpen,
  X,
  Upload
} from 'lucide-react';
import { User, UserRole, Equipment } from '../types';

interface EquipmentDetailProps {
  equipmentId: string;
  onBack: () => void;
  user: User;
  equipmentData: Equipment[];
  onUpdateEquipment: (equipment: Equipment) => void;
}

export default function EquipmentDetail({ equipmentId, onBack, user, equipmentData, onUpdateEquipment }: EquipmentDetailProps) {
  const equipment = equipmentData.find(e => e.id === equipmentId);
  const [editingDoc, setEditingDoc] = React.useState<{ id: string, label: string, value: string } | null>(null);

  if (!equipment) return null;

  const isAdmin = user.role === UserRole.ADMIN || user.role === UserRole.CHIEF_MECHANIC;

  const docTypes = [
    { id: 'electrical', label: 'Elektr sxemasi', icon: Cpu, format: 'PDF/DWG', value: equipment.docs.electrical },
    { id: 'mechanical', label: 'Mexanik chizma', icon: Wrench, format: 'PDF/DWG', value: equipment.docs.mechanical },
    { id: 'plc', label: 'PLC dasturi', icon: Settings, format: 'L5X/ZIP', value: equipment.docs.plc },
    { id: 'adminBooks', label: 'Admin kitoblari', icon: BookOpen, format: 'PDF/DOCX', value: equipment.docs.adminBooks || '#' },
  ];

  const handleUpdateDoc = () => {
    if (!editingDoc) return;
    const updatedDocs = { ...equipment.docs, [editingDoc.id]: editingDoc.value };
    onUpdateEquipment({ ...equipment, docs: updatedDocs });
    setEditingDoc(null);
  };

  return (
    <div className="p-4 lg:p-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all mb-8 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-all" />
        <span className="font-bold">Orqaga qaytish</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-2">{equipment.name}</h1>
                <p className="text-lg text-slate-500">{equipment.line} • {equipment.type}</p>
              </div>
              <div className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider ${
                equipment.status === 'OK' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {equipment.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {docTypes.map((doc) => (
                <div key={doc.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-200 transition-all group">
                  <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                    <doc.icon size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{doc.label}</h3>
                  <p className="text-xs text-slate-500 mb-4">{doc.format}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
                      <Download size={14} /> Yuklab olish
                    </button>
                    {isAdmin && (
                      <button 
                        onClick={() => setEditingDoc({ id: doc.id, label: doc.label, value: doc.value })}
                        className="p-2 bg-white text-slate-400 border border-slate-200 rounded-lg hover:text-blue-600 hover:border-blue-600 transition-all"
                      >
                        <Settings size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <History className="text-blue-600" /> Muammolar tarixi
              </h2>
              <button className="text-blue-600 font-bold text-sm">Barchasini ko'rish</button>
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">Gidravlik klapan almashtirildi</p>
                    <p className="text-xs text-slate-500">24.02.2024 • Mexanik: 1234 - Ali Valiyev</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">Yopilgan</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Shield className="text-blue-400" /> Xavfsizlik qoidalari
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="w-5 h-5 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                <span>LOTO (Lock Out Tag Out) tizimidan foydalaning.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-5 h-5 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                <span>Himoya ko'zoynagi va qo'lqop kiying.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-5 h-5 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                <span>Stanok to'liq to'xtaganiga ishonch hosil qiling.</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-600 text-white rounded-3xl p-8 shadow-xl shadow-blue-600/20">
            <h3 className="text-xl font-bold mb-4">AI Diagnostika</h3>
            <p className="text-sm text-blue-100 mb-6">Ushbu stanokdagi muammolarni AI yordamida tezkor aniqlang.</p>
            <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all">
              AI Assistantni ochish
            </button>
          </div>
        </div>
      </div>

      {editingDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-slate-900">Hujjatni yangilash</h3>
              <button onClick={() => setEditingDoc(null)} className="text-slate-400 hover:text-slate-600 p-2">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">{editingDoc.label} (Havola/URL)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-black font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={editingDoc.value}
                    onChange={(e) => setEditingDoc({ ...editingDoc, value: e.target.value })}
                  />
                </div>
              </div>

              <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 shadow-sm transition-all">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-bold text-slate-600">Yangi fayl yuklash</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">PDF, DWG, ZIP (Max 50MB)</p>
              </div>

              <button 
                onClick={handleUpdateDoc}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
              >
                Saqlash
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
