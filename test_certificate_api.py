#!/usr/bin/env python3
"""
Script para testar a API de certificados
"""
import requests
import json

# Configurações
BASE_URL = "http://localhost:8000"
API_URL = f"{BASE_URL}/api/progress/certificates/submit/"

# Dados de teste
test_data = {
    "program": "PROIND",
    "track": "T1",
    "answers": [
        {
            "question_id": 1,
            "user_answer": 1,
            "is_correct": True
        },
        {
            "question_id": 2,
            "user_answer": 2,
            "is_correct": True
        },
        {
            "question_id": 3,
            "user_answer": 1,
            "is_correct": False
        },
        {
            "question_id": 4,
            "user_answer": 3,
            "is_correct": True
        },
        {
            "question_id": 5,
            "user_answer": 2,
            "is_correct": True
        }
    ],
    "score": 80.0,
    "passed": True
}

def test_certificate_api():
    print("🧪 Testando API de certificados...")
    print(f"📡 URL: {API_URL}")
    print(f"📦 Dados: {json.dumps(test_data, indent=2)}")
    
    try:
        # Fazer requisição POST
        response = requests.post(
            API_URL,
            json=test_data,
            headers={
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_TOKEN_HERE"  # Substitua pelo token real
            },
            timeout=30
        )
        
        print(f"📊 Status: {response.status_code}")
        print(f"📄 Headers: {dict(response.headers)}")
        print(f"📝 Resposta: {response.text}")
        
        if response.status_code == 200 or response.status_code == 201:
            print("✅ Teste bem-sucedido!")
        else:
            print("❌ Teste falhou!")
            
    except requests.exceptions.ConnectionError:
        print("❌ Erro de conexão - servidor não está rodando?")
    except requests.exceptions.Timeout:
        print("❌ Timeout - servidor demorou muito para responder")
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")

if __name__ == "__main__":
    test_certificate_api()
