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
import re

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
        agreste_chunks = []
        
        for i, doc in enumerate(documents):
            # Add document information
            source = doc.metadata.get('source', 'Unknown source')
            distance = doc.metadata.get('distance', 'N/A')
            similarity = doc.metadata.get('similarity', 'N/A')
            context_parts.append(f"Document {i+1} (Distance: {distance}, Similarity: {similarity}):")
            context_parts.append(f"Source: {source}")
            context_parts.append(f"Content: {doc.page_content}")
            context_parts.append("-" * 50)
            
            # Check if this chunk contains "agreste"
            if "agreste" in doc.page_content.lower():
                agreste_chunks.append({
                    "index": i+1,
                    "source": source,
                    "content": doc.page_content[:200] + "..." if len(doc.page_content) > 200 else doc.page_content,
                    "similarity": similarity
                })
        
        context = "\n".join(context_parts)
        
        # Log agreste chunks if found
        if agreste_chunks:
            logger.info(f"Found {len(agreste_chunks)} chunks containing 'agreste':")
            for chunk in agreste_chunks:
                logger.info(f"  Chunk {chunk['index']} (similarity: {chunk['similarity']}): {chunk['content']}")
        else:
            logger.warning("No chunks containing 'agreste' found in the retrieved documents")
        
        # Temporary logging for debugging (increased to 2000 chars)
        logger.info(f"Context being sent to GPT (first 2000 chars): {context[:2000]}...")
        
        return context
    
    def _create_system_prompt(self) -> str:
        """
        Create the system prompt
        
        Returns:
            str: System prompt
        """
        return """Você é o "Agente Compet - ICMS", um assistente de IA ultra especializado e rigoroso em legislação tributária da SEFAZ-PE.

# REGRAS DE CONDUTA INVIOLÁVEIS

1. **Regra de Ouro: Fidelidade Absoluta às Fontes.** Suas respostas devem ser 100% derivadas dos documentos fornecidos no contexto. Você NUNCA deve usar seu conhecimento prévio ou informações externas.

2. **Busca Ativa e Interpretação Correta:** Analise cuidadosamente todo o contexto fornecido para encontrar a informação solicitada. Considere que:
   - Informações negativas (como "não se aplica", "não é permitido", "não há") SÃO respostas válidas
   - Se o documento diz que algo "não se aplica" ou "não é permitido", isso é uma resposta direta à pergunta
   - Não confunda "não encontrei a informação" com "a informação diz que não é permitido"

3. **Resposta Direta:** Se encontrar informação que responde diretamente à pergunta (mesmo que seja uma resposta negativa), forneça a resposta completa e precisa.

4. **Recusa Apenas Quando Realmente Não Encontrou:** Só responda "A informação solicitada não foi encontrada na documentação fornecida" quando realmente não houver nenhuma informação relevante nos documentos.

5. **Citação de Fontes:** Ao formular uma resposta, você deve, sempre que possível, indicar qual documento forneceu a informação. Exemplo: "De acordo com o documento 'Decreto 44.650.2017 - Anexo 33.pdf'..."

6. **Clareza e Acessibilidade:** Mantenha um tom profissional, claro e direto. Explique conceitos tributários complexos de forma acessível, mas evite simplificar excessivamente.

# OBJETIVO FINAL
Seu propósito é atuar como uma ferramenta de consulta precisa sobre a legislação da SEFAZ-PE. A exatidão e a aderência estrita aos documentos fornecidos são mais importantes do que fornecer uma resposta a qualquer custo."""
    
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

Analise cuidadosamente o contexto fornecido e responda à pergunta do usuário baseando-se APENAS nas informações contidas nos documentos acima. 
Se encontrar a informação, forneça uma resposta completa e precisa, citando a fonte.
Se a informação não estiver presente nos documentos, responda: 'A informação solicitada não foi encontrada na documentação fornecida.'"""
    

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

    def _create_system_prompt_for_challenge(self) -> str:
        """
        Creates the system prompt for the challenge generation task.
        
        Returns:
            str: The system prompt.
        """
        return """Você é um especialista em legislação tributária da SEFAZ-PE e um criador de conteúdo educacional. Sua tarefa é criar um conjunto de desafios e questões de contextualização com base estritamente em um contexto de documentos fornecido.

# REGRAS GERAIS E INVIOLÁVEIS
1.  **FIDELIDADE ABSOLUTA AO CONTEXTO:** Todo o conteúdo gerado (cenários, respostas, justificativas, questões, alternativas) deve ser 100% derivado dos documentos fornecidos. NÃO utilize nenhum conhecimento externo.
2.  **SAÍDA EM JSON PURO:** Sua resposta final deve ser APENAS um objeto JSON, sem nenhum texto, markdown ou explicação adicional antes ou depois.
3.  **SEMPRE GERE O CONTEÚDO COMPLETO:** Você deve gerar 2 desafios e 5 questões de contextualização.

