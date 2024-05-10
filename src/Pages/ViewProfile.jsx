import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
const ViewProfile = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("users"));
    const currentUser = JSON.parse(localStorage.getItem("curentUser"));

    // Check if userDetails and currentUser exist
    if (userDetails && currentUser) {
      const currentUserDetails = userDetails.find(
        (user) => user.email === currentUser.email
      );
      if (currentUserDetails) {
        setUserData(currentUserDetails);
      }
    }
  }, []);

  const updateUserDetails = (updatedUserData) => {
    // Retrieve user details from localStorage
    const userDetails = JSON.parse(localStorage.getItem("users"));

    // Find the index of the user to be updated
    const userIndex = userDetails.findIndex(
      (user) => user.email === updatedUserData.email
    );

    if (userIndex !== -1) {
      // Update the user details
      userDetails[userIndex] = updatedUserData;

      // Store the updated user details back in localStorage
      localStorage.setItem("users", JSON.stringify(userDetails));

      // Update the state with the new user data
      setUserData(updatedUserData);
    }
  };

  console.log("userData", userData);
  return (
    <>
      <NavBar />
      <section className="flex flex-col gap-2 justify-center items-center text-white text-left">
        <h1 className="text-center my-6 text-3xl text-white mb-4">
          User Details
        </h1>
        <p className="">Email Address</p>

        <div className="text-black flex-grow bg-gray-200 p-4 w-64 h-16 rounded-md text-2xl">
          {userData?.email}
        </div>
        <p className="">User Name</p>

        <div className="text-black flex-grow bg-gray-200 p-4 w-64 h-16 rounded-md text-2xl">
          {userData?.username}
        </div>
        <p className="">Phone No</p>

        <div className="text-black flex-grow bg-gray-200 p-4 w-64 h-16 rounded-md text-2xl">
          {userData?.phoneNo}
        </div>
        <button
          className="mt-6 rounded-md bg-slate-500 p-4"
          onClick={updateUserDetails}
        >
          Update Data
        </button>
      </section>
    </>
  );
};

export default ViewProfile;
