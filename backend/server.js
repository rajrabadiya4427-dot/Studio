import express from "express"
import "dotenv/config";
import cors from "cors"
import mongoDB from "./src/config/mongoDB.js";
import userRouter from "./src/router/userRoute.js";
import productRouter from "./src/router/productRoute.js";
import commentRouter from "./src/router/commentRoute.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path"


const app = express();
const port = process.env.PORT || 8000;
const __dirname = path.resolve();


app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/product", productRouter);
app.use("/api/comment", commentRouter);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}



app.listen(port, () => {
  console.log(`server running on port ${port}`);
  mongoDB()
})