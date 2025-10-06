
import React from 'react';
import { DataCategory } from '../types';
import { DATA_CATEGORIES } from '../constants';

interface SidebarProps {
  selectedCategory: DataCategory;
  setSelectedCategory: (category: DataCategory) => void;
  query: string;
  setQuery: (query: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  query,
  setQuery,
  onSubmit,
  isLoading,
}) => {

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSubmit();
    }
  };

  return (
    <aside className="w-80 bg-brand-blue text-white flex flex-col p-6 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-yellow">Categorias</h2>
        <p className="text-sm text-gray-300">Selecione uma área de interesse</p>
      </div>
      
      <nav className="flex-1 space-y-2">
        {DATA_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className={`w-full text-left flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
              selectedCategory.id === category.id
                ? 'bg-white/20 text-white'
                : 'hover:bg-white/10 text-gray-200'
            }`}
          >
            <category.icon className="w-5 h-5 flex-shrink-0" />
            <span>{category.name}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8">
        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="font-semibold text-brand-yellow">{selectedCategory.name}</h3>
          <p className="text-sm text-gray-300 mt-1">{selectedCategory.description}</p>
        </div>
        
        <div className="mt-6">
          <label htmlFor="query" className="text-sm font-medium text-gray-200">
            Faça sua pergunta
          </label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ex: Qual o estado com maior taxa de aprovação no ensino médio?`}
            className="w-full h-28 mt-2 p-2.5 bg-gray-900/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none"
            disabled={isLoading}
          />
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !query}
          className="w-full mt-4 bg-brand-yellow text-brand-blue font-bold py-3 rounded-lg transition-transform duration-200 hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Consultando...
            </>
          ) : (
            'Consultar IA'
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
