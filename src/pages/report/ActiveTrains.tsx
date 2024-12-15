import { useState, useEffect } from "react";
import { Schedule } from "../admin/view";

export default function ActiveTrains() {
  const [activeTrains, setActiveTrains] = useState<Schedule[]>([]);

  useEffect(() => {
    async function fetchActiveTrains() {
      const res = await fetch("/api/train/active-today");
      const data = await res.json();
      setActiveTrains(data.activeTrains);
    }

    fetchActiveTrains();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Active Train Schedules</h1>
      {activeTrains.length > 0 ? (
        <ul>
          {activeTrains.map((schedule) => (
            <li key={schedule.id} className="border p-4">
              <p>Train: {schedule.train.nameEn}</p>
              <p>
                From: {schedule.fromStation.name} - To:{" "}
                {schedule.toStation.name}
              </p>
              <p>Depart: {new Date(schedule.departTime).toLocaleString()}</p>
              <p>Arrival: {new Date(schedule.arrivalTime).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No active trains found.</p>
      )}
    </div>
  );
}
