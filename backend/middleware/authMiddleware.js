const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            //Get Token aus Header
            token = req.headers.authorization.split(" ")[1];
            //Token verifizieren
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //Nutzer von Token
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch(error) {
            console.log(error);
            res.status(401);
            throw new Error("Nicht authorisiert");
        }
    }

    if(!token) {
        res.status(401);
        throw new Error("Nicht authorisiert");
    }
    
});

module.exports = {
    protect
}