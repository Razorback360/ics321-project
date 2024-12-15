/* eslint-disable react/no-unescaped-entities */
import type { FC } from "react";
import Link from "next/link";

const Home: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to the Train Reservation System
        </h1>
        <p className="text-gray-600 mb-6">
          Easily book your train tickets, view schedules, and manage your reservations.
        </p>
        <Link
          href="/Login"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
