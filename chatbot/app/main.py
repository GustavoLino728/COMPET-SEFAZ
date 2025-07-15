from openai import OpenAI
import os
from dotenv import load_dotenv
from utils.log_functions import log_AI_api_response_to_file
from utils.string_functions import get_most_relevant_knowledge_paths
import unicodedata
import openai

# Load variables from .env 
load_dotenv()

# Gets API key from .env
api_key = os.getenv("OPENAI_API_KEY")

# Global OpenAI client instance (for reuse)
client = OpenAI(api_key=api_key)

# Sends a prompt to gpt-4o-mini model
# Log the response into openai_response_log.txt
def chat_with_gpt(prompt: str):
    # Normalize prompt to make sure that there is no invalid characters
    normalized_prompt = unicodedata.normalize('NFC', prompt)

    try: 
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        # Log the full API response to the specified file
        log_AI_api_response_to_file(response, filename=os.path.join("logs", "openai_response_log.txt"))

        # Check if message and content exist before attempting to access
        if response.choices and response.choices[0].message and response.choices[0].message.content:
            return response.choices[0].message.content.strip()
        else:
            print("DEBUG: API response content empty or missing.")
            return "Sorry, I couldn't get a clear response from the AI."


    except openai.APICallError as e:
        print(f"OpenIA API error: {e}")
        if hasattr(e, 'status_code'):
            if e.status_code == 401:
                return "Authentication error. Check API key."
            elif e.status_code == 429:
                return "Too many requisitions. Try again later."
            elif e.status_code >= 500:
                return "Error in OpenIA server."
        return "Desculpe, houve um problema ao processar sua solicitação pela API."
    except openai.APITimeoutError as e:
        print(f"OpenAI time limit error: {e}")
        return "Desculpe, a solicitação excedeu o tempo limite."
    except openai.APIConnectionError as e: # Erros de conexão de rede
        print(f"OpenIA API connection error: {e}")
        return "Desculpe, não consegui me conectar ao serviço do chatbot."
    except Exception as e:
        print(f"Unexpected error: {e}")
        return "Desculpe, algo deu errado."

if __name__ == "__main__":
    menu_options = """
Olá! Eu sou o Sefaz Inteligente! Por favor, escolha uma opção:

1 - Aprender sobre ICMS
2 - Trilhas de aprendizado disponíveis
3 - Outra funcionalidade (conversar livremente)
4 - Sair
"""
    
    try:
        while True:
            print(menu_options)
            user_choice = input("Digite o número da opção: ").strip()
            response_content = ""

            if user_choice == '1':
                prompt = "Explique o que é ICMS de forma clara e concisa, como se estivesse ensinando a alguém que não conhece o assunto."
                response_content = chat_with_gpt(prompt)
                print("Chatbot:", response_content)
            elif user_choice == '2':
                prompt = "Quais trilhas de aprendizado sobre legislação tributária ou finanças públicas estão disponíveis no Sefaz?"
                response_content = chat_with_gpt(prompt)
                print("Chatbot:", response_content)
            elif user_choice == '3': 
                free_input = input("Você: ")
                
                if free_input.lower() in ["sair", "tchau"]:
                    print("Chatbot: Até mais!")
                    break
                response_content = chat_with_gpt(free_input)
                print("Chatbot: ", response_content)
                
                relevant_paths = get_most_relevant_knowledge_paths(free_input)
                
                if not relevant_paths:
                    continue
                else:
                    print("\nChatbot: Em nossa plataforma, estas trilhas de aprendizado tem relação com o conteúdo que estamos conversando:")
                    
                    for path_obj in relevant_paths:
                        print(path_obj.value)                
            elif user_choice == '4':
                print("Chatbot: Até mais!")
                break
            else:
                print("Opção inválida. Por favor, digite um número de 1 a 4.")
    
    except KeyboardInterrupt:
        print("\nChatbot: Encerrando o chat. Até a próxima!")
    

