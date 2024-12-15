import { useState } from "react";

export default function WaitlistLoyalty() {
  const [trainId, setTrainId] = useState("");
  const [waitlist, setWaitlist] = useState<any[]>([]);

  const fetchWaitlistLoyalty = async () => {
    const res = await fetch(`/api/passenger/waitlist/${trainId}`);

    if (res.ok) {
      const data = await res.json();
      setWaitlist(data.waitlistedPassengers);
      console.log(data.waitlistedPassengers);
    } else {
      console.error("Error fetching waitlist loyalty data.");
    }
  };

  return (
    <section>
      <h2>Waitlist Loyalty Information</h2>
      <input
        type="text"
        placeholder="Enter Train ID"
        value={trainId}
        onChange={(e) => setTrainId(e.target.value)}
      />
      <button onClick={fetchWaitlistLoyalty}>Fetch Waitlist</button>

      {waitlist.length > 0 ? (
        <div>
          <h3>Waitlist for Train {trainId}</h3>
          <ul>
            {waitlist.map((passenger) => (
              <li key={passenger.passenger.id}>
                <strong>Name: {passenger.passenger.user.name}</strong>
                <ul>Tier: {passenger.passenger.user.loyaltyMiles[0].name}</ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No waitlisted passengers found for Train {trainId}.</p>
      )}
    </section>
  );
}
