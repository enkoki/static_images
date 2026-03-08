import fs from "fs";
import path from "path";
import AssetGrid from "@/app/components/AssetGrid";

export default function Home() {
  const publicDir = path.join(process.cwd(), "public");
  
  const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      } else {
        if (/\.(jpe?g|png|gif|svg|webp|avif)$/i.test(file) && !file.includes('favicon')) {
          const relativePath = path.relative(publicDir, filePath).replace(/\\/g, '/');
          arrayOfFiles.push(relativePath);
        }
      }
    });

    return arrayOfFiles;
  };

  const images = fs.existsSync(publicDir) ? getAllFiles(publicDir) : [];

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-zinc-950 font-sans">
      <header className="mb-10 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-zinc-900 uppercase tracking-tighter dark:text-zinc-50">
          Static Asset Library
        </h1>
        <p className="text-zinc-500">
          Showing <span className="font-mono font-bold text-blue-500">{images.length}</span> assets across all folders
        </p>
      </header>

      <AssetGrid images={images} />

      {images.length === 0 && (
        <div className="mt-20 text-center text-zinc-400">
          <p>No images found in <code className="text-zinc-600 dark:text-zinc-400">public/</code></p>
          <p className="text-sm mt-2 font-medium">Create folders like <span className="italic">deerhack23</span> to begin.</p>
        </div>
      )}
    </div>
  );
}