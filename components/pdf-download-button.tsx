"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function PdfDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (isGenerating) return;
    
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
      
      // Create a backup simpler method in case the section-by-section fails
      const createFullPDF = async () => {
        try {
          pdf.addPage();
          
          // Capture whole page
          const canvas = await html2canvas(mainElement, {
            scale: 1.5,
            useCORS: true,
            logging: false,
            allowTaint: true,
            backgroundColor: "#ffffff",
          });
          
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = pageWidth - 2 * margin;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Calculate the number of pages needed
          let heightLeft = imgHeight;
          let position = 0; // Current position in the image
          
          // First page
          pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight, undefined, "FAST");
          heightLeft -= (pageHeight - 2 * margin);
          position = -(pageHeight - 2 * margin); // Negative because we move up in the image
          
          // Add subsequent pages
          while (heightLeft > 0) {
            pdf.addPage();
            pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight, undefined, "FAST");
            heightLeft -= (pageHeight - 2 * margin);
            position -= (pageHeight - 2 * margin);
          }
        } catch (error) {
          console.error("Backup PDF method failed:", error);
          throw error;
        }
      };
      
      try {
        // Try the section-by-section approach first
        let sectionPromises = [];
        
        // Process each section divided by HR elements
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          if (!section) continue;
          
          // Get the section title (h2) and content that follows
          const sectionContainer = document.createElement("div");
          sectionContainer.style.padding = "20px";
          sectionContainer.style.backgroundColor = "#ffffff";
          
          // Find the h2 heading that follows this HR
          let nextElement = section.nextElementSibling;
          if (nextElement && nextElement.tagName === "H2") {
            const heading = nextElement.cloneNode(true) as HTMLElement;
            heading.style.fontSize = "24px";
            heading.style.margin = "0 0 20px 0";
            sectionContainer.appendChild(heading);
          }
          
          // Find the card container that follows
          const followingElement = nextElement?.nextElementSibling || null;
          if (followingElement && followingElement.classList.contains("flex")) {
            sectionContainer.appendChild(followingElement.cloneNode(true));
          }
          
          document.body.appendChild(sectionContainer);
          
          // Add a page for each section
          if (i > 0) pdf.addPage();
          
          const canvas = await html2canvas(sectionContainer, {
            scale: 1.5,
            useCORS: true,
            logging: false,
            allowTaint: true,
            backgroundColor: "#ffffff",
          });
          
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = pageWidth - 2 * margin;
          const imgHeight = Math.min((canvas.height * imgWidth) / canvas.width, pageHeight - 2 * margin);
          
          pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
          
          // Clean up
          document.body.removeChild(sectionContainer);
        }
        
      } catch (error) {
        console.error("Section-by-section PDF failed, using backup method:", error);
        await createFullPDF();
      }
      
      // Save the PDF
      pdf.save("battle-cards.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="fixed right-4 top-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      aria-label="Download as PDF"
      title="Download as PDF"
    >
      {isGenerating ? (
        <span className="animate-pulse text-xl">⏳</span>
      ) : (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path>
        </svg>
      )}
    </button>
  );
} 