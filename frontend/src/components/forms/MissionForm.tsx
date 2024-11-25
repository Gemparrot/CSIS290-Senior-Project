import React, { useState } from 'react';
import missionService from '../../services/missions';
import missionPatientService from '../../services/mission-patient';

interface MissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const MissionForm: React.FC<MissionFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    mission_type: '',
    patient_name: '',
    description: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create the mission first
      const mission = await missionService.create({
        mission_type: formData.mission_type as 'emergency' | 'transportation',
        description: formData.description,
        address: formData.address
      });

      // Create the patient record with the returned mission ID
      await missionPatientService.create({
        missionId: mission.id,
        patientName: formData.patient_name
      });
      
      onClose();
      setFormData({
        mission_type: '',
        patient_name: '',
        description: '',
        address: ''
      });
    } catch (error) {
      console.error('Error creating mission or patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[425px] max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Mission</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Mission type
            </label>
            <select
              name="mission_type"
              value={formData.mission_type}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select mission type</option>
              <option value="emergency">Emergency</option>
              <option value="transportation">Transportation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Patient name
            </label>
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              placeholder="Enter patient name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter mission description"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter mission address"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Mission'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MissionForm;