import React, { useState, useEffect, useRef, useMemo } from 'react';
import { fetchData } from '../services/api';
import { CloseIcon, SearchIcon } from './icons';

type EntityType = 'deputados' | 'partidos' | 'partidos_sigla' | 'frentes' | 'legislaturas' | 'proposicoes' | 'proposicoes_siglaTipo' | 'orgaos' | 'eventos' | 'blocos' | 'grupos' | 'votacoes' | 'senado_blocos' | 'senado_comissoes_codigo' | 'senado_comissoes_sigla' | 'senado_partidos' | 'senado_parlamentar';


interface Suggestion {
  id: string;
  name: string;
}

interface EntitySelectorProps {
  entityType: EntityType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  baseUrl: string;
}

const getNested = (obj: any, path: string | ((data: any) => any)): any => {
    if (typeof path === 'function') {
        return path(obj);
    }
    return path.split('.').reduce((acc, part) => {
        const isArrayIndex = /^\d+$/.test(part);
        if (isArrayIndex && Array.isArray(acc)) {
            return acc[parseInt(part, 10)];
        }
        return acc && acc[part];
    }, obj);
};


const entityConfig: Record<EntityType, any> = {
  // Câmara
  deputados: {
    endpoint: '/deputados',
    params: { itens: '100', ordenarPor: 'nome' },
    isPaginated: true,
    transform: (item: any) => ({ id: item.id.toString(), name: `${item.nome} (${item.siglaPartido}-${item.siglaUf})` }),
  },
  partidos: {
    endpoint: '/partidos',
    params: { itens: '100' },
    isPaginated: true,
    transform: (item: any) => ({ id: item.id.toString(), name: `${item.sigla} - ${item.nome}` }),
  },
  partidos_sigla: {
    endpoint: '/partidos',
    params: { itens: '100' },
    isPaginated: true,
    transform: (item: any) => ({ id: item.sigla, name: `${item.sigla} - ${item.nome}` }),
  },
  frentes: {
    endpoint: '/frentes',
    params: { itens: '100' },
    isPaginated: true,
    transform: (item: any) => ({ id: item.id.toString(), name: item.titulo }),
  },
  legislaturas: {
    endpoint: '/legislaturas',
    params: { itens: '100', ordem: 'DESC', ordenarPor: 'id' },
    isPaginated: true,
    transform: (item: any) => ({ id: item.id.toString(), name: `Legislatura ${item.id} (${new Date(item.dataInicio).getFullYear()}-${new Date(item.dataFim).getFullYear()})` }),
  },
  proposicoes: {
    endpoint: '/proposicoes',
    params: { itens: '100', ordem: 'DESC', ordenarPor: 'id' },
    isPaginated: true,
    transform: (item: any) => ({ id: item.id.toString(), name: `${item.siglaTipo} ${item.numero}/${item.ano}` }),
  },
   proposicoes_siglaTipo: {
    endpoint: '/referencias/proposicoes/siglaTipo',
    dataPath: 'dados',
    transform: (item: any) => ({ id: item.sigla, name: `${item.sigla} - ${item.nome}` }),
  },
  orgaos: {
    endpoint: '/orgaos',
    params: { itens: '100' },
    isPaginated: true,
    transform: (item: any) => ({ id: item.id.toString(), name: `${item.sigla} - ${item.nome}` }),
  },
  eventos: {
    endpoint: '/eventos',
    params: { itens: '100', ordem: 'DESC', ordenarPor: 'dataHoraInicio' },
    isPaginated: true,
    transform: (item: any) => ({ id: item.id.toString(), name: `${new Date(item.dataHoraInicio).toLocaleDateString('pt-BR')} - ${item.descricao}` }),
  },
  blocos: {
    endpoint: '/blocos',
    params: { itens: '100' },
    isPaginated: true,
    transform: (item: any) => ({ id: item.id.toString(), name: `${item.nome} (Legislatura ${item.idLegislatura})` }),
  },
  grupos: {
    endpoint: '/grupos',
    params: { itens: '100' },
    isPaginated: true,
    transform: (item: any) => ({ id: item.id.toString(), name: item.nome }),
  },
  votacoes: {
    endpoint: '/votacoes',
    params: { itens: '100', ordem: 'DESC', ordenarPor: 'dataHoraRegistro' },
    isPaginated: true,
    transform: (item: any) => ({ id: item.id.toString(), name: `${item.data} - ${item.descricao || 'Votação'}` }),
  },
  // Senado
  senado_blocos: {
    endpoint: '/composicao/lista/blocos',
    dataPath: 'ListaBlocoParlamentar.Blocos.Bloco',
    transform: (item: any) => ({ id: item.CodigoBloco.toString(), name: item.NomeBloco }),
  },
  senado_comissoes_codigo: {
    endpoint: '/comissao/lista/colegiados',
    dataPath: 'ListaColegiados.Colegiados.Colegiado',
    transform: (item: any) => ({ id: item.Codigo.toString(), name: `${item.Nome} (${item.Sigla})` }),
  },
  senado_comissoes_sigla: {
    endpoint: '/comissao/lista/colegiados',
    dataPath: 'ListaColegiados.Colegiados.Colegiado',
    transform: (item: any) => ({ id: item.Sigla, name: `${item.Nome} (${item.Sigla})` }), // ID is the Sigla string
  },
  senado_partidos: {
    endpoint: '/composicao/lista/partidos',
    dataPath: 'ListaPartidos.Partidos.Partido',
    transform: (item: any) => ({ id: item.Codigo.toString(), name: `${item.Sigla} - ${item.Nome}` }),
  },
  senado_parlamentar: {
    endpoint: '/senador/lista/atual',
    dataPath: 'ListaParlamentarEmExercicio.Parlamentares.Parlamentar',
    transform: (item: any) => ({ 
        id: item.IdentificacaoParlamentar.CodigoParlamentar.toString(), 
        name: `${item.IdentificacaoParlamentar.NomeCompletoParlamentar} (${item.IdentificacaoParlamentar.SiglaPartidoParlamentar}-${item.IdentificacaoParlamentar.UfParlamentar})` 
    }),
  },
};

