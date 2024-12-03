import React, { useState } from 'react';

interface CreateTeamMemberProps {
  onClose: () => void;
  onSubmit: (name: string) => void;
}

const CreateTeamMember: React.FC<CreateTeamMemberProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-4">Add New Team Member</h2>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Enter team member name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamMember;
