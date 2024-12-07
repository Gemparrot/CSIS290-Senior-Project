export type QuestionType = "radio" | "dropdown" | "text" | "number" | "yesno";

export interface Question {
  id: string;
  title?: string;
  subtitle?: string | null;
  type: 'radio' | 'dropdown' | 'text' | 'number' | 'yesno';
  options?: string[];
  required: boolean;
  min?: number;
  max?: number;
  conditionalField?: {
    condition: string;
    field: Question;
  };
}

export interface QuestionGroup {
  title: string;
  questions: Question[];
}

export interface FormSection {
  id: string;
  title: string;
  questions: (Question | QuestionGroup)[];
}