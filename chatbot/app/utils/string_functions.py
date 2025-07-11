import unicodedata
import re
from rapidfuzz import fuzz
from data.learning_paths_keywords_enum import LearningPath, LEARNING_PATHS_KEYWORDS

# Remove accent marks and all that is not letters, numbers and blank spaces
def normalize_text(text: str):
    text = text.lower()
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = re.sub(r'[^\w\s]', '', text)
    return text

# Identifies the most relevant Learning Paths based on the user's prompt
def get_most_relevant_knowledge_paths(user_prompt: str, word_threshold: int = 70, min_path_score: int = 100):
    """
    Args:
        user_prompt (str): User's prompt
        word_threshold (int): Similarity score of a prompt word to be considered as equivalent to LearningPath keywords
        min_path_score (int): Min. score for a path to be suggested / returned

    Returns:
        list[LearningPath] or []
    """
    normalized_prompt = normalize_text(user_prompt)
    prompt_words = normalized_prompt.split()

    path_scores = {path: 0 for path in LearningPath}

    normalized_keywords = {
        path_name: [normalize_text(kw) for kw in keywords]
        for path_name, keywords in LEARNING_PATHS_KEYWORDS.items()
    }

    # For didatic purposes, the code above is equivalent to:
    # normalized_keywords = {}
    # for path_name, keywords_list in LEARNING_PATHS_KEYWORDS.items():
    #     normalized_list_for_path = []

    #     for keyword in keywords_list:
    #         normalized_keyword = normalize_text(keyword)
    #         normalized_list_for_path.append(normalized_keyword)

    #     normalized_keywords[path_name] = normalized_list_for_path

    for learning_path_obj in LearningPath:
        path_key_string = learning_path_obj.value
        keywords_for_current_path = normalized_keywords.get(path_key_string, [])

        for prompt_word in prompt_words:
            for keyword_in_path in keywords_for_current_path:
                score = fuzz.ratio(prompt_word, keyword_in_path)

                if score >= word_threshold:
                    path_scores[learning_path_obj] += score
                    break

    relevant_paths = []
    for path, score in path_scores.items():
        if score >= min_path_score:
            relevant_paths.append(path)

    # Sort by score
    relevant_paths.sort(key=lambda p: path_scores[p], reverse=True)

    return relevant_paths