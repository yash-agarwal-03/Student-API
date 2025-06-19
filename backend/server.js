import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import StudentRouter from "./routes/studentRoutes.js";
import cors from "cors";
dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.error("Error connecting to MongoDB", err);
    }
}

app.use(cors());
connectDB();
app.use(express.json());

app.use("/",StudentRouter);

app.listen(PORT,()=>{
    console.log(`Server Up and Running - http://localhost:${PORT}`);
});
