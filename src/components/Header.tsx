import React, { useState } from 'react';
import { Search, Bell, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  title: string;
}

export default function Header({ user, title }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 min-w-0">
        <h2 className="text-lg lg:text-xl font-bold text-slate-800 ml-12 lg:ml-0 truncate">{title}</h2>
      </div>

      <div className="flex items-center gap-2 lg:gap-6">
        <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 lg:w-96">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Qidiruv (Stanok, Tabel, Muammo)..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 text-black"
          />
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
          
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{user.role}</p>
            </div>
            <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
              {user.name[0]}{user.surname[0]}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
