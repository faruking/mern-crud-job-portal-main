import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    company: "",
    logo: "",
    logoBackground: "", 
    position: "",
    postedAt: "",
    contract: "",
    location: "",
    website: "",
    apply: "",
    description: "",
    requirements: {
      content: "",
      items: "",
    },
    role: {
      content: "",
      items: "",
    },
    jobs: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/job/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      position: form.position,
      level: form.level,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Job</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Company: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.company}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position: </label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>

        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="contractPartTime"
              value="Part Time"
              checked={form.contract === "Part Time"}
              onChange={(e) => updateForm({ contract: e.target.value })}
            />
            <label htmlFor="contractPartTime" className="form-check-label">Part Time</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="contractFullTime"
              value="Full Time"
              checked={form.contract === "Full Time"}
              onChange={(e) => updateForm({ contract: e.target.value })}
            />
            <label htmlFor="contractFullTime" className="form-check-label">Full Time</label>
          </div>

        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
