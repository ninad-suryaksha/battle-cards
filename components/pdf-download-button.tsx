"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function PdfDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      // Create PDF document with A4 dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10; // margin in mm
      
      // Add a cover page
      const title = document.querySelector("h1")?.textContent || "Battle Cards";
      pdf.setFontSize(24);
      pdf.text(title, pageWidth / 2, 40, { align: "center" });
      
      pdf.setFontSize(12);
      pdf.text("Generated from battle-cards.vercel.app", pageWidth / 2, 50, { align: "center" });
      
      const today = new Date().toLocaleDateString();
      pdf.text(`Generated on: ${today}`, pageWidth / 2, 60, { align: "center" });
      
      // Get all card sections
      const cardSections = document.querySelectorAll(".flex.flex-wrap.justify-center");
      if (cardSections.length === 0) {
        throw new Error("No card sections found on page");
      }
      
      // Get all section headings
      const sectionHeadings = document.querySelectorAll("h1, h2");
      if (sectionHeadings.length === 0) {
        throw new Error("No section headings found on page");
      }
      
      // Process each section individually
      for (let i = 0; i < sectionHeadings.length; i++) {
        const heading = sectionHeadings[i];
        let section;
        
        // Find the card container that follows this heading
        let sibling = heading.nextElementSibling;
        while (sibling && !sibling.classList.contains("flex")) {
          sibling = sibling.nextElementSibling;
        }
        
        if (sibling && sibling.classList.contains("flex")) {
          section = sibling;
        } else {
          continue; // Skip if we can't find the card section
        }
        
        // Add a new page for each section (except the first)
        if (i > 0) {
          pdf.addPage();
        } else {
          // For the first section, start on page 2
          pdf.addPage();
        }
        
        // Add section heading
        pdf.setFontSize(18);
        pdf.text(heading.textContent || `Section ${i+1}`, margin, margin + 10);
        
        try {
          // Create a temporary container to hold just this section
          const container = document.createElement("div");
          container.style.width = "800px"; // Fixed width for consistent rendering
          container.style.padding = "20px";
          container.style.backgroundColor = "#ffffff";
          container.appendChild(heading.cloneNode(true));
          container.appendChild(section.cloneNode(true));
          
          // Temporarily add to body but keep hidden
          container.style.position = "fixed";
          container.style.top = "-9999px";
          container.style.left = "-9999px";
          document.body.appendChild(container);
          
          // Capture the section as an image
          const canvas = await html2canvas(container, {
            scale: 2, // Higher resolution
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            logging: true,
          });
          
          document.body.removeChild(container);
          
          // Get the image data and add it to the PDF
          const imgData = canvas.toDataURL("image/jpeg", 0.9);
          
          // Calculate dimensions to fit on page
          const imgWidth = pageWidth - (margin * 2);
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Add to PDF, starting below the heading
          pdf.addImage(
            imgData, 
            "JPEG", 
            margin, 
            margin + 15, 
            imgWidth, 
            Math.min(imgHeight, pageHeight - margin - 25) // Ensure it fits on page
          );
          
          // If the image is too tall, add additional pages
          if (imgHeight > pageHeight - margin - 25) {
            let remainingHeight = imgHeight - (pageHeight - margin - 25);
            let position = -(pageHeight - margin - 25);
            
            while (remainingHeight > 0) {
              pdf.addPage();
              
              pdf.addImage(
                imgData,
                "JPEG",
                margin,
                position,
                imgWidth,
                imgHeight
              );
              
              remainingHeight -= (pageHeight - (margin * 2));
              position -= (pageHeight - (margin * 2));
            }
          }
          
        } catch (error) {
          console.error(`Error processing section ${i}:`, error);
          // Continue with next section instead of failing completely
        }
      }
      
      // Save the PDF file
      pdf.save("battle-cards.pdf");
      
    } catch (error) {
      console.error("PDF generation failed:", error);
      
      // Create a fallback simple PDF if everything else fails
      try {
        const simplePdf = new jsPDF();
        simplePdf.setFontSize(22);
        simplePdf.text("Battle Cards", 105, 20, { align: "center" });
        
        simplePdf.setFontSize(12);
        simplePdf.text("Sorry, we couldn't generate a complete PDF.", 105, 40, { align: "center" });
        simplePdf.text("Please try again with a different browser.", 105, 50, { align: "center" });
        
        simplePdf.save("battle-cards-simple.pdf");
      } catch (e) {
        alert("Failed to generate PDF. Please try a different browser.");
      }
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