# SEO Start Here Guide

Never done SEO before? This page gets you from zero to results.

## What is SEO?

SEO (Search Engine Optimization) makes your website show up when people search on Google, Bing, ChatGPT, Perplexity, etc. More visibility = more traffic = more customers.

## The 4 Things That Matter

```
1. Technical Foundation  →  Can Google find and read your site?
2. Content               →  Does your site answer what people search for?
3. Authority             →  Does Google trust your site?
4. AI Search             →  Do AI tools (ChatGPT, Perplexity) cite your site?
```

## Your First SEO Project (Step by Step)

### Step 0: Research Your Market

Before you touch anything, understand your market. Open [Perplexity](https://perplexity.ai) and ask:

```
"What are the biggest challenges facing [your industry] in 2026?"
"What do customers complain about most with [your type of product/service]?"
"What are the most common questions people ask about [your topic]?"
"Who are the top competitors in [your niche] and what do they do well?"
```

Then Google your main topic and write down:
- Every autocomplete suggestion
- Every "People Also Ask" question
- What type of content ranks on page 1

This gives you your keyword list, content ideas, and competitive landscape — all before writing a single word.

Full guide: [Search Research Workflow](guides/search-research-workflow.md)

### Step 1: Audit Your Site

Ask Claude: "Audit [my-site.com] for SEO issues using the SEO-Resources repo"

Or read the audit section in [SEO Master Playbook](guides/seo-master-playbook-2026.md).

**What you're checking:**
- Does every page have a unique title and description?
- Is the site fast? (under 3 seconds)
- Can Google crawl every important page?
- Is the site mobile-friendly?
- Are there broken links?

### Step 2: Find Your Keywords

Ask Claude: "Help me find keywords for [my business] using the keyword clustering guide"

Or read [Keyword Clustering Guide](guides/keyword-clustering-guide.md).

**What you're doing:**
- Finding what your customers actually search for
- Grouping similar searches together
- Figuring out which keywords to target first (easier wins)

### Step 3: Plan Your Content

Ask Claude: "Create a topical map for [my business] using the topical maps guide"

Or read [Topical Maps & Clustering](guides/topical-maps-and-clustering.md).

**What you're doing:**
- Mapping out all the topics your site should cover
- Creating "pillar pages" (main topics) and "cluster pages" (subtopics)
- Planning the order to create content

### Step 4: Write Content

Ask Claude: "Write an SEO-optimized article about [topic] targeting [keyword]"

Or read [Content Creation Workflow](guides/seo-content-creation-workflow.md).

**What you're doing:**
- Writing content that answers search queries
- Including the right keywords naturally
- Making content better than what currently ranks

### Step 5: Add Schema Markup

Ask Claude: "Add schema markup to [my page] using the schema-markup skill"

Or read [skills/schema-markup/SKILL.md](skills/schema-markup/SKILL.md).

**What you're doing:**
- Adding structured data so Google understands your content
- Getting rich snippets (stars, FAQs, prices) in search results

### Step 6: Build Internal Links

Ask Claude: "Improve internal linking on [my site] using the internal linking guide"

Or read [Internal Linking Automation](guides/internal-linking-automation.md).

**What you're doing:**
- Connecting related pages together
- Helping Google discover all your content
- Passing authority from strong pages to new ones

### Step 7: Optimize for AI Search

Ask Claude: "Optimize [my site] for AI search engines using the GEO research"

Or read [GEO/AEO/LLMO Research](research/seo-geo-aeo-llmo-research-2026.md).

**What you're doing:**
- Making your content citable by ChatGPT, Perplexity, etc.
- Adding statistics, quotes, and structured answers AI tools prefer
- Building the kind of authority AI tools trust

## How to Use This Repo With Claude Code

### From any project, just say:

```
"Reference ~/SEO-Resources and help me with SEO for this site"
```

```
"Using the SEO-Resources repo, audit this site's technical SEO"
```

```
"Look at the keyword clustering guide in SEO-Resources and help me find keywords for [topic]"
```

### Or add this to your project's CLAUDE.md:

```markdown
## SEO Reference
When doing SEO work, reference the SEO-Resources repo (clone from https://github.com/Roseyco-management/SEO-Resources).
Read SEO-Resources/CLAUDE.md for the full index of guides, tools, skills, and frameworks.
```

That's it. Claude will know where to find everything.

## Common Questions

**How long does SEO take?**
3-6 months for meaningful results. Some technical fixes show results in weeks.

**What should I do first?**
Fix technical issues (Step 1), then target easy keywords (Step 2-4).

**Do I need all 52 tools?**
No. Most projects only need a site auditor (lighthouse) and maybe a crawler. The tools are there when you need them.

**What about paid ads?**
SEO is free traffic. Paid ads (Google Ads, Meta) are separate. This repo has skills for both — see `skills/paid-ads/`.

**What's the difference between SEO and AI SEO (GEO)?**
Traditional SEO = ranking on Google. GEO/AEO = getting cited by AI tools like ChatGPT and Perplexity. You want both. Step 7 covers AI SEO.

## Glossary

| Term | Meaning |
|------|---------|
| **SERP** | Search Engine Results Page (what you see when you Google something) |
| **Keywords** | The words/phrases people type into search engines |
| **Backlinks** | Links from other websites to yours (votes of trust) |
| **Schema/Structured Data** | Code that tells Google what your content means |
| **E-E-A-T** | Experience, Expertise, Authoritativeness, Trustworthiness — what Google looks for |
| **Core Web Vitals** | Google's speed and user experience metrics |
| **Topical Authority** | Being the go-to source for a topic by covering it thoroughly |
| **GEO** | Generative Engine Optimization — SEO for AI search tools |
| **AEO** | Answer Engine Optimization — optimizing to be the direct answer |
| **LLMO** | Large Language Model Optimization — getting cited by LLMs |
| **Pillar Page** | A main topic page that links to related subtopic pages |
| **Cluster Page** | A subtopic page that links back to the pillar page |
| **Internal Links** | Links between pages on your own site |
| **Meta Title** | The title that shows up in search results |
| **Meta Description** | The description snippet under the title in search results |
| **Canonical URL** | Tells Google which version of a page is the "real" one |
| **Sitemap** | An XML file listing all your pages so Google can find them |
| **Robots.txt** | A file telling search engines what they can/can't crawl |
| **JSON-LD** | The format used to write schema markup |
| **CRO** | Conversion Rate Optimization — getting more visitors to take action |
