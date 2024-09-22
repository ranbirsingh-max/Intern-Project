import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch =async () => {
      const res = await axios.get(
      "http://localhost:1000/api/v1/get-user-cart",
      { headers }
  );
    setCart(res.data.data);
  };
  fetch();
  },[Cart]);
  const deletItem  =  async (bookid) => {
    const response = await axios.put(`https://intern-project-pki9.onrender.com/api/v1/remove-from-cart/${bookid}`,
      {},{headers}
    );
    alert(response.data.message);
  };
  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  },[Cart]);
  const PlaceOrder = async () => {
    try {
      console.log("Placing order with payload:", { order: Cart }); // Log the payload
      const response = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: Cart },
        { headers }
      );
      console.log("Order placed successfully:", response.data);
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Error placing order:", error);
  
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        alert(`Error: ${error.response.data.message || 'Something went wrong'}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        console.error("Error setting up request:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
  
  return (
    <div className="bg-zinc-900 px-12  h-[100%] py-8">
      {!Cart && <div className="w-full h-[100%] flex items-center justify-center"><Loader /></div>}
        {Cart && Cart.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex items-center justify-center flex-col">
              <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                Empty Cart
              </h1>
              <img src="/empty-cart.png"
              alt="empty-cart"
              className="lg:h-[50vh]"
              />

            </div>

          </div>
        )}
        {Cart && Cart.length > 0 && (
          <>
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              Your Cart
            </h1>
            {Cart.map((items, i) => (
              <div className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center" key={i}>
                <img 
                src={items.url}
                alt="/"
                className="h-[200] md:h-[10vh] object-cover"
                />
                <div className="w-full md:w-auto">
                  <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                    {items.title}
                  </h1>
                  <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                    {items.desc.slice(0,100)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                    {items.desc.slice(0,65)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                    {items.desc.slice(0,100)}...
                  </p>
                </div>
                <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                  <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  ₹ {items.price}
                  </h2>
                  <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deletItem(items._id)}>
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        {Cart && Cart.length > 0 && (
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-3xl text-zinc-200 font-semibold">
                Total Amount
              </h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>{Cart.length} Books</h2> <h2>₹ {Total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <button
                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
                onClick={PlaceOrder}>
                  Place Your Order
                </button>
              </div>
            </div>  
          </div>
        )}
    </div>
  );
};

export default Cart;
