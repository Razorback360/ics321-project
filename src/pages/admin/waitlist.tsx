import { useState, useEffect } from 'react';

export default function PromotePassengers() {
  const [waitlist, setWaitlist] = useState([]);

  useEffect(() => {
    fetch('/api/waitlist')
      .then((res) => res.json())
      .then((data) => setWaitlist(data));
  }, []);

  const promotePassenger = async (id) => {
    await fetch(`/api/waitlist/${id}/promote`, { method: 'PATCH' });
    alert('Passenger promoted successfully!');
    setWaitlist((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Promote Waitlisted Passengers</h1>
      <ul className="space-y-2">
        {waitlist.map((entry) => (
          <li key={entry.id} className="p-4 border rounded">
            <p>Passenger ID: {entry.passengerId}</p>
            <p>Train ID: {entry.trainId}</p>
            <button
              onClick={() => promotePassenger(entry.id)}
              className="text-green-500 hover:underline"
            >
              Promote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
