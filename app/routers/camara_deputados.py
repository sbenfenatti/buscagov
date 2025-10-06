from fastapi import APIRouter, Query
from typing import Optional, List
import requests

router = APIRouter()

# Endpoints da Categoria "Deputados"

@router.get("/deputados", tags=["Deputados"])
def get_deputados(
    id: Optional[List[int]] = Query(None, description="ID do deputado (separados por vírgula)."),
    nome: Optional[str] = Query(None, description="Parte do nome parlamentar."),
    siglaUf: Optional[str] = Query(None, description="Sigla da UF (e.g., SP, RJ)."),
    siglaPartido: Optional[str] = Query(None, description="Sigla do partido (e.g., PT, PL)."),
    pagina: Optional[int] = Query(1, description="Número da página de resultados."),
    itens: Optional[int] = Query(15, description="Número de itens por página.")
):
    """
    Retorna uma lista de dados básicos sobre deputados que estiveram em exercício parlamentar.
    """
    base_url = "https://dadosabertos.camara.leg.br/api/v2"
    params = {
        "id": id,
        "nome": nome,
        "siglaUf": siglaUf,
        "siglaPartido": siglaPartido,
        "pagina": pagina,
        "itens": itens
    }
    # Remove None values from params
    params = {k: v for k, v in params.items() if v is not None}
    
    response = requests.get(f"{base_url}/deputados", params=params)
    return response.json()

@router.get("/deputados/{id}", tags=["Deputados"])
def get_deputado_by_id(id: int):
    """
    Retorna os dados cadastrais de um parlamentar específico.
    """
    base_url = "https://dadosabertos.camara.leg.br/api/v2"
    response = requests.get(f"{base_url}/deputados/{id}")
    return response.json()

@router.get("/deputados/{id}/despesas", tags=["Deputados"])
def get_deputado_despesas(
    id: int,
    idLegislatura: Optional[int] = Query(None, description="ID da legislatura."),
    ano: Optional[int] = Query(None, description="Ano da despesa (e.g., 2023)."),
    mes: Optional[int] = Query(None, description="Mês da despesa (e.g., 1-12)."),
    cnpjCpfFornecedor: Optional[str] = Query(None, description="CNPJ ou CPF do fornecedor."),
    pagina: Optional[int] = Query(1, description="Número da página."),
    itens: Optional[int] = Query(15, description="Itens por página."),
    ordenarPor: Optional[str] = Query(None, description="Campo para ordenação.")
):
    """
    Retorna as despesas com exercício parlamentar do deputado.
    """
    return {"message": f"Endpoint para despesas do deputado com ID: {id}. (Não implementado)"}

@router.get("/deputados/{id}/discursos", tags=["Deputados"])
def get_deputado_discursos(
    id: int,
    dataInicio: Optional[str] = Query(None, description="Data de início (AAAA-MM-DD)."),
    dataFim: Optional[str] = Query(None, description="Data de fim (AAAA-MM-DD).")
):
    """
    Lista de discursos feitos por um deputado.
    """
    return {"message": f"Endpoint para discursos do deputado com ID: {id}. (Não implementado)"}

@router.get("/deputados/{id}/eventos", tags=["Deputados"])
def get_deputado_eventos(id: int):
    """
    Lista de eventos com a participação de um deputado.
    """
    return {"message": f"Endpoint para eventos do deputado com ID: {id}. (Não implementado)"}

@router.get("/deputados/{id}/frentes", tags=["Deputados"])
def get_deputado_frentes(id: int):
    """
    Frentes parlamentares das quais um deputado é integrante.
    """
    return {"message": f"Endpoint para frentes do deputado com ID: {id}. (Não implementado)"}

@router.get("/deputados/{id}/ocupacoes", tags=["Deputados"])
def get_deputado_ocupacoes(id: int):
    """
    Empregos e atividades que o deputado já teve.
    """
    return {"message": f"Endpoint para ocupações do deputado com ID: {id}. (Não implementado)"}

