import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/categories";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === "image/jpg" ||
      type === "image/jpeg" ||
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/gif"
    ) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Image upload error: ", error);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };

      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFields(true);

      setTimeout(() => setFields(false), 2000);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-5 lg:h-4/5">
      {fields && (
        <p className="mb-5 text-xl text-red-500 transition-all duration-150 ease-in">
          Please fill in all the fields
        </p>
      )}
      <div className="flex flex-col items-center justify-center w-full p-3 bg-white lg:flex-row lg:p-5 lg:w-4/5">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex flex-col items-center justify-center w-full p-3 border-2 border-gray-300 border-dotted h-420">
            {loading && <Spinner />}
            {wrongImageType && (
              <p className="text-red-500">Wrong image type!</p>
            )}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high-quality JPG, JPEG, PNG, SVG or GIF only
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="w-full h-full"
                />
                <button
                  type="button"
                  className="absolute p-3 text-xl transition-all duration-500 ease-in-out bg-white rounded-full cursor-pointer bottom-3 right-3 hover:shadow-md"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 w-full gap-6 mt-5 lg:pl-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title here"
            className="p-2 text-2xl font-bold border-b-2 border-gray-200 outline-none sm:text-3xl"
          />
          {user && (
            <div className="flex items-center gap-2 my-2 bg-white rounded-lg">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="profile"
              />
              <p className="font-bold">{user.username}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your pin about?"
            className="p-2 text-base border-b-2 border-gray-200 outline-none sm:text-3lg"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="p-2 text-base border-b-2 border-gray-200 outline-none sm:text-3lg"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 text-lg font-semibold sm:text-xl">
                Choose pin category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-4/5 p-2 text-base border-b-2 border-gray-200 rounded-md outline-none cursor-pointer"
              >
                <option value="Other" className="bg-white">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option
                    className="text-base text-black capitalize bg-white border-0 outline-none"
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end justify-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="p-2 font-bold text-black bg-yellow-500 rounded-full outline-none w-28"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
