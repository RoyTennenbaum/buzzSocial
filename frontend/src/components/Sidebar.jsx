import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
// import { IoIosArrowForward } from "react-icons/io";

import sidebarLogo from "../assets/logo_sidebar_compressed.svg";
import { categories } from "../utils/categories";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) {
      closeToggle(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full bg-gray-300 overflow-y-scrikk min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 pt-1 my-6 w-190"
          onClick={handleCloseSidebar}
        >
          <img src={sidebarLogo} alt="sidebarLogo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="px-5 mt-2 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
                alt="category"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex items-center gap-2 p-1 mx-3 my-5 mb-3 bg-white rounded-lg shadow-lg"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="profile"
            referrerPolicy="no-referrer"
          />
          <p>{user.username}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
