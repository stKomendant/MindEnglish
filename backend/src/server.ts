import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth-server/auth";

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
