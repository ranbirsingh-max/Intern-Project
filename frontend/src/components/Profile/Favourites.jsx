import React, { useEffect, useState } from 'react';
import axios from "axios";
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
    const [FavouriteBooks, setFavouriteBooks] = useState([]);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("https://intern-project-pki9.onrender.com/api/v1/get-favourite-books", { headers });
                setFavouriteBooks(response.data.data);
            } catch (error) {
                console.error("Error fetching favourite books:", error);
            }
        };
        fetchBooks();
    }, []);

    if (FavouriteBooks.length === 0) {
        return <div className='text-5xl font-semibold h-[100%] text-zinc-500 flex flex-col items-center justify-center w-full'>
            <h1  className="text-3xl lg:text-6xl font-semibold text-zinc-400">
            No Favourite books
            </h1>
            <img src="/star.png"
              alt="star"
              className="h-[10vh] lg:h-[50vh]"
              />
            </div>;
    } else {
        return (
            <div className='grid lg:grid-cols-4 grid-cols-1 gap-8 h-auto w-screen grid place-items-center'>
                {FavouriteBooks.map((book, index) => (
                    <div key={index}>
                        <BookCard data={book} favourite={true} />
                    </div>
                ))}
            </div>
        );
    }
};

export default Favourites;
