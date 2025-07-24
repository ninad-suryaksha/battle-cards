import { PdfDownloadButton } from "@/components/pdf-download-button";

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen w-full p-4 sm:p-8">
      <PdfDownloadButton />
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Battle Cards</h1>
        <p className="text-center mb-8">
          Visit <a href="/test" className="text-blue-600 underline">Test Page</a> to see the section navigation in action.
        </p>
      </div>
    </main>
  );
} 