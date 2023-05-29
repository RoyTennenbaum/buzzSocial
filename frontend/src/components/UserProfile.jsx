import { useState, useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/GROQ-data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const randomImage =
  "https://source.unsplash.com/random/1600*900/?nature,photography,technology";

const activeBtnStyles =
  "bg-amber-400 text-gray-900 font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-gray-900 font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("created"); //created || saved
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  const logout = () => {
    googleLogout();
    sessionStorage.clear();

    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }
  return (
    <div className="relative items-center justify-center h-full pb-2">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col items-center justify-center">
            <img
              src={randomImage}
              className="object-cover w-full h-40 2xl:h-96"
              alt="profile-banner"
            />
            <img
              className="object-cover -mt-12 rounded-full w-28 h-28 outline outline-8 outline-zinc-50"
              src={user.image}
              alt="profile-user"
            />
            <h1 className="mt-3 text-3xl font-bold text-center">
              {user.username}
            </h1>
            <div className="absolute top-0 right-0 p-2 z-1">
              {userId === user._id && (
                <button
                  type="button"
                  onClick={logout}
                  className="p-3 bg-white border-4 border-gray-900 rounded-full outline-none"
                >
                  <MdOutlineLogout />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText("created");
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created Posts
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText("saved");
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved Posts
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full mt-2 text-xl font-bold">
              You don't have any posts here!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
