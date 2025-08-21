"""
Chunking Module - Responsible for dividing documents into smaller chunks for processing
"""

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)

class DocumentChunker:
    """Class to divide documents into smaller chunks"""
    
    def __init__(self, 
                 chunk_size: int = 1500,
                 chunk_overlap: int = 200,
                 separators: List[str] = None):
        """
        Initialize document chunker
        
        Args:
            chunk_size (int): Maximum size of each chunk
            chunk_overlap (int): Overlap between consecutive chunks
            separators (List[str]): Separators to divide the text
        """
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        
        # Default separators if not provided
        if separators is None:
            separators = ["\n\n", "\n", " ", ""]
        
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
            separators=separators,
            is_separator_regex=False
        )
    
    def chunk_documents(self, documents: List[Document]) -> List[Document]:
        """
        Divide a list of documents into smaller chunks
        
        Args:
            documents (List[Document]): List of documents to divide
            
        Returns:
            List[Document]: List of document chunks
        """
        if not documents:
            logger.warning("No documents provided for chunking")
            return []
        
        logger.info(f"Starting chunking of {len(documents)} documents")

        
        all_chunks = []
        
        for i, doc in enumerate(documents):
            try:
                # Divide the document into chunks
                chunks = self.text_splitter.split_documents([doc])
                
                # Add specific chunking metadata
                for j, chunk in enumerate(chunks):
                    chunk.metadata.update({
                        'chunk_id': f"{i}_{j}",
                        'original_document_index': i,
                        'chunk_index': j,
                        'total_chunks_in_doc': len(chunks),
                        'chunk_size': len(chunk.page_content)
                    })
                
                if len(chunks) == 0:
                    logger.warning(
                        f"Document {i+1} produced 0 chunks | file_name={doc.metadata.get('file_name')} | source={doc.metadata.get('source')}"
                    )
                
                all_chunks.extend(chunks)
                logger.info(f"  - Document {i+1}: {len(chunks)} chunks created")
                
            except Exception as e:
                logger.error(f"Error chunking document {i}: {e}")
                continue
        
        logger.info(f"Total of {len(all_chunks)} chunks created")
        return all_chunks
    
    def chunk_single_document(self, document: Document) -> List[Document]:
        """
        Divide a single document into chunks
        
        Args:
            document (Document): Document to divide
            
        Returns:
            List[Document]: List of document chunks
        """
        return self.chunk_documents([document])
    
    def get_chunk_statistics(self, chunks: List[Document]) -> Dict[str, Any]:
        """
        Return statistics about the created chunks
        
        Args:
            chunks (List[Document]): List of chunks to analyze
            
        Returns:
            Dict[str, Any]: Statistics about the created chunks
        """
        if not chunks:
            return {}
        
        chunk_sizes = [len(chunk.page_content) for chunk in chunks]
        
        stats = {
            'total_chunks': len(chunks),
            'avg_chunk_size': sum(chunk_sizes) / len(chunk_sizes),
            'min_chunk_size': min(chunk_sizes),
            'max_chunk_size': max(chunk_sizes),
            'total_characters': sum(chunk_sizes)
        }
        
        return stats

# Usage example
if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.INFO)
    
    # Test with an example document
    from .step1_extraction import DocumentExtractor
    
    # Extract documents
    extractor = DocumentExtractor("chatbot/app/data/sefaz_documents")
    documents = extractor.extract_documents()
    
    if documents:
        # Chunk documents
        chunker = DocumentChunker(chunk_size=2000, chunk_overlap=200)
        chunks = chunker.chunk_documents(documents)
        
        # Show statistics
        stats = chunker.get_chunk_statistics(chunks)
        print(f"Statistics of chunks: {stats}")
        
        if chunks:
            print(f"\nPrimeiro chunk: {chunks[0].page_content[:200]}...")
            print(f"Metadados: {chunks[0].metadata}") 