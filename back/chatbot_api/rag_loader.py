"""
RAG Pipeline Loader - Manages a single instance of the RAGPipeline
"""

import sys
import os
import logging
import shutil
from typing import Optional

# Add the chatbot module to the Python path
chatbot_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'chatbot', 'app')
sys.path.append(chatbot_path)

# Set the working directory to the project root for RAGPipeline
project_root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
os.chdir(project_root)

logger = logging.getLogger(__name__)

# Global variable to store the unique instance
_rag_pipeline_instance = None

def get_rag_pipeline():
    """
    Returns the unique instance of the RAGPipeline.
    If it doesn't exist, creates a new instance with forced rebuild.
    """
    global _rag_pipeline_instance
    
    if _rag_pipeline_instance is None:
        try:
            logger.info("Initializing RAGPipeline with OCR support...")
            
            # Import RAGPipeline
            from rag_pipeline.pipeline import RAGPipeline
            
            # Default settings
            documents_path = "/app/chatbot/app/data/sefaz_documents"
            
            # Check if the path exists
            logger.info(f"Checking path: {documents_path}")
            if not os.path.exists(documents_path):
                logger.warning(f"Path not found: {documents_path}")
                # Fallback to relative path
                documents_path = "chatbot/app/data/sefaz_documents/"
                logger.info(f"Trying relative path: {documents_path}")
                if not os.path.exists(documents_path):
                    logger.error(f"Relative path also not found: {documents_path}")
                    return None
            
            logger.info(f"Path found: {documents_path}")
            
            # List files in the directory for debug
            try:
                files = os.listdir(documents_path)
                logger.info(f"Files found in {documents_path}: {files}")
            except Exception as e:
                logger.error(f"Error listing files: {e}")
            
            # Force cleanup of existing vector store to ensure fresh rebuild with OCR
            persist_directory = os.path.join(project_root, "data", "chroma_db")
            if os.path.exists(persist_directory):
                logger.info(f"Removing existing vector store at {persist_directory}")
                try:
                    shutil.rmtree(persist_directory)
                    logger.info("Existing vector store removed successfully")
                except Exception as e:
                    logger.warning(f"Could not remove existing vector store: {e}")
            
            # Create the instance with updated parameters
            logger.info("Creating RAGPipeline instance with OCR support...")
            _rag_pipeline_instance = RAGPipeline(
                documents_path=documents_path,
                persist_directory=persist_directory,
                chunk_size=1000,
                chunk_overlap=200
            )
            
            # Build the knowledge base with force rebuild
            logger.info("Building knowledge base with OCR support...")
            success = _rag_pipeline_instance.build_knowledge_base(force_rebuild=True)
            
            if success:
                logger.info("✅ RAGPipeline initialized successfully with OCR support")
            else:
                logger.warning("⚠️ RAGPipeline could not be initialized completely")
                
        except Exception as e:
            logger.error(f"❌ Error initializing RAGPipeline: {e}")
            import traceback
            logger.error(f"Full traceback: {traceback.format_exc()}")
            _rag_pipeline_instance = None
    
    return _rag_pipeline_instance

def is_initialized():
    """Check if the RAGPipeline is initialized"""
    return _rag_pipeline_instance is not None

def reset_pipeline():
    """Reset the instance (useful for tests)"""
    global _rag_pipeline_instance
    _rag_pipeline_instance = None 