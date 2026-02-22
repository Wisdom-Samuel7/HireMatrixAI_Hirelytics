
"use client";

import { useState } from "react";

interface CVUploadProps {
  onUpload: (data: any) => void;
}

export default function CVUpload({ onUpload }: CVUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };
  
  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("cv", file);
      
      const res = await fetch("http://localhost:8000/api/cv/upload", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) throw new Error("Failed to upload CV");
      
      const data = await res.json();
      onUpload(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center w-full max-w-md mx-auto">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="mb-4"
        />
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-2 px-6 rounded text-white ${
          loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        >
        {loading ? "Processing..." : "Upload CV"}
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}


// "use client";

// import { useState } from "react";

// interface CVUploadProps {
//   onUpload: (data: any) => void; // Function to pass extracted CV data to parent
// }

// export default function CVUpload({ onUpload }: CVUploadProps) {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     setLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append("cv", file);

//       const res = await fetch("http://localhost:8000/api/cv/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Failed to upload CV");

//       const data = await res.json();
//       onUpload(data);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center w-full max-w-md mx-auto">
//       <input
//         type="file"
//         accept=".pdf,.doc,.docx"
//         onChange={handleChange}
//         className="mb-4"
//       />
//       <button
//         className={`mt-2 w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ${
//           loading ? "opacity-70 cursor-not-allowed" : ""
//         }`}
//         onClick={handleUpload}
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Upload CV"}
//       </button>
//       {error && <p className="mt-4 text-red-500">{error}</p>}
//     </div>
//   );
// }

