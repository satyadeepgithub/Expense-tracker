import React, { useState, useEffect } from "react";
const BASE_URL = "http://localhost:8080";

function AddExpense({ expenses, setExpenses, user }) {

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState(["Food","Travel","Shopping","Rent"]);
  const [newType, setNewType] = useState("");
  const [showNewType, setShowNewType] = useState(false);
  const [error, setError] = useState("");

  // Fetch types from backend on load
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/types/${user}`);
        const data = await response.json();
        setTypes(data);
      } catch (err) {
        setError("Failed to load expense types");
      }
    };
    fetchTypes();
  }, []);

 const handleTypeChange = (e) => {
    const value = e.target.value;
    if (value === "addNew") {
      setShowNewType(true);
      setType("");
    } else {
      setShowNewType(false);
      setType(value);
      setError("");
    }
  };

  const addNewType = async () => {
    if (!newType.trim()) { setError("Enter new expense type"); return; }
    if (types.find(t => t.name === newType.trim())) { setError("Type already exists"); return; }

    try {
      const response = await fetch(`${BASE_URL}/types`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newType.trim(), email: user }),
      });

      if (!response.ok) { setError("Failed to add new type"); return; }

      const savedType = await response.json();
      setTypes([...types, savedType]);
      setType(savedType.name);
      setNewType("");
      setShowNewType(false);
      setError("");

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const addExpense = async () => {
    if (!amount) { setError("Please enter amount"); return; }
    if (!type) { setError("Please select type"); return; }
    if (Number(amount) <= 0) { setError("Amount must be greater than 0"); return; }

    setError("");

    const selectedType = types.find(t => t.name === type);

    try {
      const response = await fetch(`${BASE_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          typeId: selectedType.id,
          typeName:selectedType.name,
          email: user,
        }),
      });

      if (!response.ok) { setError("Failed to add expense"); return; }

      const savedExpense = await response.json();
      setExpenses([...expenses, savedExpense]);
      setAmount("");
      setType("");

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="card p-4 shadow mb-4">

      <h5>Add Expense</h5>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">

        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={type}
            onChange={handleTypeChange}
          >
            <option value="">Select Type</option>

            {types.map((t,index)=>(
              <option key={index} value={t.name}>
                {t.name}
              </option>
            ))}

            <option value="addNew">+ Add New Type</option>

          </select>
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-primary w-100"
            onClick={addExpense}
          >
            Add Expense
          </button>
        </div>

      </div>

      {showNewType && (
        <div className="mt-3">

          <input
            className="form-control mb-2"
            placeholder="New type"
            value={newType}
            onChange={(e)=>{
              setNewType(e.target.value);
              setError("");
            }}
          />

          <button
            className="btn btn-secondary"
            onClick={addNewType}
          >
            Add Type
          </button>

        </div>
      )}

    </div>
  );
}

export default AddExpense;