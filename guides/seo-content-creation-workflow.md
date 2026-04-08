# SEO Content Creation Workflow: Perplexity Research + AI Writing

> **Complete workflow for SEO research and content creation using Perplexity MCP for research and Claude/AI tools for writing high-quality SEO content.**

## Table of Contents

1. [Overview](#overview)
2. [Setup Requirements](#setup-requirements)
3. [Phase 1: SEO Research with Perplexity](#phase-1-seo-research-with-perplexity)
4. [Phase 2: Content Creation with Claude](#phase-2-content-creation-with-claude)
5. [Content Types & Templates](#content-types--templates)
6. [Best Practices](#best-practices)
7. [Complete Workflow Examples](#complete-workflow-examples)

---

## Overview

This workflow combines the power of **Perplexity AI** for real-time SEO research with **Claude** or other AI tools for creating high-quality, SEO-optimized content.

### Workflow Summary

```
1. Research (Perplexity) → 2. Strategy (Analysis) → 3. Create (Claude) → 4. Optimize (SEO Tools)
```

### Why This Workflow?

- **Perplexity**: Real-time web search, current SERP analysis, competitor research, trending topics
- **Claude**: Long-form content, nuanced writing, brand voice consistency, technical depth
- **SEO Tools**: Schema markup, meta tags, sitemap generation, performance optimization

---

## Setup Requirements

### 1. Install Perplexity MCP Server

```bash
# The Perplexity MCP is already in your catalog
# Location: repos/mcp-servers/perplexity-ai-mcp
```

**Quick Start**: See `recipes/mcp-quick-start.md` for MCP setup instructions.

### 2. SEO Tools from Catalog

Use the SEO resources catalog:

```bash
node recommend-tools-fast.js "SEO tools"
```

**Essential tools**:
- **next-seo** - Meta tags, Open Graph, JSON-LD
- **next-sitemap** - Sitemap generation
- **lighthouse** - Performance & SEO audits
- **contentswift** - Content optimization
- **serpbear** - Rank tracking

### 3. Content Creation Setup

**With Claude**:
- Claude Code CLI (current environment)
- Claude.ai (web interface)
- Claude API (programmatic access)

**Alternative AI Tools**:
- ChatGPT-4
- Gemini Pro
- Local LLMs (Llama, Mistral)

---

## Phase 1: SEO Research with Perplexity

### Step 1: Keyword Research

**Perplexity Prompt Template**:

```
I'm creating content about [TOPIC]. Please help me with keyword research:

1. What are the top 10-15 high-volume, low-competition keywords for [TOPIC]?
2. What are the related long-tail keywords people are searching for?
3. What semantic keywords should I include for topical authority?
4. What questions are people asking about [TOPIC] (People Also Ask)?
5. What's the current search intent for these keywords? (informational, transactional, navigational)

Focus on keywords relevant to [YOUR TARGET AUDIENCE] in [LOCATION if applicable].
```

**Example - Local SEO**:

```
I'm creating content for a plumbing company in Austin, Texas. Please help me with keyword research:

1. What are the top keywords for "emergency plumber Austin"?
2. What related services do people search for? (drain cleaning, water heater, etc.)
3. What questions do people ask about plumbing services?
4. What's the search volume and competition for these terms?
5. What local SEO opportunities exist for Austin plumbing services?
```

**Save Output**: Copy Perplexity's response to a research document.

---

### Step 2: Competitor Analysis

**Perplexity Prompt Template**:

```
Analyze the top 5-10 ranking pages for the keyword "[TARGET KEYWORD]":

1. What topics and subtopics do they cover?
2. What's the average content length?
3. What content format do they use? (how-to, listicle, guide, comparison)
4. What unique angles or perspectives do they take?
5. What are the content gaps I could fill?
6. What media do they include? (images, videos, infographics, tables)
7. What schema markup are they using?
8. What internal and external links do they have?
```

**Example - Service Page**:

```
Analyze the top 10 ranking pages for "SEO services for small business":

1. What services do they highlight?
2. What pricing information do they show?
3. What trust signals do they use? (testimonials, case studies, certifications)
4. What CTAs are most common?
5. How do they structure their service descriptions?
6. What content gaps exist that I could fill?
```

---

### Step 3: Content Strategy Research

**Perplexity Prompt Template**:

```
Help me create a content strategy for [TOPIC]:

1. What are the current trends in [INDUSTRY/NICHE]?
2. What controversial or debated topics exist?
3. What expert insights would add value?
4. What statistics and data should I include?
5. What case studies or examples are relevant?
6. What actionable advice can I provide?
7. What unique perspective can I take that competitors haven't?
```

---

### Step 4: Local SEO Research (for Area/Service Pages)

**Perplexity Prompt Template**:

```
I'm creating local SEO content for [SERVICE] in [CITY/AREA]:

1. What neighborhoods or areas in [CITY] should I target?
2. What local landmarks, zip codes, or districts are important?
3. What local competitors rank well for [SERVICE] in [CITY]?
4. What local questions and concerns do people have?
5. What local events, regulations, or factors affect [SERVICE]?
6. What "near me" variations are people searching?
7. What local schema markup should I implement?
```

**Example**:

```
I'm creating local SEO content for roofing services in Denver, Colorado:

1. What Denver neighborhoods should I create area pages for?
2. What local factors affect roofing in Denver? (weather, hail, snow)
3. What roofing companies rank well in Denver?
4. What local building codes or permits are relevant?
5. What "roofing near me" variations exist?
```

---

### Step 5: SERP Feature Research

**Perplexity Prompt Template**:

```
For the keyword "[TARGET KEYWORD]", analyze current SERP features:

1. Are there featured snippets? What format? (paragraph, list, table)
2. Are there "People Also Ask" boxes? What questions?
3. Are there video carousels? What topics?
4. Are there local packs? (for local keywords)
5. Are there image packs?
6. What schema/rich snippets appear? (reviews, FAQs, how-to, recipes)
7. How can I optimize my content to capture these features?
```

---

## Phase 2: Content Creation with Claude

### Step 1: Create Content Brief

Use your Perplexity research to create a comprehensive brief for Claude:

**Content Brief Template**:

```markdown
# Content Brief: [TITLE]

## Target Keyword
Primary: [keyword]
Secondary: [keyword1, keyword2, keyword3]
Long-tail: [keyword variations]

## Search Intent
[informational/transactional/navigational]

## Target Audience
- Demographics: [age, location, profession]
- Pain points: [list]
- Goals: [list]

## Content Goals
- [ ] Rank for [primary keyword]
- [ ] Answer user questions
- [ ] Drive [conversions/leads/engagement]
- [ ] Establish authority on [topic]

## Competitor Insights
[Summary from Perplexity research]

## Content Structure (from research)
1. [Main topic 1]
2. [Main topic 2]
3. [Main topic 3]
...

## Key Points to Cover
- [Point 1 from research]
- [Point 2 from research]
...

## Required Elements
- [ ] Target word count: [range]
- [ ] Include statistics and data
- [ ] Add actionable tips
- [ ] Include FAQ section
- [ ] Add schema markup notes
- [ ] Internal linking opportunities
- [ ] External authoritative sources

## Tone & Style
[Professional, conversational, technical, friendly, etc.]

## Unique Angle
[Your differentiation from competitors]
```

---

### Step 2: Generate Content with Claude

**Claude Prompt Template**:

```
I need you to write a comprehensive, SEO-optimized [CONTENT TYPE] about [TOPIC].

TARGET KEYWORD: [primary keyword]
WORD COUNT: [target range]
AUDIENCE: [description]
TONE: [professional/conversational/etc.]

CONTENT REQUIREMENTS:
1. Create an engaging, click-worthy title (under 60 characters)
2. Write a compelling meta description (under 160 characters)
3. Structure content with clear H2 and H3 headings using target keywords naturally
4. Include the target keyword in the first paragraph
5. Answer these key questions: [list from Perplexity research]
6. Cover these topics: [from competitor analysis]
7. Include statistics, data, and expert insights
8. Add actionable tips and practical advice
9. Create an FAQ section with [X] common questions
10. End with a strong CTA

UNIQUE ANGLE: [your differentiation]

AVOID:
- Keyword stuffing
- Generic advice
- Fluff content
- Over-optimization

Please write naturally for humans first, SEO second. Focus on providing genuine value.

[Paste your content brief here]
```

---

### Step 3: Optimize Content Structure

**Ask Claude to enhance**:

```
Review this content and optimize the structure for SEO:

1. Improve heading hierarchy (H1, H2, H3) with target keywords
2. Add relevant semantic keywords naturally
3. Optimize paragraph length (2-4 sentences max)
4. Add bullet points and lists for scannability
5. Suggest where to add images, charts, or media
6. Identify opportunities for featured snippets (lists, tables, definitions)
7. Add internal linking suggestions
8. Suggest external authoritative sources to link to

[Paste your draft content]
```

---

### Step 4: Create Meta Tags & Schema

**Claude Prompt**:

```
Create SEO meta tags and JSON-LD schema for this content:

CONTENT: [paste content or summary]
TARGET KEYWORD: [keyword]
PAGE TYPE: [blog post, landing page, service page, etc.]

Please provide:

1. Title tag (50-60 characters, include keyword)
2. Meta description (150-160 characters, compelling, with keyword)
3. Open Graph tags (for social sharing)
4. Twitter Card tags
5. JSON-LD schema (Article, LocalBusiness, Service, FAQ, etc.)
6. Image alt text suggestions

Make it compelling and click-worthy while being accurate.
```

**Example Output Format**:

```html
<!-- Meta Tags -->
<title>Best SEO Services for Small Business | Grow Your Rankings</title>
<meta name="description" content="Professional SEO services tailored for small businesses. Increase organic traffic, improve rankings, and grow revenue. Free consultation available.">

<!-- Open Graph -->
<meta property="og:title" content="Best SEO Services for Small Business">
<meta property="og:description" content="Professional SEO services that help small businesses grow online presence and revenue.">
<meta property="og:image" content="/images/seo-services-hero.jpg">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="SEO Services for Small Business">

<!-- JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SEO Services for Small Business",
  "provider": {
    "@type": "Organization",
    "name": "Your Company Name"
  },
  "description": "Professional SEO services...",
  "areaServed": "United States"
}
</script>
```

---

## Content Types & Templates

### 1. Blog Post (Informational)

**Research Phase (Perplexity)**:

```
Research for blog post: "[TOPIC]"

1. What are the top 10 questions people ask about [TOPIC]?
2. What trending subtopics exist?
3. What statistics and data points are current?
4. What expert opinions or studies exist?
5. What's the ideal blog post length for this topic?
6. What related topics should I cover for topical authority?
```

**Writing Phase (Claude)**:

```
Write a comprehensive blog post: "[TITLE]"

TARGET KEYWORD: [keyword]
WORD COUNT: 1,500-2,500 words
FORMAT: How-to guide / Listicle / Ultimate guide

STRUCTURE:
- Attention-grabbing introduction
- Table of contents (for long posts)
- [X] main sections with H2 headings
- Actionable tips and examples
- FAQ section (5-8 questions)
- Conclusion with CTA

Include:
- Statistics from recent studies
- Expert quotes or insights
- Real-world examples
- Step-by-step instructions
- Visual content suggestions (images, diagrams)

[Paste research from Perplexity]
```

---

### 2. Service Page (Transactional)

**Research Phase (Perplexity)**:

```
Research for service page: "[SERVICE NAME]"

1. What are high-intent keywords for [SERVICE]?
2. What information do potential customers need before buying?
3. What objections or concerns do people have?
4. What differentiators matter to customers?
5. What pricing information should be included?
6. What trust signals are most effective?
7. What CTA language converts best?
```

**Writing Phase (Claude)**:

```
Write a high-converting service page for: "[SERVICE NAME]"

TARGET KEYWORD: [service + location/modifier]
GOAL: Generate qualified leads

REQUIRED SECTIONS:
1. Hero section (H1 with keyword, compelling subheading, CTA)
2. Service overview (what it is, who it's for)
3. Benefits (results-focused, not features)
4. How it works (process breakdown)
5. Pricing/packages (if applicable)
6. Why choose us (differentiators)
7. Social proof (testimonials, case studies)
8. FAQ section
9. Final CTA

TONE: Professional yet approachable
FOCUS: Benefits, results, and trust-building

[Paste research]
```

**Service Page Schema (Claude)**:

```
Create Service schema markup for: [SERVICE]

Include:
- Service name and description
- Provider organization
- Service type
- Area served
- Price range (if applicable)
- Aggregate rating (if you have reviews)
```

---

### 3. Local Area Page (Local SEO)

**Research Phase (Perplexity)**:

```
Research for local area page: "[SERVICE] in [CITY/NEIGHBORHOOD]"

1. What are local search terms people use? ("[service] near [landmark]")
2. What local competitors rank well?
3. What local information is relevant? (demographics, events, landmarks)
4. What neighborhood-specific concerns exist?
5. What local directories or citations should I target?
6. What local schema markup should I use?
7. What "near me" opportunities exist?
```

**Writing Phase (Claude)**:

```
Write a local area page for: "[SERVICE] in [SPECIFIC AREA]"

TARGET KEYWORD: [service] in [area]
PURPOSE: Rank for local searches and drive local leads

REQUIRED ELEMENTS:
1. H1: [Service] in [Area] (include city, neighborhood, or zip code)
2. Local introduction (mention specific area, landmarks, streets)
3. Why we serve this area (local expertise, proximity)
4. Service details specific to area (local regulations, considerations)
5. Local testimonials or case studies
6. Service area map (mention)
7. Local FAQs
8. Local business hours/contact
9. Nearby areas we serve (internal links)

LOCALIZATION:
- Mention 5-10 local landmarks, neighborhoods, or streets
- Reference local zip codes
- Include local images (mention needed)
- Add area-specific benefits

AVOID: Generic content copied from other location pages

[Paste local research]
```

**Local Business Schema (Claude)**:

```
Create LocalBusiness schema for: [BUSINESS] in [CITY]

Include:
- Business name
- Address (street, city, state, zip)
- Phone number
- Service area (geo coordinates or areas served)
- Opening hours
- Price range
- Services offered
- Review aggregate rating
```

---

### 4. Landing Page (Campaign-Specific)

**Research Phase (Perplexity)**:

```
Research for landing page: "[OFFER/CAMPAIGN]"

1. What pain points does [TARGET AUDIENCE] have?
2. What objections prevent conversion?
3. What value propositions resonate most?
4. What social proof is most effective?
5. What CTA language converts best?
6. What page elements drive conversions? (videos, forms, guarantees)
7. What's the optimal page length for this offer?
```

**Writing Phase (Claude)**:

```
Write a high-converting landing page for: "[OFFER]"

TARGET AUDIENCE: [description]
GOAL: [leads, sales, signups]
TRAFFIC SOURCE: [PPC, social ads, email, organic]

STRUCTURE:
1. Hero (headline, subheadline, CTA, hero image)
2. Problem agitation (pain points)
3. Solution introduction (your offer)
4. Benefits (3-5 key benefits, not features)
5. How it works (3-4 steps)
6. Social proof (testimonials, logos, stats)
7. Features (detailed breakdown)
8. Objection handling (FAQ or guarantees)
9. Final CTA (strong, action-oriented)

CONVERSION ELEMENTS:
- Multiple CTAs (above fold, mid-page, bottom)
- Trust badges (certifications, awards, security)
- Urgency/scarcity (if applicable)
- Risk reversal (guarantee, free trial)

TONE: Direct, benefit-focused, persuasive

[Paste research]
```

---

### 5. FAQ Page (Featured Snippet Optimization)

**Research Phase (Perplexity)**:

```
Research for FAQ page about: "[TOPIC]"

1. What are the top 20-30 questions people ask about [TOPIC]?
2. What "People Also Ask" questions appear in SERPs?
3. What question format appears in featured snippets? (how, what, why, when)
4. What related questions exist?
5. What answer length works best? (40-60 words for snippets)
6. What question categories can I create?
```

**Writing Phase (Claude)**:

```
Create a comprehensive FAQ page for: "[TOPIC]"

TARGET: Capture featured snippets and answer user questions

REQUIREMENTS:
1. Organize questions into 4-6 logical categories
2. Include 20-30 total questions
3. Write concise answers (40-60 words for snippet optimization)
4. Use question format in H2 or H3 tags
5. Include keywords naturally in questions and answers
6. Link to detailed content where applicable
7. Add schema markup notes

ANSWER FORMAT:
- Start with direct answer (first 1-2 sentences)
- Add context or details
- Include actionable next steps

[Paste question research]
```

**FAQ Schema (Claude)**:

```
Create FAQ schema markup for these questions:

[Paste FAQ content]

Format as JSON-LD with @type FAQPage
```

---

### 6. Product Comparison / Review

**Research Phase (Perplexity)**:

```
Research for comparison/review: "[PRODUCT A] vs [PRODUCT B]"

1. What features do people compare?
2. What pricing information is available?
3. What pros/cons do users mention?
4. What use cases favor each option?
5. What third-party reviews exist?
6. What questions appear in "vs" searches?
7. What buyer intent keywords exist?
```

**Writing Phase (Claude)**:

```
Write a comprehensive comparison: "[PRODUCT A] vs [PRODUCT B]"

TARGET KEYWORD: [product a] vs [product b]
PURPOSE: Help buyers make informed decisions

STRUCTURE:
1. Introduction (what we're comparing, who it's for)
2. Quick comparison table (side-by-side features)
3. Detailed breakdown:
   - Features comparison
   - Pricing comparison
   - Pros and cons
   - Use cases (when to choose each)
   - User reviews summary
4. Winner/recommendation (with caveats)
5. FAQ
6. CTA (affiliate link or lead magnet)

Be unbiased and data-driven. Include real user feedback.

[Paste research]
```

---

## Best Practices

### Content Quality Checklist

**Before Publishing, Verify**:

- [ ] **Keyword Optimization**: Primary keyword in title, H1, first paragraph, meta description
- [ ] **Heading Structure**: Clear H1, H2, H3 hierarchy with keywords
- [ ] **Content Length**: Matches or exceeds top competitors (typically 1,500-2,500+ words)
- [ ] **Readability**: Short paragraphs, bullet points, clear language (8th-grade reading level)
- [ ] **Value**: Answers user questions, provides actionable advice
- [ ] **Uniqueness**: Original insights, not regurgitated competitor content
- [ ] **Media**: Images with alt text, videos, infographics, tables
- [ ] **Internal Links**: 3-5 relevant internal links
- [ ] **External Links**: 2-3 authoritative sources
- [ ] **CTA**: Clear next step for readers
- [ ] **Mobile-Friendly**: Short paragraphs, scannable format
- [ ] **Schema Markup**: Appropriate structured data added
- [ ] **Meta Tags**: Optimized title and description
- [ ] **URL**: Short, descriptive, includes keyword

---

### SEO Writing Tips

**Do**:
- Write for humans first, search engines second
- Use natural language and conversational tone
- Include semantic keywords (LSI keywords)
- Answer questions comprehensively
- Use examples and case studies
- Add data and statistics with sources
- Update content regularly
- Match search intent

**Don't**:
- Keyword stuff or over-optimize
- Copy competitor content
- Write thin, low-value content
- Use AI-generated content without editing
- Ignore user experience
- Forget mobile optimization
- Skip schema markup
- Neglect internal linking

---

### AI Writing Best Practices

**Using Claude Effectively**:

1. **Provide Context**: Give detailed briefs, research, and examples
2. **Iterate**: Start with outline, then expand sections
3. **Edit AI Output**: Always review and add human insights
4. **Maintain Voice**: Provide brand voice examples
5. **Fact-Check**: Verify statistics and claims
6. **Add Personality**: Inject unique perspectives and stories
7. **Break It Down**: Write in sections for better quality
8. **Use Examples**: Give Claude examples of your best content

**Multi-Step Workflow**:

```
1. Claude: Generate outline from research
2. Review and refine outline
3. Claude: Write section 1
4. Review, edit, add insights
5. Claude: Write section 2
6. Continue iteratively
7. Claude: Generate FAQ, meta tags, schema
8. Final human review and polish
```

---

## Complete Workflow Examples

### Example 1: Blog Post Workflow

**Step 1 - Research (Perplexity)**:

```
I'm writing a blog post about "how to improve website speed in 2025"

1. What are the top ranking blog posts covering this topic?
2. What do they cover that I must include?
3. What new speed optimization techniques emerged in 2024-2025?
4. What Core Web Vitals metrics matter most?
5. What tools do experts recommend?
6. What statistics exist about page speed impact on conversions?
```

**Step 2 - Analyze Results**:

- Copy Perplexity findings to notes
- Identify content gaps
- List must-cover topics
- Note unique angles

**Step 3 - Create Brief**:

```markdown
# Content Brief: How to Improve Website Speed in 2025

## Keywords
- Primary: improve website speed
- Secondary: page speed optimization, core web vitals, website performance
- Long-tail: how to make website load faster, improve LCP, reduce CLS

## Structure (from research)
1. Why page speed matters (stats, UX, SEO)
2. Core Web Vitals explained
3. Speed testing tools
4. 15 optimization techniques
5. Advanced optimizations
6. Monitoring and maintenance
7. FAQ

## Unique Angle
Focus on 2025-specific techniques (View Transitions API, Speculation Rules, etc.)
```

**Step 4 - Generate Content (Claude)**:

```
Write a comprehensive guide: "How to Improve Website Speed in 2025: 15 Proven Techniques"

TARGET KEYWORD: improve website speed
WORD COUNT: 2,500-3,000 words
AUDIENCE: Web developers and site owners

[Paste content brief and research]

STRUCTURE:
[Paste structure from brief]

Include:
- Statistics about speed impact on conversions
- Code examples for technical optimizations
- Before/after performance metrics
- Tool recommendations with why to use each
- Step-by-step instructions
- FAQ section (8 questions)

TONE: Technical but accessible, educational
```

**Step 5 - Optimize**:

```
Optimize this blog post for featured snippets:

1. Create a summary paragraph (40-60 words) answering "how to improve website speed"
2. Format optimization techniques as a numbered list
3. Add a comparison table of speed testing tools
4. Optimize FAQ answers for snippets

[Paste draft content]
```

**Step 6 - Meta Tags & Schema (Claude)**:

```
Create meta tags and Article schema for this blog post:

[Paste content summary]

Include:
- SEO title (under 60 chars)
- Meta description (under 160 chars)
- Article schema (with author, publish date, etc.)
- FAQ schema
```

**Step 7 - Implementation**:

Use SEO tools from catalog:
- **next-seo** for meta tags
- **react-schemaorg** for schema markup
- **lighthouse** for pre-publish audit

---

### Example 2: Local Service Page Workflow

**Step 1 - Research (Perplexity)**:

```
I'm creating a service page for "AC repair in Phoenix, Arizona"

1. What do the top 10 AC repair companies in Phoenix include on their service pages?
2. What local factors affect AC repair in Phoenix? (extreme heat, common issues)
3. What questions do Phoenix residents ask about AC repair?
4. What pricing information is standard?
5. What trust signals work best for home services?
6. What local keywords should I target? (neighborhoods, zip codes)
7. What schema markup is recommended for home service businesses?
```

**Step 2 - Local Research (Perplexity)**:

```
What are the main neighborhoods and areas in Phoenix that would need AC repair services?

List:
1. Major neighborhoods
2. Popular zip codes
3. Notable landmarks
4. Nearby cities in the metro area
```

**Step 3 - Create Service Page (Claude)**:

```
Write a service page for: "AC Repair in Phoenix, AZ"

TARGET KEYWORD: AC repair Phoenix
SECONDARY: AC repair near me, emergency AC repair Phoenix, Phoenix air conditioning repair

BUSINESS: [Your Company Name]
SERVICE AREA: Phoenix metro area

STRUCTURE:
1. Hero
   - H1: "AC Repair in Phoenix, AZ - 24/7 Emergency Service"
   - Subheading: Fast, reliable AC repair from licensed technicians
   - CTA: "Call Now: (555) 123-4567" or "Request Service"

2. About Our Phoenix AC Repair Service
   - Local expertise (mention years serving Phoenix)
   - Why Phoenix AC systems need special care (extreme heat)
   - Service area coverage (list neighborhoods)

3. Services We Offer
   - Emergency AC repair
   - AC maintenance
   - System diagnostics
   - [other services]

4. Why Choose Us
   - Licensed & insured
   - 24/7 emergency service
   - Same-day service available
   - Upfront pricing
   - [other differentiators]

5. Phoenix Service Areas
   - List 10-12 neighborhoods/areas
   - Link to individual area pages if they exist

6. Pricing & Guarantees
   - Transparent pricing
   - Service guarantee
   - Financing options

7. Testimonials
   - 3-5 Phoenix customer testimonials

8. FAQ (8-10 questions about AC repair in Phoenix)

9. Final CTA

LOCAL ELEMENTS:
- Mention "Phoenix" or local areas 8-12 times naturally
- Reference local climate challenges
- Include Phoenix-specific images (note needed)
- Add map embed (note needed)

[Paste Perplexity research]
```

**Step 4 - Schema (Claude)**:

```
Create LocalBusiness and Service schema for:

Business: [Company Name]
Service: AC Repair
Location: Phoenix, AZ
Address: [full address]
Phone: [phone]
Hours: 24/7
Service Areas: [list from research]
Services: [list]
Rating: [if available]
```

**Step 5 - Create Area Pages (Claude)**:

```
Create individual location pages for these Phoenix areas:
- Scottsdale
- Tempe
- Mesa
- Chandler
- Glendale

For each page:
- H1: "AC Repair in [Area], AZ"
- Local landmarks and street names
- Area-specific content (not duplicated)
- Link back to main Phoenix page
- LocalBusiness schema for each location
```

---

### Example 3: Product Landing Page Workflow

**Step 1 - Research (Perplexity)**:

```
I'm creating a landing page for a SaaS product: [PRODUCT NAME]

1. What pain points do [TARGET AUDIENCE] have related to [PROBLEM]?
2. What alternative solutions exist? (competitors)
3. What value propositions resonate most with buyers?
4. What objections prevent sign-ups?
5. What pricing strategy is common? (freemium, tiered, custom)
6. What social proof works best? (case studies, logos, testimonials, stats)
7. What landing page elements drive conversions in SaaS?
```

**Step 2 - Competitor Analysis (Perplexity)**:

```
Analyze landing pages for: [COMPETITOR 1], [COMPETITOR 2], [COMPETITOR 3]

1. How do they structure their hero section?
2. What benefits do they highlight?
3. What features do they emphasize?
4. How do they handle pricing?
5. What CTAs do they use?
6. What content gaps can I exploit?
```

**Step 3 - Create Landing Page (Claude)**:

```
Write a high-converting landing page for: "[PRODUCT NAME]"

PRODUCT: [description]
TARGET AUDIENCE: [who it's for]
MAIN BENEFIT: [key value prop]
GOAL: Free trial sign-ups

STRUCTURE:

1. HERO SECTION
   - H1: [Benefit-driven headline, 8-12 words]
   - Subheading: [Clarify how it works, who it's for]
   - CTA: "Start Free Trial" (above fold)
   - Hero image/demo video (note needed)

2. SOCIAL PROOF BAR
   - "Trusted by 10,000+ businesses"
   - Customer logos

3. PROBLEM AGITATION (3-4 pain points)
   - "Tired of [pain point 1]?"
   - "Frustrated with [pain point 2]?"
   - Make reader feel understood

4. SOLUTION INTRODUCTION
   - How [PRODUCT] solves these problems
   - Key differentiator
   - CTA: "See How It Works"

5. KEY BENEFITS (not features)
   - 3-5 benefits with icons
   - Focus on outcomes and results
   - Each benefit: headline + 2-3 sentences

6. HOW IT WORKS (3-4 simple steps)
   - Step 1: [action]
   - Step 2: [action]
   - Step 3: [result]
   - CTA: "Get Started Free"

7. FEATURES (detailed breakdown)
   - 6-8 key features
   - Each with icon, title, description
   - Screenshots/mockups (note needed)

8. SOCIAL PROOF
   - 3-4 testimonials (with photos, names, companies)
   - Or 1-2 case studies with metrics
   - "See how [Company] increased [metric] by X%"

9. PRICING (if shown)
   - 2-3 clear tiers
   - Highlight recommended plan
   - Transparent pricing
   - CTA on each tier

10. FAQ (8 objection-handling questions)
    - Pricing questions
    - Technical questions
    - Comparison questions

11. FINAL CTA (strong, urgent)
    - "Start Your Free Trial - No Credit Card Required"
    - Trust badges (security, privacy, guarantees)

TONE: Confident, benefit-focused, customer-centric
AVOID: Technical jargon, vague claims, wall of text

[Paste research]
```

**Step 4 - CTA Optimization (Claude)**:

```
Create 5 variations of CTAs for this landing page:

Primary CTA (above fold):
1. [version 1]
2. [version 2]
3. [version 3]

Secondary CTA (mid-page):
1. [version 1]
2. [version 2]

Final CTA (bottom):
1. [version 1]
2. [version 2]

Test these with A/B testing tools.
```

---

## Tools Integration

### Using SEO Resources from Catalog

**1. Meta Tags & Schema**:

```bash
# Use next-seo for Next.js projects
cd repos/seo/next-seo

# Use react-schemaorg for React projects
cd repos/seo/react-schemaorg

# Use yoast-seo for WordPress
cd repos/seo/yoast-seo
```

**2. Content Optimization**:

```bash
# Use contentswift for content analysis
cd repos/seo/contentswift

# Analyze competitor content
# Get keyword suggestions
```

**3. Technical SEO**:

```bash
# Generate sitemap
cd repos/seo/next-sitemap

# Run Lighthouse audit
cd repos/seo/lighthouse
lighthouse https://yoursite.com --view

# Crawl your site
cd repos/seo/LibreCrawl
```

**4. Rank Tracking**:

```bash
# Self-hosted rank tracking
cd repos/seo/serpbear
```

---

## Workflow Automation

### Save Research Templates

Create reusable Perplexity prompts in `/prompts/seo/`:

```
/prompts/seo/
  ├── keyword-research.md
  ├── competitor-analysis.md
  ├── local-seo-research.md
  ├── content-strategy.md
  └── serp-features.md
```

### Save Claude Prompts

Create reusable Claude prompts in `/prompts/content/`:

```
/prompts/content/
  ├── blog-post.md
  ├── service-page.md
  ├── landing-page.md
  ├── area-page.md
  └── faq-page.md
```

### Batch Content Creation

For multiple similar pages (e.g., 20 area pages):

1. **Research once** with Perplexity (general + all locations)
2. **Create template** with Claude
3. **Generate variations** by swapping location data
4. **Customize** each page with unique local insights

---

## Quality Control Checklist

### Before Publishing Any Content

**Research Quality**:
- [ ] Perplexity research is current (within last month)
- [ ] Competitor analysis is comprehensive
- [ ] Keywords are validated with search volume data
- [ ] Search intent matches content type

**Content Quality**:
- [ ] Content is original (not AI-detected as 100% generated)
- [ ] Human insights and expertise added
- [ ] Facts and statistics verified
- [ ] Examples and case studies included
- [ ] Voice and tone match brand
- [ ] Grammar and spelling checked

**SEO Optimization**:
- [ ] Lighthouse audit score: 90+ (SEO)
- [ ] Primary keyword in title, H1, meta, first paragraph
- [ ] Heading structure is logical
- [ ] Internal links added (3-5)
- [ ] External authoritative links added (2-3)
- [ ] Images have alt text with keywords
- [ ] Schema markup implemented
- [ ] Meta tags optimized
- [ ] URL is SEO-friendly
- [ ] Mobile-friendly (responsive)

**Conversion Optimization**:
- [ ] Clear CTA present
- [ ] User intent satisfied
- [ ] Next steps obvious
- [ ] Trust signals included
- [ ] Page speed optimized

---

## Advanced Workflows

### Content Refresh Strategy

**Use Perplexity to identify refresh opportunities**:

```
Analyze these existing blog posts for refresh opportunities:

[List 5-10 post URLs or titles]

For each post:
1. Is the content still accurate and current?
2. What new information or trends exist?
3. What new questions are people asking?
4. Have competitors created better content?
5. What content gaps exist?
6. Should I update, rewrite, or remove this content?
```

**Then use Claude to refresh**:

```
Refresh this blog post with new information:

EXISTING CONTENT: [paste]
NEW RESEARCH: [from Perplexity]
CHANGES NEEDED:
- Update statistics (2025 data)
- Add new section on [topic]
- Expand FAQ with 5 new questions
- Add new examples

Keep the same structure but modernize content.
```

---

### Content Cluster Strategy

**Research with Perplexity**:

```
Help me create a content cluster around "[PILLAR TOPIC]":

1. What pillar content should I create? (comprehensive guide)
2. What 10-15 cluster topics support this pillar?
3. How should I structure internal linking?
4. What keywords target each piece?
5. What order should I create content in?
```

**Create with Claude**:

```
1. Create pillar content (comprehensive guide)
2. Create 10-15 cluster articles (specific subtopics)
3. Link cluster content to pillar
4. Create hub page linking to all content
```

---

## Conclusion

This workflow combines the strengths of multiple AI tools:

- **Perplexity**: Real-time research, current trends, competitive analysis
- **Claude**: Long-form content, nuanced writing, technical depth
- **SEO Tools**: Implementation, optimization, monitoring

**Keys to Success**:
1. Always research first with Perplexity
2. Create detailed briefs for Claude
3. Edit and enhance AI output with human insights
4. Optimize with SEO tools
5. Monitor and iterate

**Remember**: AI is a tool to enhance your workflow, not replace human creativity and expertise. The best content combines AI efficiency with human insight, brand voice, and unique perspectives.

---

## Resources

**SEO Tools** (search catalog):
```bash
node recommend-tools-fast.js "SEO"
```

**Key Resources**:
- Perplexity MCP: `repos/mcp-servers/perplexity-ai-mcp`
- SEO Tools: `repos/seo/`
- MCP Setup: `recipes/mcp-quick-start.md`

**Related Workflows**:
- `recipes/ecommerce-ultimate-template.md`
- `recipes/educational-platform.md`
- `planning/` - MVP planning templates
