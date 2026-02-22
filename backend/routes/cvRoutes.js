// import express from "express";
// import multer from "multer";
// import { parseCV } from "../services/cvServices.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// router.post("/upload", upload.single("cv"), async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const cvData = await parseCV(filePath);
//     res.json({ success: true, data: cvData });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Failed to process CV" });
//   }
// });

// export default router;


import express from "express";
import multer from "multer";
import { parseCVPipeline } from "../services/cvServices.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("cv"), async (req, res) => {
  try {
    const jobSkills = ["JavaScript", "React", "Node"]; // Example
    const result = await parseCVPipeline(req.file.path, jobSkills);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to parse CV" });
  }
});

export default router;
