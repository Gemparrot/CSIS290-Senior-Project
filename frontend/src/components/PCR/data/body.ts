import { FormSection } from "../types/FormConfig";

export const bodyAssessmentForm: FormSection = {
    id: 'body-assessment',
    title: 'Body Assessment',
    questions: [
      {
        id: 'trauma-location',
        title: "Trauma Location",
        type: "dropdown",
        options: ["Head", "Neck", "Chest", "Abdomen", "Pelvis", "Extremities", "Back", "Other"],
        required: true
      },
      {
        id: 'injury-severity',
        title: "Injury Severity",
        type: "dropdown",
        options: ["Minor", "Moderate", "Severe"],
        required: true
      },
        {
            id: 'trauma-type',
            title: "Trauma Type",
            type: "dropdown",
            options: ["Blunt", "Penetrating", "Burn", "Crush", "Other"],
            required: true
        },
        {
            id: 'trauma-mechanism',
            title: "Trauma Mechanism",
            type: "dropdown",
            options: ["Fall", "MVC", "Pedestrian", "Bike", "Assault", "Other"],
            required: true
        },
    ]
  };