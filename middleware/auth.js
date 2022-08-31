const jwt = require("jsonwebtoken");
const CError = require("../errors/custom-error");
require("dotenv").config();
const { unauthenticated } = require("../errors");

const authenticationMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new unauthenticated("No Token provided");
    }

    const token = authHeader.split(" ")[1];
    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const { id, username } = decoded;
        req.user = { id, username };
        console.log(req.user);
        next();
    } catch (errors) {
        throw new unauthenticated("Not authorized to access this route");
    }
};

module.exports = authenticationMiddleware;