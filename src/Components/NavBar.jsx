import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { toast } from "react-toast";

const NavBar = (selected) => {
  const navigate = useNavigate();
  const [openAvatarDropdown, setOpenAvatarDropdown] = useState(false);

  const toggleAvatarDropdown = () => {
    setOpenAvatarDropdown(!openAvatarDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("adminLoggedIn");
    toast.success(`Logout Successfull`);

    navigate("/");
  };

  return (
    <header className="bg-slate-900 border-b-2 border-gray-200 font-DM absolute top-0 w-full">
      <div className="container mx-auto py-4 px-4 flex flex-row justify-between md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <p className="text-center  text-2xl md: text-3xl text-gray-300 mb-2">
            Voting App
          </p>
        </div>
        <div
          onClick={toggleAvatarDropdown}
          className="relative transition-all duration-500 mt-2 md:mt-0"
        >
          <span className="cursor-pointer text-white">
            <TiThMenu />
          </span>
          <div
            className={`absolute ${
              openAvatarDropdown ? "block" : "hidden"
            } bg-slate-300 rounded shadow-md mt-2 space-y-2 right-6`}
          >
            <div className="p-4 flex flex-col w-40 text-white bg-slate-700 rounded-sm">
              <button
                onClick={() => {
                  navigate("/viewProfile");
                }}
              >
                View Profile
              </button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
