import { FormSection } from "../types/FormConfig";

export const managementForm: FormSection = {
    id: 'management',
    title: 'Management',
    questions: [
        {
            id: 'airway',
            title: "Airway Management",
            type: "yesno",
            options: [],
            required: true,
        },
        {
            id: 'breathing',
            title: "Breathing Management",
            type: "yesno",
            options: [],
            required: true,
        },
        {
            id: 'circulation',
            title: "Circulation Management",
            type: "yesno",
            options: [],
            required: true,
        },
        {
            id: 'disability',
            title: "Disability Management",
            type: "yesno",
            options: [],
            required: true,
        },
        {
            id: 'object',
            title: "Stabilizng Impaled Object",
            type: "yesno",
            options: [],
            required: true,
        },
        {
            id: 'medication',
            title: "Assistance with Medication",
            type: "yesno",
            options: [],
            required: true,
        },
        {
            id: 'spine',
            title: "Full Spinal Immobilization",
            type: "yesno",
            options: [],
            required: true,
        },
        {
            id: 'transport',
            title: "Immovilization & Transport",
            type: "radio",
            options: ["Chair", "Stretcher", "Scoop", "Vacuum Mattress", "Spinal Board", "Collar", "Head Blocks", "KED", "Vacuum Mattress", "EZ-Glide", "None"],
            required: true,
        },
        {
            id: 'position',
            title: "Position of Transport",
            type: "radio",
            options: ["Recovery", "Semi-sitting", "Sitting", "Supine",],
            required: true,
        },
        {
            id: 'cardiac', 
            title: "Cardiac Arrest",
            type: "yesno",
            options: [],
            required: true,
        },
    ]
}