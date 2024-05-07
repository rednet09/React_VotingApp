import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toast";
import * as Yup from "yup";
const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // const [isAdmin, setIsAdmin] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .nullable(),
    password: Yup.string().required("Password is required").nullable(),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    await validationSchema.validate(input, { abortEarly: false });
    // if (!input.email || !input.password) {
    //   toast.error("All feilds are required");
    //   return;
    // }
    if (input.email === "admin" && input.password === "456") {
      navigate("/admin");
      // : toast("not admin");
      localStorage.setItem("adminLoggedin", true);
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const loggedUser = users.find(
        (user) => user.email === input.email && user.password === input.password
      );
      console.log(loggedUser, "logged user---------------------------");

      if (loggedUser) {
        navigate("/userDashboard");
        toast.success("Login Successfully!");

        localStorage.setItem("loggedin", true);
      } else {
        toast.error("Please check your credentials");
      }
    }
  };

  return (
    <>
      <section>
        <div className="w-40 absolute right-5 top-5">
          {/* <button
            className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
            onClick={() => {
              setIsAdmin(!isAdmin);
            }}
          >
            Admin Login
          </button> */}
        </div>

        <h1 className="text-center text-3xl text-gray-300 mb-4">Voting App</h1>
        <form onSubmit={handleLogin}>
          <div className="w-80 flex justify-center content-center rounded-2xl bg-slate-900">
            <div className="flex flex-col gap-2 p-8 bg-slate-900">
              <p className="text-center text-3xl text-gray-300 mb-4">
                {" "}
                {/* {!isAdmin ? "User Login" : "Admin login"} */}
                Login
              </p>
              <input
                name="email"
                value={input.email}
                onChange={(e) => {
                  setInput({
                    ...input,
                    email: e.target.value,
                  });
                }}
                className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
                type="text"
                placeholder="User Name"
              />
              <input
                name="password"
                value={input.password}
                onChange={(e) => {
                  setInput({
                    ...input,
                    password: e.target.value,
                  });
                }}
                className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
                type="password"
                placeholder="Password"
              />
              <button
                type="submit"
                className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
              >
                Login
              </button>
            </div>
          </div>

          <p className={`text-white text-center `}>
            Don't Have an account ?{" "}
            <Link className="underline" to={"/register"}>
              {" "}
              Register Here
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
