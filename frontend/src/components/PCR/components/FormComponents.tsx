import React, { useState } from 'react';
import { Question } from '../types/FormConfig';
import { 
  ChevronDown, 
  CheckCircle2, 
  XCircle, 
} from 'lucide-react';

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
    <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4">
        <label className="block text-lg font-semibold text-gray-800">
          {question.title} 
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {question.subtitle && <p className="text-sm text-gray-500 mt-1">{question.subtitle}</p>}
      </div>
      <div className="px-4 pb-4 space-y-2">
        {question.options?.map((option) => (
          <label 
            key={option} 
            className={`
              flex items-center p-3 rounded-md cursor-pointer 
              transition-colors 
              ${value === option 
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
              }
            `}
          >
            <input
              type="radio"
              name={question.id}
              value={option}
              checked={value === option}
              onChange={() => handleRadioChange(option)}
              className="form-radio text-blue-600 focus:ring-blue-500 mr-3"
              required={question.required}
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      {question.conditionalField && value === question.conditionalField.condition && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          {renderFormInput(question.conditionalField.field, conditionalValue, setConditionalValue)}
        </div>
      )}
    </div>
  );
};

// The rest of the code remains the same as in the original file
export const Dropdown: React.FC<BaseInputProps> = ({ question, value, onChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor={question.id} className="block text-lg font-semibold text-gray-800 mb-2">
        {question.title} 
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {question.subtitle && <p className="text-sm text-gray-500 mb-3">{question.subtitle}</p>}
      <div className="relative">
        <select
          id={question.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            block w-full px-4 py-3 
            border border-gray-300 rounded-lg 
            text-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            appearance-none
          "
          required={question.required}
        >
          <option value="" className="text-gray-400">Select {question.title}</option>
          {question.options?.map((option) => (
            <option key={option} value={option} className="text-gray-700">
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <ChevronDown className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

// Include other input components and renderFormInput function from the original file
export const TextInput: React.FC<BaseInputProps> = ({ question, value, onChange }) => (
  <div className="mb-6">
    <label htmlFor={question.id} className="block text-lg font-semibold text-gray-800 mb-2">
      {question.title} 
      {question.required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {question.subtitle && <p className="text-sm text-gray-500 mb-3">{question.subtitle}</p>}
    <input
      type="text"
      id={question.id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        block w-full px-4 py-3 
        border border-gray-300 rounded-lg 
        text-gray-700 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      "
      required={question.required}
      placeholder={`Enter ${question.title}`}
    />
  </div>
);

export const NumericInput: React.FC<BaseInputProps> = ({ question, value, onChange }) => (
  <div className="mb-6">
    <label htmlFor={question.id} className="block text-lg font-semibold text-gray-800 mb-2">
      {question.title} 
      {question.required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {question.subtitle && <p className="text-sm text-gray-500 mb-3">{question.subtitle}</p>}
    <input
      type="number"
      id={question.id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        block w-full px-4 py-3 
        border border-gray-300 rounded-lg 
        text-gray-700 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      "
      required={question.required}
      min={question.min}
      max={question.max}
      placeholder={`Enter ${question.title}`}
    />
  </div>
);

export const YesNoInput: React.FC<BaseInputProps> = ({ question, value, onChange }) => {
  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-lg font-semibold text-gray-800">
          {question.title} 
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      {question.subtitle && <p className="text-sm text-gray-500 mb-3">{question.subtitle}</p>}
      <div className="flex space-x-4">
        <button
          type="button"
          className={`
            flex-1 py-3 rounded-lg 
            flex items-center justify-center 
            space-x-2 font-semibold 
            transition-colors duration-300
            ${value === 'Yes' 
              ? 'bg-green-500 text-white' 
              : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
            }
          `}
          onClick={() => onChange('Yes')}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Yes</span>
        </button>
        <button
          type="button"
          className={`
            flex-1 py-3 rounded-lg 
            flex items-center justify-center 
            space-x-2 font-semibold 
            transition-colors duration-300
            ${value === 'No' 
              ? 'bg-red-500 text-white' 
              : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
            }
          `}
          onClick={() => onChange('No')}
        >
          <XCircle className="w-5 h-5" />
          <span>No</span>
        </button>
      </div>
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