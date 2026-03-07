import React from "react";

function Navbar({ toggleTheme }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand"> Budget Expense Manager</span>

      <button className="btn btn-outline-light" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </nav>
  );
}

export default Navbar;