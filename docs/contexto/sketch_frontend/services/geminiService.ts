import { GoogleGenAI, Type } from '@google/genai';
import { GeminiResult, DataType } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "Um resumo conciso e informativo em português dos dados encontrados, explicando o que eles representam."
        },
        dataType: {
            type: Type.STRING,
            enum: [DataType.TEXT, DataType.TABLE, DataType.CHART],
            description: "O formato mais apropriado para apresentar os dados. Use 'TABLE' para dados estruturados, 'CHART' para dados que podem ser visualizados em um gráfico de barras, e 'TEXT' para respostas descritivas."
        },
        data: {
            type: Type.OBJECT,
            description: "O conteúdo dos dados. A estrutura deste objeto deve corresponder ao valor de 'dataType'.",
            properties: {
                text: {
                    type: Type.STRING,
                    description: "O conteúdo textual da resposta (usado se dataType for 'TEXT').",
                    nullable: true,
                },
                table: {
                    type: Type.OBJECT,
                    description: "Os dados da tabela (usado se dataType for 'TABLE').",
                    properties: {
                        headers: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        rows: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.ARRAY,
                                items: {
                                    oneOf: [
                                        { type: Type.STRING },
                                        { type: Type.NUMBER }
                                    ]
                                }
                            }
                        }
                    },
                    nullable: true,
                },
                chart: {
                    type: Type.OBJECT,
                    description: "Os dados para o gráfico (usado se dataType for 'CHART').",
                    properties: {
                        dataKey: { type: Type.STRING, description: "A chave para os valores numéricos (eixo Y)." },
                        nameKey: { type: Type.STRING, description: "A chave para os rótulos (eixo X)." },
                        data: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                description: "Objeto representando um ponto de dados, com chaves (strings) e valores (strings ou números).",
                                additionalProperties: {
                                    oneOf: [
                                        { type: Type.STRING },
                                        { type: Type.NUMBER }
                                    ]
                                }
                            }
                        }
                    },
                    nullable: true,
                }
            }
        }
    },
    required: ['summary', 'dataType', 'data']
};


export const fetchPublicData = async (query: string): Promise<GeminiResult> => {
    const prompt = `Você é um especialista em dados abertos do Congresso Nacional do Brasil (Câmara dos Deputados e Senado Federal). Sua tarefa é analisar a pergunta do usuário e retornar os dados da forma mais clara possível, com foco em projetos de lei, votações, despesas de parlamentares, presença, etc.
    
    Pergunta do Usuário: "${query}"
    
    Analise a pergunta e busque as informações relevantes. Em seguida, formate sua resposta estritamente como um objeto JSON que corresponda ao esquema fornecido. Escolha o 'dataType' mais adequado para a resposta:
    - Se a resposta for puramente textual, use 'TEXT'.
    - Se os dados forem tabulares, como uma lista de deputados e seus partidos, use 'TABLE'.
    - Se os dados puderem ser visualizados em um gráfico de barras (comparação entre categorias, como gastos por partido), use 'CHART'.
    
    Certifique-se de que os dados retornados no campo 'data' correspondam à estrutura esperada para o 'dataType' escolhido.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: responseSchema,
        },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);

    const { summary, dataType, data } = parsedResponse;

    let finalData;
    switch(dataType) {
        case DataType.TEXT:
            finalData = data.text;
            break;
        case DataType.TABLE:
            finalData = data.table;
            break;
        case DataType.CHART:
            finalData = data.chart;
            break;
        default:
            throw new Error(`Tipo de dado desconhecido: ${dataType}`);
    }

    return {
        summary,
        dataType,
        data: finalData,
    };
};
