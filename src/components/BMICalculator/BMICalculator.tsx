import React, { useState } from 'react';
import { Calculator, Activity, HeartPulse, Zap, Droplets, ShieldCheck } from 'lucide-react';

export const BMICalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bmi' | 'heartRate' | 'water'>('bmi');

  // Estados para IMC
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string } | null>(null);

  // Estados para Frequência Cardíaca
  const [age, setAge] = useState('');
  const [hrResult, setHrResult] = useState<{ maxHr: number; fatBurnMin: number; fatBurnMax: number; cardioMin: number; cardioMax: number } | null>(null);

  // Estados para Hidratação
  const [waterWeight, setWaterWeight] = useState('');
  const [waterResult, setWaterResult] = useState<{ totalMl: number; totalLiters: string } | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h || h <= 0) return;

    const heightInMeters = h > 3 ? h / 100 : h;
    const bmi = w / (heightInMeters * heightInMeters);
    
    let category = '';
    if (bmi < 18.5) category = 'Abaixo do peso';
    else if (bmi < 24.9) category = 'Peso normal';
    else if (bmi < 29.9) category = 'Sobrepeso';
    else category = 'Obesidade';

    setBmiResult({ bmi: parseFloat(bmi.toFixed(1)), category });
  };

  const calculateHeartRate = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(age);
    if (!a || a <= 0) return;

    // Fórmula de Tanaka modificada para maior precisão: 208 - (0.7 * idade)
    const maxHr = Math.round(208 - (0.7 * a));
    
    // Zona de Queima de Gordura (60% - 70% da FCM)
    const fatBurnMin = Math.round(maxHr * 0.60);
    const fatBurnMax = Math.round(maxHr * 0.70);

    // Zona Cardio / Aeróbica (70% - 85% da FCM)
    const cardioMin = Math.round(maxHr * 0.70);
    const cardioMax = Math.round(maxHr * 0.85);

    setHrResult({ maxHr, fatBurnMin, fatBurnMax, cardioMin, cardioMax });
  };

  const calculateWater = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(waterWeight);
    if (!w || w <= 0) return;

    // Fórmula: Peso x 35 ml
    const totalMl = w * 35;
    const totalLiters = (totalMl / 1000).toFixed(2);

    setWaterResult({ totalMl, totalLiters });
  };

  return (
    <section id="calculadoras" className="py-28 bg-zinc-900 text-white border-y border-zinc-800/80 relative overflow-hidden">
      
      {/* Elementos de Atmosfera e Iluminação Surreal de Fundo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px]" />
        
        {/* Grid Técnico Sutil */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Molduras Técnicas de Canto */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-emerald-500/20 rounded-tl-lg hidden lg:block" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-emerald-500/20 rounded-tr-lg hidden lg:block" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4 shadow-inner">
            <Zap className="w-3.5 h-3.5 text-emerald-400" /> Ferramentas de Performance
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Calculadoras <span className="text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">Estratégicas</span>
          </h2>
          <p className="text-zinc-400 text-base">
            Monitore suas métricas corporais, zonas de treinamento e hidratação diária para otimizar seus resultados.
          </p>
        </div>

        {/* Caixa Principal */}
        <div className="bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/90 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          
          {/* Seletor de Abas (Tabs) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-zinc-900/90 border border-zinc-800 rounded-2xl mb-8">
            <button
              onClick={() => setActiveTab('bmi')}
              className={`flex items-center justify-center gap-2 py-3.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'bmi'
                  ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <Calculator className="w-4 h-4 flex-shrink-0" />
              <span>IMC</span>
            </button>
            <button
              onClick={() => setActiveTab('heartRate')}
              className={`flex items-center justify-center gap-2 py-3.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'heartRate'
                  ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <HeartPulse className="w-4 h-4 flex-shrink-0" />
              <span>Freq. Cardíaca</span>
            </button>
            <button
              onClick={() => setActiveTab('water')}
              className={`flex items-center justify-center gap-2 py-3.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'water'
                  ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <Droplets className="w-4 h-4 flex-shrink-0" />
              <span>Água Diária</span>
            </button>
          </div>

          {/* CONTEÚDO DA ABA: IMC */}
          {activeTab === 'bmi' && (
            <div className="animate-fadeIn">
              <form onSubmit={calculateBMI} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">Peso Atual (kg)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      placeholder="Ex: 75" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">Altura (Ex: 1.75 ou 175)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      placeholder="Ex: 1.75" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/10 group cursor-pointer"
                >
                  <Calculator className="w-5 h-5 transition-transform group-hover:scale-110" /> 
                  <span>Calcular meu IMC</span>
                </button>
              </form>

              {bmiResult && (
                <div className="mt-8 bg-zinc-900/90 border border-emerald-500/30 p-6 rounded-2xl text-center relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                  <p className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-1">Seu Índice de Massa Corporal</p>
                  <p className="text-5xl font-black text-emerald-400 my-2 tracking-tight">{bmiResult.bmi}</p>
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mt-2">
                    <span className="text-xs text-zinc-400">Classificação:</span>
                    <span className="text-sm font-bold text-white">{bmiResult.category}</span>
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">Sua Idade (anos)</label>
                  <input 
                    type="number" 
                    placeholder="Ex: 30" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/10 group cursor-pointer"
                >
                  <HeartPulse className="w-5 h-5 transition-transform group-hover:scale-110" /> 
                  <span>Calcular Zonas de Treino</span>
                </button>
              </form>

              {hrResult && (
                <div className="mt-8 space-y-4">
                  <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold">Frequência Cardíaca Máxima (FCM)</p>
                      <p className="text-2xl font-black text-white mt-0.5">{hrResult.maxHr} <span className="text-xs font-normal text-zinc-500">bpm</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Activity className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-zinc-900/90 border border-emerald-500/30 p-5 rounded-2xl relative">
                      <span className="absolute top-3 right-3 text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-md">60% - 70%</span>
                      <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1">Queima de Gordura</p>
                      <p className="text-xl font-extrabold text-white">{hrResult.fatBurnMin} - {hrResult.fatBurnMax} <span className="text-xs text-zinc-500">bpm</span></p>
                      <p className="text-[11px] text-zinc-500 mt-2">Ideal para treinos aeróbicos contínuos e perda de gordura.</p>
                    </div>

                    <div className="bg-zinc-900/90 border border-emerald-500/30 p-5 rounded-2xl relative">
                      <span className="absolute top-3 right-3 text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-md">70% - 85%</span>
                      <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1">Zona Aeróbica / Cardio</p>
                      <p className="text-xl font-extrabold text-white">{hrResult.cardioMin} - {hrResult.cardioMax} <span className="text-xs text-zinc-500">bpm</span></p>
                      <p className="text-[11px] text-zinc-500 mt-2">Foco em ganho de resistência cardiorrespiratória e performance.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CONTEÚDO DA ABA: HIDRATAÇÃO (ÁGUA DIÁRIA) */}
          {activeTab === 'water' && (
            <div className="animate-fadeIn">
              <form onSubmit={calculateWater} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">Peso Atual (kg)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    placeholder="Ex: 75" 
                    value={waterWeight}
                    onChange={(e) => setWaterWeight(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    required
                  />
                  <p className="text-[11px] text-zinc-500 mt-2">Cálculo baseado na recomendação padrão de 35 ml de água por quilo corporal.</p>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/10 group cursor-pointer"
                >
                  <Droplets className="w-5 h-5 transition-transform group-hover:scale-110" /> 
                  <span>Calcular Consumo de Água</span>
                </button>
              </form>

              {waterResult && (
                <div className="mt-8 bg-zinc-900/90 border border-emerald-500/30 p-6 rounded-2xl text-center relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                  <p className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-1">Consumo Diário Recomendado</p>
                  <p className="text-5xl font-black text-emerald-400 my-2 tracking-tight">{waterResult.totalLiters} <span className="text-2xl font-bold text-zinc-300">litros</span></p>
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mt-2">
                    <span className="text-xs text-zinc-400">Aproximadamente:</span>
                    <span className="text-sm font-bold text-white">{waterResult.totalMl.toLocaleString('pt-BR')} ml por dia</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Rodapé de Aviso */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-center gap-2 text-xs text-zinc-500 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Ferramentas orientativas baseadas em fórmulas padrão. Não substituem avaliação clínica ou profissional.</span>
          </div>

        </div>
      </div>
    </section>
  );
};