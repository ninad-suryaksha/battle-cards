"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function PdfDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    const pdf = new jsPDF("portrait", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    
    try {
      // Get all section elements (divided by horizontal lines)
      const sections = document.querySelectorAll("hr");
      const mainElement = document.querySelector("main");
      
      if (!mainElement) {
        throw new Error("Main content element not found");
      }

      // Title page - get the first heading
      const title = document.querySelector("h1")?.textContent || "Battle Cards";
      pdf.setFontSize(24);
      pdf.text(title, pageWidth / 2, 100, { align: "center" });
      
      // Add a subtitle
      pdf.setFontSize(14);
      pdf.text("Generated from battle-cards.vercel.app", pageWidth / 2, 130, { align: "center" });
      
      // Add date
      const today = new Date().toLocaleDateString();
      pdf.text(`Generated on: ${today}`, pageWidth / 2, 160, { align: "center" });
      
      pdf.addPage();
      
      // Process each section (between horizontal rules)
      let prevSection = null;
      let sectionPromises = [];
      
      // Add the initial section (before first HR)
      if (sections.length > 0 && sections[0].previousElementSibling) {
        let firstSection = document.createElement("div");
        let currentNode = mainElement.firstElementChild;
        
        while (currentNode && currentNode !== sections[0]) {
          firstSection.appendChild(currentNode.cloneNode(true));
          currentNode = (currentNode.nextElementSibling as Element | null);
        }
        
        sectionPromises.push(
          processSection(firstSection, pdf, pageWidth, pageHeight, margin)
        );
      }
      
      // Process each section divided by HR elements
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const nextSection = i < sections.length - 1 ? sections[i + 1] : null;
        
        let sectionContent = document.createElement("div");
        let currentNode = section.nextElementSibling;
        
        // Add section title (h2 that follows the HR)
        const sectionTitle = currentNode && currentNode.tagName === "H2" ? currentNode : null;
        
        if (sectionTitle) {
          sectionContent.appendChild(sectionTitle.cloneNode(true));
          currentNode = currentNode.nextElementSibling;
        }
        
        // Add remaining content until next HR
        while (currentNode && currentNode !== nextSection) {
          sectionContent.appendChild(currentNode.cloneNode(true));
          currentNode = currentNode.nextElementSibling;
        }
        
        if (sectionContent.hasChildNodes()) {
          sectionPromises.push(
            processSection(sectionContent, pdf, pageWidth, pageHeight, margin)
          );
        }
      }
      
      // Wait for all sections to be processed
      await Promise.all(sectionPromises);
      
      // Save the PDF
      pdf.save("battle-cards.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Process a section and add it to the PDF
  const processSection = async (
    sectionElement: HTMLElement, 
    pdf: jsPDF, 
    pageWidth: number, 
    pageHeight: number, 
    margin: number
  ): Promise<void> => {
    // Add section to DOM temporarily to render it
    sectionElement.style.width = `${pageWidth - 2 * margin}px`;
    sectionElement.style.position = "absolute";
    sectionElement.style.top = "-9999px";
    document.body.appendChild(sectionElement);
    
    try {
      // Convert section to canvas
      const canvas = await html2canvas(sectionElement, {
        scale: 1,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });
      
      // Calculate the number of pages needed for this section
      const imgHeight = canvas.height;
      const imgWidth = canvas.width;
      const ratio = imgWidth / (pageWidth - 2 * margin);
      const scaledHeight = imgHeight / ratio;
      let heightLeft = scaledHeight;
      let position = 0;
      
      // First page of section
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", margin, margin, pageWidth - 2 * margin, scaledHeight, undefined, "FAST");
      heightLeft -= (pageHeight - 2 * margin);
      position = heightLeft - scaledHeight; // Negative value
      
      // Add additional pages if the section doesn't fit on one page
      while (heightLeft > 0) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, pageWidth - 2 * margin, scaledHeight, undefined, "FAST");
        heightLeft -= (pageHeight - 2 * margin);
        position -= (pageHeight - 2 * margin);
      }
      
      // Always add a new page after each section
      pdf.addPage();
    } finally {
      // Remove the temporary element
      if (document.body.contains(sectionElement)) {
        document.body.removeChild(sectionElement);
      }
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="fixed right-4 top-4 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
      aria-label="Download as PDF"
      title="Download as PDF"
    >
      {isGenerating ? (
        <span className="animate-pulse">⏳</span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v8l4-4" />
          <path d="M12 2v8l-4-4" />
          <path d="M21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5" />
          <line x1="12" y1="10" x2="12" y2="22" />
        </svg>
      )}
    </button>
  );
} 