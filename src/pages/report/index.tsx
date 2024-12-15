import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reports Page</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/report/ActiveTrains" className="text-blue-500">
            Active Trains
          </Link>
        </li>
        <li>
          <Link href="/report/Stations" className="text-blue-500">
            Stations by Trains
          </Link>
        </li>
        <li>
          <Link href="/report/ReservationDetails" className="text-blue-500">
            Reservation Details
          </Link>
        </li>
        <li>
          <Link href="/report/Waitlist" className="text-blue-500">
            Waitlist
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default index;
