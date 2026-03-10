import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  FileText,
  Image as ImageIcon,
  Trash2,
  X
} from 'lucide-react';
import { Issue, IssueStatus, User, UserRole } from '../types';
import { EQUIPMENT_DATA } from '../constants';
import ConfirmModal from './ConfirmModal';

interface IssueTrackerProps {
  user: User;
}

export default function IssueTracker({ user }: IssueTrackerProps) {
  const [viewMode, setViewMode] = useState<'active' | 'history'>('active');
  const [filterStatus, setFilterStatus] = useState<string>('Barcha muammolar');
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: 'ISS-001',
      equipmentId: 't1-1200',
      equipmentName: '1200T (Tandem 1)',
      description: 'Gidravlik tizimda moy sizib chiqishi aniqlandi.',
      type: 'MECHANICAL',
      reportedBy: '1234 - Ali Valiyev',
      reportedAt: '2024-03-04 09:00',
      status: IssueStatus.OPEN
    },
    {
      id: 'ISS-002',
      equipmentId: 't2-800',
      equipmentName: '800T (Tandem 2)',
      description: 'PLC aloqa xatosi (E-Stop loop).',
      type: 'PLC',
      reportedBy: '5678 - Bobur Karimov',
      reportedAt: '2024-03-04 10:30',
      status: IssueStatus.IN_PROGRESS
    },
    {
      id: 'ISS-000',
      equipmentId: 't3-1000',
      equipmentName: '1000T (Tandem 3)',
      description: 'Asosiy motor qizib ketishi.',
      type: 'ELECTRICAL',
      reportedBy: '9999 - Test User',
      reportedAt: '2024-03-01 08:00',
      status: IssueStatus.CLOSED,
      closedBy: '0001 - Admin User',
      closedAt: '2024-03-01 16:00',
      closingComment: 'Motor podshipniklari almashtirildi va moylandi.'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [closingComment, setClosingComment] = useState('');
  const [newIssue, setNewIssue] = useState({
    equipmentId: '',
    description: '',
    type: 'MECHANICAL' as any
  });

  const isAdmin = user.role === UserRole.ADMIN || user.role === UserRole.CHIEF_MECHANIC;

  const handleAddIssue = () => {
    const equip = EQUIPMENT_DATA.find(e => e.id === newIssue.equipmentId);
    const issue: Issue = {
      id: `ISS-00${issues.length + 1}`,
      equipmentId: newIssue.equipmentId,
      equipmentName: equip ? `${equip.name} (${equip.line})` : 'Noma\'lum',
      description: newIssue.description,
      type: newIssue.type,
      reportedBy: `${user.tabelNumber} - ${user.name} ${user.surname}`,
      reportedAt: new Date().toLocaleString(),
      status: IssueStatus.OPEN
    };
    setIssues([issue, ...issues]);
    setShowAddModal(false);
  };

  const handleCloseIssue = () => {
    if (!showCloseModal) return;
    setIssues(issues.map(issue => 
      issue.id === showCloseModal 
        ? { 
            ...issue, 
            status: IssueStatus.CLOSED, 
            closedBy: `${user.tabelNumber} - ${user.name} ${user.surname}`,
            closedAt: new Date().toLocaleString(),
            closingComment: closingComment
          } 
        : issue
    ));
    setShowCloseModal(null);
    setClosingComment('');
  };

  const handleDeleteIssue = () => {
    if (confirmDeleteId) {
      setIssues(issues.filter(i => i.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  const getStatusStyle = (status: IssueStatus) => {
    switch (status) {
      case IssueStatus.OPEN: return 'bg-red-100 text-red-700 border-red-200';
      case IssueStatus.IN_PROGRESS: return 'bg-amber-100 text-amber-700 border-amber-200';
      case IssueStatus.CLOSED: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (viewMode === 'active' && issue.status === IssueStatus.CLOSED) return false;
    if (viewMode === 'history' && issue.status !== IssueStatus.CLOSED) return false;

    if (filterStatus === 'Barcha muammolar') return true;
    if (filterStatus === 'Ochiq') return issue.status === IssueStatus.OPEN;
    if (filterStatus === 'Jarayonda') return issue.status === IssueStatus.IN_PROGRESS;
    if (filterStatus === 'Yopilgan') return issue.status === IssueStatus.CLOSED;
    return true;
  });

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-2xl border border-slate-200 flex">
            <button 
              onClick={() => setViewMode('active')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'active' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Faol muammolar
            </button>
            <button 
              onClick={() => setViewMode('history')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'history' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Tarix
            </button>
          </div>

          {viewMode === 'active' && (
            <div className="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-2">
              <Filter size={18} className="text-slate-400" />
              <select 
                className="bg-transparent border-none focus:ring-0 text-sm font-medium text-black"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>Barcha muammolar</option>
                <option>Ochiq</option>
                <option>Jarayonda</option>
              </select>
            </div>
          )}
        </div>

        {viewMode === 'active' && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
          >
            <Plus size={20} />
            Yangi muammo
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Muammo ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stanok</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tavsif</th>
                {viewMode === 'history' && (
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Yopish izohi</th>
                )}
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {viewMode === 'active' ? 'Kim kiritgan' : 'Kim yopgan'}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {viewMode === 'active' ? 'Sana' : 'Yopilgan sana'}
                </th>
                {viewMode === 'active' && (
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Holat</th>
                )}
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-blue-600">{issue.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{issue.equipmentName}</p>
                    <p className="text-xs text-slate-500">{issue.type}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 max-w-xs truncate">{issue.description}</p>
                  </td>
                  {viewMode === 'history' && (
                    <td className="px-6 py-4">
                      <p className="text-sm text-emerald-600 font-medium max-w-xs italic">
                        "{issue.closingComment}"
                      </p>
                    </td>
                  )}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {viewMode === 'active' ? issue.reportedBy : issue.closedBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {viewMode === 'active' ? issue.reportedAt : issue.closedAt}
                  </td>
                  {viewMode === 'active' && (
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusStyle(issue.status)}`}>
                        {issue.status}
                      </span>
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-bold">Ko'rish</button>
                      {viewMode === 'active' && issue.status !== IssueStatus.CLOSED && (
                        <button 
                          onClick={() => setShowCloseModal(issue.id)}
                          className="text-emerald-600 hover:text-emerald-800 text-sm font-bold"
                        >
                          Yopish
                        </button>
                      )}
                      {isAdmin && (
                        <button 
                          onClick={() => setConfirmDeleteId(issue.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Close Issue Modal */}
      {showCloseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Muammoni yopish</h3>
              <button onClick={() => setShowCloseModal(null)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Yopish bo'yicha izoh</label>
                <textarea 
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Muammo qanday hal qilinganini yozing..."
                  value={closingComment}
                  onChange={(e) => setClosingComment(e.target.value)}
                ></textarea>
              </div>

              <button 
                onClick={handleCloseIssue}
                disabled={!closingComment.trim()}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all disabled:opacity-50 mt-4"
              >
                Muammoni yopish
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Issue Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Yangi muammo qo'shish</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Stanokni tanlang</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newIssue.equipmentId}
                  onChange={(e) => setNewIssue({...newIssue, equipmentId: e.target.value})}
                >
                  <option value="">Tanlang...</option>
                  {EQUIPMENT_DATA.map(e => (
                    <option key={e.id} value={e.id}>{e.name} ({e.line})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Muammo turi</label>
                <div className="grid grid-cols-3 gap-2">
                  {['MECHANICAL', 'ELECTRICAL', 'PLC'].map(type => (
                    <button
                      key={type}
                      onClick={() => setNewIssue({...newIssue, type: type as any})}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                        newIssue.type === type 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Muammo tavsifi</label>
                <textarea 
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Muammoni batafsil tasvirlang..."
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                ></textarea>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all">
                  Rasm yuklash
                </button>
                <button className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all">
                  Fayl yuklash
                </button>
              </div>

              <button 
                onClick={handleAddIssue}
                disabled={!newIssue.equipmentId || !newIssue.description}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                Saqlash
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDeleteIssue}
        title="Muammoni o'chirish"
        message="Haqiqatan ham ushbu muammo qaydini tizimdan butunlay o'chirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."
        confirmLabel="O'chirish"
        variant="danger"
      />
    </div>
  );
}
