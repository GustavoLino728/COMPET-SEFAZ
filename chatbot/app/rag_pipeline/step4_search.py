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
                        score_threshold: Optional[float] = None) -> List[Document]:
        """
        Perform similarity search
        
        Args:
            query (str): Query to be searched
            k (int): Maximum number of results
            score_threshold (Optional[float]): Optional maximum distance threshold (lower is better)
            
        Returns:
            List[Document]: List of relevant documents
        """
        if not self.vector_store:
            logger.error("Vector store not available for search")
            return []
        
        try:
            logger.info(f"Performing search for: '{query}'")
            
            # Perform similarity search;
            results = self.vector_store.similarity_search_with_score(
                query, 
                k=k
            )
            
            # Sort by ascending distance
            results = sorted(results, key=lambda pair: pair[1])
            
            # Filter by optional maximum distance threshold
            filtered_results = []
            for doc, distance in results:
                # Store both raw distance and a derived similarity for downstream usage
                doc.metadata['distance'] = distance
                doc.metadata['similarity'] = 1.0 / (1.0 + float(distance))
                
                if score_threshold is None or distance <= score_threshold:
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
                     score_threshold: Optional[float] = None) -> List[Document]:
        """
        Perform hybrid search (similarity + metadata)
        
        Args:
            query (str): Query to be searched
            metadata_filter (Optional[Dict[str, Any]]): Metadata filters
            k (int): Maximum number of results
            score_threshold (Optional[float]): Optional maximum distance threshold (lower is better)
            
        Returns:
            List[Document]: List of relevant documents
        """
        if not self.vector_store:
            logger.error("Vector store not available for search")
            return []
        
        try:
            logger.info(f"Performing hybrid search for: '{query}'")
            
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
            
            # Sort by ascending distance
            results = sorted(results, key=lambda pair: pair[1])
            
            # Filter by optional maximum distance threshold
            filtered_results = []
            for doc, distance in results:
                doc.metadata['distance'] = distance
                doc.metadata['similarity'] = 1.0 / (1.0 + float(distance))
                if score_threshold is None or distance <= score_threshold:
                    filtered_results.append(doc)
            
            logger.info(f"Found {len(filtered_results)} relevant documents")
            return filtered_results
            
        except Exception as e:
            logger.error(f"Error in hybrid search: {e}")
            return []
    
    def hybrid_search_with_keywords(self, 
                                  query: str, 
                                  keywords: List[str] = None,
                                  k: int = 16, 
                                  score_threshold: Optional[float] = None) -> List[Document]:
        """
        Perform hybrid search combining semantic and keyword search
        
        Args:
            query (str): Query to be searched
            keywords (List[str]): Additional keywords to search for
            k (int): Maximum number of results
            score_threshold (Optional[float]): Optional maximum distance threshold (ignored for hybrid search)
            
        Returns:
            List[Document]: List of relevant documents
        """
        if not self.vector_store:
            logger.error("Vector store not available for search")
            return []
        
        try:
            logger.info(f"Performing hybrid search for: '{query}' with keywords: {keywords}")
            
            # First, do semantic search without threshold filtering
            semantic_results = self.similarity_search(query, k=k//2, score_threshold=None)
            
            # Then, do keyword search if keywords provided (also without threshold filtering)
            keyword_results = []
            if keywords:
                for keyword in keywords:
                    keyword_docs = self.similarity_search(keyword, k=k//4, score_threshold=None)
                    keyword_results.extend(keyword_docs)
            
            # Combine all results
            all_results = semantic_results + keyword_results
            
            # Less aggressive deduplication - only remove exact duplicates
            seen_contents = set()
            unique_results = []
            for doc in all_results:
                # Use a more lenient hash to avoid removing similar but different chunks
                content_hash = hash(doc.page_content[:50])  # Use first 50 chars as hash
                if content_hash not in seen_contents:
                    seen_contents.add(content_hash)
                    unique_results.append(doc)
            
            # Score chunks based on relevance to user query
            scored_results = []
            for doc in unique_results:
                score = self._calculate_chunk_relevance_score(doc, query, keywords)
                scored_results.append((doc, score))
            
            # Sort by relevance score (higher is better)
            scored_results.sort(key=lambda x: x[1], reverse=True)
            
            # Take top k results
            final_results = [doc for doc, score in scored_results[:k]]
            
            logger.info(f"Found {len(final_results)} unique documents (semantic: {len(semantic_results)}, keyword: {len(keyword_results)})")
            return final_results
            
        except Exception as e:
            logger.error(f"Error in hybrid search: {e}")
            return []
    
    def _calculate_chunk_relevance_score(self, doc: Document, query: str, keywords: List[str] = None) -> float:
        """
        Calculate a relevance score for a chunk based on multiple factors
        
        Args:
            doc (Document): The document chunk to score
            query (str): Original user query
            keywords (List[str]): Keywords extracted from the query
            
        Returns:
            float: Relevance score (higher is better)
        """
        content_lower = doc.page_content.lower()
        query_lower = query.lower()
        
        # Base score from similarity (normalize to 0-1 range)
        similarity = doc.metadata.get('similarity', 0)
        base_score = float(similarity) if similarity else 0.0
        
        # Keyword presence bonus
        keyword_bonus = 0.0
        if keywords:
            # Count how many keywords are present in this chunk
            keyword_matches = sum(1 for keyword in keywords if keyword.lower() in content_lower)
            # Bonus increases with more keyword matches
            keyword_bonus = min(0.5, keyword_matches * 0.1)  # Max 0.5 bonus
        
        # Query term density bonus
        query_terms = query_lower.split()
        query_term_matches = sum(1 for term in query_terms if len(term) > 2 and term in content_lower)
        query_density_bonus = min(0.3, query_term_matches * 0.05)  # Max 0.3 bonus
        
        # Exact phrase match bonus
        exact_phrase_bonus = 0.0
        if query_lower in content_lower:
            exact_phrase_bonus = 0.4  # High bonus for exact phrase matches
        
        # Combine all scores
        total_score = base_score + keyword_bonus + query_density_bonus + exact_phrase_bonus
        
        return total_score
    
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