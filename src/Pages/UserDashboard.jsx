import { useState } from "react";
import CandidateList from "../Utils/CandidateList";
import { toast } from "react-toast";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";

const UserDashboard = () => {
  const [selected, setSelected] = useState(null);
  const [voteCount, setVoteCount] = useState(0);
  const [showButton, setShowButton] = useState(false);
  //   const [hasVoted, setHasVoted] = useState(false);
  const radioList = CandidateList;
  console.log("radio---------------", radioList);
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log("seleted", e);
    // JSON.parse(localStorage.getItem("voteCount"))
    const newCount = e.voteCount + 1;
    console.log(newCount, "new=---------------------------------------");
    const updatedCount = { ...e, voteCount: newCount };
    localStorage.setItem("updateCount", JSON.stringify(updatedCount));
    setShowButton(true);
    setSelected(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVoteCount(voteCount + 1);
    // setHasVoted(true);

    console.log(voteCount, "bvvotecount");
    voteCount <= 0
      ? toast.success(`You selected ${selected.value}`)
      : toast.warn(`You already Voted`);
  };

  //   const handlelogout = () => {
  //     localStorage.removeItem("loggedin");
  //     toast.success(`Logout Successfull`);
  //     navigate("/");
  //   };
  return (
    <>
      <NavBar selected={selected} />
      <section className="text-center p-10 mt-20">
        {/* <div className="w-20 absolute top-5 right-10">
          <button
            onClick={handlelogout}
            className=" bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
          >
            Logout
          </button>
        </div> */}

        <form onSubmit={handleSubmit}>
          <h1 className="text-center my-6 text-3xl text-white mb-4 ">
            Please Select a Candidate to Vote for
          </h1>
          {radioList.map((e) => {
            return (
              <>
                <div
                  key={e.id}
                  className="text-white flex gap-10 rounded-lg bg-gray-500 hover:bg-slate-900 my-6 py-5 px-5"
                >
                  <input
                    className=""
                    id={e.id}
                    type="radio"
                    name="radioOptions"
                    value={e.value}
                    checked={selected === e}
                    onChange={() => handleChange(e)}
                  />
                  <label htmlFor={e.id}>{e.label}</label>
                </div>
              </>
            );
          })}

          <div className="flex justify-center">
            <button
              className={`bg-blue-200 hover:bg-blue-400 text-black font-bold py-3 px-6 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce my-7 text-center ${
                showButton ? "block" : "hidden"
              }`}
            >
              Vote
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default UserDashboard;
