"""
RAG Pipeline Loader - Manages a single instance of the RAGPipeline
"""

import sys
import os
import logging
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
    If it doesn't exist, creates a new instance.
    """
    global _rag_pipeline_instance
    
    if _rag_pipeline_instance is None:
        try:
            logger.info("Initializing RAGPipeline...")
            
            # Import RAGPipeline
            from rag_pipeline.pipeline import RAGPipeline
            
            # Default settings
            documents_path = "/app/chatbot/app/data/sefaz_documents/proind"
            
            # Check if the path exists
            logger.info(f"Checking path: {documents_path}")
            if not os.path.exists(documents_path):
                logger.warning(f"Path not found: {documents_path}")
                # Fallback to relative path
                documents_path = "chatbot/app/data/sefaz_documents/proind"
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
            
            # Create the instance
            logger.info("Creating RAGPipeline instance...")
            _rag_pipeline_instance = RAGPipeline(documents_path=documents_path)
            
            # Build the knowledge base
            logger.info("Building knowledge base...")
            success = _rag_pipeline_instance.build_knowledge_base(force_rebuild=True)
            
            if success:
                logger.info("✅ RAGPipeline initialized successfully")
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