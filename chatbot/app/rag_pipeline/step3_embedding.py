"""
Embedding Module - Responsible for creating embeddings and managing the vector store
"""
# from langchain_openai import OpenAIEmbeddings
# Free alternative to OpenAIEmbeddings
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
from typing import List, Dict, Any, Optional
import os
import logging
from dotenv import load_dotenv

# Uncomment to use with OpenAIEmbeddings
# load_dotenv()

logger = logging.getLogger(__name__)

class EmbeddingManager:
    """Class to manage embeddings and vector store"""
    
    def __init__(self, 
                 collection_name: str = "sefaz_docs",
                 persist_directory: str = "data/chroma_db",
                 embedding_model: str = "neuralmind/bert-base-portuguese-cased"):
        """
        Initialize the embedding manager
        
        Args:
            collection_name (str): Name of the collection in the vector store
            persist_directory (str): Directory to persist the vector store
            embedding_model (str): Embedding model to be used
        """
        self.collection_name = collection_name
        self.persist_directory = persist_directory
        self.embedding_model = embedding_model
        
        # Create the persistence directory if it doesn't exist
        os.makedirs(self.persist_directory, exist_ok=True)
        
        # Uncomment to use OpenAI embedding model
        # try:
        #     self.embeddings = OpenAIEmbeddings(model=embedding_model)
        #     logger.info(f"Modelo de embedding inicializado: {embedding_model}")
        
        try:
            self.embeddings = HuggingFaceEmbeddings(
                model_name=self.embedding_model,
                model_kwargs={'device': 'cpu'} # Force CPU usage
            )
            logger.info(f"Local embedding model initialized: {self.embedding_model}")
        except Exception as e:
            logger.error(f"Error initializing embedding model: {e}")
            raise
    
    def create_vector_store(self, chunks: List[Document]) -> Optional[Chroma]:
        """
        Create a new vector store with the provided chunks
        
        Args:
            chunks (List[Document]): List of chunks to create embeddings
            
        Returns:
            Optional[Chroma]: Vector store created or None if there is an error
        """
        if not chunks:
            logger.warning("No chunks provided to create vector store")
            return None
        
        logger.info(f"Creating vector store with {len(chunks)} chunks")
        
        try:
            vector_store = Chroma.from_documents(
                documents=chunks,
                embedding=self.embeddings,
                collection_name=self.collection_name,
                persist_directory=self.persist_directory
            )
            
            logger.info(f"Vector store '{self.collection_name}' created and persisted successfully")
            
            return vector_store
            
        except Exception as e:
            logger.error(f"Error creating vector store: {e}")
            return None
    
    def load_vector_store(self) -> Optional[Chroma]:
        """
        Load an existing vector store
        
        Returns:
            Optional[Chroma]: Vector store loaded or None if there is an error
        """
        logger.info(f"Loading vector store from: {self.persist_directory}")
        
        try:
            vector_store = Chroma(
                persist_directory=self.persist_directory,
                embedding_function=self.embeddings,
                collection_name=self.collection_name
            )
            
            logger.info("Vector store loaded successfully")
            return vector_store
            
        except Exception as e:
            logger.error(f"Error loading vector store: {e}")
            return None
    
    def update_vector_store(self, new_chunks: List[Document]) -> Optional[Chroma]:
        """
        Update the existing vector store with new chunks
        
        Args:
            new_chunks (List[Document]): New chunks to add
            
        Returns:
            Optional[Chroma]: Updated vector store or None if there is an error
        """
        if not new_chunks:
            logger.warning("No new chunks provided to update")
            return None
        
        # Load the existing vector store
        vector_store = self.load_vector_store()
        
        if vector_store is None:
            logger.info("Vector store not found, creating new")
            return self.create_vector_store(new_chunks)
        
        logger.info(f"Adding {len(new_chunks)} new chunks to vector store")
        
        try:
            # Add the new chunks
            vector_store.add_documents(new_chunks)
            
            logger.info("Vector store updated successfully")
            return vector_store
            
        except Exception as e:
            logger.error(f"Error updating vector store: {e}")
            return None
    
    def get_vector_store_info(self) -> Dict[str, Any]:
        """
        Return information about the vector store
        
        Returns:
            Dict[str, Any]: Information about the vector store
        """
        vector_store = self.load_vector_store()
        
        if vector_store is None:
            return {"status": "not_found"}
        
        try:
            # Try to get information about the collection
            collection = vector_store._collection
            count = collection.count()
            
            info = {
                "status": "loaded",
                "collection_name": self.collection_name,
                "persist_directory": self.persist_directory,
                "embedding_model": self.embedding_model,
                "document_count": count
            }
            
            return info
            
        except Exception as e:
            logger.error(f"Error getting information about the vector store: {e}")
            return {"status": "error", "error": str(e)}

# Example usage
if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.INFO)
    
    # Test with example chunks
    from .step1_extraction import DocumentExtractor
    from .step2_chunking import DocumentChunker
    
    # Extract and chunk documents
    extractor = DocumentExtractor("chatbot/app/data/sefaz_documents/proind")
    documents = extractor.extract_documents()
    
    if documents:
        chunker = DocumentChunker(chunk_size=2000, chunk_overlap=200)
        chunks = chunker.chunk_documents(documents)
        
        if chunks:
            # Create the vector store
            embedding_manager = EmbeddingManager()
            vector_store = embedding_manager.create_vector_store(chunks)
            
            if vector_store:
                # Test search
                query = "cerâmica vermelha"
                results = vector_store.similarity_search(query, k=3)
                
                print(f"\nResultados para '{query}':")
                for i, doc in enumerate(results):
                    print(f"--- Documento {i+1} ---")
                    print(doc.page_content + "...")
                    print(f"Fonte: {doc.metadata.get('source', 'N/A')}")
                    print("-" * 50) 