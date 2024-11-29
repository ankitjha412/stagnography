// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmbedPage from "./pages/EmbedPage";
import ExtractPage from "./pages/ExtractPage";
import "./styles/styles.css"; // Import the updated CSS

const App = () => {
  return (
    <Router>
      <div className="container">
        {/* App Header */}
        <header>
          <h1>Steganography App</h1>
          <p style={{marginBottom:5}}>Secure your messages by hiding them in images</p>
        </header>

        {/* Navigation Bar */}
        <nav>
          <Link to="/embed" className="nav-link">
            Embed
          </Link>
          <Link to="/extract" className="nav-link">
            Extract
          </Link>
        </nav>

        {/* Page Routing */}
        <Routes>
          <Route path="/embed" element={<EmbedPage />} />
          <Route path="/extract" element={<ExtractPage />} />
        </Routes>

        {/* Footer */}
        <footer>
          &copy; {new Date().getFullYear()} Steganography App. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
