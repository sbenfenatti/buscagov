import React from 'react';
import { GeminiResult, DataType, TableData, ChartData } from '../types';
import DataChart from './DataChart';
import DataTable from './DataTable';
import Spinner from './Spinner';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  result: GeminiResult | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, result }) => {
  if (isLoading) {
    return <div className="flex flex-col items-center justify-center h-full">
        <Spinner />
        <p className="mt-4 text-gray-300 font-medium">Analisando os dados e gerando visualização...</p>
    </div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-full">
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg" role="alert">
            <strong className="font-bold">Erro!</strong>
            <span className="block sm:inline ml-2">{error}</span>
        </div>
    </div>;
  }

  if (!result) {
    return null;
  }

  const renderData = () => {
    switch (result.dataType) {
      case DataType.TEXT:
        return <p className="text-gray-300 leading-relaxed bg-black/20 p-4 rounded-md">{result.data as string}</p>;
      case DataType.TABLE:
        return <DataTable data={result.data as TableData} />;
      case DataType.CHART:
        return <DataChart data={result.data as ChartData} />;
      default:
        return <p>Formato de dados não suportado.</p>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-gray-200">
        <div>
            <h2 className="text-2xl font-bold text-white mb-2">Resumo da Análise</h2>
            <p className="text-gray-300">{result.summary}</p>
        </div>
        <div className="bg-black/20 p-4 sm:p-6 rounded-xl border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Visualização dos Dados</h3>
            {renderData()}
        </div>
    </div>
  );
};

export default ResultDisplay;