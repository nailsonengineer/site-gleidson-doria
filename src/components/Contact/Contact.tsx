import React, { useState } from 'react';
import { MessageCircle, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { trainer } from '../../data/trainer';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', whatsapp: '', goal: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Número da assessoria formatado apenas com dígitos
    const phoneNumber = "5571993927472";

    // Montagem da mensagem profissional formatada para o WhatsApp
    const text = `Olá, Gleidson! Meu nome é *${formData.name}*.\n\n` +
                 `🎯 *Objetivo principal:* ${formData.goal}\n` +
                 `📱 *WhatsApp:* ${formData.whatsapp}\n\n` +
                 `💬 *Mensagem/Rotina:* ${formData.message}`;

    const encodedMessage = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Redireciona o usuário para o WhatsApp com a mensagem pronta
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contato" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      
      {/* Elementos decorativos de fundo sofisticados */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
        
        {/* Coluna de Informações e Autoridade */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full mb-4">
              Atendimento Direto
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
              Pronto para construir a sua <span className="text-emerald-400">evolução real?</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed text-base">
              Preencha os campos ao lado para estruturarmos seu atendimento personalizado. Sua mensagem será enviada diretamente para a nossa assessoria via WhatsApp.
            </p>
          </div>

          {/* Lista de Vantagens do Atendimento */}
          <div className="space-y-3">
            {[
              'Resposta rápida e humanizada',
              'Alinhamento inicial de objetivos e rotina',
              'Direcionamento para o plano ideal (Online ou Presencial)'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Canais Oficiais de Contato (Sem repetições de e-mail) */}
          <div className="space-y-3 pt-4 border-t border-zinc-800/80 text-sm text-zinc-300">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-emerald-400" />
              <span>(71) 99392-7472 (Assessoria)</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>{trainer.city}</span>
            </div>
          </div>
        </div>

        {/* Formulário de Contato */}
        <div className="lg:col-span-7 bg-zinc-900/90 backdrop-blur-md border border-zinc-800/90 p-8 sm:p-10 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  placeholder="Seu nome" 
                  value={formData.name} 
                  onChange={e=>setFormData({...formData, name: e.target.value})} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">WhatsApp / Telefone</label>
                <input 
                  type="text" 
                  placeholder="(71) 90000-0000" 
                  value={formData.whatsapp} 
                  onChange={e=>setFormData({...formData, whatsapp: e.target.value})} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Objetivo Principal</label>
              <input 
                type="text" 
                placeholder="Ex: Hipertrofia, emagrecimento, reabilitação..." 
                value={formData.goal} 
                onChange={e=>setFormData({...formData, goal: e.target.value})} 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Mensagem / Resumo da Rotina</label>
              <textarea 
                rows={4} 
                placeholder="Conte um pouco sobre sua disponibilidade de horários, experiência com treinos ou limitações..." 
                value={formData.message} 
                onChange={e=>setFormData({...formData, message: e.target.value})} 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none" 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
            >
              Iniciar Conversa no WhatsApp <MessageCircle className="w-5 h-5 fill-zinc-950 text-emerald-500" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};