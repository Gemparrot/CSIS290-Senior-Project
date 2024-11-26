// ../PCR/components/FormComponents.tsx
import React from 'react';
import { Question, QuestionType } from '../types/FormConfig';

interface BaseInputProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

export const RadioGroup: React.FC<BaseInputProps> = ({ question, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {question.title} {question.required && <span className="text-red-500">*</span>}
    </label>
    <div className="space-y-2">
      {question.options?.map((option) => (
        <label key={option} className="inline-flex items-center mr-4">
          <input
            type="radio"
            name={question.id}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="form-radio"
            required={question.required}
          />
          <span className="ml-2">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export const Dropdown: React.FC<BaseInputProps> = ({ question, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={question.id} className="block text-sm font-medium text-gray-700 mb-2">
      {question.title} {question.required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={question.id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      required={question.required}
    >
      <option value="">Select {question.title}</option>
      {question.options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export const TextInput: React.FC<BaseInputProps> = ({ question, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={question.id} className="block text-sm font-medium text-gray-700 mb-2">
      {question.title} {question.required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      id={question.id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required={question.required}
    />
  </div>
);

export const renderFormInput = (
  question: Question, 
  value: string, 
  onChange: (value: string) => void
) => {
  switch (question.type) {
    case 'radio':
      return <RadioGroup question={question} value={value} onChange={onChange} />;
    case 'dropdown':
      return <Dropdown question={question} value={value} onChange={onChange} />;
    case 'text':
      return <TextInput question={question} value={value} onChange={onChange} />;
    default:
      return null;
  }
};