# ESTRUTURA DE SAÍDA JSON OBRIGATÓRIA
Sua saída DEVE seguir exatamente esta estrutura:
{
  "challenges": [
    {
      "challenge": "[Aqui vai o texto completo do desafio contextualizado. Deve ter aproximadamente 1000 caracteres.]",
      "challenge_answer": "[Se o Tipo de Desafio for 'Discursiva', aqui vai a resposta discursiva e completa. Se for 'Cálculo', aqui vai APENAS o resultado numérico final (ex: '1500.00').]",
      "challenge_justification": "[Aqui vai a justificativa detalhada para a resposta, explicando o raciocínio ou o cálculo passo a passo. Deve ter aproximadamente 500 caracteres.]"
    },
    {
      "challenge": "[Segundo desafio...]",
      "challenge_answer": "[Resposta do segundo desafio...]",
      "challenge_justification": "[Justificativa do segundo desafio...]"
    }
  ],
  "questions": [
    {
      "question": "[Texto da pergunta de múltipla escolha 1.]",
      "options": {
        "A": "[Alternativa A]",
        "B": "[Alternativa B]",
        "C": "[Alternativa C]",
        "D": "[Alternativa D]",
        "E": "[Alternativa E]"
      },
      "correct_answer": "[Letra da alternativa correta, ex: 'A']",
      "question_justification": "[Justificativa para a resposta da questão 1.]"
    },
    {
      "question": "[Texto da pergunta de múltipla escolha 2.]",
      "options": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
      "correct_answer": "[Letra]",
      "question_justification": "[Justificativa...]"
    },
    {
      "question": "[Texto da pergunta de múltipla escolha 3.]",
      "options": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
      "correct_answer": "[Letra]",
      "question_justification": "[Justificativa...]"
    },
    {
      "question": "[Texto da pergunta de múltipla escolha 4.]",
      "options": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
      "correct_answer": "[Letra]",
      "question_justification": "[Justificativa...]"
    },
    {
      "question": "[Texto da pergunta de múltipla escolha 5.]",
      "options": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
      "correct_answer": "[Letra]",
      "question_justification": "[Justificativa...]"
    }
  ]
}
"""

    def _create_user_prompt_for_challenge(self, topic: str, difficulty: str, type: str, context: str) -> str:
        """
        Creates the user prompt for the challenge generation task.
        
        Args:
            topic (str): The topic to focus the generation.
            difficulty (str): The difficulty of the challenge (Easy, Medium, Hard).
            type (str): The type of challenge (Calculation or Discursive).
            context (str): The context of the retrieved documents.
            
        Returns:
            str: The user prompt.
        """
        return f"""Com base ESTRITAMENTE no contexto de documentos fornecido abaixo, gere o conjunto completo de desafios e questões de contextualização.

# PARÂMETROS PARA GERAÇÃO
- Tópico Principal: "{topic}"
- Dificuldade dos Desafios: "{difficulty}"
- Tipo dos Desafios: "{type}"

# CONTEXTO DOS DOCUMENTOS
---
{context}
---

