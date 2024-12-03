import React, { useState, useEffect } from 'react';
import { Question, QuestionGroup, FormSection } from '../types/FormConfig';
import { renderFormInput } from './FormComponents';

// Import all form section configurations
import { primaryAssessmentForm } from '../data/PrimaryAssessment';
import { bodyAssessmentForm } from '../data/body';
import { vitalsForm } from '../data/vitals';
import { managementForm } from '../data/management';
import { clinicalInfoForm } from '../data/clinical-info';
import { patientDetailsForm } from '../data/patient-details';

// Mapping of form sections
const formSections: { [key: string]: FormSection } = {
  'primary-assessment': primaryAssessmentForm,
  'body': bodyAssessmentForm,
  'vitals': vitalsForm,
  'management': managementForm,
  'clinical-info': clinicalInfoForm,
  'patient-details': patientDetailsForm
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

  // Update current section if initialSection changes
  useEffect(() => {
    setCurrentSection(initialSection);
  }, [initialSection]);

  const currentForm = formSections[currentSection];

  const handleInputChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const validateSection = () => {
    const errors: string[] = [];
    const validateQuestions = (questions: (Question | QuestionGroup)[]) => {
      questions.forEach(q => {
        if ('questions' in q) {
          validateQuestions(q.questions);
        } else {
          if (q.required && (!formData[q.id] || formData[q.id].trim() === '')) {
            errors.push(`${q.title} is required`);
          }
        }
      });
    };
    validateQuestions(currentForm.questions);
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validateSection()) {
      if (onSubmit) {
        onSubmit(formData);
      }
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
        {currentForm.questions.map(item => {
          if ('questions' in item) {
            return (
              <div key={item.title} className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{item.title}</h3>
                {item.questions.map(question => (
                  <div key={question.id} className="mb-4">
                    {renderFormInput(
                      question, 
                      formData[question.id] || '', 
                      (value) => handleInputChange(question.id, value)
                    )}
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <div key={item.id} className="mb-4">
                {renderFormInput(
                  item, 
                  formData[item.id] || '', 
                  (value) => handleInputChange(item.id, value)
                )}
              </div>
            );
          }
        })}

        <div className="flex justify-between mt-6">
          <button 
            type="button" 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicPCRForm;