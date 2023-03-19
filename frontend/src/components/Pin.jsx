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
  const [isSavingPost, setIsSavingPost] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();

  const alreadySaved = !!save?.filter((post) => post.postedBy._id === user.sub); //the two !! before the statement is a short way to turn the string into a boolean (with a correct value of course)

  console.log(alreadySaved);
  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostIsHovered(true)}
        onMouseLeave={() => setPostIsHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="post"
          className="rounded-lg w-full"
        />
        {postIsHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button>Saved</button>
              ) : (
                <button>Save</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