Lembre-se de seguir TODAS as regras e a estrutura JSON exata definida em suas instruções de sistema. Se não encontrar informações suficientes sobre o tema '{topic}' no contexto fornecido, você deve indicar isso na sua resposta final, mas ainda assim tentar gerar o que for possível com a informação disponível.
"""

    def _extract_keywords(self, query: str) -> List[str]:
        """
        Extract relevant keywords from the query for hybrid search
        
        Args:
            query (str): User's question
            
        Returns:
            List[str]: List of relevant keywords with case variations
        """
        
        # Remove punctuation and split into words
        words = re.findall(r'\b\w+\b', query.lower())
        
        # Filter out common stop words and very short words
        stop_words = {
            'a', 'o', 'e', 'de', 'da', 'do', 'em', 'um', 'uma', 'com', 'para', 'por', 'se', 'que', 
            'não', 'na', 'no', 'meu', 'minha', 'me', 'eu', 'você', 'seu', 'sua', 'está', 'estou',
            'qual', 'quem', 'onde', 'quando', 'como', 'porque', 'qual', 'meu', 'minha',
            'se', 'está', 'localizado', 'na', 'no', 'em', 'do', 'da', 'de', 'com', 'para', 'por'
        }
        
        # Keep meaningful words (longer than 2 characters and not stop words)
        meaningful_words = [word for word in words if len(word) > 2 and word not in stop_words]
        
        # Generate case variations for each meaningful word
        keywords = []
        for word in meaningful_words:
            # Add original word and common case variations
            variations = [
                word,  # original lowercase
                word.capitalize(),  # first letter uppercase
                word.upper(),  # all uppercase
            ]
            keywords.extend(variations)
        
        # Remove duplicates while preserving order
        unique_keywords = []
        seen = set()
        for keyword in keywords:
            if keyword not in seen:
                seen.add(keyword)
                unique_keywords.append(keyword)
        
        return unique_keywords

    def chat(self, 
             query: str, 
             k: int = 24, 
             score_threshold: Optional[float] = None) -> Dict[str, Any]:
        """
        Process a user's question and return a response
        
        Args:
            query (str): User's question
            k (int): Number of documents to search
            score_threshold (Optional[float]): Optional maximum distance threshold for filtering (lower is better)
            
        Returns:
            Dict[str, Any]: Response with detailed information
        """
        try:
            # Normalize the query
            normalized_query = unicodedata.normalize('NFC', query)
            
            logger.info(f"Processing question: '{normalized_query}'")
            
            # Search relevant documents using regular similarity search
            # relevant_docs = self.search_engine.similarity_search(
            #     normalized_query, 
            #     k=k, 
            #     score_threshold=score_threshold
            # )

            # Extract keywords for hybrid search
            keywords = self._extract_keywords(normalized_query)
            logger.info(f"Extracted keywords: {keywords}")
            
            # Search relevant documents using hybrid search
            if hasattr(self.search_engine, 'hybrid_search_with_keywords'):
                relevant_docs = self.search_engine.hybrid_search_with_keywords(
                    normalized_query, 
                    keywords=keywords,
                    k=k, 
                    score_threshold=score_threshold
                )
            else:
                # Fallback to regular search
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
                ai_response = "Desculpe, não consegui gerar uma resposta apropriada."
            
            # Prepare source information
            sources = []
            for doc in relevant_docs:
                source_info = {
                    "source": doc.metadata.get('source', 'Unknown source'),
                    "file_name": doc.metadata.get('file_name', 'N/A'),
                    "distance": doc.metadata.get('distance', 'N/A'),
                    "similarity": doc.metadata.get('similarity', 'N/A')
                }
                sources.append(source_info)
            
            # Determine confidence level using derived similarity if available
            similarities = [doc.metadata.get('similarity') for doc in relevant_docs if isinstance(doc.metadata.get('similarity'), (int, float))]
            if similarities:
                avg_similarity = sum(similarities) / len(similarities)
            else:
                # Fallback: try previous key or default
                scores = [doc.metadata.get('similarity_score', 0) for doc in relevant_docs]
                # If "similarity_score" was actually a distance, transform it
                avg_similarity = sum([1.0 / (1.0 + float(s)) if isinstance(s, (int, float)) else 0 for s in scores]) / len(scores) if scores else 0
            
            confidence = "high" if avg_similarity > 0.8 else "medium" if avg_similarity > 0.6 else "low"
            
            result = {
                "response": ai_response,
                "sources": sources,
                "confidence": confidence,
                "avg_score": avg_similarity,  # keep key name for compatibility; now represents similarity in [0,1]
                "documents_used": len(relevant_docs)
            }
            
            logger.info(f"Response generated with confidence: {confidence}")
            return result
            
        except Exception as e:
            logger.error(f"Error processing chat: {e}")
            return {
                "response": "Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.",
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

    def generate_challenges_and_questions(self, 
                                          topic: str, 
                                          difficulty: str, 
                                          type: str, 
                                          k: int = 10, 
                                          score_threshold: float = 0.7) -> Dict[str, Any]:
        """
        Generates a set of challenges and questions of contextualization based on the topic.
        """
        try:
            normalized_topic = unicodedata.normalize('NFC', topic)
            logger.info(f"Generating challenges for the topic: '{normalized_topic}' with difficulty '{difficulty}' and type '{type}'")

            # Use hybrid search for better accuracy with specific terms
            keywords = self._extract_keywords(normalized_topic)
            logger.info(f"Extracted keywords for challenge generation: {keywords}")

            if hasattr(self.search_engine, 'hybrid_search_with_keywords'):
                relevant_docs = self.search_engine.hybrid_search_with_keywords(
                    normalized_topic,
                    keywords=keywords,
                    k=k,
                    score_threshold=score_threshold
                )
            else:
                # Fallback to regular search
                relevant_docs = self.search_engine.similarity_search(
                    normalized_topic,
                    k=k,
                    score_threshold=score_threshold
                )

            if not relevant_docs:
                logger.warning("No relevant document found for challenge generation.")
                return {"error": f"I couldn't find enough information about the topic '{topic}' in the provided documents."}

            context = self._create_context_from_documents(relevant_docs)
            
            system_prompt = self._create_system_prompt_for_challenge()
            user_prompt = self._create_user_prompt_for_challenge(normalized_topic, difficulty, type, context)

            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                max_tokens=4096,
                temperature=self.temperature,
                response_format={"type": "json_object"}
            )

            ai_response = response.choices[0].message.content.strip() if response.choices and response.choices[0].message else "{}"
            
            import json
            try:
                challenge_data = json.loads(ai_response)
            except json.JSONDecodeError as e:
                logger.error(f"Error  Erro ao decodificar a resposta JSON: {e}")
                return {"error": "Erro ao processar a resposta do modelo de IA.", "raw_response": ai_response}

            sources = [{"file_name": doc.metadata.get('file_name', 'N/A')} for doc in relevant_docs]
            unique_sources = [dict(t) for t in {tuple(d.items()) for d in sources}]

            challenge_data["sources"] = unique_sources
            
            return challenge_data

        except Exception as e:
            logger.error(f"Erro ao gerar desafios: {e}")
            return {"error": f"Ocorreu um erro inesperado: {str(e)}"}

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
            
            question_result = self.generate_multiple_choice_question(topic)
            
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