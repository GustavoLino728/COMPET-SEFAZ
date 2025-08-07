"""
Chat Module - Responsible for integrating search with AI model to generate responses
"""

from openai import OpenAI
from langchain_core.documents import Document
from typing import List, Dict, Any, Optional
import os
import logging
import unicodedata
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

class RAGChatbot:
    """Class responsible for integrating RAG with AI model for chat"""
    
    def __init__(self, 
                 search_engine,
                 model: str = "gpt-4o-mini",
                 max_tokens: int = 1000,
                 temperature: float = 0.7):
        """
        Initialize the RAG chatbot
        
        Args:
            search_engine: Configured search engine
            model (str): AI model to be used
            max_tokens (int): Maximum number of tokens in the response
            temperature (float): Temperature for response generation
        """
        self.search_engine = search_engine
        self.model = model
        self.max_tokens = max_tokens
        self.temperature = temperature
        
        # Initialize OpenAI client
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY not found in environment variables")
        
        self.client = OpenAI(api_key=api_key)
        logger.info(f"RAG chatbot initialized with model: {model}")
    
    def _create_context_from_documents(self, documents: List[Document]) -> str:
        """
        Create context from the found documents
        
        Args:
            documents (List[Document]): List of relevant documents
            
        Returns:
            str: Formatted context
        """
        if not documents:
            return ""
        
        context_parts = []
        for i, doc in enumerate(documents):
            # Add document information
            source = doc.metadata.get('source', 'Unknown source')
            score = doc.metadata.get('similarity_score', 'N/A')
            
            context_parts.append(f"Document {i+1} (Score: {score}):")
            context_parts.append(f"Source: {source}")
            context_parts.append(f"Content: {doc.page_content}")
            context_parts.append("-" * 50)
        
        return "\n".join(context_parts)
    
    def _create_system_prompt(self) -> str:
        """
        Create the system prompt
        
        Returns:
            str: System prompt
        """
        return """Você é um assistente especializado em legislação tributária e assuntos da SEFAZ-PE (Secretaria da Fazenda do Estado de Pernambuco).  
        
Suas responsabilidades incluem:
1. Responder perguntas sobre ICMS, incentivos fiscais e legislação tributária
2. Fornecer informações precisas baseadas na documentação oficial
3. Explicar conceitos complexos de forma clara e acessível
4. Sempre citar as fontes quando possível

IMPORTANTE:
- Baseie suas respostas APENAS no contexto fornecido
- Se a informação não estiver no contexto, diga que não tem a informação
- Mantenha um tom profissional mas acessível
- Use linguagem clara e evite jargões desnecessários
- Sempre mencione as fontes dos documentos quando relevante"""
    
    def _create_user_prompt(self, query: str, context: str) -> str:
        """
        Create the user prompt with context
        
        Args:
            query (str): User's question
            context (str): Context of the documents
            
        Returns:
            str: User prompt
        """
        return f"""Pergunta do usuário: {query}

Contexto dos documentos:
{context}

Por favor, responda à pergunta do usuário baseando-se APENAS no contexto fornecido acima. 
Se a informação não estiver no contexto, informe que a informação não está disponível."""
    

    def _create_system_prompt_for_quiz(self) -> str:
        """
        Create the system prompt for the quiz generation task.
        
        Returns:
            str: The system prompt.
        """
        return """Você é um tutor e elaborador de materiais de estudo especializado em legislação tributária e assuntos da SEFAZ-PE.
        
Sua responsabilidade é criar uma questão de múltipla escolha (com 5 alternativas: A, B, C, D, E) que teste o conhecimento do usuário sobre o contexto fornecido.

REGRAS IMPORTANTES:
1. Crie a questão baseando-se ESTRITAMENTE no contexto de documentos fornecido. Não use nenhum conhecimento externo.
2. A pergunta deve ser clara, relevante e desafiadora.
3. Deve haver apenas UMA alternativa correta.
4. As quatro alternativas incorretas (distratores) devem ser plausíveis, mas erradas de acordo com o contexto.
5. Sua resposta final deve ser APENAS um objeto JSON, sem nenhum texto adicional antes ou depois.
6. A questão deve testar conhecimento específico sobre legislação tributária, ICMS, incentivos fiscais ou assuntos da SEFAZ-PE.

O formato do JSON deve ser exatamente o seguinte:
{
  "question": "O texto da pergunta que você elaborou.",
  "options": {
    "A": "Texto da alternativa A.",
    "B": "Texto da alternativa B.",
    "C": "Texto da alternativa C.",
    "D": "Texto da alternativa D.",
    "E": "Texto da alternativa E."
  },
  "answer": "A",
  "explanation": "Breve explicação de por que a resposta está correta, baseada no contexto fornecido."
}"""

    def _create_user_prompt_for_quiz(self, topic: str, context: str) -> str:
        """
        Create the user prompt for the quiz generation task. 
        
        Args:
            topic (str): The topic or subject on which the question should be focused.
            context (str): The context of the retrieved documents.
            
        Returns:
            str: The user prompt.
        """
        return f"""Tópico Sugerido para a Questão: "{topic}"

Contexto dos Documentos:
---
{context}
---

Por favor, com base APENAS no contexto acima, crie uma questão de múltipla escolha que avalie o entendimento sobre o tópico sugerido. Siga estritamente as regras e o formato JSON definidos nas suas instruções de sistema."""

    def chat(self, 
             query: str, 
             k: int = 4, 
             score_threshold: float = 0.7) -> Dict[str, Any]:
        """
        Process a user's question and return a response
        
        Args:
            query (str): User's question
            k (int): Number of documents to search
            score_threshold (float): Minimum similarity score
            
        Returns:
            Dict[str, Any]: Response with detailed information
        """
        try:
            # Normalize the query
            normalized_query = unicodedata.normalize('NFC', query)
            
            logger.info(f"Processing question: '{normalized_query}'")
            
            # Search relevant documents
            relevant_docs = self.search_engine.similarity_search(
                normalized_query, 
                k=k, 
                score_threshold=score_threshold
            )
            
            if not relevant_docs:
                logger.warning("No relevant documents found")
                return {
                    "response": "Sorry, I couldn't find relevant information about your question in the available documentation.",
                    "sources": [],
                    "confidence": "low"
                }
            
            # Create context from the documents
            context = self._create_context_from_documents(relevant_docs)
            
            # Create prompts
            system_prompt = self._create_system_prompt()
            user_prompt = self._create_user_prompt(normalized_query, context)
            
            # Generate response
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            # Extract response
            if response.choices and response.choices[0].message:
                ai_response = response.choices[0].message.content.strip()
            else:
                ai_response = "Sorry, I couldn't generate an appropriate response."
            
            # Prepare source information
            sources = []
            for doc in relevant_docs:
                source_info = {
                    "source": doc.metadata.get('source', 'Unknown source'),
                    "file_name": doc.metadata.get('file_name', 'N/A'),
                    "score": doc.metadata.get('similarity_score', 'N/A')
                }
                sources.append(source_info)
            
            # Determine confidence level
            avg_score = sum([doc.metadata.get('similarity_score', 0) for doc in relevant_docs]) / len(relevant_docs)
            confidence = "high" if avg_score > 0.8 else "medium" if avg_score > 0.6 else "low"
            
            result = {
                "response": ai_response,
                "sources": sources,
                "confidence": confidence,
                "avg_score": avg_score,
                "documents_used": len(relevant_docs)
            }
            
            logger.info(f"Response generated with confidence: {confidence}")
            return result
            
        except Exception as e:
            logger.error(f"Error processing chat: {e}")
            return {
                "response": "Sorry, an error occurred while processing your question. Please try again.",
                "sources": [],
                "confidence": "error",
                "error": str(e)
            }

    def generate_multiple_choice_question(self, 
                                        topic: str, 
                                        k: int = 4, 
                                        score_threshold: float = 0.7) -> Dict[str, Any]:
        """
        Generate a multiple choice question based on the given topic
        
        Args:
            topic (str): Topic to generate question about
            k (int): Number of documents to search
            score_threshold (float): Minimum similarity score
            
        Returns:
            Dict[str, Any]: Generated question with options and answer
        """
        try:
            # Normalize the topic
            normalized_topic = unicodedata.normalize('NFC', topic)
            
            logger.info(f"Generating multiple choice question for topic: '{normalized_topic}'")
            
            # Search relevant documents
            relevant_docs = self.search_engine.similarity_search(
                normalized_topic, 
                k=k, 
                score_threshold=score_threshold
            )
            
            if not relevant_docs:
                logger.warning("No relevant documents found for question generation")
                return {
                    "error": "Não foi possível encontrar informações relevantes sobre o tópico solicitado.",
                    "question": None,
                    "options": None,
                    "answer": None,
                    "explanation": None,
                    "sources": []
                }
            
            # Create context from the documents
            context = self._create_context_from_documents(relevant_docs)
            
            # Create prompts for quiz generation
            system_prompt = self._create_system_prompt_for_quiz()
            user_prompt = self._create_user_prompt_for_quiz(normalized_topic, context)
            
            # Generate question
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            # Extract response
            if response.choices and response.choices[0].message:
                ai_response = response.choices[0].message.content.strip()
            else:
                return {
                    "error": "Não foi possível gerar uma questão apropriada.",
                    "question": None,
                    "options": None,
                    "answer": None,
                    "explanation": None,
                    "sources": []
                }
            
            # Parse JSON response
            import json
            try:
                question_data = json.loads(ai_response)
                
                # Validate required fields
                required_fields = ["question", "options", "answer"]
                for field in required_fields:
                    if field not in question_data:
                        raise ValueError(f"Campo obrigatório '{field}' não encontrado na resposta")
                
                # Validate options
                if not isinstance(question_data["options"], dict):
                    raise ValueError("Campo 'options' deve ser um objeto")
                
                expected_options = ["A", "B", "C", "D", "E"]
                for option in expected_options:
                    if option not in question_data["options"]:
                        raise ValueError(f"Alternativa '{option}' não encontrada")
                
                # Validate answer
                if question_data["answer"] not in expected_options:
                    raise ValueError(f"Resposta '{question_data['answer']}' não é uma alternativa válida")
                
            except json.JSONDecodeError as e:
                logger.error(f"Error parsing JSON response: {e}")
                return {
                    "error": "Erro ao processar a resposta do modelo de IA.",
                    "raw_response": ai_response,
                    "question": None,
                    "options": None,
                    "answer": None,
                    "explanation": None,
                    "sources": []
                }
            except ValueError as e:
                logger.error(f"Error validating question data: {e}")
                return {
                    "error": f"Erro na validação dos dados da questão: {str(e)}",
                    "raw_response": ai_response,
                    "question": None,
                    "options": None,
                    "answer": None,
                    "explanation": None,
                    "sources": []
                }
            
            # Prepare source information
            sources = []
            for doc in relevant_docs:
                source_info = {
                    "source": doc.metadata.get('source', 'Unknown source'),
                    "file_name": doc.metadata.get('file_name', 'N/A'),
                    "score": doc.metadata.get('similarity_score', 'N/A')
                }
                sources.append(source_info)
            
            # Determine confidence level
            avg_score = sum([doc.metadata.get('similarity_score', 0) for doc in relevant_docs]) / len(relevant_docs)
            confidence = "high" if avg_score > 0.8 else "medium" if avg_score > 0.6 else "low"
            
            result = {
                "question": question_data["question"],
                "options": question_data["options"],
                "answer": question_data["answer"],
                "explanation": question_data.get("explanation", ""),
                "sources": sources,
                "confidence": confidence,
                "avg_score": avg_score,
                "documents_used": len(relevant_docs),
                "topic": normalized_topic
            }
            
            logger.info(f"Multiple choice question generated with confidence: {confidence}")
            return result
            
        except Exception as e:
            logger.error(f"Error generating multiple choice question: {e}")
            return {
                "error": f"Erro ao gerar questão de múltipla escolha: {str(e)}",
                "question": None,
                "options": None,
                "answer": None,
                "explanation": None,
                "sources": []
            }

    def generate_quiz_set(self, 
                         topics: List[str], 
                         k: int = 4, 
                         score_threshold: float = 0.7) -> Dict[str, Any]:
        """
        Generate a set of multiple choice questions for multiple topics
        
        Args:
            topics (List[str]): List of topics to generate questions about
            k (int): Number of documents to search per topic
            score_threshold (float): Minimum similarity score
            
        Returns:
            Dict[str, Any]: Set of generated questions
        """
        quiz_set = {
            "questions": [],
            "total_questions": 0,
            "successful_questions": 0,
            "failed_questions": 0,
            "topics": topics
        }
        
        for i, topic in enumerate(topics):
            logger.info(f"Generating question {i+1}/{len(topics)} for topic: {topic}")
            
            question_result = self.generate_multiple_choice_question(topic, k, score_threshold)
            
            if "error" in question_result:
                quiz_set["failed_questions"] += 1
                logger.warning(f"Failed to generate question for topic '{topic}': {question_result['error']}")
            else:
                quiz_set["successful_questions"] += 1
                quiz_set["questions"].append(question_result)
            
            quiz_set["total_questions"] += 1
        
        logger.info(f"Quiz set generated: {quiz_set['successful_questions']}/{quiz_set['total_questions']} successful")
        return quiz_set

    def get_chat_statistics(self, query: str) -> Dict[str, Any]:
        """
        Return chat statistics for a query
        
        Args:
            query (str): Query to get statistics
            
        Returns:
            Dict[str, Any]: Chat statistics
        """
        result = self.chat(query)
        
        stats = {
            "query": query,
            "response_length": len(result.get("response", "")),
            "sources_count": len(result.get("sources", [])),
            "confidence": result.get("confidence", "unknown"),
            "avg_score": result.get("avg_score", 0),
            "documents_used": result.get("documents_used", 0)
        }
        
        return stats

