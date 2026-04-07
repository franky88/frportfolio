"use client";

import { Download } from "lucide-react";

export function ResumeDownload({ name }: { name: string }) {
  const handlePrint = () => {
    document.title = `${name} — Resume`;
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-display font-semibold transition-colors print:hidden btn-gradient"
    >
      <Download size={14} />
      Download PDF
    </button>
  );
}
