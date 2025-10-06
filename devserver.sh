#!/bin/sh
source .venv/bin/activate

# O argumento --app-dir aponta para o diretório onde o módulo principal (main.py) está localizado.
uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000} --reload --app-dir backend
