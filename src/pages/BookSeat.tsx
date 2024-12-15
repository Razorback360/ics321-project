import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const BookSeat = () => {
  const router = useRouter();
  const { trainId, scheduleId } = router.query;
  const [passengerId, setPassengerId] = useState('');
  const [seatingId, setSeatingId] = useState('');

  const handleBooking = async () => {
    try {
      const response = await axios.post('/api/bookSeat', {
        passengerId,
        trainId,
        seatingId,
        scheduleId,
      });
      alert('Booking successful!');
    } catch (error) {
      console.error('Error booking seat:', error);
      alert('Booking failed!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Seat</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Passenger ID"
          value={passengerId}
          onChange={(e) => setPassengerId(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Seating ID"
          value={seatingId}
          onChange={(e) => setSeatingId(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default BookSeat;