import os
from fastapi import FastAPI
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

app = FastAPI()

@app.get("/")
def read_root():
    """
    Endpoint raiz da aplicação.
    """
    return {"message": "Olá! Bem-vindo à API de consulta de dados públicos."}

# Exemplo de como você poderia ter um endpoint para buscar um deputado
@app.get("/deputados/{deputado_id}")
def get_deputado_details(deputado_id: int):
    """
    Endpoint de exemplo para buscar detalhes de um deputado.
    (Ainda não implementado)
    """
    return {"message": f"Buscando detalhes para o deputado com ID: {deputado_id}"}
