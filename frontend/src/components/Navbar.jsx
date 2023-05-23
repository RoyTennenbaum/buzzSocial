import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) {
    return null;
  }
  return (
    <div className="flex w-full gap-2 mt-5 bg-zinc-50 md:gap-1 pb-7">
      <div className="flex items-center justify-start w-full px-2 bg-white border-none rounded-md outline outline-1 outline-zinc-300 focus-within:shadow-sm">
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
            className="w-16 h-12 rounded-lg outline outline-2 md:hidden"
            referrerPolicy="no-referrer"
          />
        </Link>
        <Link
          to={`create-pin`}
          className="flex items-center justify-center h-12 font-bold text-center bg-yellow-400 rounded-lg md:text-lg w-28 md:w-40 lg:w-52 outline outline-1 outline-zinc-600"
        >
          <IoMdAdd className="mr-1 md:mr-2" />
          NEW POST
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
