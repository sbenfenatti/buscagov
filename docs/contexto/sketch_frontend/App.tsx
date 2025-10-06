import React, { useState, useCallback, useRef, useEffect } from 'react';
import Header from './components/Header';
import ResultDisplay from './components/ResultDisplay';
import { fetchPublicData } from './services/geminiService';
import { GeminiResult } from './types';
import { SenateDomeIcon, ChamberDomeIcon, SearchIcon, ChevronDownIcon } from './components/IconComponents';
import SenatePage from './components/SenatePage';
import ChamberPage from './components/ChamberPage';

const HeroSection: React.FC<{ onSubmit: (query: string) => void; onScrollClick: () => void; }> = ({ onSubmit, onScrollClick }) => {
    const [inputValue, setInputValue] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(inputValue);
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

const QuestionCarousel: React.FC = () => {
    const questions = [
        "Quais deputados representam o meu estado?",
        "Quais foram as últimas despesas de um parlamentar?",
        "Como um partido orientou a votação de uma proposta?",
        "Qual o histórico de tramitação de um projeto de lei?",
        "Quem são os autores de uma Proposta de Emenda à Constituição (PEC)?",
    ];
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setQuestionIndex(prevIndex => {
                    const nextIndex = (prevIndex + 1) % questions.length;
                    setCurrentQuestion(questions[nextIndex]);
                    setIsVisible(true);
                    return nextIndex;
                });
            }, 800);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="question-carousel" className="text-lg md:text-xl text-gray-200 mb-8 h-12 relative">
            <span className={`question-text ${isVisible ? 'visible' : ''}`}>
                "{currentQuestion}"
            </span>
        </div>
    );
};


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeminiResult | null>(null);
  const [page, setPage] = useState<'main' | 'senate' | 'chamber'>('main');
  const parliamentSectionRef = useRef<HTMLElement>(null);

  const handleNavigate = (targetPage: 'main' | 'senate' | 'chamber') => {
    setPage(targetPage);
    window.scrollTo(0, 0);
  };

  const handleSubmit = useCallback(async (searchQuery: string) => {
    if (!searchQuery) {
      setError('Por favor, insira uma pergunta.');
      return;
    }
    setIsLoading(true);
    setError(null);
    
    parliamentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });

    try {
      const data = await fetchPublicData(searchQuery);
      setResult(data);
    } catch (err)      {
      console.error(err);
      setError('Ocorreu um erro ao consultar os dados. Verifique o console para mais detalhes.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleScrollToParliament = useCallback(() => {
    parliamentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const showInitialInfo = !result && !isLoading && !error;

  return (
    <>
      {page === 'main' && <Header page={page} />}
      {page === 'senate' ? (
        <SenatePage onBack={() => handleNavigate('main')} />
      ) : page === 'chamber' ? (
        <ChamberPage onBack={() => handleNavigate('main')} />
      ) : (
        <main>
          <HeroSection onSubmit={handleSubmit} onScrollClick={handleScrollToParliament} />
          <section id="parliament" ref={parliamentSectionRef} className="section parliament-section flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative z-10 text-white px-6 w-full max-w-5xl mx-auto h-full flex flex-col justify-center">
                  {showInitialInfo ? (
                      <div className="text-center">
                          <h2 className="text-4xl md:text-5xl font-bold mb-4">O Coração da Democracia Brasileira</h2>
                          <QuestionCarousel />
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
                  ) : (
                      <ResultDisplay isLoading={isLoading} error={error} result={result} />
                  )}
              </div>
          </section>
        </main>
      )}
    </>
  );
};

export default App;