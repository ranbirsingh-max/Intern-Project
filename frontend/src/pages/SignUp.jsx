import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [Values, setValues] = useState({ username: "", email: "", password: "", address: "" });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post("https://intern-project-pki9.onrender.com/api/v1/sign-up", Values);
        alert(response.data.message);
        navigate("/log-in");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log("Error response:", error.response.data);
        alert(`Error: ${error.response.data.message || "Something went wrong!"}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message:", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 shadow-lg py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <form onSubmit={submit}>
          <div className="mt-4">
            <div>
              <label htmlFor="username" className="text-zinc-200">Username</label>
              <input
                className="w-full bg-zinc-700 rounded-lg px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50"
                type="text"
                name="username"
                placeholder="Username"
                required
                value={Values.username}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="text-zinc-200">Email</label>
              <input
                className="w-full bg-zinc-700 rounded-lg px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50"
                type="email"
                name="email"
                placeholder="xyz@example.com"
                required
                value={Values.email}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="text-zinc-200">Password</label>
              <input
                className="w-full bg-zinc-700 rounded-lg px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50"
                type="password"
                name="password"
                placeholder="Password"
                required
                value={Values.password}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="address" className="text-zinc-400">Address</label>
              <textarea
                className="w-full bg-zinc-700 rounded-lg px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50"
                name="address"
                placeholder="Address"
                required
                value={Values.address}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-200 hover:text-black" type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">or</p>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Already have an account? &nbsp;
          <Link to="/log-in" className="text-blue-500 hover:text-blue-200">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
