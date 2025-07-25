const fs = require("fs");
const path = require("path");

// Read the page.tsx file
const filePath = path.join(__dirname, "..", "app", "page.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Find all headings followed by divs with card grids
const sectionHeadingPattern =
  /<h[12] className="text-\w+ font-bold text-center mb-8">(.*?)<\/h[12]>/g;

// Add section tags around each section
// First, close the already opened sections
content = content.replace(
  /<hr className="my-10 border-t border-gray-300 w-full" \/>/g,
  '</section>\n        <hr className="my-10 border-t border-gray-300 w-full" />'
);

// Create a mapping of section titles to IDs
const sections = [
  { title: "1. Bonding", id: "section-bonding" },
  {
    title: "2. Discovering Stratergy By Design",
    id: "section-strategy-by-design",
  },
  { title: "3. Mindfulness", id: "section-mindfulness" },
  { title: "Barnett - Strategy by Design", id: "section-barnett-strategy" },
  { title: "Barnett - Strategy by Design", id: "section-barnett-strategy-2" },
  { title: "Sorensen - Strategy", id: "section-sorensen-strategy" },
  {
    title: "Jonathan Levav: Thinking inside the box",
    id: "section-levav-thinking",
  },
  {
    title: "Peter - Secrets of silicon valley",
    id: "section-peter-silicon-valley",
  },
  { title: "Demarzo - Finance", id: "section-demarzo-finance" },
  { title: "Jonathan Levav: Choice Architecture", id: "section-levav-choice" },
  { title: "Zoom: Eric Yuan", id: "section-zoom-eric-yuan" },
  { title: "Sorensen: Strategy II", id: "section-sorensen-strategy-2" },
  { title: "Barnett on Growth by Design", id: "section-barnett-growth" },
  { title: "Brian Lowry: LEGO Activity", id: "section-lowry-lego" },
  { title: "Strategic Communication", id: "section-strategic-comm" },
  { title: "Presentation Mastery", id: "section-presentation-mastery" },
  { title: "Acting with Power", id: "section-acting-with-power" },
  { title: "Financial Statements", id: "section-financial-statements" },
  { title: "Barnett: Leading by Design", id: "section-barnett-leading" },
  { title: "AI & Machine Learning Demystified", id: "section-ai-ml" },
  { title: "Finance NPV DCF", id: "section-finance-npv" },
  {
    title: "Valuation and Strategic Finance",
    id: "section-valuation-strategic-finance",
  },
  { title: "Finance", id: "section-finance" },
  {
    title: "Value Creation vs. Value Capture",
    id: "section-value-creation-capture",
  },
  { title: "Performing with Power", id: "section-performing-with-power" },
  { title: "Power & Executive Presence v2", id: "section-power-exec-presence" },
  { title: "Game Theory", id: "section-game-theory" },
  { title: "Culture", id: "section-culture" },
  {
    title: "Purpose, Profit, and the Sustainable Enterprise",
    id: "section-sustainable-enterprise",
  },
  { title: "Self-Awareness", id: "section-self-awareness" },
  { title: "Creativity Workout: Dan - Play", id: "section-creativity-workout" },
  {
    title: "Political risk: Tata Case Study",
    id: "section-tata-political-risk",
  },
  {
    title: "Sorensen: Strategy Mapping",
    id: "section-sorensen-strategy-mapping",
  },
  {
    title: "Sorensen - strategy formulation",
    id: "section-sorensen-strategy-formulation",
  },
  {
    title: "Building Reliable AI Agents with Prof. Monica Lam",
    id: "section-building-ai-agents",
  },
  {
    title: "Wesley - Introduction to marketing",
    id: "section-wesley-marketing",
  },
  {
    title: "Netflix & The Art of Strategic Pivoting",
    id: "section-netflix-pivoting",
  },
  { title: "AI Ethics", id: "section-ai-ethics" },
  { title: "Humor", id: "section-humor" },
  { title: "Crisis", id: "section-crisis" },
  { title: "AAA Value Chain", id: "section-aaa-value-chain" },
  { title: "The 3S Model of Innovation", id: "section-value-chain-innovation" },
];

// Add section opening tags
for (const section of sections) {
  const escapedTitle = section.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const titleRegex = new RegExp(
    `<h[12] className="text-\\w+ font-bold text-center mb-8">${escapedTitle}<\\/h[12]>`,
    "g"
  );

  if (
    section.title !== "1. Bonding" &&
    section.title !== "2. Discovering Stratergy By Design" &&
    section.title !== "3. Mindfulness"
  ) {
    content = content.replace(
      titleRegex,
      `<section id="${section.id}">\n          <h2 className="text-3xl font-bold text-center mb-8">${section.title}</h2>`
    );
  }
}

// Make sure the last section is properly closed
content = content.replace(
  /<\/div>\s*<\/div>\s*<\/main>/,
  "</div>\n        </section>\n      </div>\n    </main>"
);

// Write the updated content back to the file
fs.writeFileSync(filePath, content, "utf8");

console.log("Added section tags to page.tsx");
