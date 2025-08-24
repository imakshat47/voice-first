import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar"; // Correct path
import ProtectedRoute from "./components/common/ProtectedRoute"; // Correct path

// Pages
import HomePage from "./pages/HomePage";
import GreetingPage from "./pages/GreetingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/greet" element={<GreetingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;