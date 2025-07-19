# chatbot/ingestion/vector_store_manager.py

from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
import os
from dotenv import load_dotenv, find_dotenv

# Load environment variables (for OpenAI API key)
# Search for .env file starting from the current directory up to the root
load_dotenv(find_dotenv()) 

class VectorStoreManager:
    def __init__(self, collection_name="icms_docs", persist_directory="data/chroma_db"):
        self.collection_name = collection_name
        self.persist_directory = os.path.join(os.getcwd(), persist_directory) 
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
        
        os.makedirs(self.persist_directory, exist_ok=True)
        print(f"ChromaDB will persist data in: {self.persist_directory}")

    def create_and_persist_vector_store(self, chunks: list[Document]):
        if not chunks:
            print("No chunks provided to create the vector store. Exiting.")
            return

        print(f"Creating ChromaDB vector store with {len(chunks)} chunks...")
        try:
            vector_store = Chroma.from_documents(
                documents=chunks,
                embedding=self.embeddings,
                collection_name=self.collection_name,
                persist_directory=self.persist_directory
            )
            vector_store.persist()
            print(f"Vector store '{self.collection_name}' created and persisted successfully.")
        except Exception as e:
            print(f"Error creating or persisting vector store: {e}")

    def load_vector_store(self):
        print(f"Attempting to load vector store from: {self.persist_directory} with collection: {self.collection_name}")
        try:
            vector_store = Chroma(
                persist_directory=self.persist_directory,
                embedding_function=self.embeddings, # Note: For loading, ensure this matches the embedding function used for creation
                collection_name=self.collection_name
            )
            print("Vector store loaded successfully.")
            return vector_store
        except Exception as e:
            print(f"Error loading vector store: {e}")
            return None

# Example usage (for module testing only)
if __name__ == "__main__":
    from pdf_processor import PDFProcessor 

    test_pdf_data_path = "chatbot/app/ingestion/data_test/sefaz_documents_test" 
    
    pdf_processor = PDFProcessor(base_pdf_directory=test_pdf_data_path)
    all_chunks = pdf_processor.load_and_split_pdfs() # Renomeado para 'all_chunks'

    if all_chunks:
        # --- NOVIDADE: Selecionar um número menor de chunks para teste ---
        # Opção 1: Pegar apenas o primeiro chunk
        chunks_for_test = [all_chunks[0]] 
        
        # Opção 2: Pegar os primeiros 5 chunks (ou qualquer número que desejar)
        # chunks_for_test = all_chunks[:5] # Pega os 5 primeiros chunks
        
        # Opção 3: Pegar um chunk específico pelo índice (ex: o 10º chunk)
        # if len(all_chunks) > 9: # Verifica se existe pelo menos 10 chunks
        #     chunks_for_test = [all_chunks[9]]
        # else:
        #     chunks_for_test = all_chunks[:1] # Se não tiver 10, pega o primeiro
        
        print(f"\nUsing {len(chunks_for_test)} selected chunks for vector store creation test.")
        
        # --- Step 2: Create and Persist Vector Store with selected chunks ---
        vector_store_manager = VectorStoreManager() 
        vector_store_manager.create_and_persist_vector_store(chunks_for_test) # Passa os chunks selecionados

        # --- Step 3: Load and Test Search (Optional, but good for verification) ---
        print("\nTesting vector store retrieval:")
        # After creation, the vector store should be available to load
        loaded_vector_store = vector_store_manager.load_vector_store()
        if loaded_vector_store:
            query = "ICMS não cumulatividade"
            print(f"Searching for: '{query}'")
            relevant_docs = loaded_vector_store.similarity_search(query, k=2) 

            print(f"\nFound {len(relevant_docs)} relevant documents for '{query}':")
            for i, doc in enumerate(relevant_docs):
                print(f"--- Document {i+1} ---") 
                print(doc.page_content[:500] + "...") 
                print(f"Source: {doc.metadata.get('source')}, Page: {doc.metadata.get('page')}")
                print("-" * 20)
        else:
            print("Failed to load vector store for retrieval test.")
    else:
        print("No chunks available to create the vector store. Please check your PDF processing.")