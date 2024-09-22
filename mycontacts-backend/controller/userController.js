const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//@description register a contacts
//@routes POST /api/contacts/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already available");
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password : ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User created  ${user}`);
    if (user) {
        res.status(202).json({ _id: user.id, email: user.email });
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user" });
});



//@description login
//@routes POST /api/contacts/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    //compare password with hashedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : "15m"}
        );
        res.status(200).json({ accessToken }); 
    }
    else{
        res.status(401);
        throw new Error("Email or password is Not valid");
    }
});

//@description current user information
//@routes GET /api/contacts/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};

