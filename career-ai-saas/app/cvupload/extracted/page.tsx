import { useState } from "react";
import CVUpload from "../page";

export default function Home() {
  const [cvData, setCvData] = useState(null);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Upload Your CV</h1>
      <CVUpload onUpload={(data) => setCvData(data)} />

      {cvData && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Extracted CV Info</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(cvData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
