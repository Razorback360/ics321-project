import { useState } from 'react';

export default function AddSchedule() {
  const [form, setForm] = useState({
    trainId: '',
    fromStationId: '',
    toStationId: '',
    departTime: '',
    arrivalTime: '',
    sequenceNumber: '', // New field
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/schedules/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      alert('Schedule added successfully!');
    } else {
      alert('Failed to add schedule.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        placeholder="Train ID"
        value={form.trainId}
        onChange={(e) => setForm({ ...form, trainId: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="From Station ID"
        value={form.fromStationId}
        onChange={(e) => setForm({ ...form, fromStationId: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="To Station ID"
        value={form.toStationId}
        onChange={(e) => setForm({ ...form, toStationId: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        type="datetime-local"
        value={form.departTime}
        onChange={(e) => setForm({ ...form, departTime: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        type="datetime-local"
        value={form.arrivalTime}
        onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        type="number"
        placeholder="Sequence Number"
        value={form.sequenceNumber}
        onChange={(e) => setForm({ ...form, sequenceNumber: e.target.value })}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Add Schedule
      </button>
    </form>
  );
}
