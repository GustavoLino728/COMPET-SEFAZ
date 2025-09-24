"""
RAG Pipeline - Main module to integrate all RAG pipelines steps
"""

from .step1_extraction import DocumentExtractor
from .step2_chunking import DocumentChunker
from .step3_embedding import EmbeddingManager
from .step4_search import SearchEngine
from .step5_chat import RAGChatbot

from typing import List, Dict, Any, Optional
import logging
import os

logger = logging.getLogger(__name__)

class RAGPipeline:
    """Main class that integrates all the steps of the RAG pipeline"""
    
    def __init__(self, 
                 documents_path: str = "chatbot/app/data/sefaz_documents",
                 collection_name: str = "sefaz_docs",
                 persist_directory: str = "data/chroma_db",
                 chunk_size: int = 1000,
                 chunk_overlap: int = 200):
        """
        Initializes the RAG pipeline
        
        Args:
            documents_path (str): Path to the documents
            collection_name (str): Name of the collection in the vector store
            persist_directory (str): Directory to persist the vector store
            chunk_size (int): Size of the chunks
            chunk_overlap (int): Overlap between chunks
        """
        self.documents_path = documents_path
        self.collection_name = collection_name
        self.persist_directory = persist_directory
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        
        # Initializes components
        self.extractor = DocumentExtractor(documents_path)
        self.chunker = DocumentChunker(chunk_size, chunk_overlap)
        self.embedding_manager = EmbeddingManager(collection_name, persist_directory)
        
        # Components that will be initialized after processing
        self.search_engine = None
        self.chatbot = None
        
        logger.info("RAG pipeline initialized")
    
    def build_knowledge_base(self, force_rebuild: bool = False) -> bool:
        """
        Builds the complete knowledge base
        
        Args:
            force_rebuild (bool): Forces rebuild even if it already exists
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info("Starting knowledge base construction")
            
            # Checks if vector store already exists
            if not force_rebuild:
                vector_store_info = self.embedding_manager.get_vector_store_info()
                if vector_store_info.get("status") == "loaded":
                    logger.info("Vector store already exists, loading...")
                    vector_store = self.embedding_manager.load_vector_store()
                    if vector_store:
                        self.search_engine = SearchEngine(vector_store)
                        self.chatbot = RAGChatbot(self.search_engine)
                        logger.info("Knowledge base loaded successfully")
                        return True
            
            # Step 1: Extraction
            logger.info("Step 1: Extracting documents...")
            documents = self.extractor.extract_documents()
            if not documents:
                logger.error("No documents found to process")
                return False
            
            logger.info(f"Extracted {len(documents)} documents")
            
            # Step 2: Chunking
            logger.info("Step 2: Chunking documents...")
            chunks = self.chunker.chunk_documents(documents)
            if not chunks:
                logger.error("Error creating chunks of documents")
                return False
            
            logger.info(f"Created {len(chunks)} chunks")
            
            # Step 3: Embedding
            logger.info("Step 3: Creating embeddings and vector store...")
            vector_store = self.embedding_manager.create_vector_store(chunks)
            if not vector_store:
                logger.error("Error creating vector store")
                return False
            
            logger.info("Vector store created successfully")
            
            # Initializes search and chat components
            self.search_engine = SearchEngine(vector_store)
            self.chatbot = RAGChatbot(self.search_engine)
            
            logger.info("Knowledge base built successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error building knowledge base: {e}")
            return False
    
    def load_knowledge_base(self) -> bool:
        """
        Loads the existing knowledge base
        
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info("Loading existing knowledge base...")
            
            vector_store = self.embedding_manager.load_vector_store()
            if not vector_store:
                logger.error("Vector store not found")
                return False
            
            self.search_engine = SearchEngine(vector_store)
            self.chatbot = RAGChatbot(self.search_engine)
            
            logger.info("Knowledge base loaded successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error loading knowledge base: {e}")
            return False
    
    def chat(self, query: str, **kwargs) -> Dict[str, Any]:
        """
        Processes a user's question
        
        Args:
            query (str): User's question
            **kwargs: Additional arguments for the chat
            
        Returns:
            Dict[str, Any]: Chatbot's response
        """
        if not self.chatbot:
            return {
                "response": "Error: Knowledge base not loaded. Execute build_knowledge_base() first.",
                "sources": [],
                "confidence": "error"
            }
        
        return self.chatbot.chat(query, **kwargs)
    
    def search(self, query: str, **kwargs) -> List[Dict[str, Any]]:
        """
        Performs semantic search
        
        Args:
            query (str): Search query
            **kwargs: Additional arguments for the search
            
        Returns:
            List[Dict[str, Any]]: Search results
        """
        if not self.search_engine:
            logger.error("Search engine not initialized")
            return []
        
        documents = self.search_engine.similarity_search(query, **kwargs)
        
        results = []
        for doc in documents:
            result = {
                "content": doc.page_content,
                "source": doc.metadata.get('source', 'N/A'),
                "file_name": doc.metadata.get('file_name', 'N/A'),
                "score": doc.metadata.get('similarity_score', 'N/A'),
                "metadata": doc.metadata
            }
            results.append(result)
        
        return results
    
    def get_statistics(self) -> Dict[str, Any]:
        """
        Returns statistics of the pipeline
        
        Returns:
            Dict[str, Any]: Complete statistics
        """
        stats = {
            "documents_path": self.documents_path,
            "collection_name": self.collection_name,
            "persist_directory": self.persist_directory,
            "chunk_size": self.chunk_size,
            "chunk_overlap": self.chunk_overlap
        }
        
        # Vector store information
        vector_store_info = self.embedding_manager.get_vector_store_info()
        stats.update(vector_store_info)
        
        return stats
    
    def update_knowledge_base(self, new_documents_path: str = None) -> bool:
        """
        Updates the knowledge base with new documents
        
        Args:
            new_documents_path (str): Path to new documents
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            if new_documents_path:
                self.documents_path = new_documents_path
                self.extractor = DocumentExtractor(new_documents_path)
            
            # Extracts new documents
            new_documents = self.extractor.extract_documents()
            if not new_documents:
                logger.warning("No new documents found")
                return True
            
            # Chunks new documents
            new_chunks = self.chunker.chunk_documents(new_documents)
            
            # Updates vector store
            vector_store = self.embedding_manager.update_vector_store(new_chunks)
            if not vector_store:
                logger.error("Error updating vector store")
                return False
            
            # Updates components
            self.search_engine = SearchEngine(vector_store)
            self.chatbot = RAGChatbot(self.search_engine)
            
            logger.info("Knowledge base updated successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error updating knowledge base: {e}")
            return False

    def generate_challenges_and_questions(self, 
                                        topic: str, 
                                        difficulty: str,
                                        type: str,
                                        k: int = 10, 
                                        score_threshold: float = 0.7) -> Dict[str, Any]:
        """
        Generates a set of challenges and questions based on the topic, difficulty and type.
        
        Args:
            topic (str): Topic to generate the question.
            difficulty (str): Difficulty level (Easy, Medium, Hard).
            type (str): Type of challenge (Calculation, Discursive).
            k (int): Number of documents to search.
            score_threshold (float): Minimum similarity score.
            
        Returns:
            Dict[str, Any]: Challenges and questions generated.
        """

        if not self.chatbot:
            return {
                "error": "Knowledge base not loaded. Execute build_knowledge_base() or load_knowledge_base() first."
            }
        
        return self.chatbot.generate_challenges_and_questions(topic, difficulty, type, k, score_threshold)

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
        if not self.chatbot:
            return {
                "error": "Knowledge base not loaded. Execute build_knowledge_base() or load_knowledge_base() first.",
                "question": None,
                "options": None,
                "answer": None,
                "explanation": None,
                "sources": []
            }
        
        return self.chatbot.generate_multiple_choice_question(topic, k, score_threshold)

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
        if not self.chatbot:
            return {
                "error": "Knowledge base not loaded. Execute build_knowledge_base() or load_knowledge_base() first.",
                "questions": [],
                "total_questions": 0,
                "successful_questions": 0,
                "failed_questions": 0,
                "topics": topics
            }
        
        return self.chatbot.generate_quiz_set(topics, k, score_threshold)
