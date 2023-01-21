//todo: firstly why? node_modules folder didn't shows up

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from 'path'
import { fileURLToPath } from "url";
import { register } from "./controllers/auth"

/* Configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended : true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File Storage */
const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({storage});

/* Routes with files */ 
app.post("/auth/register", upload.single("picture"), register) //"/auth/register": forntend thing, upload.single("picture"): midleware, register: functionality that we are going to create 'it's controller


// Mongoose Setup //
mongoose.set('strictQuery', false)
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, { // connect to the database from the node server
    useNewUrlParser: true,
    useUnifiedTopology: true,
} ).then (() => {
    app.listen(PORT, () => console.log("Server Port: " + PORT ))
}) 
.catch((error) => console.log(error + " did not not connect"))
