/* eslint-disable react/no-unescaped-entities */
import type { FC } from "react";
import Link from "next/link";

const Home: FC = () => {
  return (
    <div>
      <h1>Welcome to the Train Reservation System</h1>
      <Link href="/Login" className="text-blue-500">
        Login
      </Link>
    </div>
  );
};

export default Home;
