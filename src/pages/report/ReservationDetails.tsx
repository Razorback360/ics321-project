import { useState } from "react";

export default function ReservationDetails() {
  const [reservationDetails, setReservationDetails] = useState(null);
  const [passengerId, setPassengerId] = useState("");

  const fetchReservationDetails = async () => {
    const res = await fetch(`/api/passenger/reservation/${passengerId}`);
    const data = await res.json();
    setReservationDetails(data.reservationDetails);
  };

  return (
    <section>
      <h2>Reservation Details</h2>
      <input
        type="text"
        placeholder="Enter Passenger ID"
        value={passengerId}
        onChange={(e) => setPassengerId(e.target.value)}
      />
      <button onClick={fetchReservationDetails}>Fetch Reservation</button>

      {reservationDetails ? (
        <div>
          <h3>Reservation for Passenger: {reservationDetails.user.name}</h3>
          <p>Email: {reservationDetails.user.email}</p>

          <h4>Passenger Dependents:</h4>
          {reservationDetails.passengerDependents.length > 0 ? (
            <ul>
              {reservationDetails.passengerDependents.map((dependent) => (
                <li key={dependent.id}>
                  {dependent.name} (Age: {dependent.age})
                </li>
              ))}
            </ul>
          ) : (
            <p>No dependents found.</p>
          )}

          <h4>Attachments:</h4>
          {reservationDetails.attachments.length > 0 ? (
            <ul>
              {reservationDetails.attachments.map((attachment) => (
                <li key={attachment.id}>
                  Document: <a href={attachment.documentPath}>View</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No attachments found.</p>
          )}

          <h4>Bookings:</h4>
          {reservationDetails.bookings.length > 0 ? (
            <ul>
              {reservationDetails.bookings.map((booking) => (
                <li key={booking.id}>
                  Booking ID: {booking.id}, Date:{" "}
                  {new Date(booking.date).toLocaleString()}, From Station ID:{" "}
                  {booking.fromStationId}, To Station ID: {booking.toStationId},
                  Ticket ID: {booking.ticketId}, Discount: {booking.percentage}
                  %, Seating ID: {booking.seatingId}
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found.</p>
          )}

          <h4>Waiting Lists:</h4>
          {reservationDetails.waitingLists.length > 0 ? (
            <ul>
              {reservationDetails.waitingLists.map((waiting) => (
                <li key={waiting.id}>
                  Train ID: {waiting.trainId}, Waiting List ID: {waiting.id}
                </li>
              ))}
            </ul>
          ) : (
            <p>No waiting list entries found.</p>
          )}

          <h4>Seatings:</h4>
          {reservationDetails.seatings.length > 0 ? (
            <ul>
              {reservationDetails.seatings.map((seating) => (
                <li key={seating.id}>
                  Train ID: {seating.trainId}, Seat Number: {seating.number}
                </li>
              ))}
            </ul>
          ) : (
            <p>No seatings found.</p>
          )}
        </div>
      ) : (
        <p>No reservation details available.</p>
      )}
    </section>
  );
}
