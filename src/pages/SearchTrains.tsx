import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const SearchTrains = () => {
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [trains, setTrains] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/searchTrains', {
        params: { nameEn, nameAr }
      });
      setTrains(response.data);
    } catch (error) {
      console.error('Error searching for trains:', error);
    }
  };

  const handleBook = (trainId, scheduleId) => {
    router.push({
      pathname: '/BookSeat',
      query: { trainId, scheduleId }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Trains</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="English Name"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="text"
          placeholder="Arabic Name"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>
      <div>
        {trains.length > 0 ? (
          <ul className="space-y-4">
            {trains.map((train) => (
              <li key={train.id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{train.nameEn || ""} / {train.nameAr || ""}</h2>
                <h3 className="text-lg font-medium mt-2">Seats:</h3>
                <ul className="list-disc list-inside">
                  {train.seats.map((seat) => (
                    <li key={seat.id}>Seat Number: {seat.number}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-medium mt-2">Schedules:</h3>
                <ul className="list-disc list-inside">
                  {train.schedules.map((schedule) => (
                    <li key={schedule.id}>
                      From: {schedule.fromStation.name}, To: {schedule.toStation.name}, 
                      Departure: {new Date(schedule.departTime).toLocaleString()}, 
                      Arrival: {new Date(schedule.arrivalTime).toLocaleString()}
                      <button
                        onClick={() => handleBook(train.id, schedule.id)}
                        className="bg-green-500 text-white p-1 ml-2 rounded"
                      >
                        Book
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-500">No trains found</p>
        )}
      </div>
    </div>
  );
};

export default SearchTrains;