"use client";

import Image from "next/image";
import { useState } from "react";

export default function AssetGrid({ images }: { images: string[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const copy = (fullPath: string) => {
    // Constructing the GitHub Pages URL
    const baseUrl = "https://enkoki.github.io";
    navigator.clipboard.writeText(`${baseUrl}/${fullPath}`);
    setCopied(fullPath);
    setTimeout(() => setCopied(null), 2000);
  };

  // Filter images based on filename or folder name
  const filteredImages = images.filter((path) =>
    path.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      {/* Search Bar Section */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search images or folders (e.g. deerhack)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              CLEAR
            </button>
          )}
        </div>
        <p className="mt-2 pl-2 text-[10px] text-zinc-400 uppercase tracking-widest">
          Found {filteredImages.length} matches
        </p>
      </div>

      {/* The Grid */}
      <main className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filteredImages.map((path) => {
          const parts = path.split('/');
          const folder = parts.length > 1 ? parts[0] : "root";
          const fileName = parts.pop();

          return (
            <div
              key={path}
              onClick={() => copy(path)}
              className="group relative flex flex-col items-center rounded-lg border border-zinc-200 bg-white p-2 transition-all hover:border-blue-400 dark:border-zinc-800 dark:bg-zinc-900 cursor-pointer"
            >
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={`/${path}`}
                  alt={fileName || ""}
                  fill
                  className="object-contain p-2 transition-transform group-hover:scale-110"
                />
              </div>
              
              <div className="mt-2 w-full px-1">
                <p className="truncate text-center text-[9px] font-bold text-blue-500 uppercase opacity-70">
                  {folder}
                </p>
                <p className="truncate text-center text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                  {copied === path ? (
                    <span className="text-green-500 font-bold uppercase tracking-tighter">Copied Link!</span>
                  ) : (
                    fileName
                  )}
                </p>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity group-hover:opacity-100 rounded-lg text-center px-2">
                 <span className="text-[10px] text-white font-mono break-all leading-relaxed px-2">
                   Copy: /{path}
                 </span>
              </div>
            </div>
          );
        })}
      </main>

      {filteredImages.length === 0 && (
        <div className="mt-20 text-center">
          <p className="text-zinc-400">No assets match "{search}"</p>
        </div>
      )}
    </section>
  );
}