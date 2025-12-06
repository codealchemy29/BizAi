# Design Guidelines: AI Training & Tools Platform

## Design Approach: Modern SaaS Education
**Reference Inspiration:** Linear (clean typography, subtle animations), Notion (content hierarchy), OpenAI/Anthropic sites (trust + approachability)

**Core Principles:**
- **Clarity First:** Educational content must be instantly scannable
- **Progressive Disclosure:** Complex AI concepts revealed in digestible chunks
- **Interactive Confidence:** Tool demonstrations feel powerful but accessible
- **Trust Signals:** Professional polish that reassures non-technical users

## Typography

**Font Stack:**
- **Primary:** Inter (body, UI elements) - clean, technical yet friendly
- **Display:** Space Grotesk or Manrope (headings) - modern, distinctive

**Hierarchy:**
- Hero Headlines: 3.5rem (56px) desktop, 2.25rem (36px) mobile, font-weight 700
- Section Headers: 2.25rem (36px) desktop, 1.875rem (30px) mobile, font-weight 600
- Subsection Titles: 1.5rem (24px), font-weight 600
- Body Text: 1rem (16px), line-height 1.7 for readability
- UI Labels: 0.875rem (14px), font-weight 500

## Layout System

**Spacing Scale:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component internal spacing: p-4, p-6, gap-4
- Section vertical rhythm: py-16 (mobile), py-20 to py-24 (desktop)
- Container max-widths: max-w-7xl (standard), max-w-4xl (content-focused pages like tutorials)

**Grid Strategy:**
- Course cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Tool showcase: grid-cols-1 lg:grid-cols-2 (larger tiles)
- Tutorial content: Single column max-w-3xl for optimal reading

## Component Library

### Navigation
Top navbar with logo left, main links center, "Start Learning" CTA right. Sticky on scroll with subtle backdrop blur. Mobile: hamburger menu with slide-in drawer.

### Hero Section (Homepage)
Full-width hero with **large background image** (abstract AI visualization: neural networks, digital patterns, glowing nodes). Height: 85vh. Content positioned left-aligned with max-w-2xl container. Includes headline, 2-line value prop, dual CTAs ("Explore Courses" primary, "Try Tools" secondary with blurred bg-white/20 backdrop). Trust indicator below CTAs: "Join 50,000+ learners worldwide" with small avatar stack.

### Course Cards
Card components with subtle border, rounded-xl corners, p-6 padding. Include: category badge (top-left), course title, 2-line description, difficulty indicator (Beginner/Intermediate/Advanced with color-coded dots), duration estimate, "Learn More" link. Hover: subtle lift transform and border color intensification.

### AI Tool Interfaces
Interactive demo containers with split layout: left side shows input area (textarea for prompts, parameter controls), right side displays real-time output. Clean separation with vertical divider. Includes "Try It Now" button and usage counter ("1.2M prompts processed").

### Tutorial Pages
Sticky sidebar navigation (left, max-w-xs) listing lesson sections. Main content area (max-w-3xl) with clear heading hierarchy, code blocks with syntax highlighting placeholders, inline concept callouts (bg-blue-50 boxes with left border accent), "Next Lesson" navigation at bottom.

### Playground Section
Full-width container with tabbed interface (multiple AI tools accessible via tabs). Each tab reveals specific tool interface with generous whitespace, clear input/output zones, parameter sliders, example prompts as quick-start buttons.

### Footer
Comprehensive 4-column layout: Company (about, careers), Resources (blog, docs, community), Tools (all tool links), Legal (terms, privacy). Newsletter signup form integrated into footer top with inline email input + subscribe button. Social links and trust badges (if applicable) at bottom.

## Images

**Required Images:**
1. **Hero Background (Homepage):** Abstract AI visualization - flowing neural networks, luminous data streams, gradient mesh patterns. Style: modern, slightly futuristic but not sci-fi. Dimensions: 1920x1080 minimum. Overlay: dark gradient (opacity 40%) for text legibility.

2. **Course Thumbnails:** Unique illustration for each course category (Machine Learning, NLP, Computer Vision). Style: flat geometric illustrations with AI-themed iconography. Dimensions: 400x300, aspect ratio 4:3.

3. **Tool Demo Previews:** Screenshot-style images showing tool outputs (generated text, analyzed images, chatbot conversations). Real or realistic mockups.

4. **Tutorial Diagrams:** Visual explanations of AI concepts (decision trees, neural network architectures). Clean, educational diagram style.

**Image Placement:**
- Hero: Full-width background with content overlay
- Course cards: Top thumbnail image
- Tool showcase: Side-by-side with descriptions
- Resource library: Small thumbnail icons (80x80) next to article links

**Button Treatment on Images:** All buttons placed over hero image use `backdrop-blur-md bg-white/10 border border-white/30` for glass-morphism effect ensuring visibility without obscuring the background.