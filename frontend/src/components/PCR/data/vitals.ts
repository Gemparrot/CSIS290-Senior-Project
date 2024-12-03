import { FormSection } from "../types/FormConfig";

export const vitalsForm: FormSection = {
  id: 'vitals',
  title: 'Vitals & Observations',
  questions: [
    {
      id: 'airway',
      title: "Airway",
      type: "radio",
      options: ["Clear", "Obstructed", "Partially Obstructed", "unrecodable", "Missing"],
      required: true
    },
    {
      id: 'breathing',
      title: "Breathing",
      type: "radio",
      options: ["Adequate", "Inadequate", "Unrecordable","Absent"],
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
        },
        {
            id: 'bp_systolic',
            subtitle: "BP Systolic",
            type: "radio",
            options: ["Value", "Unrecordable"],
            required: true,
            conditionalField: {
              condition: "Value",
              field: {
                id: 'mmHg',
                title: "Enter mmHG Value",
                type: "number",
                required: true,
                min: 0,
                max: 500
              }
            }
        },
        {
            id: 'bp_diastolic',
            subtitle: "BP Diastolic",
            type: "radio",
            options: ["Value", "Unrecordable"],
            required: true,
            conditionalField: {
              condition: "Value",
              field: {
                id: 'mmHg',
                title: "Enter mmHG Value",
                type: "number",
                required: true,
                min: 0,
                max: 500
              }
            }
        },
      ]      
    },
    {
      id: 'disability',
      title: "Disability",
      type: "radio",
      options: ["Alert", "Voice", "Pain", "Unresponsive", "Unrecordable", "Missing"],
      required: true,
      min: 30,
      max: 200
    }, 
    {
        title: "Disability",
        questions: [
          {
            id: 'avpu',
            subtitle: "AVPU",
            type: "radio",
            options: ["Alert", "Voice", "Pain", "Unresponsive", "Unrecordable", "Missing"],
            required: false
          },
          {
            id: 'glasgow',
            subtitle: "Glasgow",
            type: "radio",
            options: ["Adult", "Child"],
            required: false
          },
          {
            id: 'eye_response',
            subtitle: "Eye Response",
            type: "radio",
            options: ["Spontaneous", "Verbal Stimulus", "Painful Stimulus", "None"],
            required: false
          },
            {
                id: 'verbal_response',
                subtitle: "Verbal Response",
                type: "radio",
                options: ["Normal", "Confused", "Inappropriate Words", "Incomprehensible Sounds", "None"],
                required: false
            },
            {
                id: 'motor_response',
                subtitle: "Motor Response",
                type: "radio",
                options: ["Obeys Commands", "Localizes Pain", "Flexion-Withdrawal", "Abnormal Flexion", "Abnormal Extension", "None"],
                required: false
            },
            
        ]
        
    },
    {
        id: 'left_pupil',
        title: "Left Eye Reactive",
        type: "yesno",
        options: [],
        required: true,
    },
    {
        id: 'left_pupil_size',
        subtitle: "Pupil Size",
        type: "radio",
        options: ["1mm", "2mm", "3mm", "4mm", "5mm", "6mm", "Unrecordable"],
        required: false,
    },
    {
        id: 'right_pupil',
        title: "Left Eye Reactive",
        type: "yesno",
        options: [],
        required: true,
    },
    {
        id: 'right_pupil_size',
        subtitle: "Pupil Size",
        type: "radio",
        options: ["1mm", "2mm", "3mm", "4mm", "5mm", "6mm", "Unrecordable"],
        required: false,
    },
    {
        id: 'glycemia',
        title: "Glycemia",
        type: "radio",
        options: ["High", "Low"],
        required: true,
    },
    {
        id: 'pain',
        title: "Pain",
        type: "dropdown",
        options: ["None", "Mild", "Moderate", "Severe"],
        required: true,
    },
    {
        id: 'tempreture',
        title: "Tempreture",
        type: "number",
        options: [],
        required: true,
        min: 20,
        max: 50
    }, 
  ]
};