# Example usage
if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.INFO)
    
    # Test with example search engine
    from .step3_embedding import EmbeddingManager
    from .step4_search import SearchEngine
    
    # Load vector store and create search engine
    embedding_manager = EmbeddingManager()
    vector_store = embedding_manager.load_vector_store()
    
    if vector_store:
        search_engine = SearchEngine(vector_store)
        
        # Create chatbot
        chatbot = RAGChatbot(search_engine)
        
        # Test regular chat
        print("=" * 80)
        print("TESTING REGULAR CHAT")
        print("=" * 80)
        
        test_queries = [
            "O que é ICMS?",
            "Explique sobre não cumulatividade do ICMS",
            "Quais são os incentivos fiscais disponíveis?"
        ]
        
        for query in test_queries:
            print(f"\n{'='*60}")
            print(f"Question: {query}")
            print(f"{'='*60}")
            
            result = chatbot.chat(query)
            
            print(f"Response: {result['response']}")
            print(f"Confidence: {result['confidence']}")
            print(f"Average score: {result['avg_score']:.3f}")
            print(f"Documents used: {result['documents_used']}")
            
            if result['sources']:
                print("\nSources:")
                for i, source in enumerate(result['sources']):
                    print(f"  {i+1}. {source['file_name']} (Score: {source['score']})")
            
            print("-" * 60)
        
        # Test multiple choice question generation
        print("\n" + "=" * 80)
        print("TESTING MULTIPLE CHOICE QUESTION GENERATION")
        print("=" * 80)
        
        test_topics = [
            "ICMS",
            "Incentivos fiscais",
            "Não cumulatividade"
        ]
        
        for topic in test_topics:
            print(f"\n{'='*60}")
            print(f"Generating question for topic: {topic}")
            print(f"{'='*60}")
            
            question_result = chatbot.generate_multiple_choice_question(topic)
            
            if "error" in question_result:
                print(f"Error: {question_result['error']}")
            else:
                print(f"Question: {question_result['question']}")
                print("\nOptions:")
                for option, text in question_result['options'].items():
                    print(f"  {option}) {text}")
                print(f"\nCorrect Answer: {question_result['answer']}")
                if question_result.get('explanation'):
                    print(f"Explanation: {question_result['explanation']}")
                print(f"Confidence: {question_result['confidence']}")
                print(f"Average score: {question_result['avg_score']:.3f}")
                
                if question_result['sources']:
                    print("\nSources:")
                    for i, source in enumerate(question_result['sources']):
                        print(f"  {i+1}. {source['file_name']} (Score: {source['score']})")
            
            print("-" * 60)
        
        # Test quiz set generation
        print("\n" + "=" * 80)
        print("TESTING QUIZ SET GENERATION")
        print("=" * 80)
        
        quiz_topics = ["ICMS", "Incentivos fiscais", "Não cumulatividade"]
        quiz_set = chatbot.generate_quiz_set(quiz_topics)
        
        print(f"Quiz Set Results:")
        print(f"Total questions generated: {quiz_set['total_questions']}")
        print(f"Successful questions generated: {quiz_set['successful_questions']}")
        print(f"Failed questions generated: {quiz_set['failed_questions']}")
        
        for i, question in enumerate(quiz_set['questions']):
            print(f"\nQuestion {i+1}:")
            print(f"Topic: {question['topic']}")
            print(f"Question: {question['question']}")
            print(f"Correct Answer: {question['answer']}")
            print(f"Confidence: {question['confidence']}")
        
        print("-" * 60) 