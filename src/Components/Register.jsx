import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toast";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
    phoneNo: "",
  });
  const [errors, setErrors] = useState({});
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .nullable(),
    password: Yup.string().required("Password is required").nullable(),
    phoneNo: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("Phone number is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(input, { abortEarly: false });

      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = [...existingUsers, input];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      const alredyRegistered = existingUsers.find(
        (user) => user.email === input.email
      );
      if (alredyRegistered) {
        toast.error("You've already registred");
      } else {
        navigate("/");
        toast.success("Registered Successfully");
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
      <form onSubmit={handleSubmit}>
        <div className="w-80 flex justify-center content-center rounded-2xl bg-blue-900">
          <div className="flex flex-col gap-2 p-8 bg-blue-900">
            <p className="text-center text-3xl text-white mb-4">Register</p>
            <input
              name="username"
              value={input.username}
              onChange={(e) => {
                setInput({
                  ...input,
                  username: e.target.value,
                });
              }}
              className={`bg-slate-900 w-full rounded-lg border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white`}
              type="text"
              placeholder="User Name"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
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
              } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white`}
              type="email"
              placeholder="Email Address"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <input
              name="phoneNo"
              value={input.phoneNo}
              onChange={(e) => {
                setInput({
                  ...input,
                  phoneNo: e.target.value,
                });
              }}
              className={`bg-slate-900 w-full rounded-lg border ${
                errors.phoneNo ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white`}
              type="text"
              placeholder="Phone Number"
            />
            {errors.phoneNo && <p className="text-red-500">{errors.phoneNo}</p>}
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
              } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white`}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <button
              type="submit"
              className="inline-block cursor-pointer rounded-md bg-white px-4 py-3.5 text-center text-sm font-semibold uppercase text-black transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
            >
              Register
            </button>
          </div>
        </div>
        <p className="text-white text-center">
          Already have an account?{" "}
          <Link className="underline" to={"/"}>
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default Register;
