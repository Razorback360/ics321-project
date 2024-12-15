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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Active Train Schedules
        </h1>
        {activeTrains.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activeTrains.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  {schedule.train.nameEn}
                </h2>
                <p className="text-gray-600">
                  <span className="font-medium">From:</span>{" "}
                  {schedule.fromStation.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">To:</span>{" "}
                  {schedule.toStation.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Depart:</span>{" "}
                  {new Date(schedule.departTime).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Arrival:</span>{" "}
                  {new Date(schedule.arrivalTime).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No active trains found.
          </p>
        )}
      </div>
    </div>
  );
}
