import { useState } from "react";
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

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").nullable(),
    password: Yup.string().required("Password is required").nullable(),
  });

  const handleLogin = async (e) => {
    localStorage.setItem("curentUser", JSON.stringify(input));
    e.preventDefault();
    try {
      if (input.email === "admin" && input.password === "456") {
        navigate("/admin");
        localStorage.setItem("adminLoggedIn", true);
      } else {
        await validationSchema.validate(input, { abortEarly: false });
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const votedUsers = JSON.parse(localStorage.getItem("log")) || [];
        const cantLogin = votedUsers.find((u) => u.email === input.email);
        if (cantLogin) {
          toast.error("You can't vote again");
        } else {
          const loggedUser = users.find(
            (user) =>
              user.email === input.email && user.password === input.password
          );
          if (loggedUser) {
            navigate("/userDashboard");
            toast.success("Login Successfully");
            localStorage.setItem("loggedIn", true);
            const updatedUsers = [...votedUsers, loggedUser];
            localStorage.setItem("log", JSON.stringify(updatedUsers));
          } else {
            setErrors({ ...errors });
            toast.error("Please check your credentials");
          }
        }
      }
    } catch (error) {
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
        <div className="w-40 absolute right-5 top-5"></div>

        <h1 className="text-center text-3xl text-white mb-4">Voting App</h1>
        <form onSubmit={handleLogin}>
          <div className="w-80 flex justify-center content-center rounded-2xl bg-blue-900">
            <div className="flex flex-col gap-2 p-8 bg-blue-900">
              <p className="text-center text-3xl text-white mb-4">Login</p>
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
                placeholder="Email"
              />
              {input.email === ""
                ? errors.email && <p className="text-red-500">{errors.email}</p>
                : ""}

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

              {input.password === ""
                ? errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )
                : ""}

              <button
                type="submit"
                className="inline-block cursor-pointer rounded-md bg-white px-4 py-3.5 text-center text-sm font-semibold uppercase text-black transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
              >
                Login
              </button>
            </div>
          </div>

          <p className={`text-white text-center `}>
            Don't have an account?{" "}
            <Link className="underline" to={"/register"}>
              Register Here
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
