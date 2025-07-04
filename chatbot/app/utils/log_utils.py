from datetime import datetime
import json

def log_api_response_to_file(response_data, filename="openai_response_log.txt"):
    """
    Helper function to redirect the full content of OpenAI API responses
    to a text file.

    Args:
        response_data: The full response object returned by the OpenAI API.
        filename (str): The name of the file where the response will be logged.
    """
    try:
        # Converts the response object to a serializable dictionary
        # and then to a formatted JSON string.
        # .model_dump_json() is the method for serializing Pydantic objects (like OpenAI responses)
        response_json_string = response_data.model_dump_json(indent=2)

        # Adds a timestamp for each log entry
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"--- API Response ({timestamp}) ---\n"
        log_entry += response_json_string
        log_entry += "\n-----------------------------------\n\n"

        # Opens the file in append mode ('a') and writes the content
        with open(filename, "a", encoding="utf-8") as f:
            f.write(log_entry)
        print(f"DEBUG: API response logged to '{filename}'")
    except Exception as e:
        print(f"LOG ERROR: Could not log API response: {e}")