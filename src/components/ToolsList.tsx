import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Wrench, 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  AlertCircle,
  X
} from 'lucide-react';
import { MaintenanceTool, User, UserRole } from '../types';
import ConfirmModal from './ConfirmModal';

interface ToolsListProps {
  user: User;
}

export default function ToolsList({ user }: ToolsListProps) {
  const [tools, setTools] = useState<MaintenanceTool[]>([
    { id: '1', name: 'Multimetr Fluke 87V', quantity: 5, status: 'AVAILABLE' },
    { id: '2', name: 'Gidravlik nasos (Portativ)', quantity: 2, status: 'IN_USE' },
    { id: '3', name: 'PLC Programator (Siemens)', quantity: 3, status: 'AVAILABLE' },
    { id: '4', name: 'Kalitlar to\'plami (32mm)', quantity: 10, status: 'AVAILABLE' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTool, setEditingTool] = useState<MaintenanceTool | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [newTool, setNewTool] = useState({ name: '', quantity: 1 });
  
  const isAdmin = user.role === UserRole.ADMIN || user.role === UserRole.CHIEF_MECHANIC;
  const canManage = isAdmin; 

  const handleAddTool = () => {
    if (!newTool.name) return;
    const tool: MaintenanceTool = {
      id: Date.now().toString(),
      name: newTool.name,
      quantity: newTool.quantity,
      status: 'AVAILABLE'
    };
    setTools([...tools, tool]);
    setShowAddModal(false);
    setNewTool({ name: '', quantity: 1 });
  };

  const handleUpdateTool = () => {
    if (!editingTool || !editingTool.name) return;
    setTools(tools.map(t => t.id === editingTool.id ? editingTool : t));
    setEditingTool(null);
  };

  const handleDeleteTool = () => {
    if (confirmDeleteId) {
      setTools(tools.filter(t => t.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-emerald-100 text-emerald-700';
      case 'IN_USE': return 'bg-amber-100 text-amber-700';
      case 'REPAIR': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center bg-white rounded-xl px-4 py-2 border border-slate-200 w-full sm:w-96">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Asbob qidirish..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 text-black"
          />
        </div>

        {canManage && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
          >
            <Plus size={20} />
            Yangi asbob
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Wrench size={24} />
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(tool.status)}`}>
                {tool.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">{tool.name}</h3>
            <p className="text-sm text-slate-500 mb-6">Mavjud: {tool.quantity} dona</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex gap-2">
                {canManage ? (
                  <>
                    <button 
                      onClick={() => setEditingTool(tool)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => setConfirmDeleteId(tool.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <button className="text-blue-600 text-xs font-bold hover:underline">Band qilish</button>
                )}
              </div>
              <div className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 size={14} />
                <span className="text-[10px] font-bold uppercase">Tekshirilgan</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Tool Modal (Mock) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Yangi asbob qo'shish</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Asbob nomi" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black" 
                value={newTool.name}
                onChange={(e) => setNewTool({...newTool, name: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="Soni" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black" 
                value={newTool.quantity}
                onChange={(e) => setNewTool({...newTool, quantity: parseInt(e.target.value) || 0})}
              />
              <button 
                onClick={handleAddTool}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Tool Modal */}
      {editingTool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Asbobni tahrirlash</h3>
              <button onClick={() => setEditingTool(null)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Nomi</label>
                <input 
                  type="text" 
                  placeholder="Asbob nomi" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black" 
                  value={editingTool.name}
                  onChange={(e) => setEditingTool({...editingTool, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Soni</label>
                <input 
                  type="number" 
                  placeholder="Soni" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black" 
                  value={editingTool.quantity}
                  onChange={(e) => setEditingTool({...editingTool, quantity: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Holati</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black"
                  value={editingTool.status}
                  onChange={(e) => setEditingTool({...editingTool, status: e.target.value as any})}
                >
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="IN_USE">IN_USE</option>
                  <option value="REPAIR">REPAIR</option>
                </select>
              </div>
              <button 
                onClick={handleUpdateTool}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
              >
                Yangilash
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDeleteTool}
        title="Asbobni o'chirish"
        message="Haqiqatan ham ushbu asbobni tizimdan butunlay o'chirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."
        confirmLabel="O'chirish"
        variant="danger"
      />
    </div>
  );
}
