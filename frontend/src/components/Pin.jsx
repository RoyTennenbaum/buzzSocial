import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postIsHovered, setPostIsHovered] = useState(false);
  const navigate = useNavigate();

  const user = fetchUser();

  let alreadySaved = save?.filter((item) => item.postedBy._id === user.sub);
  //save = array of people who saved the post; check if the logged user already saved -> is he within the array.

  const savePin = (id) => {
    if (!alreadySaved || alreadySaved.length === 0) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.sub,
            postedBy: {
              _type: "postedBy",
              _ref: user.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        })
        .catch((error) => console.log(`error saving pin: ${error}`));
    }
  };

  // const deletePin = (id) => {
  //   client
  //   .delete(id)

  // }

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostIsHovered(true)}
        onMouseLeave={() => setPostIsHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative w-auto overflow-hidden transition-all duration-500 ease-in-out rounded-lg cursor-zoom-in hover:shadow-lg"
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="post"
          className="w-full rounded-lg"
        />
        {postIsHovered && (
          <div className="absolute top-0 z-50 flex flex-col justify-between w-full h-full p-1 pt-2 pb-2 pr-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center text-xl bg-white rounded-full outline-none opacity-75 w-9 h-9 text-dark hover:opacity-100 hover:shadow-md"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="px-5 py-1 text-base font-bold text-black bg-yellow-500 outline-none opacity-75 hover:opacity-100 hover:shadow-md rounded-3xl"
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="px-5 py-1 text-base font-bold text-black bg-yellow-500 outline-none opacity-75 hover:opacity-100 hover:shadow-md rounded-3xl"
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex items-center justify-between w-full gap-2">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2 pl-4 pr-4 font-bold text-black bg-white rounded-full opacity-75 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 20
                    ? destination.slice(8, 20)
                    : destination.slice(8)}
                </a>
              )}
              {postedBy?._id === user.sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    // deletePin(_id);
                  }}
                  className="p-2 text-base font-bold text-black bg-white outline-none opacity-75 hover:opacity-100 hover:shadow-md text-dark rounded-3xl"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex items-center gap-2 mt-2"
      >
        <img
          className="object-cover w-8 h-8 rounded-full"
          src={postedBy?.image}
          alt="profile"
          referrerPolicy="no-referrer"
        />
        <p className="font-semibold text-yellow-300 capitalize">
          {postedBy?.username}
        </p>
      </Link>
    </div>
  );
};

export default Pin;
