// import fs from "fs";
// import dotenv from "dotenv";
// import OpenAI from "openai";
// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function parseCV(filePath) {
//   try {
//     const data = new Uint8Array(fs.readFileSync(filePath));

//     const pdf = await pdfjsLib.getDocument({ data }).promise;

//     let text = "";

//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const content = await page.getTextContent();
//       const strings = content.items.map(item => item.str);
//       text += strings.join(" ") + "\n";
//     }

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: `
// Extract structured JSON from this CV:
// - Name
// - Contact
// - Skills
// - Work Experience
// - Education
// - Certifications

// Return ONLY valid JSON.

// CV:
// ${text}
// `,
//         },
//       ],
//       temperature: 0,
//     });

//     return JSON.parse(response.choices[0].message.content);

//   } catch (error) {
//     console.error("CV Parsing Error:", error);
//     throw error;
//   }
// }
 





// export async function parseCV(filePath) {
//   try {
//     const data = new Uint8Array(fs.readFileSync(filePath));

//     const pdf = await pdfjsLib.getDocument({ data }).promise;

//     let text = "";

//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const content = await page.getTextContent();
//       const strings = content.items.map(item => item.str);
//       text += strings.join(" ") + "\n";
//     }

//     // ---- SIMPLE LOCAL PARSING ----

//     const emailMatch = text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
//     const phoneMatch = text.match(/\+?\d[\d\s\-]{7,}/);

//     return {
//       name: text.split("\n")[0]?.trim() || "Not detected",
//       contact: {
//         email: emailMatch ? emailMatch[0] : "Not found",
//         phone: phoneMatch ? phoneMatch[0] : "Not found",
//       },
//       skills: extractSkills(text),
//       rawText: text.substring(0, 2000), // preview
//     };

//   } catch (error) {
//     console.error("CV Parsing Error:", error);
//     throw error;
//   }
// }

// function extractSkills(text) {
//   const commonSkills = [
//     "JavaScript", "React", "Node", "Python", "MongoDB",
//     "Express", "SQL", "HTML", "CSS", "TypeScript",
//     "Next.js", "AWS", "Git"
//   ];

//   return commonSkills.filter(skill =>
//     text.toLowerCase().includes(skill.toLowerCase())
//   );
// }




import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// --- PDF Parser Node ---
export async function pdfParserNode(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str);
    text += strings.join(" ") + "\n";
  }

  return text;
}

// --- Info Extraction Node ---
export function infoExtractionNode(text) {
  const emailMatch = text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
  const phoneMatch = text.match(/\+?\d[\d\s\-]{7,}/);

  const name = text.split("\n")[0]?.trim() || "Not found";

  return {
    name,
    contact: {
      email: emailMatch ? emailMatch[0] : "Not found",
      phone: phoneMatch ? phoneMatch[0] : "Not found",
    },
    rawText: text,
  };
}

// --- Skill Extraction Node ---
export function skillExtractionNode(text) {
  const commonSkills = [
    "JavaScript",
    "React",
    "Node",
    "Python",
    "MongoDB",
    "Express",
    "SQL",
    "HTML",
    "CSS",
    "TypeScript",
    "Next.js",
    "AWS",
    "Git",
  ];

  const skills = commonSkills.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  return { skills };
}

// --- Job Scoring Node (Optional) ---
export function scoringNode(extractedSkills, jobSkills) {
  const matchedSkills = extractedSkills.filter((skill) =>
    jobSkills.includes(skill)
  );
  const score = Math.round((matchedSkills.length / jobSkills.length) * 100);
  return { matchedSkills, score };
}

// --- Full Pipeline Function ---
export async function parseCVPipeline(filePath, jobSkills = []) {
  // 1. PDF Parser Node
  const text = await pdfParserNode(filePath);

  // 2. Info Extraction Node
  const info = infoExtractionNode(text);

  // 3. Skill Extraction Node
  const { skills } = skillExtractionNode(text);

  // 4. Optional scoring
  const scoring = jobSkills.length > 0 ? scoringNode(skills, jobSkills) : {};

  // 5. Return structured output (like JSON from AI)
  return {
    ...info,
    skills,
    ...scoring,
  };
}
