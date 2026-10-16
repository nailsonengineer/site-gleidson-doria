import React from 'react';
import { FileText, Shield, UserCheck, AlertCircle, Mail, X } from 'lucide-react';

interface TermsOfUseProps {
  onClose: () => void;
}

export const TermsOfUse: React.FC<TermsOfUseProps> = ({ onClose }) => {
  return (
    <div className="relative h-full flex flex-col bg-zinc-950 text-white">
      
      {/* Cabeçalho Fixo do Modal */}
      <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-zinc-800">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
          <FileText className="w-4 h-4" /> Diretrizes Oficiais
        </div>
        <button 
          onClick={onClose}
          className="text-zinc-500 hover:text-white p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Conteúdo com Scroll */}
      <div className="flex-grow overflow-y-auto p-6 sm:p-8">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
              Termos de Uso
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Bem-vindo(a) aos nossos canais e plataformas de consultoria e produtos digitais. Ao acessar ou adquirir nossos serviços, e-books e mentorias, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso.
            </p>
          </div>

          {/* Seção 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-base sm:text-lg">
              <UserCheck className="w-5 h-5 flex-shrink-0" />
              <h2>1. Uso dos Serviços e Programas</h2>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Os programas de consultoria (presencial ou online), treinos periodizados e orientações de desempenho são desenvolvidos de forma individualizada com base nas informações fornecidas pelo próprio aluno. É responsabilidade do usuário garantir que possui liberação médica adequada para a prática de atividades físicas de alta intensidade e musculação.
            </p>
          </section>

          {/* Seção 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-base sm:text-lg">
              <Shield className="w-5 h-5 flex-shrink-0" />
              <h2>2. Propriedade Intelectual</h2>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Todo o conteúdo disponibilizado em nossos e-books, livros físicos, materiais de mentoria, planilhas, vídeos e portais (incluindo textos, imagens e identidade visual) é protegido por leis de propriedade intelectual. É estritamente proibida a reprodução, distribuição, revenda ou compartilhamento não autorizado de qualquer material sem consentimento prévio por escrito.
            </p>
          </section>

          {/* Seção 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-base sm:text-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <h2>3. Compras, Pagamentos e Reembolsos</h2>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              As transações financeiras referentes a e-books, livros e mentorias são processadas por plataformas parceiras seguras (como Hotmart e Mercado Pago). Os prazos e políticas de reembolso seguem rigorosamente as diretrizes estabelecidas por cada plataforma de pagamento no momento da aquisição.
            </p>
          </section>

          {/* Seção 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-base sm:text-lg">
              <Mail className="w-5 h-5 flex-shrink-0" />
              <h2>4. Contato e Suporte</h2>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Se você tiver qualquer dúvida sobre estes Termos de Uso, sobre os programas de treinamento ou suporte a produtos, entre em contato através dos canais oficiais de atendimento da assessoria.
            </p>
          </section>

        </div>
      </div>

      {/* Rodapé Fixo do Modal */}
      <div className="flex-shrink-0 p-6 border-t border-zinc-800 text-xs text-zinc-500 text-center">
        <p>Última atualização: Outubro de 2026. Todos os direitos reservados.</p>
      </div>

    </div>
  );
};