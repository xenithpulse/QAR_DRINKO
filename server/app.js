import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express()

app.use(cors({
    origin: 'http://localhost:3001', // Ensure this is the correct origin of your frontend
    credentials: true
  }));
  
app.use(cookieParser(
   
))

app.use(express.json({ extended: false, limit: '50mb' }))

app.use(express.urlencoded({extended:true,limit: "16kb"}))

import productRouter from "./routes/productRoute.js";
import messageRouter from "./routes/messageRoute.js";
import adminRouter from "./routes/AdminRoutes.js";


app.use("/api/v1",productRouter)
app.use("/api/v1",messageRouter)
app.use("/api/v1",adminRouter)



  // For Hosting 
import path from 'path';
import { fileURLToPath } from 'url';



// Derive __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle all other routes by sending the main index.html file
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});



export default app;  