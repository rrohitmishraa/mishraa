import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../Firebase-config";
import { getDoc, doc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

export default function Profile() {
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const { user } = UserAuth();
  const capUsername = username.charAt(0).toUpperCase() + username.slice(1);

  const nav = useNavigate();

  const docRef = doc(db, "Users", username);

  const userInfo = async () => {
    const singleSnapshot = await getDoc(docRef);
    const singleDoc = [...users, singleSnapshot.data()];
    setUsers(singleDoc);
  };

  useEffect(() => {
    userInfo();
  }, []);

  const ChildDiv = () => {
    return (
      <div className="pContainer">
        {users.map((item) => {
          if (item === undefined) {
            if (user) {
              nav("/notfound");
            } else {
              nav("/login");
            }
          } else {
            return (
              <div className="parent col" key="">
                <div className="firsCard">
                  <h3 className="username sub-text-for-white">
                    @{item.UserInfo.Username}
                  </h3>
                  <h1 className="name">{item.UserInfo.Name}</h1>

                  <div className="contactCard">
                    {item.UserInfo.Phone && (
                      <div className="row">
                        <img
                          className="icon"
                          src={require("../images/phone.png")}
                          alt=""
                        />
                        <h3 className="contact">{item.UserInfo.Phone}</h3>
                      </div>
                    )}

                    {item.UserInfo.Email && (
                      <div className="row">
                        <img
                          className="icon"
                          src={require("../images/email.png")}
                          alt=""
                        />
                        <h3 className="contact">{item.UserInfo.Email}</h3>
                      </div>
                    )}
                  </div>

                  <ul className="topFive row">
                    {Object.keys(item).map((element) => {
                      if (element.toLowerCase() === "facebook") {
                        return (
                          <li>
                            <a
                              href="https://www.facebook.com/rrohitmishraa"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                className="icon social"
                                src={require("../images/facebook.png")}
                                alt=""
                              />
                            </a>
                          </li>
                        );
                      } else if (element.toLowerCase() === "instagram") {
                        return (
                          <li>
                            <a
                              href="https://www.instagram.com/sarkessticc"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                className="icon social"
                                src={require("../images/instagram.png")}
                                alt=""
                              />
                            </a>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
                <ul className="extraLinks col">
                  <li>
                    {Object.keys(item).map((element) => {
                      if (
                        element.toLowerCase() !== "userinfo" &&
                        element.toLowerCase() !== "facebook" &&
                        element.toLowerCase() !== "instagram" &&
                        element.toLowerCase() !== "youtube" &&
                        element.toLowerCase() !== "spotify"
                      ) {
                        const a = item[element];
                        return (
                          <li>
                            <a href={a.Link} target="_blank" rel="noreferrer">
                              <img
                                className="icon social"
                                src={a.Icon}
                                alt=""
                              />
                              <span className="linkName">{a.Name}</span>
                              <img
                                className="icon arrow"
                                src={require("../images/arrow.png")}
                                alt=""
                              />
                            </a>
                          </li>
                        );
                      }
                    })}
                  </li>
                </ul>

                <div className="spotify">
                  {Object.keys(item).map((element) => {
                    if (element.toLowerCase() === "spotify") {
                      const a = item[element];
                      const link = a.Link;
                      const breakAt = link.indexOf("playlist/");
                      const secondPart = link.slice(breakAt);
                      const afterEmbed = "embed/" + secondPart;
                      const firstPart = link.substr(0, breakAt);
                      const word = firstPart + afterEmbed;
                      return (
                        <iframe
                          src={word}
                          width="100%"
                          height="352"
                          allowfullscreen=""
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          title="spotify"
                        ></iframe>
                      );
                    }
                  })}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div>
      <ChildDiv />
    </div>
  );
}
