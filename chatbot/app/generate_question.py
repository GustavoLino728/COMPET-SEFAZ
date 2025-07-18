import os
from dotenv import load_dotenv, find_dotenv
from openai import OpenAI
from ingestion.pdf_processor import PDFProcessor

# Searches for .env starting from the current directory up to the root
load_dotenv(find_dotenv()) 

def generate_question_from_pdf_chunk(pdf_path: str, chunk_index: int = 0):
    """
    Generates a question from a specific chunk of a PDF document using OpenAI's chat model.

    Args:
        pdf_path (str): The path to the directory containing the PDF to be processed.
                        This path should be relative to the project root (COMPET-SEFAZ/).
        chunk_index (int): The index of the chunk to use for question generation (default is 0 for the first chunk).
    Returns:
        str: A generated question based on the PDF chunk, or an error message.
    """
    print(f"--- Starting Question Generation Proof of Concept ---")
    print(f"Processing PDFs from: {pdf_path}")

    # Step 1: Process PDFs to get chunks
    pdf_processor = PDFProcessor(base_pdf_directory=pdf_path)
    all_chunks = pdf_processor.load_and_split_pdfs()

    if not all_chunks:
        return "Error: No chunks found from the provided PDF path. Please ensure the PDF is valid and the path is correct."

    if chunk_index >= len(all_chunks) or chunk_index < 0:
        print(f"Warning: Chunk index {chunk_index} is out of bounds. Using the first chunk instead.")
        selected_chunk = all_chunks[0]
    else:
        selected_chunk = all_chunks[chunk_index]

    print(f"\nSelected chunk (index {chunk_index}):")
    print(selected_chunk.page_content + "...")
    print(f"Source: {selected_chunk.metadata.get('source')}, Page: {selected_chunk.metadata.get('page')}")

    # Step 2: Prepare prompt for OpenAI chat model
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    system_prompt = (
        "Com base exclusivamente no texto fornecido, gere uma questão. A questão deve avaliar a compreensão "
        "de um conceito-chave presente no texto. Forneça a questão e cinco opções de resposta (A, B, C, D, E)."
    )

    user_prompt = f"Com base no seguinte texto, crie uma questão com cinco opções de escolha:\n\n---\n{selected_chunk.page_content}\n---"

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

    print("\nSending request to OpenAI for question generation...")
    try:
        chat_completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.7,      # Adjust creativity as needed
            max_tokens=150        # Limit response length for just the question
        )
        question = chat_completion.choices[0].message.content
        print("\n--- Generated Question ---")
        print(question)
        print("--------------------------")
        return question
    except Exception as e:
        return f"Error generating question with OpenAI: {e}"

if __name__ == "__main__":
    # --- Configuration for Test ---
    # Path to your test PDFs relative to COMPET-SEFAZ/
    # Ensure you have real PDFs in this directory:
    # COMPET-SEFAZ/chatbot/app/ingestion/data_test/sefaz_documents_test/
    test_pdf_directory = "chatbot/app/ingestion/data_test/sefaz_documents_test"
    
    # You can change this index to select a different chunk if needed
    # For instance, if you want to test with a chunk from a specific page.
    chunk_to_use_index = 1

    generated_question = generate_question_from_pdf_chunk(
        pdf_path=test_pdf_directory,
        chunk_index=chunk_to_use_index
    )