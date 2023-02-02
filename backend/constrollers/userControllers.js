const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../model/userModel");

const registerUser = expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const { name, email, userID, password } = req.body;
    if (!name || !email || !password || !userID) {
        res.status(400);
        throw new Error("Please Enter all the Field");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }
    let uniqueID = new Date().getTime().toString();
    const user = await User.create(
        {
            name,
            email,
            userID,
            password,
            uniqueID,
        }
    );
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            userID: user.userID,
            email: user.email,
            pic: user.pic,
            isAdmin: false,
            uniqueID:user.uniqueID,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Faild to create user");
    }
});
const authUser = expressAsyncHandler(async (req, res) => {
    const { userID, password } = req.body;
    const user = await User.findOne({ userID });
    if (user && (await user.matchPassword(password)) && !user.isAdmin) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            userID: user.userID,
            email: user.email,
            pic: user.pic,
            isAdmin: false,
            uniqueID:user.uniqueID,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("No such user Exists");
    }
});
const authAdmin = expressAsyncHandler(async (req, res) => {
    const { userID, password } = req.body;
    const user = await User.findOne({ userID });
    if (user && (await user.matchPassword(password)) && user.isAdmin) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            userID: user.userID,
            email: user.email,
            pic: user.pic,
            isAdmin: true,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("No such Admin Exists");
    }
});
const sendData = expressAsyncHandler(async (req, res) =>
{
    console.log(req.params.id);
    const id = req.params.id;
    const user = await User.findById(id);
    if (user.uniqueID) {
        res.send(user.uniqueID);
    }
})
module.exports = { registerUser, authUser, authAdmin,sendData }
