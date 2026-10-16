import React, { useState } from 'react';
import { Calculator, Activity, HeartPulse, Droplets, ShieldCheck, Sparkles } from 'lucide-react';

export const BMICalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bmi' | 'heartRate' | 'water'>('bmi');

  // Estados para IMC
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  // Estados para Frequência Cardíaca
  const [age, setAge] = useState('');
  const [hrResult, setHrResult] = useState<{ maxHr: number; fatBurnMin: number; fatBurnMax: number; cardioMin: number; cardioMax: number } | null>(null);

  // Estados para Hidratação
  const [waterWeight, setWaterWeight] = useState('');
  const [waterResult, setWaterResult] = useState<{ totalMl: number; totalLiters: string; glasses: number } | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h || h <= 0) return;

    const heightInMeters = h > 3 ? h / 100 : h;
    const bmi = w / (heightInMeters * heightInMeters);
    
    let category = '';
    let color = 'text-emerald-400';
    if (bmi < 18.5) { category = 'Abaixo do peso ideal'; color = 'text-amber-400'; }
    else if (bmi < 24.9) { category = 'Peso normal e saudável'; color = 'text-emerald-400'; }
    else if (bmi < 29.9) { category = 'Sobrepeso (Atenção)'; color = 'text-orange-400'; }
    else { category = 'Obesidade (Requer Cuidado)'; color = 'text-rose-400'; }

    setBmiResult({ bmi: parseFloat(bmi.toFixed(1)), category, color });
  };

  const calculateHeartRate = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(age);
    if (!a || a <= 0) return;

    const maxHr = Math.round(208 - (0.7 * a));
    const fatBurnMin = Math.round(maxHr * 0.60);
    const fatBurnMax = Math.round(maxHr * 0.70);
    const cardioMin = Math.round(maxHr * 0.70);
    const cardioMax = Math.round(maxHr * 0.85);

    setHrResult({ maxHr, fatBurnMin, fatBurnMax, cardioMin, cardioMax });
  };

  const calculateWater = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(waterWeight);
    if (!w || w <= 0) return;

    const totalMl = w * 35;
    const totalLiters = (totalMl / 1000).toFixed(2);
    const glasses = Math.round(totalMl / 250); // Copos de 250ml

    setWaterResult({ totalMl, totalLiters, glasses });
  };

  return (
    <section id="calculadoras" className="py-28 bg-zinc-950 text-white relative overflow-hidden">
      
      {/* FUNDO DE VIDA & SAÚDE: Ondas vitais, batimento cardíaco e esferas dinâmicas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        
        {/* Esferas de luz esmeralda pulsantes */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-600/5 rounded-full blur-[120px]" />

        {/* Linha de Onda Eletrocardiográfica / Pulso Vital Vetorial em Marca d'água */}
        <svg className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[300px] opacity-[0.04] text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path fill="none" stroke="currentColor" strokeWidth="3" d="M0,100 L200,100 L230,40 L260,160 L290,80 L320,120 L350,100 L600,100 L630,20 L660,180 L690,90 L720,110 L750,100 L1200,100" />
        </svg>

        {/* Grid técnico sutil de precisão */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4 shadow-inner">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Laboratório de Performance
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Métricas de <span className="text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">Vida e Saúde</span>
          </h2>
          <p className="text-zinc-400 text-base font-medium">
            Acompanhe suas estatísticas vitais em tempo real para alinhar treino, nutrição e recuperação metabólica.
          </p>
        </div>

        {/* Caixa Principal */}
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden group">
          
          {/* Barra de luz superior do card */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

          {/* Seletor de Abas (Tabs) Interativo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-zinc-950 border border-zinc-800/80 rounded-2xl mb-10 shadow-inner">
            <button
              onClick={() => setActiveTab('bmi')}
              className={`flex items-center justify-center gap-2.5 py-4 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                activeTab === 'bmi'
                  ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/25 scale-[1.02]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Calculator className="w-4 h-4 flex-shrink-0" />
              <span>Cálculo de IMC</span>
            </button>
            <button
              onClick={() => setActiveTab('heartRate')}
              className={`flex items-center justify-center gap-2.5 py-4 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                activeTab === 'heartRate'
                  ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/25 scale-[1.02]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <HeartPulse className="w-4 h-4 flex-shrink-0" />
              <span>Zona Cardíaca</span>
            </button>
            <button
              onClick={() => setActiveTab('water')}
              className={`flex items-center justify-center gap-2.5 py-4 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                activeTab === 'water'
                  ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/25 scale-[1.02]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Droplets className="w-4 h-4 flex-shrink-0" />
              <span>Hidratação Diária</span>
            </button>
          </div>

          {/* CONTEÚDO DA ABA: IMC */}
          {activeTab === 'bmi' && (
            <div className="animate-fadeIn">
              <form onSubmit={calculateBMI} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">Peso Corporal (kg)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      placeholder="Ex: 75" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">Sua Altura (Ex: 1.75 ou 175)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      placeholder="Ex: 1.75" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-semibold"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black py-4.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 group cursor-pointer hover:scale-[1.01]"
                >
                  <Calculator className="w-5 h-5 transition-transform group-hover:scale-110" /> 
                  <span>Processar Dados de IMC</span>
                </button>
              </form>

              {bmiResult && (
                <div className="mt-8 bg-zinc-950 border border-emerald-500/30 p-8 rounded-2xl text-center relative overflow-hidden shadow-2xl animate-fadeIn">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                  <span className="text-xs uppercase tracking-widest font-bold text-zinc-400 block mb-1">Índice de Massa Corporal Calculado</span>
                  <p className="text-6xl font-black text-white my-3 tracking-tight">{bmiResult.bmi}</p>
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-5 py-2 rounded-full mt-2">
                    <span className="text-xs text-zinc-400">Status Corporal:</span>
                    <span className={`text-sm font-extrabold ${bmiResult.color}`}>{bmiResult.category}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CONTEÚDO DA ABA: FREQUÊNCIA CARDÍACA */}
          {activeTab === 'heartRate' && (
            <div className="animate-fadeIn">
              <form onSubmit={calculateHeartRate} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">Sua Idade Atual (anos)</label>
                  <input 
                    type="number" 
                    placeholder="Ex: 30" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-semibold"
                    required
                  />
                  <p className="text-[11px] text-zinc-500 mt-2">Baseado na fórmula científica avançada de Tanaka (208 - 0.7 × Idade).</p>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black py-4.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 group cursor-pointer hover:scale-[1.01]"
                >
                  <HeartPulse className="w-5 h-5 transition-transform group-hover:scale-110" /> 
                  <span>Mapear Zonas de Treinamento</span>
                </button>
              </form>

              {hrResult && (
                <div className="mt-8 space-y-4 animate-fadeIn">
                  <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between shadow-lg">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold block">Frequência Cardíaca Máxima (FCM)</span>
                      <p className="text-3xl font-black text-white mt-1">{hrResult.maxHr} <span className="text-sm font-normal text-emerald-400">bpm</span></p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
                      <Activity className="w-7 h-7 animate-pulse" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-zinc-950 border border-emerald-500/30 p-6 rounded-2xl relative shadow-lg">
                      <span className="absolute top-4 right-4 text-[10px] font-extrabold text-emerald-400 uppercase bg-emerald-500/15 px-3 py-1 rounded-full">60% - 70% FCM</span>
                      <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold block mb-1">Queima de Gordura</span>
                      <p className="text-2xl font-black text-white">{hrResult.fatBurnMin} - {hrResult.fatBurnMax} <span className="text-xs text-zinc-500">bpm</span></p>
                      <p className="text-xs text-zinc-400 mt-3 leading-relaxed">Zona ideal para metabolismo lipídico e resistência aeróbica de longa duração.</p>
                    </div>

                    <div className="bg-zinc-950 border border-emerald-500/30 p-6 rounded-2xl relative shadow-lg">
                      <span className="absolute top-4 right-4 text-[10px] font-extrabold text-emerald-400 uppercase bg-emerald-500/15 px-3 py-1 rounded-full">70% - 85% FCM</span>
                      <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold block mb-1">Zona Cardio / Aeróbica</span>
                      <p className="text-2xl font-black text-white">{hrResult.cardioMin} - {hrResult.cardioMax} <span className="text-xs text-zinc-500">bpm</span></p>
                      <p className="text-xs text-zinc-400 mt-3 leading-relaxed">Foco em ganho de potência cardiorrespiratória e alta performance física.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CONTEÚDO DA ABA: HIDRATAÇÃO */}
          {activeTab === 'water' && (
            <div className="animate-fadeIn">
              <form onSubmit={calculateWater} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">Peso Corporal Atual (kg)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    placeholder="Ex: 75" 
                    value={waterWeight}
                    onChange={(e) => setWaterWeight(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-semibold"
                    required
                  />
                  <p className="text-[11px] text-zinc-500 mt-2">Baseado no padrão fisiológico de 35 ml de água ingerida por quilo corporal.</p>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black py-4.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 group cursor-pointer hover:scale-[1.01]"
                >
                  <Droplets className="w-5 h-5 transition-transform group-hover:scale-110" /> 
                  <span>Calcular Meta Hídrica Diária</span>
                </button>
              </form>

              {waterResult && (
                <div className="mt-8 bg-zinc-950 border border-emerald-500/30 p-8 rounded-2xl text-center relative overflow-hidden shadow-2xl animate-fadeIn">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                  <span className="text-xs uppercase tracking-widest font-bold text-zinc-400 block mb-1">Volume Hídrico Ideal Recomendado</span>
                  <p className="text-6xl font-black text-emerald-400 my-3 tracking-tight">{waterResult.totalLiters} <span className="text-2xl font-bold text-white">Litros</span></p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl flex items-center justify-center gap-2">
                      <Droplets className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-zinc-300 font-semibold">{waterResult.totalMl.toLocaleString('pt-BR')} ml por dia</span>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-zinc-300 font-semibold">Aprox. {waterResult.glasses} copos (250ml)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Rodapé de Aviso */}
          <div className="mt-10 pt-6 border-t border-zinc-800/80 flex items-center justify-center gap-2.5 text-xs text-zinc-400 text-center font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Ferramentas orientativas para suporte à rotina de treinos. Não substituem exames clínicos.</span>
          </div>

        </div>
      </div>
    </section>
  );
};