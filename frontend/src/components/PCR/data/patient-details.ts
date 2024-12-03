import { FormSection } from "../types/FormConfig";

export const patientDetailsForm: FormSection = {
  id: 'patient-details',
  title: 'Patient Details',
  questions: [
    {
      id: 'name',
      title: "Name",
      type: "text",
      options: [],
      required: true
    },
    {
        id: 'family_name',
        title: "Family Name",
        type: "text",
        options: [],
        required: true
    },
    {
        id: 'passenger',
        title: "Passenger",
        type: "yesno",
        options: [],
        required: true
    },
    {
        id: 'date_of_birth',
        title: "Date of Birth",
        type: "text",
        options: [],
        required: true
    },
    {
        id: 'gender',
        title: "Gender",
        type: "dropdown",
        options: ["Male", "Female", "Other"],
        required: true
    },
    {
        id: 'phone_number',
        title: "Phone Number",
        type: "text",
        options: [],
        required: true
    },
    {
        id: 'insurance',
        title: "Insurance",
        type: "yesno",
        options: [],
        required: true
    },
    {
        id: 'location',
        title: "Location",
        type: "text",
        options: [],
        required: true
    },
  ]
};