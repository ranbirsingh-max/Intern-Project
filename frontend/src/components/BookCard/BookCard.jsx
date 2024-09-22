import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error removing book from favourites:", error);
    }
  };

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt={data.title} className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
          <p className="text-zinc-400 font-semibold">by {data.author}</p>
          <p className="text-zinc-200 font-semibold text-xl">₹ {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
