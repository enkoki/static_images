"use client";

import Image from "next/image";
import { useState } from "react";
import { Pagination } from "./Pagination"; 

export default function AssetGrid({ images }: { images: string[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const BASE_PATH = "/static_images";
  const ITEMS_PER_PAGE = 15;

  const copy = (fullPath: string) => {
    const baseUrl = `https://enkoki.github.io${BASE_PATH}`;
    navigator.clipboard.writeText(`${baseUrl}/${fullPath}`);
    setCopied(fullPath);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredImages = images.filter((path) =>
    path.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentImages = filteredImages.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-[1600px] p-6">
      <div className="mb-12 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search assets (e.g. logo, deerhack)..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-5 text-lg outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>

      <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {currentImages.map((path) => {
          const parts = path.split('/');
          const folder = parts.length > 1 ? parts[0] : "root";
          const fileName = parts.pop();

          return (
            <div
              key={path}
              onClick={() => copy(path)}
              className="group relative flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-4 transition-all hover:border-blue-500 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 cursor-pointer"
            >
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                <Image
                  src={`${BASE_PATH}/${path}`}
                  alt={fileName || ""}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="mt-4 w-full px-1 text-center">
                <p className="truncate text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1 opacity-80">
                  {folder}
                </p>
                <p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {copied === path ? <span className="text-green-500">Copied!</span> : fileName}
                </p>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-zinc-900/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100 p-4">
                 <p className="text-[10px] font-bold text-blue-400 uppercase mb-2">Click to Copy Path</p>
                 <code className="text-xs text-zinc-300 break-all leading-relaxed font-mono">
                   /{path}
                 </code>
              </div>
            </div>
          );
        })}
      </main>

      {filteredImages.length === 0 && (
        <div className="py-20 text-center text-zinc-500 text-lg font-light">
          No matches found for "{search}"
        </div>
      )}

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredImages.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </section>
  );
}