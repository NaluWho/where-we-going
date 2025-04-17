import { useState } from "react";
import { createTrip } from "../api";

export default function TripForm() {
  const [title, setTitle] = useState("");
  const [pollCloseDateTime, setPollCloseDateTime] = useState("");
  const [locationInput, setLocationInput] = useState(""); // TODO: add these field into frontend
  const [startDatesInput, setStartDatesInput] = useState("");
  const [endDatesInput, setEndDatesInput] = useState("");
  const [lodgingInput, setLodgingInput] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const newTrip = {
      creatorID: "user-1", // TODO: get this from auth system when added
      title,
      pollCloseDateTime,
      locationOptions: locationInput.split(",").map(s => s.trim()),
      startDateOptions: startDatesInput.split(",").map(s => s.trim()),
      endDateOptions: endDatesInput.split(",").map(s => s.trim()),
      lodgingOptions: lodgingInput.split(",").map(s => s.trim()),
    };

    try {
      const result = await createTrip(newTrip);
      setMessage(`Trip created! ID: ${result.tripID}`);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <input
        type="text"
        placeholder="Trip Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={pollCloseDateTime}
        onChange={(e) => setPollCloseDateTime(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Locations (comma separated)"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Start Dates (comma separated)"
        value={startDatesInput}
        onChange={(e) => setStartDatesInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="End Dates (comma separated)"
        value={endDatesInput}
        onChange={(e) => setEndDatesInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Lodging Options (comma separated)"
        value={lodgingInput}
        onChange={(e) => setLodgingInput(e.target.value)}
      />
      <button type="submit">Create Trip</button>
      {message && <p>{message}</p>}
    </form>
  );
}