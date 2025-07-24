"use client";

import { useState, useEffect, useCallback } from "react";

interface SectionNavigatorProps {
  sectionIds: string[];
  initialSection?: number;
}

export function SectionNavigator({ sectionIds, initialSection = 0 }: SectionNavigatorProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(initialSection);
  const [isVisible, setIsVisible] = useState(false);
  const [showFullNav, setShowFullNav] = useState(false);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      goToNextSection();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      goToPreviousSection();
    } else if (e.key >= '1' && e.key <= '9') {
      // Jump to section 1-9 when pressing number keys
      const sectionIndex = parseInt(e.key) - 1;
      if (sectionIndex < sectionIds.length) {
        jumpToSection(sectionIndex);
      }
    }
  }, [currentSectionIndex, sectionIds]);

  useEffect(() => {
    // Initialize visibility after a short delay
    const timer = setTimeout(() => setIsVisible(true), 500);
    
    // Scroll to initial section on mount
    if (sectionIds.length > 0) {
      scrollToSection(sectionIds[initialSection]);
    }

    // Hide all sections except the initial one
    sectionIds.forEach((id, index) => {
      const section = document.getElementById(id);
      if (section) {
        section.style.display = index === initialSection ? "block" : "none";
      }
    });

    // Add keyboard event listeners
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sectionIds, initialSection, handleKeyDown]);

  const goToNextSection = () => {
    if (currentSectionIndex < sectionIds.length - 1) {
      const nextIndex = currentSectionIndex + 1;
      setCurrentSectionIndex(nextIndex);
      updateVisibleSection(nextIndex);
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      const prevIndex = currentSectionIndex - 1;
      setCurrentSectionIndex(prevIndex);
      updateVisibleSection(prevIndex);
    }
  };

  const updateVisibleSection = (newIndex: number) => {
    // Hide all sections
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        section.style.display = "none";
      }
    });

    // Show current section
    const currentSection = document.getElementById(sectionIds[newIndex]);
    if (currentSection) {
      currentSection.style.display = "block";
      scrollToSection(sectionIds[newIndex]);
    }

    // Update title to match current section
    const sectionTitle = document.querySelector(`#${sectionIds[newIndex]} h1, #${sectionIds[newIndex]} h2`)?.textContent;
    if (sectionTitle) {
      document.title = `Battle Cards | ${sectionTitle}`;
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Smooth scroll to the section
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const jumpToSection = (index: number) => {
    if (index >= 0 && index < sectionIds.length) {
      setCurrentSectionIndex(index);
      updateVisibleSection(index);
    }
  };

  // Only render if we have sections and component is visible
  if (!isVisible || sectionIds.length === 0) {
    return null;
  }

  return (
    <>
      <div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-black bg-opacity-75 rounded-full px-4 py-2 flex items-center space-x-4 section-navigator"
        onMouseEnter={() => setShowFullNav(true)}
        onMouseLeave={() => setShowFullNav(false)}
      >
        {/* Previous button */}
        <button
          onClick={goToPreviousSection}
          disabled={currentSectionIndex === 0}
          className={`p-2 rounded-full nav-button ${
            currentSectionIndex === 0
              ? "text-gray-500 cursor-not-allowed"
              : "text-white hover:bg-white hover:bg-opacity-20"
          }`}
          aria-label="Previous section"
        >
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
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Section indicator */}
        <div className="text-white font-medium text-sm">
          {currentSectionIndex + 1} / {sectionIds.length}
        </div>

        {/* Next button */}
        <button
          onClick={goToNextSection}
          disabled={currentSectionIndex === sectionIds.length - 1}
          className={`p-2 rounded-full nav-button ${
            currentSectionIndex === sectionIds.length - 1
              ? "text-gray-500 cursor-not-allowed"
              : "text-white hover:bg-white hover:bg-opacity-20"
          }`}
          aria-label="Next section"
        >
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
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Expandable section navigator (appears on hover) */}
      {showFullNav && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 bg-black bg-opacity-75 rounded-xl p-4 max-w-md max-h-64 overflow-y-auto">
          <div className="grid grid-cols-6 gap-2">
            {sectionIds.map((_, index) => (
              <button
                key={index}
                onClick={() => jumpToSection(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium section-indicator ${
                  index === currentSectionIndex 
                    ? "bg-blue-500 text-white active" 
                    : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                }`}
                aria-label={`Jump to section ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
} 