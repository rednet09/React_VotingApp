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
      <section className="flex flex-col justify-center items-center text-white">
        <div>{userData?.email}</div>
        <div>{userData?.username}</div>
        <div>{userData?.phoneNo}</div>
        <button onClick={updateUserDetails}>Update Data</button>
      </section>
    </>
  );
};

export default ViewProfile;
