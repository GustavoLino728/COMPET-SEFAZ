from openai import OpenAI
import os
from dotenv import load_dotenv
from utils.log_functions import log_AI_api_response_to_file

# Load variables from .env 
load_dotenv()

# Gets API key from .env
api_key = os.getenv("OPENAI_API_KEY")

# Global OpenAI client instance (for reuse)
client = OpenAI(api_key=api_key)

def chat_with_gpt(prompt):
    # Sends a prompt to gpt-4o-mini model
    # Log the response into openai_response_log.txt
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