@router.get("/deputados/{id}/orgaos", tags=["Deputados"])
def get_deputado_orgaos(id: int):
    """

    Órgãos dos quais um deputado é integrante.
    """
    return {"message": f"Endpoint para órgãos do deputado com ID: {id}. (Não implementado)"}

@router.get("/deputados/{id}/historico", tags=["Deputados"])
def get_deputado_historico(
    id: int,
    dataInicio: Optional[str] = Query(None, description="Data de início (AAAA-MM-DD)."),
    dataFim: Optional[str] = Query(None, description="Data de fim (AAAA-MM-DD).")
):
    """
    Lista de mudanças no exercício parlamentar de um deputado (mudança de partido, licenças, etc.).
    """
    return {"message": f"Endpoint para histórico do deputado com ID: {id}. (Não implementado)"}

@router.get("/deputados/{id}/mandatosExternos", tags=["Deputados"])
def get_deputado_mandatos_externos(id: int):
    """
    Lista outros cargos eletivos que o parlamentar já exerceu fora da Câmara dos Deputados.
    """
    return {"message": f"Endpoint para mandatos externos do deputado com ID: {id}. (Não implementado)"}

@router.get("/deputados/{id}/profissoes", tags=["Deputados"])
def get_deputado_profissoes(id: int):
    """
    Apresenta as profissões que o parlamentar declarou à Câmara.
    """
    return {"message": f"Endpoint para profissões do deputado com ID: {id}. (Não implementado)"}

# Endpoints da Categoria "Frentes"

@router.get("/frentes", tags=["Frentes"])
def get_frentes(
    idLegislatura: Optional[int] = Query(None, description="ID da legislatura.")
):
    """
    Retorna uma lista de frentes parlamentares.
    """
    return {"message": "Endpoint para listar frentes. (Não implementado)"}

@router.get("/frentes/{id}", tags=["Frentes"])
def get_frente_by_id(id: int):
    """
    Retorna informações detalhadas sobre uma frente parlamentar.
    """
    return {"message": f"Endpoint para detalhes da frente com ID: {id}. (Não implementado)"}

@router.get("/frentes/{id}/membros", tags=["Frentes"])
def get_frente_membros(id: int):
    """
    Retorna uma lista de deputados membros de uma frente.
    """
    return {"message": f"Endpoint para membros da frente com ID: {id}. (Não implementado)"}

# Endpoints da Categoria "Partidos"

@router.get("/partidos", tags=["Partidos"])
def get_partidos(
    sigla: Optional[str] = Query(None, description="Sigla do partido (e.g., PT, PL)."),
    dataInicio: Optional[str] = Query(None, description="Data de início (AAAA-MM-DD)."),
    dataFim: Optional[str] = Query(None, description="Data de fim (AAAA-MM-DD).")
):
    """
    Retorna uma lista de partidos políticos que têm ou já tiveram deputados.
    """
    return {"message": "Endpoint para listar partidos. (Não implementado)"}

@router.get("/partidos/{id}", tags=["Partidos"])
def get_partido_by_id(id: int):
    """
    Retorna informações detalhadas sobre um partido.
    """
    return {"message": f"Endpoint para detalhes do partido com ID: {id}. (Não implementado)"}

@router.get("/partidos/{id}/membros", tags=["Partidos"])
def get_partido_membros(id: int):
    """
    Retorna uma lista de deputados membros de um partido.
    """
    return {"message": f"Endpoint para membros do partido com ID: {id}. (Não implementado)"}

@router.get("//partidos/{id}/lideres", tags=["Partidos"])
def get_partido_lideres(id: int):
    """
    Lista de líderes e vice-líderes de um partido.
    """
    return {"message": f"Endpoint para líderes do partido com ID: {id}. (Não implementado)"}

# Endpoints da Categoria "Votações"