// Fetches paginated data from Câmara API
const fetchPaginatedData = async (baseUrl: string, endpoint: string, initialParams: Record<string, string>) => {
  let allItems: any[] = [];
  let params = { ...initialParams };
  let page = 1;

  while (true) {
    params['pagina'] = page.toString();
    try {
      const result: any = await fetchData(baseUrl, endpoint, params);
      
      if (result.dados && result.dados.length > 0) {
        allItems = allItems.concat(result.dados);
        page++;
      } else {
        break; // No more data
      }

      if (page > 20) { // Safety break
          console.warn('fetchPaginatedData reached safety limit of 20 pages.');
          break;
      }
    } catch (error) {
        console.error(`Error fetching page ${page} for ${endpoint}:`, error);
        break;
    }
  }
  return allItems;
};

// Fetches nested list data from Senado API or simple list from Câmara
const fetchListData = async (baseUrl: string, endpoint: string, dataPath: string | ((data: any) => any)) => {
    const result: any = await fetchData(baseUrl, endpoint, {});
    const items = getNested(result, dataPath);
    return Array.isArray(items) ? items : [];
};


export const EntitySelector: React.FC<EntitySelectorProps> = ({ entityType, value, onChange, placeholder, baseUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allData, setAllData] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!entityType) return;
      setIsLoading(true);
      try {
        const config = entityConfig[entityType];
        let rawItems: any[] = [];

        if (config.isPaginated) {
            rawItems = await fetchPaginatedData(baseUrl, config.endpoint, config.params || {});
        } else if (config.dataPath) {
            rawItems = await fetchListData(baseUrl, config.endpoint, config.dataPath);
        }
        
        const transformedData: Suggestion[] = rawItems.map(config.transform);
        transformedData.sort((a, b) => a.name.localeCompare(b.name));
        
        setAllData(transformedData);
      } catch (error) {
        console.error(`Failed to load autocomplete data for ${entityType}:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [entityType, baseUrl]);

  useEffect(() => {
    if (isOpen) {
        setSearchQuery('');
        setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const selectedItem = useMemo(() => allData.find(item => item.id === value), [allData, value]);
  
  const filteredData = useMemo(() => {
    if (!searchQuery) return allData;
    return allData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [allData, searchQuery]);

  const handleSelect = (suggestion: Suggestion) => {
    onChange(suggestion.id);
    setIsOpen(false);
  };
  
  const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange('');
  };

  return (
    <>
      <div 
        onClick={() => !isLoading && setIsOpen(true)}
        className="relative w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 outline-none transition cursor-pointer flex items-center justify-between h-[42px]"
      >
        <span className={`truncate pr-2 ${selectedItem ? 'text-gray-200' : 'text-gray-500'}`}>
          {isLoading ? 'Carregando...' : (selectedItem ? selectedItem.name : placeholder)}
        </span>
        {value && !isLoading && (
            <button onClick={handleClear} className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white flex-shrink-0">
                <CloseIcon className="w-4 h-4" /> 
            </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <header className="p-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
              <h3 className="text-lg font-semibold text-white">{placeholder || 'Selecione um item'}</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white">
                <CloseIcon className="w-5 h-5" />
              </button>
            </header>
            <div className="p-4 flex-shrink-0">
               <div className="relative">
                 <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                 />
                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-400"/>
                 </div>
               </div>
            </div>
            <ul className="flex-1 overflow-y-auto px-4 pb-4">
              {filteredData.length > 0 ? filteredData.map(suggestion => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSelect(suggestion)}
                  className="px-4 py-2 text-gray-300 cursor-pointer hover:bg-green-600/20 hover:text-green-300 rounded-md transition-colors"
                >
                  {suggestion.name}
                </li>
              )) : (
                <li className="px-4 py-2 text-gray-500 text-center">Nenhum resultado encontrado.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};