import { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailQuery, pinDetailMorePinQuery } from "../utils/GROQ-data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comment[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);

          client.fetch(query).then((res) => setPins(res));
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner message="Buzzing in progress..." />;

  return (
    <>
      <div
        className="flex xl-flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            className="rounded-3xl"
            alt="user-post"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetail.destination} target="_blank" rel="noreferrer">
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetail.title}
            </h1>
            <p className="mt-3">{pinDetail.about}</p>
          </div>
          <Link
            to={`user-profile/${pinDetail.postedBy?._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={pinDetail.postedBy?.image}
              alt="profile"
              referrerPolicy="no-referrer"
            />
            <p className="font-semibold capitalize">
              {pinDetail.postedBy?.username}
            </p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetail?.comments?.map((comment, i) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={i}
              >
                <img
                  src={comment.postedBy.image}
                  alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{comment.postedBy.username}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`user-profile/${pinDetail.postedBy?._id}`}>
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={pinDetail.postedBy?.image}
                alt="profile"
                referrerPolicy="no-referrer"
              />
            </Link>
            <input
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-yellow-500 text-black rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? "Posting comment..." : "Post"}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2x mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner message="Loading more pins..." />
      )}
    </>
  );
};

export default PinDetail;
