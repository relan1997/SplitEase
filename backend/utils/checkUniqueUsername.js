import { User } from "../models/user.js";
import AppError from "./AppError.js";

const checkUniqueUsername = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            throw new AppError("Username isn't unique", 402);
        }
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        next(err); // Pass the error to Express's global error handler
    }
};

export default checkUniqueUsername;
