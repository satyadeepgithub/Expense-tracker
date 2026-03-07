import React, { useState, useEffect } from "react";
import AddExpense from "./expense/AddExpense";

function Dashboard({ user, setUser }) {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(user)) || [];
    setExpenses(stored);
  }, [user]);

  const deleteExpense = (index) => {

    const updated = expenses.filter((_, i) => i !== index);

    setExpenses(updated);

    localStorage.setItem(user, JSON.stringify(updated));
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

            {expenses.map((exp, index) => (

              <tr key={index}>

                <td>{exp.date}</td>
                <td>₹ {exp.amount}</td>
                <td>{exp.type}</td>

                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteExpense(index)}
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}

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