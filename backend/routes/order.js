const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

//place 
router.post("/place-order", authenticateToken, async (req, res) => {
    try{
        const {id} = req.headers;
        const {order} = req.body;
        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();
            
            //saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },

            });

            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });

        }
        return res.json({
            status: "success",
            message: "Order placed successfully",
        });
    } catch (error){
        console.log(error);
        return res.json({
            status: "error",
            message: "Something went wrong",
            });
            }
    });

    //get order history of perticular user
    router.get("/get-order-history", authenticateToken, async (req, res) => {
        try{
            const {id} = req.headers;
            const userData = await User.findById(id).populate({
                path: "orders",
                populate: { path: "book" },
            });

            const ordersData = userData.orders.reverse();
            return res.json({
                status: "success",
                data: ordersData,
                });
                } catch (error){
                    console.log(error);
                    return res.status(500).json({
                        message: "An error occurred"
                    });
                    }
    });

    //get-all-orders ---admin
    router.get("/get-all-orders", authenticateToken, async (req, res) => {
        try{
            const userData = await Order.find()
            .populate({
                path: "book",
            })
            .populate({
                path: "user",
            })
            .sort({ createdAt: -1 });
            return res.json({
                status: "success",
                data: userData,
                });
                } catch (error){
                    console.log(error);
                    return res.status(500).json({
                        message: "An error occurred"
                        });
                        }
                        });

    
    //update order --admin 
    router.put("/update-status/:id", authenticateToken, async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body; // Corrected to match the frontend request body
    
            const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
            if (!order) {
                return res.status(404).json({
                    status: "error",
                    message: "Order not found",
                });
            }
    
            return res.json({
                status: "success",
                message: "Order status updated successfully",
                data: order,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: "An error occurred",
            });
        }
    });
    
module.exports = router;
