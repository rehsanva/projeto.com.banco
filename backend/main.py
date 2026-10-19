
from fastapi import FastAPI, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from rotas import (
    clientes,
    senioridade,
    tatuadores,
    agendamentos,
    estilos,
    usuarios,
    login
)

from seguranca import verificar_token, verificar_admin

import os

app = FastAPI()

# Configuração de acesso do frontend à API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria a pasta de uploads caso ainda não exista
os.makedirs("uploads", exist_ok=True)

# Disponibiliza as imagens enviadas
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

# Login: acesso público
app.include_router(
    login.router,
    tags=["Login"]
)

# Cadastro de usuários: acesso público, sem token prévio
app.include_router(
    usuarios.router,
    prefix="/usuarios",
    tags=["Usuários"]
)

# Clientes: exige autenticação
app.include_router(
    clientes.router,
    prefix="/clientes",
    tags=["Clientes"],
    dependencies=[Depends(verificar_token)]
)

# Senioridade: exige autenticação
app.include_router(
    senioridade.router,
    prefix="/senioridade",
    tags=["Senioridade"],
    dependencies=[Depends(verificar_token)]
)

# Estilos: exige autenticação
app.include_router(
    estilos.router,
    prefix="/estilos",
    tags=["Estilos"],
    dependencies=[Depends(verificar_token)]
)

# Tatuadores: exige autenticação
app.include_router(
    tatuadores.router,
    prefix="/tatuadores",
    tags=["Tatuadores"],
    dependencies=[Depends(verificar_token)]
)

# Agendamentos: exige autenticação
app.include_router(
    agendamentos.router,
    prefix="/agendamentos",
    tags=["Agendamentos"],
    dependencies=[Depends(verificar_token)]
)

# Rota inicial para verificar se a API está funcionando
@app.get("/")
def inicio():
    return {
        "mensagem": "API do estúdio de tatuagem funcionando!"
    }
