export interface Challenge {
  id: number;
  title: string;
  questions: number;
  description: string;
}

export interface QuizQuestion {
  id: number;
  type: 'multiple-choice' | 'essay' | 'problem';
  question: string;
  options?: string[];
  correctAnswerIndex?: number;
  correctAnswer?: number;
  justification: string;
}


export interface BackendChallenge {
  id: number;
  title: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  status: 'PENDING' | 'APPROVED';
  track: number;
  track_name: string;
  program_name: string;
  sources: BackendSource[];
  problem_questions: ProblemQuestion[];
  discursive_questions: DiscursiveQuestion[];
  multiple_choice_questions: MultipleChoiceQuestion[];
}

export interface BackendSource {
  id: number;
  file_name: string;
  description?: string;
}

export interface ProblemQuestion {
  id: number;
  challenge: number;
  statement: string;
  correct_answer: number;
  justification?: string;
}

export interface DiscursiveQuestion {
  id: number;
  challenge: number;
  statement: string;
  answer_text: string;
  justification?: string;
}

export interface MultipleChoiceQuestion {
  id: number;
  challenge: number;
  statement: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_option: 'A' | 'B' | 'C' | 'D' | 'E';
  justification?: string;
}