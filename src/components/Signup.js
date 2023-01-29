import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { db } from "../Firebase-config";
import { getDoc, doc, collection, setDoc } from "firebase/firestore";

const Signup = () => {
  const { createUser, user } = UserAuth();
  const { value } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [userName, setUsername] = useState([]);
  const [users, setUsers] = useState([]);
  const [exist, setExist] = useState("");
  const navigate = useNavigate();

  const correct_way = /^[a-z0-9._]*$/gi;
  const onlyText = /[a-z]/;

  const collRef = collection(db, "Users");

  useEffect(() => {
    if (value) {
      setUsername(value);
    }
  }, []);

  const addValues = async () => {
    await setDoc(doc(collRef, userName), {
      UserInfo: {
        Email: "eeemmmaaaiiilll",
        Name: "naaaaaaam",
        Phone: "878787",
        Username: userName,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err1 = document.querySelector(".err1");
    const err2 = document.querySelector(".err2");

    if (err1.innerHTML === "" && err2.innerHTML === "") {
      try {
        await createUser(email, password);
        await addValues();
        navigate("/Dashboard");
      } catch (e) {
        if (e.message.includes("email")) {
          alert("Email already in use");
        } else {
          alert("SIgnup Error: " + e.message);
        }
      }
    } else {
      alert("Please resolve all the errors and try again");
    }
  };

  const checkUsername = async (e) => {
    const a = e.target.value;
    const lowerText = a.toLowerCase().replace(" ", "_");

    if (lowerText.match(correct_way)) {
      setUsername(lowerText);

      const docRef = doc(collRef, a);
      const singleSnapshot = await getDoc(docRef);
      const singleDoc = [...users, singleSnapshot.data()];

      if (singleDoc[0]) {
        setExist(a);
      } else {
        setExist("");
      }
    }
  };

  const handleError = () => {
    let message = "";
    if (userName.length > 0) {
      if (userName.length < 3) {
        message = "Username must be atleast 3 characters";
      } else if (!onlyText.test(userName)) {
        message = "Username must contain atleast one alphabets";
      } else if (
        userName.charAt(0) == "." ||
        userName.charAt(userName.length - 1) == "."
      ) {
        message = "Username cannot start or end with a period";
      } else if (userName.includes("..")) {
        message = "Username can not contain consecutive periods";
      } else if (exist) {
        message = "Username '" + exist + "' is already in use";
      } else {
        message = "";
      }
    }

    return message;
  };

  const checkPass = () => {
    let message = "";

    if (password.length > 0 && password.length < 6) {
      message = "Password must be atleast 6 characters long";
    } else if (password !== cPassword && cPassword !== "" && password !== "") {
      message = "Password do not match";
    }

    return message;
  };

  if (user) {
    navigate("/dashboard");
  } else {
    return (
      <div className="box">
        <div className="signupContainer">
          <h1>Hi!</h1>
          <h3>Create a new account</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name=""
              onChange={checkUsername}
              id=""
              value={userName}
              placeholder="Username"
              required
            />

            <h4 className="error err1">{handleError()}</h4>

            <input
              type="email"
              name=""
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id=""
              placeholder="Email"
              required
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name=""
              id=""
              placeholder="Password"
              required
            />

            <input
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
              type="password"
              name=""
              id=""
              placeholder="Confirm password"
              required
            />

            <h4 className="error err2">{checkPass()}</h4>
            <button type="submit" className="btn">
              Create Account
            </button>
          </form>
          <br /> <br />
          <h2>
            <hr />
            OR <hr />
          </h2>
          <br /> <br />
          <h3 className="already">
            Already have an account?&nbsp;
            <Link to="/login" className="linkText">
              Login
            </Link>
          </h3>
        </div>
      </div>
    );
  }
};

export default Signup;
