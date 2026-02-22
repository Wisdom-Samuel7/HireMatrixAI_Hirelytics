import express from "express";
import cors from "cors";
import cvRoutes from "./routes/cvRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express(); 
 
app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js frontend
    methods: ["GET", "POST"],
  })
);       

app.use(cors());
app.use(express.json()); 

app.use("/api/cv", cvRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the CV AI SaaS API");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
