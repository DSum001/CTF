import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router and Route
import "./App.css";
import LoginPage from "./pages/login/login";
import SymmetricEncryptionPage from "./pages/symetric/symetric";
import CTFHashPage from "./pages/hash/hash";
import Substitution from "./pages/sub/sub";
import Stage3Page from "./pages/asymetric/stage3";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Simulate successful login
  };

  return (
    <Router>
      {" "}
      {/* Wrap the app with Router */}
      <div className="App">
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />  {/* Login Page */}
          <Route path="/symmetric" element={<SymmetricEncryptionPage />} />  {/* Symmetric Encryption Page */}
          <Route path="/hash" element={<CTFHashPage />} />  {/* Symmetric Encryption Page */}
          <Route path="/stage3" element={<Stage3Page />} />  {/* Asymmetric Encryption Page */}
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />{" "}
          {/* Login Page */}
          <Route path="/symmetric" element={<SymmetricEncryptionPage />} />{" "}
          {/* Symmetric Encryption Page */}
          <Route path="/hash" element={<CTFHashPage />} />{" "}
          {/* Symmetric Encryption Page */}
          <Route path="/substitution" element={<Substitution />} />{" "}
          {/* Symmetric Encryption Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
