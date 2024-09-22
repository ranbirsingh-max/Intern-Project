import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";  
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://intern-project-pki9.onrender.com/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBookDetails();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.put("https://intern-project-pki9.onrender.com/api/v1/add-book-to-favourite", {}, { headers });
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding book to favourite:", error);
    }
  };
  const hendleCart = async () => {
    try {
        const response = await axios.put("https://intern-project-pki9.onrender.com/api/v1/add-to-cart",{},{ headers });
        alert(response.data.message);
        } catch (error) {
            console.error("Error adding book to cart:", error);
            }
            };
    const deleteBook = async () => {
        const response = await axios.delete("https://intern-project-pki9.onrender.com/api/v1/delete-book",{ headers });
        alert(response.data.message);
        navigate("/all-books");
    }
  return (
    <>
      {!Data ? (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-3/6">
            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded">
              <img src={Data.url} alt="/" className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded" />
              {isLoggedIn && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  <button
                    className="bg-white round lg:rounded-full text-4xl lg:text-2xl p-2 text-red-500 flex items-center justify-center"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                    <span className="ms-4 block lg:hidden">Add to Favourites</span>
                  </button>
                  <button className="text-white round lg:rounded-full mt-8 md:mt-0 text-4xl lg:text-2xl p-2 lg:mt-8 bg-blue-500 flex items-center justify-center" onClick={hendleCart}>
                    <FaShoppingCart />
                    <span className="ms-4 block lg:hidden">Add to cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  <Link 
                  to={`/updateBook/${id}`}
                  className="bg-white round lg:rounded-full text-4xl lg:text-2xl p-2 flex items-center justify-center">
                    <FaEdit />
                    <span className="ms-4 block lg:hidden">Edit</span>
                  </Link>
                  <button className="text-red-500 round lg:rounded-full text-4xl lg:text-2xl p-2 mt-8 md:mt-0 lg:mt-8 bg-white flex items-center justify-center" 
                  onClick={deleteBook}>
                    <MdOutlineDelete />
                    <span className="ms-4 block lg:hidden">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
            <p className="text-zinc-400 mt-1">by {Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
            <p className="flex text-zinc-400 mt-4 items-center justify-start">
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="text-zinc-100 mt-4 text-3xl font-semibold">Price : ₹ {Data.price}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
