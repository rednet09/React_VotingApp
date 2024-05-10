import { useState, useEffect } from "react";
import { toast } from "react-toast";
import { useNavigate } from "react-router-dom";
import CandidateList from "../Utils/CandidateList";
import NavBar from "../Components/NavBar";

const AdminDashboard = (selected) => {
  const [updatedCandidateList, setUpdatedCandidateList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const voteCount = JSON.parse(localStorage.getItem("updateCount"));
    const updatedList = updateVoteCount(CandidateList, voteCount);
    localStorage.setItem("allList", JSON.stringify(updatedList));
    setUpdatedCandidateList(updatedList);
  }, []);

  const updateVoteCount = (voteList, voteCount) => {
    return voteList.map((candidate) => {
      if (candidate.id === voteCount.id) {
        return {
          ...candidate,
          voteCount: voteCount.voteCount,
        };
      }
      return candidate;
    });
  };

  //   const handleLogout = () => {
  //     localStorage.removeItem("adminLoggedin");
  //     toast.success(`Logout Successful`);
  //     navigate("/");
  //   };

  return (
    <>
      <NavBar />

      <section className="mt-10">
        {/* <div className="w-20 absolute top-5 right-10">
          <button
            onClick={handleLogout}
            className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
          >
            Logout
          </button>
        </div> */}
        <div className="text-white text-center">Admin dashboard</div>
        {updatedCandidateList.map((e) => (
          <div
            key={e.id}
            className="text-white flex gap-10 rounded-lg bg-gray-500 hover:bg-slate-900 my-6 py-5 px-5"
          >
            {e.label}'s Vote Count {e.voteCount}
          </div>
        ))}
      </section>
    </>
  );
};

export default AdminDashboard;
