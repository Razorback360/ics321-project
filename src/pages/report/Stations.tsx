import { useState, useEffect } from "react";

export default function StationsByTrain() {
  const [trains, setTrain] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStations() {
      const res = await fetch("/api/train/stations");
      const data = await res.json();
      setTrain(data.trains);
    }

    fetchStations();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stations by Train</h1>
      {trains.length > 0 ? (
        <ul>
          {trains.map((train) => (
            <li key={train} className="border p-4">
              <p>Train: {train.nameEn}</p>
              {train.schedules.length > 0 ? (
                <ul>
                  {train.schedules.map((station: any) => (
                    <li key={station} className="border p-4">
                      <p>
                        From: {station.fromStation.name} - To:{" "}
                        {station.toStation.name}
                      </p>
                      <p>
                        Depart: {new Date(station.departTime).toLocaleString()}
                      </p>
                      <p>
                        Arrival:{" "}
                        {new Date(station.arrivalTime).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No stations found for trains.</p>
              )}
              {/* <p>
                From: {train.fromStation.name} - To: {train.toStation.name}
              </p>
              <p>Depart: {new Date(train.departTime).toLocaleString()}</p>
              <p>Arrival: {new Date(train.arrivalTime).toLocaleString()}</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No stations found for trains.</p>
      )}
    </div>
  );
}
