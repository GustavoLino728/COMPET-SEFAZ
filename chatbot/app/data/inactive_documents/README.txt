#############################################################
# About the 'inactive_documents' Directory
#############################################################

## Purpose

This directory serves as a temporary holding area for official documents that are part of the project's scope but are not the current priority for development.


## Why This Directory Exists

The data processing pipeline — which includes text extraction, chunking, and creating embeddings for the RAG system — is a time-consuming process when run on the entire document set.

To improve agility and speed up our development cycles, documents that are not immediately required for testing and implementation have been moved here.


## How It Works

Files and folders within this `inactive_documents` directory are **intentionally excluded** from the automated data ingestion pipeline.

This ensures that our builds and tests run quickly, focusing only on the active and prioritized set of documents located in the main `sefaz_documents` directory.


## Future Plans

These documents are considered our "knowledge backlog." They will be processed and integrated into the system's knowledge base in the future as priorities shift.

To activate a set of documents, simply move its folder from here back into the parent directory before running the data processing workflow.