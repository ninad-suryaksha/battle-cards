# Battle Cards Section Addition Guide

## Complete Step-by-Step Instructions for Adding New Battle Card Sections

This guide documents the exact process for adding new battle card sections to the battle cards application, based on how "Network Effects - Part 2" was successfully added.

## Overview of the Process

When adding a new battle card section, you need to:

1. Create the card data array with proper structure
2. Add the section HTML with consistent formatting
3. Ensure proper placement and spacing
4. Follow existing naming conventions

## Step-by-Step Instructions

### Step 1: Analyze the Provided Content

When the user provides new battle card content, it typically comes in this format:

```
Section Title: "Network Effects - Part 2"

Card 1:
Title: "Going After a Niche Side of the Market"
Insight: [The main insight]
Supporting Points: [List of points]
Actionable Tactics: [List of tactics]

Card 2: [Similar structure]
```

### Step 2: Create the Card Data Array

1. **Open the main file**: `app/page.tsx`

2. **Find the location**: Look for other card arrays (like `section2Cards`, `barnettCards`, etc.) to understand the pattern

3. **Create the new array**: Add your new card array following this exact structure:

```typescript
const networkEffect2Cards: BattleCardProps[] = [
  {
    title: "Card Title Here",
    titleEmoji: "🎯", // Choose relevant emoji
    what: {
      point: "The main insight from the user's content",
      emoji: "💡", // Always use 💡 for what
    },
    why: {
      points: [
        "First supporting point from user content",
        "Second supporting point from user content",
        "Third supporting point if provided",
      ],
      emoji: "📝", // Always use 📝 for why
    },
    how: {
      points: [
        "First actionable tactic from user content",
        "Second actionable tactic from user content",
        "Third actionable tactic from user content",
      ],
      emoji: "⚙️", // Always use ⚙️ for how
    },
  },
  // Add more cards following the same structure
];
```

### Step 3: Choose Appropriate Emojis

For each card, select a unique `titleEmoji` that represents the concept:

- 🎯 for targeting/focus concepts
- 🔄 for loops/cycles
- 🧰 for toolkits/frameworks
- 📊 for data/analysis concepts
- ⚖️ for balance/forces concepts
- 📝 for reviews/feedback concepts

**Fixed emojis** (never change these):

- `what.emoji`: Always "💡"
- `why.emoji`: Always "📝"
- `how.emoji`: Always "⚙️"

### Step 4: Structure the Content Properly

**Content Mapping Rules:**

- `title`: Use the exact title provided by user
- `what.point`: Use the "Insight" or main point from user content
- `why.points`: Use the "Supporting Points" from user content
- `how.points`: Use the "Actionable Tactics" from user content

**Important formatting notes:**

- Keep all user content word-for-word - don't simplify or shorten
- Maintain proper quotation marks and formatting
- Each point should be a complete sentence/thought

### Step 5: Add the HTML Section

1. **Find the location**: Scroll to the end of the JSX return statement in the Home component

2. **Add before the closing tags**: Insert the new section before `</div>` and `</main>`

3. **Use this exact format**:

```jsx
<hr className="my-10 border-t border-gray-300 w-full" />
<h2 className="text-3xl font-bold text-center mb-8">Section Title Here</h2>
<div className="flex flex-wrap justify-center items-stretch gap-8">
  {yourCardArrayName.map((card, index) => (
    <BattleCard key={index} {...card} />
  ))}
</div>
```

### Step 6: Naming Conventions

**Array naming pattern:**

- Use camelCase
- End with "Cards"
- Be descriptive but concise
- Examples: `networkEffect2Cards`, `battleCardLibraryCards`, `barnettCards`

**Section title formatting:**

- Use the exact title provided by user
- Maintain capitalization as specified
- Examples: "Network Effects - Part 2", "Battle Card Library"

### Step 7: Placement Rules

**Where to add new sections:**

- Always add new sections at the end, before the closing `</div>` and `</main>` tags
- Each section should have a horizontal line separator (`<hr>`) before it
- Maintain consistent spacing and structure

### Step 8: Verification Checklist

Before finishing, verify:

- [ ] Card array is properly structured with all required fields
- [ ] All user content is preserved word-for-word
- [ ] Emojis follow the established pattern
- [ ] HTML section uses consistent formatting
- [ ] Horizontal line separator is included
- [ ] Section title matches user specification
- [ ] Array name follows naming conventions
- [ ] No syntax errors in the code

### Example: Network Effects - Part 2 Implementation

Here's how the "Network Effects - Part 2" section was implemented:

```typescript
// Step 1: Create the card array
const networkEffect2Cards: BattleCardProps[] = [
  {
    title: "Going After a Niche Side of the Market",
    titleEmoji: "🎯",
    what: {
      point:
        "A key method to compete with an established marketplace is to first find and dominate a niche, underserved segment of the market.",
      emoji: "💡",
    },
    why: {
      points: [
        "DoorDash successfully onboarded restaurants by promising them better search rankings than they had on larger, incumbent platforms.",
        "Twitch carved out a massive market from YouTube Live by first developing a product specifically tailored to the needs of video game streamers before expanding to other verticals like musicians.",
      ],
      emoji: "📝",
    },
    how: {
      points: [
        "Identify a segment of suppliers on an incumbent's platform that is being neglected or poorly served.",
        "Build a product with tools and features specifically fit for that niche to provide them with superior value.",
        "Focus initial efforts on winning over this single segment to build a strong foothold before broader expansion.",
      ],
      emoji: "⚙️",
    },
  },
  // ... additional cards
];
```

```jsx
// Step 2: Add the HTML section
<hr className="my-10 border-t border-gray-300 w-full" />
<h2 className="text-3xl font-bold text-center mb-8">Network Effects - Part 2</h2>
<div className="flex flex-wrap justify-center items-stretch gap-8">
  {networkEffect2Cards.map((card, index) => (
    <BattleCard key={index} {...card} />
  ))}
</div>
```

## Common Mistakes to Avoid

1. **Don't modify the user's content** - Keep it word-for-word
2. **Don't skip the horizontal line** - Always add `<hr>` before new sections
3. **Don't change the fixed emojis** - what: 💡, why: 📝, how: ⚙️
4. **Don't forget the array name in the map function** - Make sure it matches your array variable name
5. **Don't place sections in the wrong location** - Always add at the end

## File Structure Reference

The main file structure:

```
app/page.tsx
├── Imports
├── Card Data Arrays (add new arrays here)
├── Home Component
│   ├── JSX Return
│   ├── Existing Sections
│   └── New Sections (add here, before closing tags)
```

## Quick Reference Template

For quick copy-paste when adding new sections:

```typescript
const newSectionCards: BattleCardProps[] = [
  {
    title: "TITLE_FROM_USER",
    titleEmoji: "CHOOSE_EMOJI",
    what: {
      point: "INSIGHT_FROM_USER",
      emoji: "💡",
    },
    why: {
      points: [
        "SUPPORTING_POINT_1",
        "SUPPORTING_POINT_2",
        "SUPPORTING_POINT_3",
      ],
      emoji: "📝",
    },
    how: {
      points: [
        "ACTIONABLE_TACTIC_1",
        "ACTIONABLE_TACTIC_2",
        "ACTIONABLE_TACTIC_3",
      ],
      emoji: "⚙️",
    },
  },
];
```

```jsx
<hr className="my-10 border-t border-gray-300 w-full" />
<h2 className="text-3xl font-bold text-center mb-8">SECTION_TITLE_FROM_USER</h2>
<div className="flex flex-wrap justify-center items-stretch gap-8">
  {newSectionCards.map((card, index) => (
    <BattleCard key={index} {...card} />
  ))}
</div>
```

---

## Summary

This process ensures consistency across all battle card sections and maintains the established patterns in the codebase. Always follow these steps exactly to avoid syntax errors and maintain the application's structure.
