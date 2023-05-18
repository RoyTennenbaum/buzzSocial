import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) {
    return null;
  }
  return (
    <div className="flex w-full gap-2 mt-5 bg-gray-900 md:gap-5 pb-7">
      <div className="flex items-center justify-start w-full px-2 bg-white border-none rounded-md outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="w-full p-2 bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/${user?._id}`} className="hidden md:block">
          <img
            src={user.image}
            alt="profile"
            className="w-16 h-12 rounded-lg outline outline-2"
            referrerPolicy="no-referrer"
          />
        </Link>
        <Link
          to={`create-pin`}
          className="flex items-center justify-center w-20 h-12 font-bold text-center bg-yellow-600 rounded-lg md:w-22 md:h-12 outline outline-4"
        >
          NEW POST
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
