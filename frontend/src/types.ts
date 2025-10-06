import React from 'react';

// Fix: Add and export the DataCategory interface to be used in constants.ts and components/Sidebar.tsx.
export interface DataCategory {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  description: string;
}

export enum DataType {
  TEXT = 'TEXT',
  TABLE = 'TABLE',
  CHART = 'CHART',
}

export interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

export interface ChartData {
  dataKey: string;
  nameKey: string;
  data: Record<string, string | number>[];
}

export interface GeminiResult {
  summary: string;
  dataType: DataType;
  data: string | TableData | ChartData;
}
