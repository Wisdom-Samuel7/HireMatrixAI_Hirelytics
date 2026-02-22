"use client";

import { useState } from "react";
import CVUpload from "../../components/CVUpload";
import { saveAs } from "file-saver";

export default function CVUploadPage() {
  const [cvData, setCvData] = useState<any>(null);

  const handleDownload = () => {
    if (!cvData) return;
    const blob = new Blob([JSON.stringify(cvData, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "parsed-cv.json");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white flex flex-col">
      {/* NAVBAR */}
      <nav className="w-full py-6 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-white">
            🚀 KnowUrCraft CV AI SaaS
          </h1>
        </div>
      </nav>

      {/* HERO */}
      <header className="flex flex-col items-center justify-center text-center py-16 space-y-6">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 animate-bounce">
          Turn CVs into Smart Data Instantly
        </h2>
        <p className="text-gray-200 max-w-2xl text-lg md:text-xl">
          Upload CVs, extract structured information, and interact with your data as buttons, tags, and selection points — perfect for modern SaaS dashboards.
        </p>
      </header>

      {/* UPLOAD CARD */}
      <section className="flex justify-center mb-12 px-4">
        <div className="bg-gradient-to-tr from-indigo-800 via-purple-800 to-pink-800 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 w-full max-w-md">
          <CVUpload onUpload={setCvData} />
        </div>
      </section>

      {/* PARSED CV DISPLAY */}
      {cvData && (
        <section className="px-6 pb-12 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400 animate-pulse">
              Extracted CV Data
            </h3>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-black font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
            >
              Download JSON
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(cvData).map(([key, value]) => (
              <div
                key={key}
                className="bg-gradient-to-tr from-indigo-800 via-purple-800 to-pink-800 p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500"
              >
                <h4 className="text-xl font-bold text-pink-300 mb-3">{key}</h4>

                {/* Array values → buttons */}
                {Array.isArray(value) && value.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {value.map((item: any, idx: number) => (
                      <button
                        key={idx}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        {item.toString()}
                      </button>
                    ))}
                  </div>
                ) : typeof value === "object" && value !== null ? (
                  // Object values → interactive selection points
                  <div className="flex flex-col gap-2">
                    {Object.entries(value).map(([subKey, subVal]) => (
                      <div
                        key={subKey}
                        className="flex justify-between items-center bg-indigo-900 p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <span className="font-semibold text-sm text-pink-300">
                          {subKey}
                        </span>
                        <button className="px-2 py-1 bg-purple-600 hover:bg-purple-500 rounded-md text-sm transition-all duration-200">
                          {subVal.toString()}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-200">{value?.toString()}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="w-full mt-auto py-6 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-center text-gray-300">
        © 2026 KnowUrCraft | Built with ❤️ for SaaS MVPs
      </footer>
    </div>
  );
}



              // "use client";
              
              // import { useState } from "react";
              // import CVUpload from "../../components/CVUpload";
              
              // export default function CVUploadPage() {
              //   const [cvData, setCvData] = useState<any>(null);
              
              //   return (
              //     <div className="min-h-screen bg-gray-50 p-8">
              //       <h1 className="text-3xl font-bold mb-6 text-center">Upload Your CV</h1>
              
              //       {/* Upload Component */}
              //       <CVUpload onUpload={(data) => setCvData(data)} />
              
              //       {/* Display extracted CV */}
              //       {cvData && (
              //         <div className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
              //           <h2 className="text-2xl font-semibold mb-4">Extracted CV Info</h2>
              
              //           {/* Render each section as cards */}
              //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              //             {Object.entries(cvData).map(([key, value]) => (
              //               <div
              //                 key={key}
              //                 className="bg-gray-100 p-4 rounded shadow-sm"
              //               >
              //                 <h3 className="font-semibold capitalize mb-2">{key}</h3>
              //                 <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(value, null, 2)}</pre>
              //               </div>
              //             ))}
              //           </div>
              //         </div>
              //       )}
              //     </div>
              //   );
              // }
