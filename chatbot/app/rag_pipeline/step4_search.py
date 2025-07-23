"""
Search Module - Responsible for performing semantic searches in the vector store
"""

from langchain_core.documents import Document
from typing import List, Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)

class SearchEngine:
    """Class to perform semantic searches in the vector store"""
    
    def __init__(self, vector_store):
        """
        Initialize the search engine
        
        Args:
            vector_store: Loaded vector store (Chroma)
        """
        self.vector_store = vector_store
    
    def similarity_search(self, 
                        query: str, 
                        k: int = 4, 
                        score_threshold: float = 0.7) -> List[Document]:
        """
        Perform similarity search
        
        Args:
            query (str): Query to be searched
            k (int): Maximum number of results
            score_threshold (float): Minimum similarity score
            
        Returns:
            List[Document]: List of relevant documents
        """
        if not self.vector_store:
            logger.error("Vector store not available for search")
            return []
        
        try:
            logger.info(f"Performing search for: '{query}'")
            
            # Perform similarity search
            results = self.vector_store.similarity_search_with_score(
                query, 
                k=k
            )
            
            # Filter by score threshold
            filtered_results = []
            for doc, score in results:
                if score >= score_threshold:
                    doc.metadata['similarity_score'] = score
                    filtered_results.append(doc)
            
            logger.info(f"Found {len(filtered_results)} relevant documents")
            return filtered_results
            
        except Exception as e:
            logger.error(f"Error in similarity search: {e}")
            return []
    
    def search_by_metadata(self, 
                          metadata_filter: Dict[str, Any], 
                          k: int = 10) -> List[Document]:
        """
        Search documents by metadata filters
        
        Args:
            metadata_filter (Dict[str, Any]): Metadata filters
            k (int): Maximum number of results
            
        Returns:
            List[Document]: List of documents that meet the filters
        """
        if not self.vector_store:
            logger.error("Vector store not available for search")
            return []
        
        try:
            logger.info(f"Searching by metadata: {metadata_filter}")
            
            # Search with metadata filters
            results = self.vector_store.similarity_search(
                "",  # Empty query for metadata-only search
                k=k,
                filter=metadata_filter
            )
            
            logger.info(f"Found {len(results)} documents with the specified filters")
            return results
            
        except Exception as e:
            logger.error(f"Error in metadata search: {e}")
            return []
    
    def hybrid_search(self, 
                     query: str, 
                     metadata_filter: Optional[Dict[str, Any]] = None,
                     k: int = 4, 
                     score_threshold: float = 0.7) -> List[Document]:
        """
        Perform hybrid search (similarity + metadata)
        
        Args:
            query (str): Query to be searched
            metadata_filter (Optional[Dict[str, Any]]): Metadata filters
            k (int): Maximum number of results
            score_threshold (float): Minimum similarity score
            
        Returns:
            List[Document]: List of relevant documents
        """
        if not self.vector_store:
            logger.error("Vector store not available for search")
            return []
        
        try:
            logger.info(f"Performing hybrid search for: '{query}'")
            
            # Hybrid search
            if metadata_filter:
                results = self.vector_store.similarity_search_with_score(
                    query, 
                    k=k,
                    filter=metadata_filter
                )
            else:
                results = self.vector_store.similarity_search_with_score(
                    query, 
                    k=k
                )
            
            # Filter by score threshold
            filtered_results = []
            for doc, score in results:
                if score >= score_threshold:
                    doc.metadata['similarity_score'] = score
                    filtered_results.append(doc)
            
            logger.info(f"Found {len(filtered_results)} relevant documents")
            return filtered_results
            
        except Exception as e:
            logger.error(f"Error in hybrid search: {e}")
            return []
    
    def get_search_statistics(self, query: str) -> Dict[str, Any]:
        """
        Return search statistics
        
        Args:
            query (str): Query to get statistics
            
        Returns:
            Dict[str, Any]: Search statistics
        """
        results = self.similarity_search(query, k=10)
        
        if not results:
            return {"total_results": 0}
        
        scores = [doc.metadata.get('similarity_score', 0) for doc in results]
        
        stats = {
            "total_results": len(results),
            "avg_score": sum(scores) / len(scores) if scores else 0,
            "min_score": min(scores) if scores else 0,
            "max_score": max(scores) if scores else 0,
            "query": query
        }
        
        return stats

# Example usage
if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.INFO)
    
    # Test with example vector store
    from .step3_embedding import EmbeddingManager
    
    # Load the vector store
    embedding_manager = EmbeddingManager()
    vector_store = embedding_manager.load_vector_store()
    
    if vector_store:
        # Create the search engine
        search_engine = SearchEngine(vector_store)
        
        # Test different types of search
        queries = [
            "Cerâmica vermelha",
            "cacul e atualizacao de crédito prsesumdo",
        ]

        for query in queries:
            print(f"\n=== Search for: '{query}' ===")
            results = search_engine.similarity_search(query, k=3)
            
            for i, doc in enumerate(results):
                print(f"--- Result {i+1} ---")
                print(f"Score: {doc.metadata.get('similarity_score', 'N/A')}")
                print(doc.page_content + "...")
                print(f"Source: {doc.metadata.get('source', 'N/A')}")
                print("-" * 50) 