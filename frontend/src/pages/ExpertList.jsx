import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

function ExpertList() {
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchExperts();
  }, [search, category]);

  const fetchExperts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/experts`, {
        params: { search, category },
      });
      setExperts(res.data.experts);
    } catch (error) {
      console.error("Error fetching experts:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="header">Expert Session Booking</h2>

      <div className="search-filter">
        <input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Career">Career</option>
          <option value="Fitness">Fitness</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      {experts.map((expert) => (
        <div key={expert._id} className="card">
          <h3>{expert.name}</h3>
          <p><strong>Category:</strong> {expert.category}</p>
          <p><strong>Experience:</strong> {expert.experience} years</p>
          <p><strong>Rating:</strong> ⭐ {expert.rating}</p>
          <Link to={`/expert/${expert._id}`} className="button">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ExpertList;