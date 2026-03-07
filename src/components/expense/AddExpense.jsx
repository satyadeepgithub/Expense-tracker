import React, { useState, useEffect } from "react";

function AddExpense({ expenses, setExpenses, user }) {

    useEffect(() => {

        const stored = JSON.parse(localStorage.getItem(user)) || [];

        const expenseTypes = stored.map(e => e.type);

        const uniqueTypes = [...new Set([...types, ...expenseTypes])];

        setTypes(uniqueTypes);

    }, []);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState(["Food","Travel","Shopping","Rent"]);
  const [newType, setNewType] = useState("");
  const [showNewType, setShowNewType] = useState(false);
  const [error, setError] = useState("");

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

  const addNewType = () => {

    if (!newType.trim()) {
      setError("Enter new expense type");
      return;
    }

    if (types.includes(newType.trim())) {
      setError("Type already exists");
      return;
    }

    const updatedTypes = [...types, newType.trim()];

    setTypes(updatedTypes);
    setType(newType.trim());

    setNewType("");
    setShowNewType(false);
    setError("");
  };

  const addExpense = () => {

    if (!amount) {
      setError("Please enter amount");
      return;
    }

    if (!type) {
      setError("Please select type");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    setError("");

    const newExpense = {
      amount,
      type,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...expenses, newExpense];

    setExpenses(updated);

    localStorage.setItem(user, JSON.stringify(updated));

    setAmount("");
    setType("");
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
              <option key={index} value={t}>
                {t}
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