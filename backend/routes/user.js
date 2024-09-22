const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
//sign up

router.post("/sign-up", async (req, res) => {
    try {
        const {username,email,password,address} = req.body;
        
        //check username length is more than 4
        if(username.length < 4){
            return res.status(400).json({message:"username must be more than 3 characters"}
            );
        }

        //check username already exists ?
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }
        //check email already exists ?
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Emial already exists" });
        }

        //check password's lenght
        if(password.length <= 5) {
         return res.status(400).json({message:"Password must be more than 5"});
        }
        const hashpass = await bcrypt.hash(password, 10);


        const newUser = new User({
            username: username,
            email: email,
            password: hashpass,
            address: address,
        });
        await newUser.save();
        return res.status(200).json({message:"User created successfully"});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error"});
    }
});

//login

router.post("/sign-in", async (req, res) => {
    try {
        const {username,password} = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            res.status(400).json({ message: "Invalide credentials"});
        }

        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [
                    {name: existingUser.username},
                    {role: existingUser.role},
                ];
                const token = jwt.sign({authClaims}, "bookStore123", {
                    expiresIn: "30d",
                })
                res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token, });
            }
            else {
                res.status(400).json({ message: "Invalide credentials" });
                }
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error"});
    }
});

//get-user-information
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select(" -password ");
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: "Internal server error"});
    }
});

//update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        const data = await User.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({ message:"Address updated successfully"});
        } catch (error) {
            res.status(400).json({ message: "Internal server error"});
            }
            });

module.exports = router;