@router.get("/votacoes", tags=["Votações"])
def get_votacoes(
    dataInicio: Optional[str] = Query(None, description="Data de início (AAAA-MM-DD)."),
    dataFim: Optional[str] = Query(None, description="Data de fim (AAAA-MM-DD)."),
    idProposicao: Optional[int] = Query(None, description="ID da proposição.")
):
    """
    Retorna uma lista de informações básicas sobre as votações ocorridas.
    """
    return {"message": "Endpoint para listar votações. (Não implementado)"}

@router.get("/votacoes/{id}", tags=["Votações"])
def get_votacao_by_id(id: str):
    """
    Retorna informações detalhadas sobre uma votação específica.
    """
    return {"message": f"Endpoint para detalhes da votação com ID: {id}. (Não implementado)"}

@router.get("/votacoes/{id}/votos", tags=["Votações"])
def get_votacao_votos(id: str):
    """
    Retorna como cada parlamentar votou em uma votação.
    """
    return {"message": f"Endpoint para votos da votação com ID: {id}. (Não implementado)"}

@router.get("/votacoes/{id}/orientacoes", tags=["Votações"])
def get_votacao_orientacoes(id: str):
    """
    O voto recomendado pelas lideranças.
    """
    return {"message": f"Endpoint para orientações da votação com ID: {id}. (Não implementado)"}

# Endpoints da Categoria "Proposições"

@router.get("/proposicoes", tags=["Proposições"])
def get_proposicoes(
    ano: Optional[int] = Query(None, description="Ano de apresentação."),
    siglaTipo: Optional[str] = Query(None, description="Sigla do tipo (e.g., PL, PEC)."),
    numero: Optional[int] = Query(None, description="Número da proposição."),
    idDeputadoAutor: Optional[int] = Query(None, description="ID do deputado autor.")
):
    """
    Lista de informações básicas sobre projetos de lei, resoluções, etc.
    """
    return {"message": "Endpoint para listar proposições. (Não implementado)"}

@router.get("/proposicoes/{id}", tags=["Proposições"])
def get_proposicao_by_id(id: int):
    """
    Informações detalhadas sobre uma proposição específica.
    """
    return {"message": f"Endpoint para detalhes da proposição com ID: {id}. (Não implementado)"}

@router.get("/proposicoes/{id}/autores", tags=["Proposições"])
def get_proposicao_autores(id: int):
    """
    Lista pessoas e/ou entidades autoras de uma proposição.
    """
    return {"message": f"Endpoint para autores da proposição com ID: {id}. (Não implementado)"}

@router.get("/proposicoes/{id}/relacionadas", tags=["Proposições"])
def get_proposicao_relacionadas(id: int):
    """
    Lista de proposições relacionadas a uma em especial.
    """
    return {"message": f"Endpoint para proposições relacionadas com ID: {id}. (Não implementado)"}

@router.get("/proposicoes/{id}/tramitacoes", tags=["Proposições"])
def get_proposicao_tramitacoes(id: int):
    """
    O histórico de passos na tramitação de uma proposta.
    """
    return {"message": f"Endpoint para tramitações da proposição com ID: {id}. (Não implementado)"}

@router.get("/proposicoes/{id}/votacoes", tags=["Proposições"])
def get_proposicao_votacoes(id: int):
    """
    Votações sobre uma proposição específica.
    """
    return {"message": f"Endpoint para votações da proposição com ID: {id}. (Não implementado)"}

@router.get("/proposicoes/{id}/temas", tags=["Proposições"])
def get_proposicao_temas(id: int):
    """
    Apresenta a lista de áreas temáticas com as quais uma proposição se relaciona.
    """
    return {"message": f"Endpoint para temas da proposição com ID: {id}. (Não implementado)"}

# Endpoints da Categoria "Legislaturas"

@router.get("/legislaturas", tags=["Legislaturas"])
def get_legislaturas(
    id: Optional[int] = Query(None, description="ID da legislatura."),
    data: Optional[str] = Query(None, description="Data (AAAA-MM-DD).")
):
    """
    Lista os períodos de mandatos e atividades parlamentares da Câmara.
    """
    return {"message": "Endpoint para listar legislaturas. (Não implementado)"}

