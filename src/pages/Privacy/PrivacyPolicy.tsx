import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Mail, X } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="relative h-full flex flex-col bg-zinc-950 text-white">
      
      {/* Cabeçalho Fixo do Modal */}
      <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-zinc-800">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
          <ShieldCheck className="w-4 h-4" /> Transparência
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
              Política de Privacidade
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              A sua privacidade é de extrema importância para nós. Esta política descreve de forma clara e transparente como coletamos, usamos e protegemos as suas informações pessoais ao utilizar nossa plataforma, contratar consultorias ou adquirir produtos digitais.
            </p>
          </div>

          {/* Seção 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-base sm:text-lg">
              <Eye className="w-5 h-5 flex-shrink-0" />
              <h2>1. Coleta de Informações</h2>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Coletamos informações pessoais que você nos fornece voluntariamente ao preencher formulários de contato, solicitar programas de treinamento/consultoria ou adquirir e-books e mentorias. Os dados habitualmente coletados incluem seu nome completo, endereço de e-mail, número de WhatsApp e informações necessárias para o alinhamento de treinos e rotina.
            </p>
          </section>

          {/* Seção 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-base sm:text-lg">
              <FileText className="w-5 h-5 flex-shrink-0" />
              <h2>2. Uso dos Dados</h2>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              As informações coletadas são utilizadas exclusivamente para os seguintes fins:
            </p>
            <ul className="list-disc list-inside text-zinc-300 text-sm sm:text-base space-y-2 pl-2">
              <li>Elaborar e personalizar os programas de consultoria e acompanhamento físico;</li>
              <li>Realizar atendimentos, suporte e alinhamentos diretamente via WhatsApp ou e-mail;</li>
              <li>Liberar o acesso e gerenciar a entrega de produtos digitais adquiridos (por meio de plataformas seguras parceiras, como Hotmart e Mercado Pago);</li>
              <li>Enviar atualizações importantes sobre os seus planos ou conteúdos adquiridos.</li>
            </ul>
          </section>

          {/* Seção 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-base sm:text-lg">
              <Lock className="w-5 h-5 flex-shrink-0" />
              <h2>3. Proteção e Segurança da Informação</h2>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Adotamos medidas rigorosas de segurança técnica e administrativa para proteger os seus dados contra acessos não autorizados, perda, destruição ou alteração indevida. As transações financeiras são processadas diretamente nos ambientes criptografados e certificados de nossos parceiros de pagamento.
            </p>
          </section>

          {/* Seção 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-base sm:text-lg">
              <Mail className="w-5 h-5 flex-shrink-0" />
              <h2>4. Contato</h2>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Caso tenha qualquer dúvida sobre esta Política de Privacidade ou sobre o tratamento das suas informações, você pode entrar em contato conosco através do e-mail de suporte ou diretamente pelos canais oficiais de atendimento da assessoria.
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