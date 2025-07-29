"""
Main RAG - Main file to run the RAG pipeline
"""

import os
import logging
from .rag_pipeline.pipeline import RAGPipeline
from .utils.log_functions import log_AI_api_response_to_file
from .utils.string_functions import get_most_relevant_knowledge_paths

# Logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def initialize_rag_pipeline():
    """
    Initialize RAG Pipeline
    
    Returns:
        RAGPipeline: Pipeline configured or None if there is an error
    """
    try:
        # Pipeline configuration
        documents_path = "chatbot/app/data/sefaz_documents"
        collection_name = "sefaz_docs"
        persist_directory = "data/chroma_db"
        
        logger.info("Initializing RAG pipeline...")
        
        # Create pipeline
        pipeline = RAGPipeline(
            documents_path=documents_path,
            collection_name=collection_name,
            persist_directory=persist_directory,
            chunk_size=2000,
            chunk_overlap=200
        )
        
        # Try to load existing knowledge base
        if pipeline.load_knowledge_base():
            logger.info("Knowledge base loaded successfully")
            return pipeline
        
        # If it doesn't exist, build a new knowledge base
        logger.info("Building new knowledge base...")
        if pipeline.build_knowledge_base():
            logger.info("Knowledge base built successfully")
            return pipeline
        else:
            logger.error("Error building knowledge base")
            return None
            
    except Exception as e:
        logger.error(f"Error initializing RAG pipeline: {e}")
        return None

def chat_with_rag(pipeline, user_input: str):
    """
    Process a user's question using RAG
    
    Args:
        pipeline: Pipeline RAG configurada
        user_input (str): User's question
        
    Returns:
        dict: Chatbot response
    """
    try:
        # Process the question using RAG
        result = pipeline.chat(user_input, k=4, score_threshold=0.7)
        
        # Log the response
        log_AI_api_response_to_file(
            {"choices": [{"message": {"content": result["response"]}}]},
            filename=os.path.join("logs", "rag_response_log.txt")
        )
        
        return result
        
    except Exception as e:
        logger.error(f"Error processing RAG chat: {e}")
        return {
            "response": "Sorry, an error occurred while processing your question. Please try again.",
            "sources": [],
            "confidence": "error"
        }

def generate_question_with_rag(pipeline, topic: str):
    """
    Generate a multiple choice question based on the provided topic
    
    Args:
        pipeline: Configured RAG pipeline
        topic (str): Topic to generate the question
        
    Returns:
        dict: Generated question with options and answer
    """
    try:
        # Generate question using RAG
        result = pipeline.generate_multiple_choice_question(topic, k=4, score_threshold=0.7)
        
        # Log the generated question
        log_AI_api_response_to_file(
            {"choices": [{"message": {"content": f"Question: {result.get('question', 'N/A')}"}}]},
            filename=os.path.join("logs", "question_generation_log.txt")
        )
        
        return result
        
    except Exception as e:
        logger.error(f"Error generating RAG question: {e}")
        return {
            "error": "Sorry, an error occurred while generating the question. Please try again.",
            "question": None,
            "options": None,
            "answer": None,
            "explanation": None,
            "sources": []
        }

def display_response(result: dict):
    """
    Display the chatbot's response in a formatted way
    
    Args:
        result (dict): Chatbot response
    """
    print(f"\n🤖 Chatbot: {result['response']}")
    
    # Display confidence information
    confidence = result.get('confidence', 'unknown')
    if confidence == 'high':
        confidence_emoji = "🟢"
    elif confidence == 'medium':
        confidence_emoji = "🟡"
    elif confidence == 'low':
        confidence_emoji = "🔴"
    else:
        confidence_emoji = "⚪"
    
    print(f"{confidence_emoji} Confidence: {confidence}")
    
    # Display sources if available
    # sources = result.get('sources', [])
    # if sources:
    #     print("\n📚 Sources consulted:")
    #     for i, source in enumerate(sources, 1):
    #         file_name = source.get('file_name', 'Documento')
    #         score = source.get('score', 'N/A')
    #         print(f"  {i}. {file_name} (Score: {score})")

