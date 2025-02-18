import "./app/homepage.css";
"use client";
import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase'; // Import Supabase client

export default function HomePage() {
  const [rides, setRides] = useState([]); // State to store ride data
  const [searchQuery, setSearchQuery] = useState(""); // State for search/filter

  // Fetch ride data from the database
  const fetchRides = async () => {
    const { data, error } = await supabase
      .from('rides') // Replace 'rides' with your table name
      .select('*'); // Fetch all columns

    if (error) {
      console.error('Error fetching rides:', error);
    } else {
      setRides(data); // Store ride data in state
    }
  };

  // Fetch rides when the component mounts
  useEffect(() => {
    fetchRides();
  }, []);

  // Filter rides based on search query
  const filteredRides = rides.filter((ride) => {
    return (
      ride.departure.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container">
      <h1>Available Rides</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by departure or destination..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {/* List of Rides */}
      <div className="rides-list">
        {filteredRides.length > 0 ? (
          filteredRides.map((ride) => (
            <div key={ride.id} className="ride-card">
              <h2>{ride.departure} → {ride.destination}</h2>
              <p><strong>Chauffeur:</strong> {ride.chauffeur_name}</p>
              <p><strong>Departure Time:</strong> {ride.departure_time}</p>
              <p><strong>Available Seats:</strong> {ride.available_seats}</p>
              <button onClick={() => alert(`Booking ride to ${ride.destination}`)}>
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>No rides available.</p>
        )}
      </div>
    </div>
  );
}