@router.get("/legislaturas/{id}", tags=["Legislaturas"])
def get_legislatura_by_id(id: int):
    """
    Informações extras sobre uma determinada legislatura da Câmara.
    """
    return {"message": f"Endpoint para detalhes da legislatura com ID: {id}. (Não implementado)"}

@router.get("/legislaturas/{id}/mesa", tags=["Legislaturas"])
def get_legislatura_mesa(id: int):
    """
    Deputados que fizeram parte da Mesa Diretora.
    """
    return {"message": f"Endpoint para mesa da legislatura com ID: {id}. (Não implementado)"}

@router.get("/legislaturas/{id}/lideres", tags=["Legislaturas"])
def get_legislatura_lideres(id: int):
    """
    Retorna a lista de parlamentares que ocuparam cargos de liderança ao longo da legislatura.
    """
    return {"message": f"Endpoint para líderes da legislatura com ID: {id}. (Não implementado)"}

# Endpoints da Categoria "Órgãos"

@router.get("/orgaos", tags=["Órgãos"])
def get_orgaos(
    sigla: Optional[str] = Query(None, description="Sigla do órgão."),
    dataInicio: Optional[str] = Query(None, description="Data de início (AAAA-MM-DD)."),
    dataFim: Optional[str] = Query(None, description="Data de fim (AAAA-MM-DD).")
):
    """
    A lista das comissões e outros órgãos legislativos da Câmara.
    """
    return {"message": "Endpoint para listar órgãos. (Não implementado)"}

@router.get("/orgaos/{id}", tags=["Órgãos"])
def get_orgao_by_id(id: int):
    """
    Informações detalhadas sobre um órgão da Câmara.
    """
    return {"message": f"Endpoint para detalhes do órgão com ID: {id}. (Não implementado)"}

@router.get("/orgaos/{id}/eventos", tags=["Órgãos"])
def get_orgao_eventos(id: int):
    """
    Eventos ocorridos ou previstos em um órgão.
    """
    return {"message": f"Endpoint para eventos do órgão com ID: {id}. (Não implementado)"}

@router.get("/orgaos/{id}/membros", tags=["Órgãos"])
def get_orgao_membros(id: int):
    """
    Lista de parlamentares que ocupam cargos em um órgão.
    """
    return {"message": f"Endpoint para membros do órgão com ID: {id}. (Não implementado)"}

@router.get("/orgaos/{id}/votacoes", tags=["Órgãos"])
def get_orgao_votacoes(id: int):
    """
    Votações de um órgão.
    """
    return {"message": f"Endpoint para votações do órgão com ID: {id}. (Não implementado)"}

# Endpoints da Categoria "Eventos"

@router.get("/eventos", tags=["Eventos"])
def get_eventos(
    dataInicio: Optional[str] = Query(None, description="Data de início (AAAA-MM-DD)."),
    dataFim: Optional[str] = Query(None, description="Data de fim (AAAA-MM-DD)."),
    idOrgao: Optional[int] = Query(None, description="ID do órgão.")
):
    """
    Lista de eventos ocorridos ou previstos nos diversos órgãos da Câmara.
    """
    return {"message": "Endpoint para listar eventos. (Não implementado)"}

@router.get("/eventos/{id}", tags=["Eventos"])
def get_evento_by_id(id: int):
    """
    Informações detalhadas sobre um evento específico.
    """
    return {"message": f"Endpoint para detalhes do evento com ID: {id}. (Não implementado)"}

@router.get("/eventos/{id}/deputados", tags=["Eventos"])
def get_evento_deputados(id: int):
    """
    Deputados participantes de um evento.
    """
    return {"message": f"Endpoint para deputados do evento com ID: {id}. (Não implementado)"}

@router.get("/eventos/{id}/orgaos", tags=["Eventos"])
def get_evento_orgaos(id: int):
    """
    Lista os órgãos responsáveis pela organização de um evento.
    """
    return {"message": f"Endpoint para órgãos do evento com ID: {id}. (Não implementado)"}

