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
  const [errors, setErrors] = useState({
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
    try {
      await validationSchema.validate(input, { abortEarly: false });

      // Validation passed
      if (input.email === "admin" && input.password === "456") {
        navigate("/admin");
        localStorage.setItem("adminLoggedIn", true);
      } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const loggedUser = users.find(
          (user) =>
            user.email === input.email && user.password === input.password
        );

        // const donLogin = JSON.parse(localStorage.getItem("votedUser")) || [];
        // const existingUser = donLogin.find(
        //   (user) => user.email === input.email
        // );
        // if (existingUser) {
        //   toast.error(
        //     "User with this email already exists. Please use a different email."
        //   );
        //   return;
        // }
        if (loggedUser) {
          navigate("/userDashboard");
          toast.success("Login Successfully!");
          localStorage.setItem("loggedIn", true);
        } else {
          // toast.error("Please check your credentials");
          setErrors({ ...errors, password: "Please check your credentials" });
        }
      }
    } catch (error) {
      // Validation failed, handle errors
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
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
                className={`bg-slate-900 w-full rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white`}
                type="text"
                placeholder="User Name"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
              <input
                name="password"
                value={input.password}
                onChange={(e) => {
                  setInput({
                    ...input,
                    password: e.target.value,
                  });
                }}
                className={`bg-slate-900 w-full rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white`}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
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
