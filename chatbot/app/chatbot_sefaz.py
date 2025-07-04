# import openai
from openai import OpenAI
import os
from dotenv import load_dotenv
from utils.log_utils import log_api_response_to_file

# Load variables from .env 
load_dotenv()

# Gets API key from .env
api_key = os.getenv("OPENAI_API_KEY")

def chat_with_gpt(prompt):
    # Sends a prompt to gpt-4o-mini model
    # Log the response into openai_response_log.txt
    try: 
        client = OpenAI(api_key=api_key)

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            store=True,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        print(response.choices[0].message)

    except OpenAI.APIError as e: # OpenAI.APIError - Error handling changed 
        print(f"OpenIA error - APIError): {e}")
        return "Desculpe, houve um problema ao processar sua solicitação pela API."
    except OpenAI.APITimeoutError as e:
        print(f"OpenIA error - TimeoutError: {e}")
        return "Desculpe, a solicitação excedeu o tempo limite."
    except OpenAI.AuthenticationError as e:
        print(f"OpenIA error - AuthenticationError: {e}")
        return "Erro de autenticação. Verifique sua chave da API."
    except OpenAI.PermissionDeniedError as e:
        print(f"OpenIA error - PermissionDeniedError: {e}")
        return "Permissão negada. Verifique suas permissões na API."
    except Exception as e:
        print(f"Unexpected Error: {e}")
        return "Desculpe, algo deu errado."

if __name__ == "__main__":
    print("Olá! Eu sou o Sefaz Inteligente! Digite 'sair' ou 'tchau' para encerrar.")
    while True:
        user_input = input("Você: ")
        if user_input.lower() in ["sair", "tchau"]:
            print("Chatbot: Até mais!")
            break

        response = chat_with_gpt(user_input)
        print("Chatbot:", response)




# import os
# from dotenv import load_dotenv
# from openai import OpenAI
# import json # Importar para lidar com JSON
# from datetime import datetime # Importar para adicionar timestamp aos logs

# # Carrega as variáveis de ambiente do arquivo .env
# load_dotenv()

# # Obtém a chave da API da variável de ambiente
# api_key = os.getenv("OPENAI_API_KEY")

# # Cria uma instância do cliente OpenAI globalmente para reutilização
# # Isso evita criar um novo cliente a cada chamada de chat_with_gpt
# client = OpenAI(api_key=api_key)

# def log_api_response_to_file(response_data, filename="openai_responses.txt"):
#     """
#     Função auxiliar para redirecionar o conteúdo completo das respostas da API
#     do OpenAI para um arquivo de texto.

#     Args:
#         response_data: O objeto de resposta completo retornado pela API do OpenAI.
#         filename (str): O nome do arquivo para onde a resposta será logada.
#     """
#     try:
#         # Converte o objeto de resposta para um dicionário serializável
#         # e depois para uma string JSON formatada.
#         # .model_dump_json() é o método para serializar objetos Pydantic (como as respostas da OpenAI)
#         response_json_string = response_data.model_dump_json(indent=2)

#         # Adiciona um timestamp para cada entrada de log
#         timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
#         log_entry = f"--- Resposta da API ({timestamp}) ---\n"
#         log_entry += response_json_string
#         log_entry += "\n-----------------------------------\n\n"

#         # Abre o arquivo em modo de adição ('a') e escreve o conteúdo
#         with open(filename, "a", encoding="utf-8") as f:
#             f.write(log_entry)
#         print(f"DEBUG: Resposta da API logada em '{filename}'")
#     except Exception as e:
#         print(f"ERRO DE LOG: Não foi possível logar a resposta da API: {e}")

# def chat_with_gpt(prompt):
#     """
#     Envia um prompt para o modelo GPT-4o-mini e retorna a resposta.
#     Também loga a resposta completa da API para um arquivo.
#     """
#     try:
#         # A chamada para ChatCompletion mudou para client.chat.completions.create
#         response = client.chat.completions.create(
#             model="gpt-4o-mini",
#             # 'store=True' não é um parâmetro padrão da API de Chat Completions.
#             # Se você pretende gerenciar histórico de conversas, isso deve ser feito
#             # manualmente ou com uma biblioteca de gerenciamento de estado.
#             # Removendo 'store=True' para evitar erro, a menos que seja um recurso
#             # específico de uma customização sua.
#             messages=[
#                 {"role": "user", "content": prompt}
#             ]
#         )

#         # Loga a resposta completa da API antes de extrair o conteúdo
#         log_api_response_to_file(response)

#         # Verifica se message e content existem antes de tentar acessar
#         if response.choices and response.choices[0].message and response.choices[0].message.content:
#             return response.choices[0].message.content.strip()
#         else:
#             print("DEBUG: Conteúdo da resposta da API vazio ou ausente.")
#             return "Desculpe, não consegui obter uma resposta clara."

#     except openai.APIError as e: # O tratamento de erro mudou para openai.APIError
#         print(f"Erro da OpenAI (APIError): {e}")
#         return "Desculpe, houve um problema ao processar sua solicitação pela API."
#     except openai.APITimeoutError as e: # Novo tipo de erro para timeout
#         print(f"Erro da OpenAI (TimeoutError): {e}")
#         return "Desculpe, a solicitação excedeu o tempo limite."
#     except openai.AuthenticationError as e: # Erro de autenticação
#         print(f"Erro de Autenticação da OpenAI: {e}")
#         return "Erro de autenticação. Verifique sua chave da API."
#     except openai.PermissionDeniedError as e: # Erro de permissão
#         print(f"Erro de Permissão da OpenAI: {e}")
#         return "Permissão negada. Verifique suas permissões na API."
#     except Exception as e:
#         print(f"Ocorreu um erro inesperado: {e}")
#         return "Desculpe, algo deu errado."

# if __name__ == "__main__":
#     print("Olá! Eu sou o Sefaz Inteligente! Digite 'sair' ou 'tchau' para encerrar.")
#     while True:
#         user_input = input("Você: ")
#         if user_input.lower() in ["sair", "tchau"]:
#             print("Chatbot: Até mais!")
#             break

#         response_content = chat_with_gpt(user_input) # Renomeado para evitar conflito com o objeto 'response' da API
#         print("Chatbot:", response_content)