@router.get("/eventos/{id}/pauta", tags=["Eventos"])
def get_evento_pauta(id: int):
    """
    Retorna a lista de proposições que foram ou serão avaliadas em um evento.
    """
    return {"message": f"Endpoint para pauta do evento com ID: {id}. (Não implementado)"}

@router.get("/eventos/{id}/votacoes", tags=["Eventos"])
def get_evento_votacoes(id: int):
    """
    Votações sobre um evento específico.
    """
    return {"message": f"Endpoint para votações do evento com ID: {id}. (Não implementado)"}

# Endpoints da Categoria "Blocos"

@router.get("/blocos", tags=["Blocos"])
def get_blocos(
    idLegislatura: Optional[int] = Query(None, description="ID da legislatura.")
):
    """
    Lista de blocos partidários que já existiram.
    """
    return {"message": "Endpoint para listar blocos. (Não implementado)"}

@router.get("/blocos/{id}", tags=["Blocos"])
def get_bloco_by_id(id: str):
    """
    Informações detalhadas sobre um bloco partidário específico.
    """
    return {"message": f"Endpoint para detalhes do bloco com ID: {id}. (Não implementado)"}

# Endpoints da Categoria "Grupos"

@router.get("/grupos", tags=["Grupos"])
def get_grupos(
    id: Optional[int] = Query(None, description="ID do grupo."),
    idLegislatura: Optional[int] = Query(None, description="ID da legislatura.")
):
    """
    Lista de grupos e conselhos dos quais parlamentares fazem parte.
    """
    return {"message": "Endpoint para listar grupos. (Não implementado)"}

@router.get("/grupos/{id}", tags=["Grupos"])
def get_grupo_by_id(id: int):
    """
    Informações detalhadas sobre um grupo ou conselho.
    """
    return {"message": f"Endpoint para detalhes do grupo com ID: {id}. (Não implementado)"}

@router.get("/grupos/{id}/membros", tags=["Grupos"])
def get_grupo_membros(id: int):
    """
    Membros de um grupo ou conselho.
    """
    return {"message": f"Endpoint para membros do grupo com ID: {id}. (Não implementado)"}

# Endpoints da Categoria "Referências"

@router.get("/referencias/proposicoes/siglaTipo", tags=["Referências"])
def get_referencias_proposicoes_sigla_tipo():
    """
    Lista os tipos de proposição que podem ser usados em outros endpoints.
    """
    return {"message": "Endpoint para listar tipos de proposição. (Não implementado)"}

@router.get("/referencias/proposicoes/temas", tags=["Referências"])
def get_referencias_proposicoes_temas():
    """
    Retorna a lista de temas de proposições.
    """
    return {"message": "Endpoint para listar temas de proposições. (Não implementado)"}

@router.get("/referencias/situacoesDeputado", tags=["Referências"])
def get_referencias_situacoes_deputado():
    """
    Lista as possíveis situações de um deputado (e.g., "exercício", "licença").
    """
    return {"message": "Endpoint para listar situações de deputado. (Não implementado)"}

@router.get("/referencias/situacoesProposicao", tags=["Referências"])
def get_referencias_situacoes_proposicao():
    """
    Lista as possíveis situações de uma proposição.
    """
    return {"message": "Endpoint para listar situações de proposição. (Não implementado)"}

@router.get("/referencias/tiposOrgao", tags=["Referências"])
def get_referencias_tipos_orgao():
    """
    Lista de tipos de órgãos da Câmara (e.g., "comissão", "mesa diretora").
    """
    return {"message": "Endpoint para listar tipos de órgão. (Não implementado)"}

@router.get("/referencias/ufs", tags=["Referências"])
def get_referencias_ufs():
    """
    Lista de Unidades Federativas do Brasil.
    """
    return {"message": "Endpoint para listar UFs. (Não implementado)"}
