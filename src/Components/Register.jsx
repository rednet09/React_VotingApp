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
  const [isUser, setIsUser] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .nullable(),
    password: Yup.string().required("Password is required").nullable(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await validationSchema.validate(input);
    setIsUser(true);
    if (input.username.trim() === "" || input.password.trim() === "") {
      console.log("Username or password is empty.");
      toast.error("Please Enter All the feilds");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...existingUsers, input];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/");
    toast.success("Registered Successfully");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-80 flex justify-center content-center rounded-2xl bg-slate-900">
          <div className="flex flex-col gap-2 p-8 bg-slate-900">
            <p className="text-center text-3xl text-gray-300 mb-4">Register</p>
            <input
              name="username"
              value={input.username}
              onChange={(e) => {
                setInput({
                  ...input,
                  username: e.target.value,
                });
              }}
              className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
              type="text"
              placeholder="User Name"
            />
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
              type="email"
              placeholder="Email Address"
            />
            <input
              name="phoneNo"
              value={input.phoneNo}
              onChange={(e) => {
                setInput({
                  ...input,
                  phoneNo: e.target.value,
                });
              }}
              className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
              type="number"
              placeholder="Phone Number"
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
