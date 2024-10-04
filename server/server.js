import dotenv from "dotenv"

dotenv.config({
  path : "./server/config/config.env"
})
import app from "./app.js"
import connectDatabase from "./db/dataBase.js"
import { v2 as cloudinary } from "cloudinary";
import { errorMiddleware } from "./middlewares/error.js";
const port = parseInt(process.env.PORT) || 4000;

   

connectDatabase()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    
  })



app.use(errorMiddleware);

  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting Down the server due to Unhandled Promise Rejection ')
  
    server.close(() => {
        process.exit(1)
    })
  })