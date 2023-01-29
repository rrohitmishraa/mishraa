import { React, useState, useContext } from "react";
import Lottie from "lottie-react";
import anim from "../anim.json";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { UserAuth } from "../context/AuthContext";

export default function Home() {
  const { setValue } = useContext(UserContext);
  const { user } = UserAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/dashboard");
  } else {
    function Body() {
      const [name, setName] = useState();
      const handleOnChange = (event) => {
        setName(event.target.value);
      };

      const hitEnter = (e) => {
        if (e.keyCode == 13) {
          goTo();
        }
      };

      const goTo = () => {
        setValue(name);
        let url = "/" + name;
        navigate(url, { state: { from: "home" } });
      };

      return (
        <div className="body">
          <h1 className="heroHeading">
            Everything you are. In one simple link.
          </h1>

          <h3 className="heroText">
            Join and share everything you create, curate and sell online. All
            from the one link in bio.
          </h3>

          <div className="inputArea">
            <div className="textArea">
              <span>mishraa/</span>
              <input
                className="nameInput"
                type="text"
                name="nameToSearch"
                id="nameToSearch"
                placeholder="yourname"
                value={name}
                onChange={handleOnChange}
                onKeyDown={hitEnter}
              />
            </div>

            <button className="btnClaim" onClick={goTo}>
              Claim Your Link
            </button>
          </div>

          <Lottie className="anim" animationData={anim} />
        </div>
      );
    }

    return (
      <div className="box">
        <Body />
      </div>
    );
  }
}
