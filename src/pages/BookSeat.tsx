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
      alert('Booking failed.');
    }
  };

  return (
    <div>
      <h1>Book Seat</h1>
      <div>
        <input
          type="text"
          placeholder="Passenger ID"
          value={passengerId}
          onChange={(e) => setPassengerId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Seating ID"
          value={seatingId}
          onChange={(e) => setSeatingId(e.target.value)}
        />
        <button onClick={handleBooking}>Book</button>
      </div>
    </div>
  );
};

export default BookSeat;