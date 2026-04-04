"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface Props {
  value?: string;
  onChange: (url: string) => void;
  onClear: () => void;
}

export function ImageUpload({ value, onChange, onClear }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });

    if (!res.ok) {
      setError("Upload failed. Try again.");
      setUploading(false);
      return;
    }

    const data = await res.json();
    onChange(data.url);
    setUploading(false);
  };

  if (value) {
    return (
      <div className="relative w-full aspect-video rounded-md overflow-hidden border border-white/10">
        <Image src={value} alt="Cover" fill className="object-cover" />
        <button
          type="button"
          onClick={onClear}
          className="absolute top-2 right-2 p-1.5 rounded-md transition-colors"
          style={{ backgroundColor: "#EF4444", color: "#fff" }}
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <label
        className="flex flex-col items-center justify-center w-full aspect-video rounded-md border-2 border-dashed cursor-pointer transition-colors hover:border-amber"
        style={{ borderColor: "#F5F0E820", backgroundColor: "#F5F0E805" }}
      >
        {uploading ? (
          <span
            className="text-sm font-body animate-pulse"
            style={{ color: "#E8A020" }}
          >
            Uploading…
          </span>
        ) : (
          <>
            <Upload size={20} style={{ color: "#F5F0E8", opacity: 0.4 }} />
            <span
              className="text-xs font-body mt-2"
              style={{ color: "#F5F0E8", opacity: 0.4 }}
            >
              Click to upload cover image
            </span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
          disabled={uploading}
        />
      </label>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}
