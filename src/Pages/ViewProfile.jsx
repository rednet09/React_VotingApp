const ViewProfile = () => {
  const userDetails = JSON.parse(localStorage.getItem("users"));
  console.log(userDetails, "dddddddddddddddddddddddddddddddddde");
  return (
    <>
      <section className="flex justify-center items-center text-white">
        <div>
          {console.log(userDetails, "mapppppppppppppppppppp")}
          {}
          {userDetails.map((e) => {
            return (
              <>
                <div className="text-white bg-slate-100">
                  {e.userName}
                  {console.log(e.userName, "detailssssssssssss")}
                </div>
                <div className="text-white text-3xl">bosss</div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ViewProfile;
