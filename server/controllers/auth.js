import bcrypt from ""; //help to encrypt the pw
import jwt from "jsonwebtoken"; // send a web authentication
import User from "../models/User";

/* Register User */
export const register =  async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)
    }  catch (err) {

    }
}