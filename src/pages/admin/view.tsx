import { useEffect, useState } from 'react';

export interface Schedule {
  id: number;
  train: {
    nameEn: string;
  };
  fromStation: {
    name: string;
  };
  toStation: {
    name: string;
  };
  departTime: string;
  arrivalTime: string;
}

export default function ViewSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    fetch('/api/schedules/view')
      .then((res) => res.json())
      .then((data) => setSchedules(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Train Schedules</h1>
      <ul className="space-y-4">
        {schedules.map((schedule) => (
          <li key={schedule.id} className="border p-4">
            <p>Train: {schedule.train.nameEn}</p>
            <p>
              From: {schedule.fromStation.name} - To: {schedule.toStation.name}
            </p>
            <p>Depart: {new Date(schedule.departTime).toLocaleString()}</p>
            <p>Arrival: {new Date(schedule.arrivalTime).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
