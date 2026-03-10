import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  AlertCircle, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Bot, 
  Wrench, 
  LogOut,
  User as UserIcon,
  Menu,
  X
} from 'lucide-react';
import { User, UserRole } from '../types';

interface SidebarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ user, activeTab, setActiveTab, onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Uskunalar', icon: LayoutDashboard, roles: Object.values(UserRole) },
    { id: 'issues', label: 'Muammolar', icon: AlertCircle, roles: Object.values(UserRole) },
    { id: 'tools', label: 'Asboblar', icon: Wrench, roles: Object.values(UserRole) },
    { id: 'spare-parts', label: 'Ehtiyot qismlar', icon: FileText, roles: Object.values(UserRole) },
    { id: 'chat', label: 'Chat', icon: MessageSquare, roles: Object.values(UserRole) },
    { id: 'analytics', label: 'Statistika', icon: BarChart3, roles: Object.values(UserRole) },
    { id: 'ai', label: 'AI Assistant', icon: Bot, roles: Object.values(UserRole) },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(user.role));

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-white p-4">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
          UA
        </div>
        <div>
          <h1 className="font-bold text-lg leading-none">UzAuto</h1>
          <p className="text-xs text-slate-400">Press 3 Platform</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-slate-800/50 rounded-xl">
          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
            <UserIcon size={20} className="text-slate-300" />
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-sm truncate">{user.name} {user.surname}</p>
            <p className="text-xs text-slate-400 truncate">{user.role}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Chiqish</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-slate-900 text-white rounded-lg shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen fixed left-0 top-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 w-72 h-screen z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
