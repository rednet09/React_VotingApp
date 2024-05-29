import { useState, useEffect } from "react";
import CandidateList from "../Utils/CandidateList";
import NavBar from "../Components/NavBar";

const AdminDashboard = () => {
  const [updatedCandidateList, setUpdatedCandidateList] = useState([]);

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

  return (
    <>
      <NavBar />

      <section className="mt-10">
        <div className="text-white text-center">Admin dashboard</div>
        {updatedCandidateList.map((e) => (
          <div
            key={e?.id}
            className="text-white flex gap-10 rounded-lg bg-gray-500 hover:bg-slate-900 my-6 py-5 px-5"
          >
            {e?.label}'s Vote Count {e?.voteCount}
          </div>
        ))}
      </section>
    </>
  );
};

export default AdminDashboard;
