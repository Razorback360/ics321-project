import Link from "next/link";
import React from "react";

const Index = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Reports Page
        </h1>
        <ul className="space-y-4">
          <li>
            <Link
              href="/report/ActiveTrains"
              className="block w-full px-4 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 text-center"
            >
              Active Trains
            </Link>
          </li>
          <li>
            <Link
              href="/report/Stations"
              className="block w-full px-4 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 text-center"
            >
              Stations by Trains
            </Link>
          </li>
          <li>
            <Link
              href="/report/ReservationDetails"
              className="block w-full px-4 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 text-center"
            >
              Reservation Details
            </Link>
          </li>
          <li>
            <Link
              href="/report/Waitlist"
              className="block w-full px-4 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 text-center"
            >
              Waitlist
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Index;
