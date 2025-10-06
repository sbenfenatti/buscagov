
import { DataCategory } from './types';
import { BookIcon, HeartPulseIcon, ShieldIcon, DollarSignIcon, FactoryIcon, LeafIcon } from './components/IconComponents';

export const DATA_CATEGORIES: DataCategory[] = [
  { 
    id: 'educacao', 
    name: 'Educação', 
    icon: BookIcon, 
    description: 'Dados sobre escolas, matrículas, ENEM, etc.' 
  },
  { 
    id: 'saude', 
    name: 'Saúde', 
    icon: HeartPulseIcon, 
    description: 'Informações sobre hospitais, SUS, doenças, etc.' 
  },
  { 
    id: 'seguranca_publica', 
    name: 'Segurança Pública', 
    icon: ShieldIcon, 
    description: 'Estatísticas de criminalidade, policiamento, etc.' 
  },
  { 
    id: 'economia', 
    name: 'Economia', 
    icon: DollarSignIcon, 
    description: 'Dados de inflação, PIB, emprego, comércio, etc.' 
  },
  { 
    id: 'industria', 
    name: 'Indústria', 
    icon: FactoryIcon, 
    description: 'Produção industrial, setores e crescimento.' 
  },
  {
    id: 'meio_ambiente',
    name: 'Meio Ambiente',
    icon: LeafIcon,
    description: 'Desmatamento, emissões, áreas de conservação.'
  }
];
