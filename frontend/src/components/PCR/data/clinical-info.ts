import { FormSection } from "../types/FormConfig";

export const clinicalInfoForm: FormSection = {
  id: 'clinical-info',
  title: 'Clinical Information',
  questions: [
    {
      id: 'chief_complaint',
      title: "Chief Complaint",
      type: "radio",
      options: ["Medical", "Trauma"],
      required: true
    },
    {
      id: 'past_medical_history',
      title: "Past Medical History",
      type: "radio",
      options: ["Asthma", "Behavioral Problems", "COPD","Diabetes", "Epilepsy", "Heart Disease", "Hypertension", "Pulmonary", "Renal Fail", "Seizures", "Stroke", "None"],
      required: true
    },
    {
      id: 'allergies',
      title: "Allergies",
      type: "radio",
      options: ["Yes", "No", "Unknown"],
      required: true,
    },
    {
        id: 'medications',
        title: "Medications",
        type: "radio",
        options: ["Yes", "No", "Unknown"],
        required: true,
      },
  ]
};