def display_question(question_result: dict):
    """
    Display a multiple choice question in a formatted way
    
    Args:
        question_result (dict): Question generation result
    """
    if "error" in question_result:
        print(f"\n❌ Erro: {question_result['error']}")
        return
    
    print(f"\n📝 Question: {question_result['question']}")
    print(f"\n📋 Options:")
    
    # Display the options
    for option, text in question_result['options'].items():
        print(f"  {option}) {text}")
    
    print(f"\n✅ Correct answer: {question_result['answer']}")
    
    # Display explanation if available
    if question_result.get('explanation'):
        print(f"\n💡 Explanation: {question_result['explanation']}")
    
    # Display confidence information
    confidence = question_result.get('confidence', 'unknown')
    if confidence == 'high':
        confidence_emoji = "🟢"
    elif confidence == 'medium':
        confidence_emoji = "🟡"
    elif confidence == 'low':
        confidence_emoji = "🔴"
    else:
        confidence_emoji = "⚪"
    
    print(f"\n{confidence_emoji} Confidence: {confidence}")
    print(f"📈 Average score: {question_result.get('avg_score', 0):.3f}")
    
    # Display sources if available
    sources = question_result.get('sources', [])
    if sources:
        print(f"\n📚 Sources used:")
        for i, source in enumerate(sources, 1):
            file_name = source.get('file_name', 'Documento')
            score = source.get('score', 'N/A')
            print(f"  {i}. {file_name} (Score: {score})")

def main():
    """
    Main function for the RAG chatbot
    """
    print("🚀 Initializing Sefaz Inteligente with RAG...")
    
    # Initialize pipeline
    pipeline = initialize_rag_pipeline()
    
    if not pipeline:
        print("❌ Error initializing RAG pipeline")
        return
    
    print("✅ RAG pipeline initialized successfully!")
    
    # Main menu
    menu_options = """
🤖 Sefaz Inteligente - Chatbot

Escolha uma opção:

1) Converse com o chatbot
2) Gerar uma questão
3) Sair

Digite o número da opção: """
    
    try:
        while True:
            print(menu_options)
            user_choice = input("Opção: ").strip()
            
            if user_choice == '1':
                print("\n💬 Modo: Conversa Livre")
                print("Digite 'voltar' para retornar ao menu principal")
                print("-" * 50)
                
                while True:
                    user_input = input("\n💬 Digite sua pergunta: ").strip()
                    
                    if user_input.lower() in ["voltar", "sair", "exit", "menu"]:
                        print("🔄 Retornando ao menu principal...")
                        break
                    
                    if user_input:
                        print("🤔 Processando sua pergunta...")
                        result = chat_with_rag(pipeline, user_input)
                        display_response(result)
                        
                        # Display relevant learning paths
                        relevant_paths = get_most_relevant_knowledge_paths(user_input)
                        if relevant_paths:
                            print("\n🎯 Trilhas de aprendizado relacionadas:")
                            for path_obj in relevant_paths:
                                print(f"  - {path_obj.value}")
                    else:
                        print("Por favor, digite uma pergunta válida.")
                
            elif user_choice == '2':
                print("\n📝 Modo: Geração de Questões")
                print("Digite 'voltar' para retornar ao menu principal")
                print("O que você digitar será usado como tópico para gerar uma questão de múltipla escolha")
                print("-" * 50)
                
                while True:
                    topic = input("\n📝 Digite o tópico para gerar a questão: ").strip()
                    
                    if topic.lower() in ["voltar", "sair", "exit", "menu"]:
                        print("🔄 Retornando ao menu principal...")
                        break
                    
                    if topic:
                        print("🤔 Gerando questão...")
                        question_result = generate_question_with_rag(pipeline, topic)
                        display_question(question_result)
                    else:
                        print("Por favor, digite um tópico válido.")
                
            elif user_choice == '3':
                print("👋 Obrigado por usar o Sefaz Inteligente! Até a próxima!")
                break
                
            else:
                print("Opção inválida. Por favor, digite 1, 2 ou 3.")
                
    except KeyboardInterrupt:
        print("\n👋 Encerrando o chat. Até a próxima!")
    except Exception as e:
        logger.error(f"Erro no loop principal: {e}")
        print("❌ Ocorreu um erro inesperado.")

if __name__ == "__main__":
    main() 