import React, { useState, useEffect } from 'react';
import { Question, QuestionGroup, FormSection } from '../types/FormConfig';
import { renderFormInput } from './FormComponents';
import { 
  AlertCircle, 
  Check, 
  ChevronRight 
} from 'lucide-react';

import { primaryAssessmentForm } from '../data/PrimaryAssessment';
import { bodyAssessmentForm } from '../data/body';
import { vitalsForm } from '../data/vitals';
import { managementForm } from '../data/management';
import { clinicalInfoForm } from '../data/clinical-info';
import { patientDetailsForm } from '../data/patient-details';

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
    <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen p-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <h2 className="text-2xl font-bold">{currentForm.title}</h2>
          <p className="text-blue-100 mt-2">Complete all required fields to proceed</p>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center space-x-4 text-red-800">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="font-semibold">Validation Errors</h3>
              <ul className="list-disc list-inside text-sm">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Form Content */}
        <form className="p-6 space-y-6">
          {currentForm.questions.map(item => {
            if ('questions' in item) {
              return (
                <div key={item.title} className="bg-gray-100 rounded-lg p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <ChevronRight className="mr-2 text-gray-500" />
                    {item.title}
                  </h3>
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

          {/* Submit Button */}
          <div className="mt-8">
            <button 
              type="button" 
              onClick={handleSubmit}
              className="
                w-full py-4 bg-blue-600 text-white 
                rounded-lg hover:bg-blue-700 
                transition-colors duration-300 
                flex items-center justify-center 
                space-x-2 font-semibold
              "
            >
              <Check className="w-6 h-6 mr-2" />
              Submit Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicPCRForm;