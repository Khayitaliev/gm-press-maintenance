import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  Globe,
  Hash,
  X
} from 'lucide-react';
import { SparePart, User, UserRole } from '../types';
import ConfirmModal from './ConfirmModal';

interface SparePartsProps {
  user: User;
}

export default function SpareParts({ user }: SparePartsProps) {
  const [parts, setParts] = useState<SparePart[]>([
    { id: '1', name: 'Gidravlik klapan R900', serialNumber: 'SN-992211', manufacturer: 'Bosch Rexroth (Germaniya)', quantity: 5, addedAt: '2024-02-15' },
    { id: '2', name: 'PLC Moduli S7-1500', serialNumber: '6ES7511-1AK02', manufacturer: 'Siemens (Germaniya)', quantity: 2, addedAt: '2024-02-20' },
    { id: '3', name: 'Moy filtri 10 micron', serialNumber: 'MF-10-UA', manufacturer: 'UzAuto Components (O\'zbekiston)', quantity: 20, addedAt: '2024-03-01' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPart, setEditingPart] = useState<SparePart | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [newPart, setNewPart] = useState({
    name: '',
    serialNumber: '',
    manufacturer: '',
    quantity: 1
  });

  const isAdmin = user.role === UserRole.ADMIN || user.role === UserRole.CHIEF_MECHANIC;
  const canManage = isAdmin;

  const handleAddPart = () => {
    const part: SparePart = {
      id: Date.now().toString(),
      ...newPart,
      addedAt: new Date().toISOString().split('T')[0]
    };
    setParts([part, ...parts]);
    setShowAddModal(false);
    setNewPart({ name: '', serialNumber: '', manufacturer: '', quantity: 1 });
  };

  const handleUpdatePart = () => {
    if (!editingPart || !editingPart.name) return;
    setParts(parts.map(p => p.id === editingPart.id ? editingPart : p));
    setEditingPart(null);
  };

  const handleDeletePart = () => {
    if (confirmDeleteId) {
      setParts(parts.filter(p => p.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center bg-white rounded-xl px-4 py-2 border border-slate-200 w-full sm:w-96">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Ehtiyot qism qidirish..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 text-black"
          />
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
        >
          <Plus size={20} />
          Yangi qism qo'shish
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {parts.map((part, index) => (
          <motion.div
            key={part.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Package size={24} />
              </div>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase">
                Mavjud: {part.quantity}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-3">{part.name}</h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-slate-500">
                <Hash size={14} />
                <span className="text-xs font-medium">SN: {part.serialNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Globe size={14} />
                <span className="text-xs font-medium">{part.manufacturer}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Qo'shildi: {part.addedAt}</p>
              {canManage && (
                <div className="flex gap-1">
                  <button 
                    onClick={() => setEditingPart(part)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => setConfirmDeleteId(part.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Part Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Yangi ehtiyot qism</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nomi</label>
                <input 
                  type="text" 
                  placeholder="Masalan: Gidravlik klapan" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newPart.name}
                  onChange={(e) => setNewPart({...newPart, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Seria raqami (SN)</label>
                <input 
                  type="text" 
                  placeholder="SN-123456" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newPart.serialNumber}
                  onChange={(e) => setNewPart({...newPart, serialNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Ishlab chiqarilgan joyi</label>
                <input 
                  type="text" 
                  placeholder="Masalan: Siemens (Germaniya)" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newPart.manufacturer}
                  onChange={(e) => setNewPart({...newPart, manufacturer: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Soni</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newPart.quantity}
                  onChange={(e) => setNewPart({...newPart, quantity: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <button 
                onClick={handleAddPart}
                disabled={!newPart.name || !newPart.serialNumber}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50 mt-4"
              >
                Saqlash
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {/* Edit Part Modal */}
      {editingPart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Ehtiyot qismni tahrirlash</h3>
              <button onClick={() => setEditingPart(null)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nomi</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editingPart.name}
                  onChange={(e) => setEditingPart({...editingPart, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Seria raqami (SN)</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editingPart.serialNumber}
                  onChange={(e) => setEditingPart({...editingPart, serialNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Ishlab chiqarilgan joyi</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editingPart.manufacturer}
                  onChange={(e) => setEditingPart({...editingPart, manufacturer: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Soni</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editingPart.quantity}
                  onChange={(e) => setEditingPart({...editingPart, quantity: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <button 
                onClick={handleUpdatePart}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all mt-4"
              >
                Yangilash
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDeletePart}
        title="Ehtiyot qismni o'chirish"
        message="Haqiqatan ham ushbu ehtiyot qismni tizimdan butunlay o'chirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."
        confirmLabel="O'chirish"
        variant="danger"
      />
    </div>
  );
}
