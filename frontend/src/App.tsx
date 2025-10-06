import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import { SenateDomeIcon, ChamberDomeIcon, SearchIcon, ChevronDownIcon } from './components/IconComponents';
import SenatePage from './components/SenatePage';
import ChamberPage from './components/ChamberPage';

const HeroSection: React.FC<{ onScrollClick: () => void; }> = ({ onScrollClick }) => {
    const [inputValue, setInputValue] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // A ação de busca está desativada. O formulário é apenas um placeholder visual.
    };

    return (
        <section id="home" className="section hero-section flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 text-center text-white px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore os Dados Abertos</h2>
                <p className="text-lg text-gray-200 mb-8">Um portal para o cidadão entender a atividade legislativa no Brasil.</p>
                <form onSubmit={handleFormSubmit} className="relative rounded-md shadow-sm max-w-2xl mx-auto">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="block w-full rounded-md border-0 py-4 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                        placeholder="O que você quer saber sobre o Congresso?"
                    />
                </form>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce z-10">
                <button
                  onClick={onScrollClick}
                  aria-label="Rolar para a próxima seção"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-full p-1"
                >
                    <ChevronDownIcon className="h-8 w-8" />
                </button>
            </div>
        </section>
    );
};


const App: React.FC = () => {
  const [page, setPage] = useState<'main' | 'senate' | 'chamber'>('main');
  const parliamentSectionRef = useRef<HTMLElement>(null);

  const handleNavigate = (targetPage: 'main' | 'senate' | 'chamber') => {
    setPage(targetPage);
    window.scrollTo(0, 0);
  };

  const handleScrollToParliament = useCallback(() => {
    parliamentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <Header page={page} />
      {page === 'senate' ? (
        <SenatePage onBack={() => handleNavigate('main')} />
      ) : page === 'chamber' ? (
        <ChamberPage onBack={() => handleNavigate('main')} />
      ) : (
        <main>
          <HeroSection onScrollClick={handleScrollToParliament} />
          <section id="parliament" ref={parliamentSectionRef} className="section parliament-section flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative z-10 text-white px-6 w-full max-w-5xl mx-auto h-full flex flex-col justify-center">
                  <div className="text-center">
                      <h2 className="text-4xl md:text-5xl font-bold mb-4">O Coração da Democracia Brasileira</h2>
                       <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
                          <button onClick={() => handleNavigate('senate')} className="flex flex-col items-center text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
                              <SenateDomeIcon className="h-16 w-16" />
                              <span className="mt-2 font-semibold tracking-wide">Senado Federal</span>
                          </button>
                          <button onClick={() => handleNavigate('chamber')} className="flex flex-col items-center text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
                              <ChamberDomeIcon className="h-16 w-16" />
                              <span className="mt-2 font-semibold tracking-wide">Câmara dos Deputados</span>
                          </button>
                      </div>
                  </div>
              </div>
          </section>
        </main>
      )}
    </>
  );
};

export default App;
