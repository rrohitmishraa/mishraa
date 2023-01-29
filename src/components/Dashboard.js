import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../Firebase-config";
import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  const checkEmailVerification = async () => {
    try {
      if (!auth.currentUser.emailVerified) {
        await sendEmailVerification(auth.currentUser);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const Dashboard = () => {
    return (
      <div>
        <div>Username: {user && user.email}</div>
        <br />
        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      </div>
    );
  };

  useEffect(() => {
    checkEmailVerification();

    try {
      if (user) {
        if (auth.currentUser.emailVerified) {
          setVerified(true);
        } else {
          setVerified(false);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  const BlankDashboard = () => {
    return (
      <div>
        Kuch Nahi Hai
        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      </div>
    );
  };

  return <div>{verified ? <Dashboard /> : <BlankDashboard />}</div>;
}
