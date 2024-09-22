import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import axios from "axios";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const [Values, setValues] = useState({ username: "", password: "", });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      if (Values.username === "" || Values.password === "") {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post("https://intern-project-pki9.onrender.com/api/v1/sign-in", Values);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
        //navigate("/log-in");
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
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 shadow-lg py-5 w-full md:w3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">LogIn</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-200">Username</label>
            <input
            className="w-full bg-zinc-700 rounded-lg px-2 py-1 mt-
            2 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus
            :ring-opacity-50"
            type="text"
            name="username"
            placeholder="username" 
            required
            value={Values.username}
            onChange={change}/>
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-200">Password</label>
            <input
            className="w-full bg-zinc-700 rounded-lg px-2 py-1 mt-
            2 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus
            :ring-opacity-50"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={Values.password}
            onChange={change} />
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-200 hover:text-black" onClick={submit}>
            LogIn</button>
        </div>
        <p className="flex mt-4 itmes-center justify-center text-zinc-200 font-semibold">or</p>
        <p className="flex mt-4 itmes-center justify-center text-zinc-200 font-semibold">
          Don't have an account? &nbsp;
          <Link to="/sign-up" className="text-blue-500 hover:text-blue-200">Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LogIn;
