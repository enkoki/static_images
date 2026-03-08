"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}: PaginationProps) {
  const startRange = (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Showing <span className="text-zinc-900 dark:text-white">{totalItems === 0 ? 0 : startRange}-{endRange}</span> of <span className="text-zinc-900 dark:text-white">{totalItems}</span> assets
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-xs font-bold uppercase tracking-widest transition-all hover:bg-zinc-50 disabled:opacity-20 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            Prev
          </button>

          <div className="flex items-center gap-1">
            {[...Array(totalPages || 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`h-10 w-10 rounded-lg text-sm font-bold transition-all ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-xs font-bold uppercase tracking-widest transition-all hover:bg-zinc-50 disabled:opacity-20 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}