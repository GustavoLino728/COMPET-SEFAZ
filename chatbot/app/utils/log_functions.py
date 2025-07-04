import os
import logging
from logging.handlers import RotatingFileHandler

logger = logging.getLogger('openai_api_logger')
logger.setLevel(logging.INFO) # Change to DEBUG if needed

# Log message format
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s\n\n')

def setup_logger_handler(filename="openai_response_log.txt", max_bytes=5*1024*1024, backup_count=5):
    """
    Configures the rotating file handler for the logger.
    Args:
        filename (str): The base name of the log file.
        max_bytes (int): The maximum size of the log file in bytes before rotation (e.g., 5MB).
        backup_count (int): The number of backup files to keep.
    """
    # Remove existing handlers to avoid duplication if the function is called multiple times
    if logger.handlers:
        for handler in logger.handlers:
            logger.removeHandler(handler)

    log_directory = os.path.dirname(filename)
    if log_directory and not os.path.exists(log_directory):
        os.makedirs(log_directory, exist_ok=True)

    # Create a rotating file handler
    # maxBytes: maximum file size before rotation (here 5MB)
    # backupCount: number of backup files to keep (here 5 files)
    file_handler = RotatingFileHandler(filename, maxBytes=max_bytes, backupCount=backup_count, encoding="utf-8")
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

def log_AI_api_response_to_file(response_data, filename="openai_response_log.txt"):
    """
    Helper function to log the full content of OpenAI API responses using Python's logging module.

    Args:
        response_data: The full response object returned by the OpenAI API.
        filename (str): The name of the file where the response will be logged.
    """
    try:
        # This is important if the filename might change between calls
        setup_logger_handler(filename=filename)

        # Converts the response object to a formatted JSON string.
        response_json_string = response_data.model_dump_json(indent=2)

        # Logs the complete response as an INFO message
        logger.info(response_json_string)
        print(f"DEBUG: API response logged to '{filename}' (via logging module)")
    except Exception as e:
        print(f"LOG ERROR: Could not log API response to '{filename}': {e}")

# Initial logger configuration when the module is loaded
# This ensures the logger is ready even before the first call to the log function.
setup_logger_handler(filename=os.path.join("logs", "openai_response_log.txt"))