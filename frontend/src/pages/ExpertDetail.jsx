// function ExpertDetail() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Expert Detail Page</h2>
//       <p>This page is under construction.</p>
//     </div>
//   );
// }

// export default ExpertDetail;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function ExpertDetail() {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchExpert();
    fetchBookings();

    socket.on("slotBooked", (data) => {
      if (data.expert === id) {
        setBookedSlots((prev) => [...prev, `${data.date}-${data.time}`]);
      }
    });

    return () => socket.off("slotBooked");
  }, [id]);

  const fetchExpert = async () => {
    const res = await axios.get(`http://localhost:5000/api/experts/${id}`);
    setExpert(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/api/bookings", {
      params: { email: "" },
    });
    const filtered = res.data.filter((b) => b.expert._id === id);
    setBookedSlots(filtered.map((b) => `${b.date}-${b.time}`));
  };

  const handleBooking = async () => {
    if (!form.name || !form.email || !form.phone || !selectedDate || !selectedTime) {
      return alert("All fields required");
    }

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        expert: id,
        ...form,
        date: selectedDate,
        time: selectedTime,
      });

      setMessage("Booking Successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  if (!expert) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{expert.name}</h2>
      <p><strong>Category:</strong> {expert.category}</p>
      <p><strong>Experience:</strong> {expert.experience} years</p>
      <p><strong>Rating:</strong> ⭐ {expert.rating}</p>

      <hr />

      <h3>Available Slots</h3>

      {expert.slots.map((slot) => (
        <div key={slot._id}>
          <h4>{slot.date}</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
           {slot.times.map((time) => {
  const isBooked = bookedSlots.includes(`${slot.date}-${time}`);
  const isSelected = selectedDate === slot.date && selectedTime === time;

  return (
    <button
      key={time}
      disabled={isBooked}
      onClick={() => {
        setSelectedDate(slot.date);
        setSelectedTime(time);
      }}
      style={{
        padding: "6px 10px",
        background: isBooked
          ? "gray"
          : isSelected
          ? "#28a745" // green for selected
          : "#007bff", // default blue
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: isBooked ? "not-allowed" : "pointer",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        if (!isBooked && !isSelected) e.target.style.background = "#0056b3";
      }}
      onMouseLeave={(e) => {
        if (!isBooked && !isSelected) e.target.style.background = "#007bff";
      }}
    >
      {time}
    </button>
  );
})}
          </div>
        </div>
      ))}

      <hr />

      <h3>Book Session</h3>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <br /><br />

      <textarea
        placeholder="Notes"
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />
      <br /><br />

      <button className="button" onClick={handleBooking}>
        Confirm Booking
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

export default ExpertDetail;