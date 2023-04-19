const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require ("jsonwebtoken");
const User = require("../models/userModel");

/**
 * @desc Registriert einen neuen Nutzer
 * @route /api/users
 * @param {*} req 
 * @param {*} res 
 */
const registerUser = asyncHandler(async (req, res) => {

    const {name, email, password} = (req.body);

    //Validierung
    if(!name || !email || !password) {
       res.status(400);
       throw new Error("Bitte alle Felder ausfüllen");
    }

    //Nutzer bereits vorhanden?
    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400);
        throw new Error("Nutzer bereits registriert");
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Nutzer anlegen
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Logindaten falsch oder Nutzer nicht vorhanden");
    }
    // res.send("Register Route");
});

/**
 * @desc Login Nutzer
 * @route /api/users/login
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});


    //Check Nutzer vorhanden und Hashe eingegebenes PW und vergleiche es mit dem verschlüsselten PW in der Datenbank
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error("Falsche E-Mail oder Passwort");
    }

    // res.send("Login Route");
});

/**
 * @desc Current Nutzer
 * @route /api/users/me
 * @access Private
 * @param {*} req 
 * @param {*} res 
 */
const getMe = asyncHandler(async (req, res) => {

    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user);
});

//Generiere Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}