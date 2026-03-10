import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User as UserIcon, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Wrench, 
  Cpu, 
  BarChart3, 
  MessageSquare, 
  Bot,
  Calendar
} from 'lucide-react';
import { User, UserRole } from '../types';
import { ROLES } from '../constants';

interface AuthProps {
  onLogin: (user: User) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showOverview, setShowOverview] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birthDate: '',
    tabelNumber: '',
    password: '',
    role: UserRole.MECHANIC
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate with backend
    onLogin({
      id: Math.random().toString(),
      name: formData.name || 'Foydalanuvchi',
      surname: formData.surname || '',
      birthDate: formData.birthDate,
      tabelNumber: formData.tabelNumber,
      role: formData.role,
      department: 'Press 3'
    });
  };

  const LandingView = () => (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-3 rounded-full font-bold mb-8 shadow-xl shadow-blue-600/20"
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm font-black">UA</span>
          </div>
          UzAuto Motors
        </motion.div>
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
          Press No 3 Maintenance <br />
          <span className="text-blue-600">Platformasiga xush kelibsiz</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Press va yordamchi uskunalarning uzluksiz, barqaror va samarali ishlashini ta'minlash maqsadida ishlab chiqilgan yagona texnik ekotizim.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[
          { icon: ShieldCheck, title: 'Nosozliklarni qayd qilish', desc: 'Barcha texnik muammolarni real vaqtda tizimga kiritish va kuzatish.' },
          { icon: Wrench, title: 'Workflow boshqaruvi', desc: 'Muammolarni hal qilish jarayonini bosqichma-bosqich nazorat qilish.' },
          { icon: Cpu, title: 'Texnik hujjatlar', desc: 'Elektr sxemalar, mexanik chizmalar va PLC dasturlari yagona bazada.' },
          { icon: MessageSquare, title: 'Tezkor muloqot', desc: 'Maintenance xodimlari o\'rtasida real-time chat va fayl almashish.' },
          { icon: BarChart3, title: 'Statistika va tahlil', desc: 'Nosozliklar trendini kuzatish va samaradorlikni oshirish uchun hisobotlar.' },
          { icon: Bot, title: 'AI Assistant', desc: 'Sun\'iy intellekt orqali diagnostika va o\'zbek tilida ovozli yordam.' },
        ].map((feature, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group"
          >
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <feature.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={() => { setShowOverview(false); setIsLogin(true); }}
          className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
        >
          Kirish <ArrowRight size={20} />
        </button>
        <button 
          onClick={() => { setShowOverview(false); setIsLogin(false); }}
          className="w-full sm:w-auto bg-white text-slate-900 border-2 border-slate-200 px-10 py-4 rounded-2xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all"
        >
          Ro'yxatdan o'tish
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AnimatePresence mode="wait">
        {showOverview ? (
          <motion.div 
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <LandingView />
          </motion.div>
        ) : (
          <motion.div 
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex items-center justify-center p-4"
          >
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
              <div className="bg-blue-600 p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/50 to-transparent"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-blue-600 text-2xl font-black">UA</span>
                  </div>
                  <h2 className="text-3xl font-black mb-2">UzAuto Motors</h2>
                  <p className="text-blue-100 text-sm font-medium">Press 3 Maintenance Platform</p>
                </div>
              </div>

              <div className="p-8 lg:p-10">
                <div className="flex gap-4 mb-8 bg-slate-100 p-1 rounded-2xl">
                  <button 
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    Kirish
                  </button>
                  <button 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${!isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    Ro'yxatdan o'tish
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Ism</label>
                        <div className="relative">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input 
                            required
                            type="text" 
                            placeholder="Ali"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-black font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Familiya</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Valiyev"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-black font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={formData.surname}
                          onChange={(e) => setFormData({...formData, surname: e.target.value})}
                        />
                      </div>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Tug'ilgan sana</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          required
                          type="date" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-black font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={formData.birthDate}
                          onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Tabel raqami</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="text" 
                        placeholder="1234"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-black font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={formData.tabelNumber}
                        onChange={(e) => setFormData({...formData, tabelNumber: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Parol</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-black font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Lavozim</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-black font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
                      >
                        {ROLES.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all mt-4"
                  >
                    {isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
                  </button>

                  <button 
                    type="button"
                    onClick={() => setShowOverview(true)}
                    className="w-full text-slate-400 text-sm font-bold hover:text-slate-600 transition-all"
                  >
                    Orqaga qaytish
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
