import { useState, useEffect } from 'react';

export default function ManageReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('/api/reservations')
      .then((res) => res.json())
      .then((data) => setReservations(data));
  }, []);

  const deleteReservation = async (id) => {
    await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Reservations</h1>
      <ul className="space-y-2">
        {reservations.map((reservation) => (
          <li key={reservation.id} className="p-4 border rounded">
            <p>Passenger ID: {reservation.passengerId}</p>
            <p>Train ID: {reservation.trainId}</p>
            <button
              onClick={() => deleteReservation(reservation.id)}
              className="text-red-500 hover:underline"
            >
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
