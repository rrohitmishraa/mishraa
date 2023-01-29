import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import { UsernameContextProvider } from "./context/UserContext";
import Dashboard from "./components/Dashboard";
import Four04 from "./components/Four04";

export default function App() {
  return (
    <div className="box">
      {/* Header */}

      <UsernameContextProvider>
        <AuthContextProvider>
          <Navbar />
          <div className="route-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notfound" element={<Four04 />} />
            </Routes>
          </div>
        </AuthContextProvider>
      </UsernameContextProvider>

      {/*  FOOTER */}
      <Footer />
    </div>
  );
}
