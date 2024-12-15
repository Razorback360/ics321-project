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
    <div>
      <h1>Search Trains</h1>
      <div>
        <input
          type="text"
          placeholder="English Name"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
        />
        <input
          type="text"
          placeholder="Arabic Name"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {trains.length > 0 ? (
          <ul>
            {trains.map((train) => (
              <li key={train.id}>
                <h2>{train.nameEn || ""} / {train.nameAr || ""}</h2>
                <h3>Seats:</h3>
                <ul>
                  {train.seats.map((seat) => (
                    <li key={seat.id}>Seat Number: {seat.number}</li>
                  ))}
                </ul>
                <h3>Schedules:</h3>
                <ul>
                  {train.schedules.map((schedule) => (
                    <li key={schedule.id}>
                      From: {schedule.fromStation.name}, To: {schedule.toStation.name}, 
                      Departure: {new Date(schedule.departTime).toLocaleString()}, 
                      Arrival: {new Date(schedule.arrivalTime).toLocaleString()}
                      <button onClick={() => handleBook(train.id, schedule.id)}>Book</button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No trains found</p>
        )}
      </div>
    </div>
  );
};

export default SearchTrains;