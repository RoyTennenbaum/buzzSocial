import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import homeIntro from "../assets/homeIntro.mp4";
import logo from "../assets/logo_buzzSocial_compressed.svg";
import jwtDecode from "jwt-decode";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const successResponseGoogle = (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);

    sessionStorage.setItem("user", JSON.stringify(decodedToken));

    const { name, sub, picture } = decodedToken;
    const doc = {
      _id: sub,
      _type: "user",
      username: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
          <video
            src={homeIntro}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-60">
        <img
          src={logo}
          alt="logo"
          className="h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 m-8"
        />
        <GoogleLogin
          onSuccess={successResponseGoogle}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </>
  );
};

export default Login;
