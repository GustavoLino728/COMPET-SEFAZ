# chatbot/ingestion/pdf_processor.py

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os

class PDFProcessor:
    def __init__(self, base_pdf_directory): # Removed default, will be passed explicitly
        """
        Initializes the PDF processor.
        Args:
            base_pdf_directory (str): The base directory where theme/subject folders containing PDFs are located.
                                      This path should be relative to the Python script's current working directory.
        """
        self.base_pdf_directory = base_pdf_directory

    def load_and_split_pdfs(self):
        """
        Recursively loads all PDFs from the specified base directory,
        extracts their text, and splits it into chunks.
        Returns:
            list: A list of Document objects, where each Document represents a chunk.
        """
        documents = []
        
        if not os.path.isdir(self.base_pdf_directory):
            print(f"The base directory was not found: {self.base_pdf_directory}")
            return []

        print(f"Starting scan in: {self.base_pdf_directory}")
        
        # Walks through the base directory and its subdirectories recursively
        for root, dirs, files in os.walk(self.base_pdf_directory):
            for file_name in files:
                if file_name.endswith('.pdf'):
                    file_path = os.path.join(root, file_name)
                    print(f"Processing PDF: {file_path}")
                    try:
                        # Loads the PDF document
                        loader = PyPDFLoader(file_path)
                        data = loader.load()

                        # Splits the document into smaller chunks
                        # chunk_size and chunk_overlap parameters can be adjusted
                        # to optimize chunk quality for your content.
                        text_splitter = RecursiveCharacterTextSplitter(
                            chunk_size=850,
                            chunk_overlap=200,
                            length_function=len,
                            is_separator_regex=False,
                        )
                        chunks = text_splitter.split_documents(data)
                        documents.extend(chunks)
                        print(f"  - {len(chunks)} chunks generated for {file_name}")

                    except Exception as e:
                        print(f"Error processing file {file_path}: {e}")
                        continue
        
        print(f"Total of {len(documents)} chunks generated from all found PDFs.")
        return documents

# Example usage (for module testing only)
if __name__ == "__main__":
    # --- Test Setup ---
    # When running pdf_processor.py directly, its CWD is chatbot/ingestion/
    # So, the path for test data needs to be relative to chatbot/ingestion/
    # The test data is in chatbot/ingestion/data_test/sefaz_documents_test/
    
    test_base_dir_for_direct_run = "data_test/sefaz_documents_test" 
    
    # Ensure this path matches your test PDFs actual location relative to this script
    os.makedirs(os.path.join(test_base_dir_for_direct_run, "feef"), exist_ok=True)
    os.makedirs(os.path.join(test_base_dir_for_direct_run, "general_content"), exist_ok=True)

    processor = PDFProcessor(base_pdf_directory=test_base_dir_for_direct_run)
    chunks = processor.load_and_split_pdfs()

    if chunks:
        print("\nFirst chunk example:")
        print(chunks[0].page_content)
        print(f"\nMetadata of the first chunk: {chunks[0].metadata}")
        if len(chunks) > 1:
            print("\nSecond chunk example:")
            print(chunks[1].page_content)
            print(f"\nMetadata of the second chunk: {chunks[1].metadata}")
    
    # --- Cleanup (uncomment to remove test files after execution) ---
    # import shutil
    # shutil.rmtree("data_test")