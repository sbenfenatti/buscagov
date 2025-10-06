import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '../types';

interface DataChartProps {
  data: ChartData;
}

const DataChart: React.FC<DataChartProps> = ({ data }) => {
  const { dataKey, nameKey, data: chartData } = data;
  
  return (
    <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
            <BarChart
            data={chartData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey={nameKey} tick={{ fill: '#E2E8F0' }} />
            <YAxis tick={{ fill: '#E2E8F0' }} />
            <Tooltip
                contentStyle={{ 
                    backgroundColor: '#1A202C', 
                    border: '1px solid #4A5568',
                    borderRadius: '0.5rem',
                    color: '#E2E8F0'
                }}
            />
            <Legend wrapperStyle={{ color: '#E2E8F0' }} />
            <Bar dataKey={dataKey} fill="#3b82f6" name={dataKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}/>
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default DataChart;