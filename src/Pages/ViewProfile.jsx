import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
const ViewProfile = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("users"));
    const currentUser = JSON.parse(localStorage.getItem("curentUser"));
    console.log("userDetails:", userDetails);
    console.log("currentUser:", currentUser);
    // Check if userDetails and currentUser exist
    if (userDetails && currentUser) {
      const currentUserDetails = userDetails.find(
        (user) => user.email === currentUser.email
      );
      console.log("currentUserDetails:", currentUserDetails);
      if (currentUserDetails) {
        setUserData(currentUserDetails);
      }
    }
  }, []);

  console.log("userData", userData);
  return (
    <>
      <NavBar />
      <section className="flex flex-col justify-center items-center text-white">
        <div>{userData?.email}</div>
        <div>{userData?.username}</div>
        <div>{userData?.phoneNo}</div>
      </section>
    </>
  );
};

export default ViewProfile;
