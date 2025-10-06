from fastapi import FastAPI
from routers import camara_deputados

app = FastAPI(
    title="API de Dados Públicos",
    description="Uma API para consultar dados da Câmara dos Deputados e outras fontes públicas.",
    version="1.0.0"
)

@app.get("/", tags=["Root"])
def read_root():
    """
    Endpoint raiz que apresenta uma mensagem de boas-vindas.
    """
    return {"message": "Bem-vindo à API de Dados Públicos!"}

# Inclui as rotas definidas no módulo camara_deputados
app.include_router(camara_deputados.router, prefix="/api/v1")
