import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} `);
});
