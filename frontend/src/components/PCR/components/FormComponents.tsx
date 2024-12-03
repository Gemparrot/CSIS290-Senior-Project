import React, { useState } from 'react';
import { Question } from '../types/FormConfig';

interface BaseInputProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

export const RadioGroup: React.FC<BaseInputProps> = ({ question, value, onChange }) => {
  const [conditionalValue, setConditionalValue] = useState('');

  const handleRadioChange = (option: string) => {
    onChange(option);
    if (question.conditionalField && option !== question.conditionalField.condition) {
      setConditionalValue('');
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        {question.title} {question.required && <span className="text-red-500">*</span>}
      </label>
      {question.subtitle && <p className="text-sm text-gray-500 mb-2">{question.subtitle}</p>}
      <div className="space-y-2">
        {question.options?.map((option) => (
          <div key={option} className="flex items-center border-b border-gray-200 py-2">
            <input
              type="radio"
              name={question.id}
              value={option}
              checked={value === option}
              onChange={() => handleRadioChange(option)}
              className="form-radio"
              required={question.required}
            />
            <span className="ml-2">{option}</span>
          </div>
        ))}
      </div>
      {question.conditionalField && value === question.conditionalField.condition && (
        <div className="mt-2">
          {renderFormInput(question.conditionalField.field, conditionalValue, setConditionalValue)}
        </div>
      )}
    </div>
  );
};

export const Dropdown: React.FC<BaseInputProps> = ({ question, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={question.id} className="block text-lg font-medium text-gray-700 mb-2">
      {question.title} {question.required && <span className="text-red-500">*</span>}
    </label>
    {question.subtitle && <p className="text-sm text-gray-500 mb-2">{question.subtitle}</p>}
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
    <label htmlFor={question.id} className="block text-lg font-medium text-gray-700 mb-2">
      {question.title} {question.required && <span className="text-red-500">*</span>}
    </label>
    {question.subtitle && <p className="text-sm text-gray-500 mb-2">{question.subtitle}</p>}
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

export const NumericInput: React.FC<BaseInputProps> = ({ question, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={question.id} className="block text-lg font-medium text-gray-700 mb-2">
      {question.title} {question.required && <span className="text-red-500">*</span>}
    </label>
    {question.subtitle && <p className="text-sm text-gray-500 mb-2">{question.subtitle}</p>}
    <input
      type="number"
      id={question.id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required={question.required}
      min={question.min}
      max={question.max}
    />
  </div>
);

export const YesNoInput: React.FC<BaseInputProps> = ({ question, value, onChange }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <label className="block text-lg font-medium text-gray-700">
          {question.title} {question.required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${value === 'Yes' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => onChange('Yes')}
          >
            Yes
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${value === 'No' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => onChange('No')}
          >
            No
          </button>
        </div>
      </div>
      {question.subtitle && <p className="text-sm text-gray-500 mt-2">{question.subtitle}</p>}
    </div>
  );
};

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
    case 'number':
      return <NumericInput question={question} value={value} onChange={onChange} />;
    case 'yesno':
      return <YesNoInput question={question} value={value} onChange={onChange} />;
    default:
      return null;
  }
};