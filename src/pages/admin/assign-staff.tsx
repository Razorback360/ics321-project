import { useState } from 'react';

const AssignStaff = () => {
  const [staffId, setStaffId] = useState('');
  const [trainId, setTrainId] = useState('');

  const handleAssign = (e) => {
    e.preventDefault();
    // Fake assign staff logic
    if (staffId && trainId) {
      alert(`Staff ID ${staffId} assigned to Train ID ${trainId} successfully!`);
    } else {
      alert('Please enter both Staff ID and Train ID.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assign Staff to Train</h1>
      <form onSubmit={handleAssign} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Staff ID:</label>
          <input
            type="text"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Train ID:</label>
          <input
            type="text"
            value={trainId}
            onChange={(e) => setTrainId(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignStaff;