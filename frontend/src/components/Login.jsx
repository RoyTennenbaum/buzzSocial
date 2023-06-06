import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import homeIntro from "../assets/homeIntro.webm";
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
      <div className="flex flex-col items-center justify-start h-screen">
        <div className="relative w-full h-full">
          <video
            src={homeIntro}
            type="video/webm"
            loop
            controls={false}
            muted
            autoPlay
            className="object-cover w-full h-full"
          />
          <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center">
            <div className="p-5">
              <img
                src={logo}
                alt="logo"
                className="w-36 sm:w-48 md:w-56 lg:w-64 xl:w-72 2xl:w-80"
              />
            </div>
            <GoogleLogin
              size="large"
              onSuccess={successResponseGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
