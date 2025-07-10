import unicodedata
import re

def normalize_text(text):
    text = text.lower()
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8') # Remove accent marks
    text = re.sub(r'[^\w\s]', '', text) # Remove all that is not letters, numbers or blank spaces
    return text