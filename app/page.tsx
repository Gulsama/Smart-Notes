"use client";
import { useState } from "react";
import notesData from "../data/notes.json";
import PdfViewer from "../components/PdfViewer";

export default function HomePage() {
  const [activePdf, setActivePdf] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 py-10 px-4">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
            স্মার্ট নোটস
          </h1>
          <p className="text-slate-300 mt-2 text-lg">
            আপনার পড়াশোনার সঙ্গী, যেকোনো সময়, যেকোনো জায়গায়
          </p>
        </header>
        {notesData.map((batchData, batchIndex) => (
          <div key={batchIndex} className="mb-8 border-slate-800">
            <h2 className="text-2xl font-black text-blue-400 mb-4">
              {batchData.batch}
            </h2>
            <div className="space-y-6">
              {batchData.subjects.map((subject, subjectIndex) => (
                <div
                  key={subjectIndex}
                  className="bg-slate-900 p-5 rounded-xl shadow-lg border border-slate-800"
                >
                  <h3 className="text-xl font-bold text-slate-100 mb-3 pl-4 border-l-4 border-blue-500">
                    {subject.subjectName}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subject.types.map((type, typeIndex) => (
                      <div
                        key={typeIndex}
                        className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                      >
                        <h4 className="font-semibold text-blue-400 mb-2 text-lg">
                          {type.typeName}
                        </h4>
                        <ul className="space-y-2">
                          {type.files.map((file) => (
                            <li
                              key={file.id}
                              className="flex justify-between items-center"
                            >
                              <span className="text-slate-200">
                                {file.title}
                              </span>
                              <button
                                onClick={() => setActivePdf(file.driveId)}
                                className="text-sm rounded bg-blue-500 text-white py-1.5 px-3"
                              >
                                দেখুন
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {activePdf && (
          <PdfViewer fileId={activePdf} onClose={() => setActivePdf(null)} />
        )}
      </div>
    </main>
  );
}
