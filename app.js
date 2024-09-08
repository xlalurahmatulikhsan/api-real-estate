import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} `);
});
