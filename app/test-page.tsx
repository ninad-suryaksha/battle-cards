"use client";

import { SectionNavigator } from "@/components/section-navigator";

export default function TestPage() {
  const sectionIds = ["section1", "section2", "section3"];
  
  return (
    <main className="bg-gray-50 min-h-screen p-4">
      <SectionNavigator sectionIds={sectionIds} initialSection={0} />
      
      <section id="section1" className="p-8 bg-white rounded-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">Section 1</h2>
        <p>This is the content for section 1.</p>
      </section>
      
      <hr className="my-8 border-t border-gray-300" />
      
      <section id="section2" className="p-8 bg-white rounded-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">Section 2</h2>
        <p>This is the content for section 2.</p>
      </section>
      
      <hr className="my-8 border-t border-gray-300" />
      
      <section id="section3" className="p-8 bg-white rounded-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">Section 3</h2>
        <p>This is the content for section 3.</p>
      </section>
    </main>
  );
} 