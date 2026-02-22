// generateTestPDF.js
import fs from "fs";
import PDFDocument from "pdfkit";

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream("test-cv.pdf"));

doc.fontSize(16).text("John Doe");
doc.fontSize(12).text("Email: john.doe@example.com");
doc.text("Phone: +234 812 345 6789");
doc.moveDown();

doc.text("Professional Summary");
doc.text("Full-stack developer with 5 years of experience building web applications using JavaScript, React, Node.js, and MongoDB.");
doc.moveDown();

doc.text("Skills: JavaScript, React, Node.js, Express, MongoDB, SQL, HTML, CSS, TypeScript, Next.js, Git, AWS");
doc.moveDown();

doc.text("Work Experience:");
doc.text("Full Stack Developer | KnowUrTech Solutions | Lagos, Nigeria | Jan 2020 - Present");
doc.text("- Developed SaaS applications for local businesses.");
doc.text("- Built reusable React components and APIs with Node.js.");
doc.text("- Maintained MongoDB and SQL databases for 5+ projects.");
doc.moveDown();

doc.text("Education: BSc Computer Science | University of Lagos | 2013 - 2017");
doc.moveDown();

doc.text("Certifications:");
doc.text("- AWS Certified Developer – Associate");
doc.text("- JavaScript Algorithms and Data Structures – freeCodeCamp");

doc.end();

console.log("test-cv.pdf created!");
