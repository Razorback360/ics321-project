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
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reservation Details</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Passenger Information</h2>
        <p>Name: {reservationDetails.reservationDetails.user.name}</p>
        <p>Email: {reservationDetails.reservationDetails.user.email}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Bookings</h2>
        <ul className="list-disc list-inside">
          {reservationDetails.reservationDetails.bookings.map((booking) => (
            <li key={booking.id}>
              From Station ID: {booking.fromStationId}, To Station ID: {booking.toStationId}, 
              Date: {new Date(booking.date).toLocaleString()}, 
              Seating ID: {booking.seatingId}, 
              Percentage: {booking.percentage}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Waiting Lists</h2>
        <ul className="list-disc list-inside">
          {reservationDetails.reservationDetails.waitingLists.map((waitingList) => (
            <li key={waitingList.id}>
              Train ID: {waitingList.trainId}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Seatings</h2>
        <ul className="list-disc list-inside">
          {reservationDetails.reservationDetails.seatings.map((seating) => (
            <li key={seating.id}>
              Train ID: {seating.trainId}, Seat Number: {seating.number}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Passenger Dependents</h2>
        <ul className="list-disc list-inside">
          {reservationDetails.reservationDetails.passengerDependents.map((dependent) => (
            <li key={dependent.id}>
              Name: {dependent.name}, Age: {dependent.age}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Attachments</h2>
        <ul className="list-disc list-inside">
          {reservationDetails.reservationDetails.attachments.map((attachment) => (
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