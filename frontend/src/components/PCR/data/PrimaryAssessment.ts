import { FormSection } from "../types/FormConfig";

export const primaryAssessmentForm: FormSection = {
  id: 'primary-assessment',
  title: 'Primary Assessment',
  questions: [
    {
      id: 'airway',
      title: "Airway",
      type: "radio",
      options: ["Clear", "Obstructed", "Partially Obstructed", "Unrecordable", "Missing"],
      required: true
    },
    {
      id: 'breathing',
      title: "Breathing",
      type: "radio",
      options: ["Adequate", "Inadequate", "Unrecordable", "Absent"],
      required: true
    },
    {
      id: 'bpm',
      title: "Rate (BPM)",
      type: "number",
      options: [],
      required: true,
      min: 30,
      max: 200
    },
    {
      id: 'spO2',
      title: "SpO2 (%)",
      type: "radio",
      options: ["Value", "Unrecordable", "Missing"],
      required: true,
      conditionalField: {
        condition: "Value",
        field: {
          id: 'spO2Value',
          title: "Enter SpO2 Value",
          type: "number",
          required: true,
          min: 0,
          max: 100
        }
      }
    },
    {
      title: "Circulation",
      questions: [
        {
          id: 'circulation_pulse',
          subtitle: "Pulse",
          type: "radio",
          options: ["Brachial", "Carotid", "Radial", "Unrecordable", "Missing"],
          required: false
        },
        {
          id: 'rhythm',
          subtitle: "Rhythm",
          type: "radio",
          options: ["Regular", "Irregular", "Unrecordable", "Missing"],
          required: false
        },
        {
          id: 'capillary_refill',
          subtitle: "Capillary Refill",
          type: "radio",
          options: ["> 2", "=< 2", "Unrecordable", "Missing"],
          required: false
        },
        {
          id: 'skin',
          subtitle: "Skin",
          type: "radio",
          options: ["Cyanotic", "Flushed", "Normal", "Pale", "Unrecordable", "Missing"],
          required: false
        }
      ]
    },
    {
      id: 'disability',
      title: "Disability",
      type: "radio",
      options: ["Alert", "Voice", "Pain", "Unresponsive", "Unrecordable", "Missing"],
      required: true
    },
    {
      id: 'age',
      title: "Age",
      type: "number",
      required: true,
      min: 0
    },
    {
      id: 'gender',
      title: "Gender",
      type: "radio",
      options: ["Male", "Female", "Other"],
      required: true
    },
    {
      id: 'blood_pressure',
      title: "Blood Pressure (mmHg)",
      type: "number",
      required: true,
      min: 50,
      max: 250
    },
    {
      id: 'cholesterol',
      title: "Cholesterol (mg/dL)",
      type: "number",
      required: true,
      min: 100,
      max: 400
    },
    {
      id: 'max_heart_rate',
      title: "Maximum Heart Rate (bpm)",
      type: "number",
      required: true,
      min: 60,
      max: 220
    },
    {
      id: 'insulin',
      title: "Insulin Level (μU/mL)",
      type: "number",
      required: true,
      min: 0,
      max: 50
    },
    {
      id: 'bmi',
      title: "Body Mass Index (BMI)",
      type: "number",
      required: true,
      min: 10,
      max: 50
    }
  ]
};
