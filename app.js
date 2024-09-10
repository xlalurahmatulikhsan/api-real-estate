import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/auth.route.js";
import testRoute from "./src/routes/test.route.js";
import userRoute from "./src/routes/user.route.js";
import postRoute from "./src/routes/post.route.js";
import chatRoute from "./src/routes/chat.route.js";
import messageRoute from "./src/routes/message.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
