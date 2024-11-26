// ../PCR/components/DynamicPCRForm.tsx
import React, { useState } from 'react';
import { FormSection } from '../types/FormConfig';
import { renderFormInput } from './FormComponents';
import { primaryAssessmentForm, bodyAssessmentForm } from '../data/PrimaryAssessment';

// Mapping of form sections
const formSections: { [key: string]: FormSection } = {
  'primary-assessment': primaryAssessmentForm,
  'body-assessment': bodyAssessmentForm
};

interface DynamicPCRFormProps {
  initialSection?: string;
  onSubmit?: (data: { [key: string]: string }) => void;
}

const DynamicPCRForm: React.FC<DynamicPCRFormProps> = ({ 
  initialSection = 'primary-assessment',
  onSubmit 
}) => {
  const [currentSection, setCurrentSection] = useState(initialSection);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const currentForm = formSections[currentSection];

  const handleInputChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const validateSection = () => {
    const errors: string[] = [];
    currentForm.questions.forEach(q => {
      if (q.required && (!formData[q.id] || formData[q.id].trim() === '')) {
        errors.push(`${q.title} is required`);
      }
    });
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const navigateToNextSection = () => {
    if (!validateSection()) return;

    const sectionKeys = Object.keys(formSections);
    const currentIndex = sectionKeys.indexOf(currentSection);
    
    if (currentIndex < sectionKeys.length - 1) {
      setCurrentSection(sectionKeys[currentIndex + 1]);
    } else {
      // Last section - submit or handle completion
      if (onSubmit) {
        onSubmit(formData);
      }
    }
  };

  const navigateToPreviousSection = () => {
    const sectionKeys = Object.keys(formSections);
    const currentIndex = sectionKeys.indexOf(currentSection);
    
    if (currentIndex > 0) {
      setCurrentSection(sectionKeys[currentIndex - 1]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">{currentForm.title}</h2>
      
      {validationErrors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form>
        {currentForm.questions.map(question => (
          <div key={question.id}>
            {renderFormInput(
              question, 
              formData[question.id] || '', 
              (value) => handleInputChange(question.id, value)
            )}
          </div>
        ))}

        <div className="flex justify-between mt-6">
          {currentSection !== Object.keys(formSections)[0] && (
            <button 
              type="button" 
              onClick={navigateToPreviousSection}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Previous
            </button>
          )}
          
          <button 
            type="button" 
            onClick={navigateToNextSection}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-auto"
          >
            {Object.keys(formSections)[Object.keys(formSections).length - 1] === currentSection 
              ? 'Submit' 
              : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicPCRForm;