import React, { useState, useEffect } from "react";
import AddExpense from "./expense/AddExpense";
const BASE_URL = "http://localhost:8080";

function Dashboard({ user, setUser }) {

  const [expenses, setExpenses] = useState([]);
   const [error, setError] = useState("");

  // Fetch expenses from backend on load
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/expenses/${user}`);
        if (!response.ok) { setError("Failed to load expenses"); return; }
        const data = await response.json();
        setExpenses(data);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };
    fetchExpenses();
  }, [user]);

 const deleteExpense = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/expenses/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) { setError("Failed to delete expense"); return; }
      setExpenses(expenses.filter((exp) => exp.id !== id));
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const total = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-4">
        <h4>Welcome {user}</h4>

        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <AddExpense
        expenses={expenses}
        setExpenses={setExpenses}
        user={user}
      />

      {/* Expense List */}

      <div className="card p-4 shadow">

        <h5>Your Expenses</h5>

        <table className="table table-striped mt-3">

          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {expenses.length === 0 ? (
                <tr>
                    <td colSpan="4" className="text-center text-muted">
                        No expenses found
                    </td>
                </tr>
            ) : (expenses.map((exp, index) => (

                <tr key={index}>

                  <td>{exp.dateOfExpense}</td>
                  <td>₹ {exp.amount}</td>
                  <td>{exp.typeName}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteExpense(exp.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>

                ))
            )}

          </tbody>

        </table>

        <h5 className="text-end">
          Total: ₹ {total}
        </h5>

      </div>

    </div>
  );
}

export default Dashboard;