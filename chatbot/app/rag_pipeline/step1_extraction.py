"""
Extraction Module - Responsável por carregar documentos de diferentes fontes
"""

from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
import os
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)

class DocumentExtractor:
    """Class to extract documents"""
    
    def __init__(self, base_directory: str):
        """
        Initialize document extractor
        
        Args:
            base_directory (str): Directory where the documents are located
        """
        self.base_directory = base_directory
        
    def extract_pdfs(self) -> List[Document]:
        """
        Extract all PDFs from base_directory and subdirectories
        
        Returns:
            List[Document]: List of extracted documents
        """
        documents = []
        
        if not os.path.isdir(self.base_directory):
            logger.error(f"Diretório base não encontrado: {self.base_directory}")
            return documents
            
        logger.info(f"Iniciando extração de PDFs em: {self.base_directory}")
        
        # Recursively traverse the base directory
        for root, dirs, files in os.walk(self.base_directory):
            for file_name in files:
                if file_name.lower().endswith('.pdf'):
                    file_path = os.path.join(root, file_name)
                    try:
                        logger.info(f"Processando PDF: {file_path}")
                        
                        # Load the PDF document
                        loader = PyPDFLoader(file_path)
                        pdf_documents = loader.load()
                        
                        # Add additional metadata
                        for doc in pdf_documents:
                            doc.metadata.update({
                                'source': file_path,
                                'file_name': file_name,
                                'directory': root,
                                'document_type': 'pdf'
                            })
                        
                        documents.extend(pdf_documents)
                        logger.info(f"  - {len(pdf_documents)} páginas extraídas de {file_name}")
                        
                    except Exception as e:
                        logger.error(f"Erro ao processar arquivo {file_path}: {e}")
                        continue
        
        logger.info(f"Total de {len(documents)} documentos extraídos")
        return documents
    
    def extract_documents(self) -> List[Document]:
        """
        Main method to extract all supported documents
        
        Returns:
            List[Document]: List of all extracted documents
        """
        documents = []
        
        # Extract PDFs
        pdf_documents = self.extract_pdfs()
        documents.extend(pdf_documents)
        
        # Add other types of documents here, like .txt, .docx, etc.
        
        return documents

# Example usage
if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.INFO)
    
    test_dir = "chatbot/app/data/sefaz_documents"
    extractor = DocumentExtractor(test_dir)
    documents = extractor.extract_documents()
    
    print(f"Documentos extraídos: {len(documents)}")
    if documents:
        print(f"Primeiro documento: {documents[0].page_content[:200]}...")
        print(f"Metadados: {documents[0].metadata}") 