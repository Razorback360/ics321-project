import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ReservationDetails = () => {
  const router = useRouter();
  const { passengerId } = router.query;
  const [reservationDetails, setReservationDetails] = useState(null);

  useEffect(() => {
    if (passengerId) {
      fetchReservationDetails(passengerId);
    }
  }, [passengerId]);

  const fetchReservationDetails = async (id) => {
    try {
      const response = await axios.get(`/api/passenger/reservation/${id}`);
      setReservationDetails(response.data);
    } catch (error) {
      console.error('Error fetching reservation details:', error);
    }
  };

  if (!reservationDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Reservation Details</h1>
      <div>
        <h2>Passenger Information</h2>
        <p>Name: {reservationDetails.user.name}</p>
        <p>Email: {reservationDetails.user.email}</p>
      </div>
      <div>
        <h2>Bookings</h2>
        <ul>
          {reservationDetails.bookings.map((booking) => (
            <li key={booking.id}>
              From Station ID: {booking.fromStationId}, To Station ID: {booking.toStationId}, 
              Date: {new Date(booking.date).toLocaleString()}, 
              Seating ID: {booking.seatingId}, 
              Percentage: {booking.percentage}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Waiting Lists</h2>
        <ul>
          {reservationDetails.waitingLists.map((waitingList) => (
            <li key={waitingList.id}>
              Train ID: {waitingList.trainId}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Seatings</h2>
        <ul>
          {reservationDetails.seatings.map((seating) => (
            <li key={seating.id}>
              Train ID: {seating.trainId}, Seat Number: {seating.number}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Passenger Dependents</h2>
        <ul>
          {reservationDetails.passengerDependents.map((dependent) => (
            <li key={dependent.id}>
              Name: {dependent.name}, Age: {dependent.age}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Attachments</h2>
        <ul>
          {reservationDetails.attachments.map((attachment) => (
            <li key={attachment.id}>
              Document Path: {attachment.documentPath}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReservationDetails;