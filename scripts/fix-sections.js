const fs = require("fs");
const path = require("path");

// Read the page.tsx file
const filePath = path.join(__dirname, "..", "app", "page.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Fix duplicate closing section tags
content = content.replace(
  /\s*<\/section>\s*<\/section>/g,
  "\n        </section>"
);

// Write the fixed content back to the file
fs.writeFileSync(filePath, content, "utf8");

console.log("Fixed duplicate section tags in page.tsx");
