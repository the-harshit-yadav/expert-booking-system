import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function MyBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/bookings`, {
        params: { email },
      });

      setBookings(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bookings");
    }
  };

  return (
    <div className="container">
      <h2 className="header">My Bookings</h2>

      <input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="button"
        onClick={fetchBookings}
        style={{ marginLeft: "10px" }}
      >
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((b) => (
            <div key={b._id} className="card">
              <p><strong>Expert:</strong> {b.expert?.name}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time:</strong> {b.time}</p>
              <p><strong>Status:</strong> {b.status}</p>
              <p><strong>Notes:</strong> {b.notes}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBookings;