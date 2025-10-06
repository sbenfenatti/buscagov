import React from 'react';
import { ArrowLeftIcon, SenateDomeIcon } from './IconComponents';

interface SenatePageProps {
  onBack: () => void;
}

const SenatePage: React.FC<SenatePageProps> = ({ onBack }) => {
  return (
    <section 
      className="h-screen w-screen bg-cover bg-center relative flex flex-col" 
      style={{ 
        backgroundImage: "url('https://i.imgur.com/Trnq5AP.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 flex flex-col flex-grow p-6 sm:p-8 text-white">
        <header className="flex justify-between items-center w-full">
            <div className="flex items-center">
                <SenateDomeIcon className="h-8 w-8 text-white mr-3" />
                <h1 className="text-2xl font-bold text-white">Senado Federal</h1>
            </div>
            <button 
              onClick={onBack} 
              className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
              aria-label="Voltar para a página principal"
              title="Voltar para a página principal"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Voltar</span>
            </button>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center text-center">
            <p className="text-xl text-gray-300 max-w-2xl mb-8">
                Esta seção é dedicada à visualização e consulta de dados abertos do Senado Federal. Faça perguntas sobre senadores, projetos de lei, despesas e votações.
            </p>
        </main>
      </div>
    </section>
  );
};

export default SenatePage;