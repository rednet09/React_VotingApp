import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";

const ViewProfile = () => {
  const [userData, setUserData] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("users"));
    const currentUser = JSON.parse(localStorage.getItem("curentUser"));

    if (userDetails && currentUser) {
      const currentUserDetails = userDetails.find(
        (user) => user.email === currentUser.email
      );
      if (currentUserDetails) {
        setUserData(currentUserDetails);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]: value,
    });
  };

  // const handleSubmit = () => {
  //   const userDetails = JSON.parse(localStorage.getItem("users"));

  //   const userIndex = userDetails.findIndex(
  //     (user) => user.email === updatedUserData.email
  //   );

  //   console.log(userIndex, "index");

  //   if (userIndex !== -1) {
  //     userDetails[userIndex] = updatedUserData;

  //     localStorage.setItem("users", JSON.stringify(userDetails));

  //     setUserData(updatedUserData);
  //   }
  // };

  const updateUserDetails = (updatedUserData, email) => {
    const userDetails = JSON.parse(localStorage.getItem("users"));
    console.log(updatedUserData, "----------");
    const userIndex = userDetails.findIndex((user) => user.email === email);
    console.log(userIndex, "index");
    if (userIndex !== -1) {
      // const { email, password } = userDetails[userIndex];
      const newUserDetails = {
        ...updatedUserData,
        email: userDetails?.email,
        password: userDetails.password,
      };

      userDetails[userIndex] = newUserDetails;
      console.log(updatedUserData, userDetails[userIndex]);
      localStorage.setItem("users", JSON.stringify(userDetails));

      setUserData(updatedUserData); // Update state with the new user data
    }
  };

  console.log("userData", userData);
  console.log("updated ", updatedUserData);
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
        <input
          type="text"
          name="username"
          value={updatedUserData?.username || userData?.username || ""}
          onChange={handleChange}
          className="text-black flex-grow bg-gray-200 p-4 w-64 h-16 rounded-md text-2xl"
        />
        <p className="">Phone No</p>
        <input
          type="text"
          name="phoneNo"
          value={updatedUserData?.phoneNo || userData?.phoneNo || ""}
          onChange={handleChange}
          className="text-black flex-grow bg-gray-200 p-4 w-64 h-16 rounded-md text-2xl"
        />
        <button
          className="mt-6 rounded-md bg-slate-500 p-4"
          onClick={() => updateUserDetails(updatedUserData, userData?.email)}
        >
          Update Data
        </button>
      </section>
    </>
  );
};

export default ViewProfile;
