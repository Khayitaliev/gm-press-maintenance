import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import IssueTracker from './components/IssueTracker';
import EquipmentDetail from './components/EquipmentDetail';
import Analytics from './components/Analytics';
import Chat from './components/Chat';
import AIAssistant from './components/AIAssistant';
import ToolsList from './components/ToolsList';
import SpareParts from './components/SpareParts';
import Auth from './components/Auth';
import { User, Equipment } from './types';
import { EQUIPMENT_DATA } from './constants';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [equipmentData, setEquipmentData] = useState<Equipment[]>(EQUIPMENT_DATA);

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  const renderContent = () => {
    if (selectedEquipmentId) {
      return (
        <EquipmentDetail 
          equipmentId={selectedEquipmentId} 
          onBack={() => setSelectedEquipmentId(null)}
          user={user}
          equipmentData={equipmentData}
          onUpdateEquipment={(updated) => {
            setEquipmentData(equipmentData.map(e => e.id === updated.id ? updated : e));
          }}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onSelectEquipment={setSelectedEquipmentId} equipmentData={equipmentData} />;
      case 'issues':
        return <IssueTracker user={user} />;
      case 'tools':
        return <ToolsList user={user} />;
      case 'spare-parts':
        return <SpareParts user={user} />;
      case 'chat':
        return <Chat user={user} />;
      case 'analytics':
        return <Analytics />;
      case 'ai':
        return <AIAssistant />;
      default:
        return <Dashboard onSelectEquipment={setSelectedEquipmentId} equipmentData={equipmentData} />;
    }
  };

  const getTitle = () => {
    if (selectedEquipmentId) return 'Uskuna tafsilotlari';
    const titles: Record<string, string> = {
      dashboard: 'Uskunalar Dashbordi',
      issues: 'Muammolar Boshqaruvi',
      tools: 'Maintenance Asbob-Uskunalari',
      'spare-parts': 'Ehtiyot qismlar ombori',
      chat: 'Guruh Chat: Press 3',
      analytics: 'Statistika va Hisobotlar',
      ai: 'AI Maintenance Assistant'
    };
    return titles[activeTab] || 'Press 3 Platform';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedEquipmentId(null);
        }} 
        onLogout={() => setUser(null)}
      />
      
      <main className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        <Header user={user} title={getTitle()} />
        
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedEquipmentId || activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
