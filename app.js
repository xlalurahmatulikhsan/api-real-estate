import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} `);
});
