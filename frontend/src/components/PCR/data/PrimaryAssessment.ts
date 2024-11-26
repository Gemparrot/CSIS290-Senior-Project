// ../PCR/data/PrimaryAssessment.ts
import { FormSection } from "../types/FormConfig";

export const primaryAssessmentForm: FormSection = {
  id: 'primary-assessment',
  title: 'Primary Assessment',
  questions: [
    {
      id: 'breathing',
      title: "Breathing",
      type: "radio",
      options: ["Clear", "Obstructed", "Partially Obstructed", "Missing"],
      required: true
    },
    {
      id: 'pain-level',
      title: "Pain Level",
      type: "dropdown",
      options: ["None", "Mild", "Moderate", "Severe"],
      required: true
    },
    {
      id: 'patient-name',
      title: "Patient Name",
      type: "text",
      required: true
    }
  ]
};

export const bodyAssessmentForm: FormSection = {
  id: 'body-assessment',
  title: 'Body Assessment',
  questions: [
    {
      id: 'trauma-location',
      title: "Trauma Location",
      type: "text",
      required: true
    },
    {
      id: 'injury-severity',
      title: "Injury Severity",
      type: "dropdown",
      options: ["Minor", "Moderate", "Severe"],
      required: true
    }
  ]
};