import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip, User as UserIcon, FileText, Image as ImageIcon } from 'lucide-react';
import { ChatMessage, User } from '../types';

interface ChatProps {
  user: User;
}

export default function Chat({ user }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', senderId: 'system', senderName: 'System', text: 'Press 3 Maintenance guruhiga xush kelibsiz!', timestamp: '08:00' },
    { id: '2', senderId: '1234', senderName: 'Ali Valiyev', text: 'Tandem 1 dagi 1200T pressda moy sizishini tekshiryapman.', timestamp: '09:15' },
    { id: '3', senderId: '5678', senderName: 'Bobur Karimov', text: 'Tushunarli, yordam kerak bo\'lsa ayting.', timestamp: '09:20' },
  ]);
  const [inputText, setInputText] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Connected to chat server');
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    ws.onclose = () => {
      console.log('Disconnected from chat server');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || !socket) return;
    const newMessage = {
      id: Date.now().toString(),
      senderId: user.tabelNumber,
      senderName: `${user.name} ${user.surname}`,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    socket.send(JSON.stringify(newMessage));
    setInputText('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] lg:h-[calc(100vh-100px)] p-4 lg:p-8">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">P3</div>
            <div>
              <h3 className="font-bold text-slate-900">Press 3 Maintenance</h3>
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> 12 xodim online
              </p>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
          {messages.map((msg) => {
            const isMe = msg.senderId === user.tabelNumber;
            const isSystem = msg.senderId === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center">
                  <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {msg.text}
                  </span>
                </div>
              );
            }

            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] lg:max-w-[60%] ${isMe ? 'order-1' : 'order-2'}`}>
                  {!isMe && <p className="text-[10px] font-bold text-slate-500 mb-1 ml-2">{msg.senderName}</p>}
                  <div className={`p-4 rounded-2xl shadow-sm ${
                    isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-[10px] mt-2 text-right ${isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center gap-2 bg-slate-100 rounded-2xl p-2">
            <button className="p-2 text-slate-500 hover:bg-slate-200 rounded-xl transition-all">
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              placeholder="Xabar yozing..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-black"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
