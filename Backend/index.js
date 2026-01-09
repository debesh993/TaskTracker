import express from "express";
import connecttodatabase from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/authRoute.js";
import taskrouter from "./routes/taskRoutes.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connecttodatabase()



app.use(cookieParser());

app.use(cors({
    origin: "https://task-tracker-taupe-sigma.vercel.app/", 
    credentials: true, 
}));
app.use(express.json()); 

app.use("/api/auth",router);
app.use("/api/tasks",taskrouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
