import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {

  const [user, setUser] = useState(localStorage.getItem("user"));

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={theme === "dark" ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"}>

      <Navbar toggleTheme={toggleTheme} />

      {user ? (
        <Dashboard user={user} setUser={setUser} />
      ) : (
        <div className="container mt-5">
          <div className="row">

            <div className="col-md-6">
              <Login setUser={setUser} />
            </div>

            <div className="col-md-6">
              <Register />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;