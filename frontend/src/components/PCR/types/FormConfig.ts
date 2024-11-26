// ../PCR/types/FormConfig.ts
export type QuestionType = "radio" | "dropdown" | "text" | "number";

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
  required?: boolean;
}

export interface FormSection {
  id: string;
  title: string;
  questions: Question[];
}