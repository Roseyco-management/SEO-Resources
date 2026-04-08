const fs = require('fs');
const path = require('path');

// Read the current catalog
const catalogPath = path.join(__dirname, '..', 'CATALOG.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// SEO resources to add
const seoResources = [
  {
    name: "next-seo",
    description: "Next SEO is a plug-in that makes managing your SEO easier in Next.js projects. Provides comprehensive structured data support including JSON-LD schemas for recipes, FAQs, events, images, and more. Essential tool for Next.js SEO optimization.",
    githubUrl: "https://github.com/garmeeh/next-seo",
    repoOwner: "garmeeh",
    repoName: "next-seo",
    localPath: "repos/seo/next-seo",
    categories: ["seo", "frontend", "frameworks"],
    useCases: ["Meta Tags", "Open Graph", "JSON-LD", "Schema.org", "Next.js SEO", "Social Sharing"],
    stack: ["Next.js", "React", "TypeScript"],
    tags: ["seo", "next.js", "meta-tags", "schema", "json-ld", "open-graph", "featured", "primary"]
,
    featured: true,
    priority: "high"
  },
  {
    name: "react-schemaorg",
    description: "Type-checked Schema.org JSON-LD for React by Google. Provides easy insertion of valid Schema.org JSON-LD in React apps with TypeScript definitions from schema-dts. Perfect for adding structured data to improve SEO.",
    githubUrl: "https://github.com/google/react-schemaorg",
    repoOwner: "google",
    repoName: "react-schemaorg",
    localPath: "repos/seo/react-schemaorg",
    categories: ["seo", "frontend", "libraries"],
    useCases: ["Schema.org", "JSON-LD", "Structured Data", "SEO", "Type Safety"],
    stack: ["React", "TypeScript"],
    tags: ["seo", "schema", "json-ld", "react", "typescript", "google", "structured-data", "featured"],
    featured: true,
    priority: "high"
  },
  {
    name: "next-sitemap",
    description: "Sitemap generator for Next.js that generates sitemap(s) and robots.txt for all static/pre-rendered/dynamic/server-side pages. Automates sitemap creation for Next.js apps with support for dynamic routes, server-side sitemaps, and sitemap splitting.",
    githubUrl: "https://github.com/iamvishnusankar/next-sitemap",
    repoOwner: "iamvishnusankar",
    repoName: "next-sitemap",
    localPath: "repos/seo/next-sitemap",
    categories: ["seo", "developer-tools"],
    useCases: ["Sitemap Generation", "Robots.txt", "Next.js", "SEO Automation", "Dynamic Sitemaps"],
    stack: ["Next.js", "TypeScript"],
    tags: ["seo", "sitemap", "robots-txt", "next.js", "automation", "featured", "primary"],
    featured: true,
    priority: "high"
  },
  {
    name: "lighthouse",
    description: "Google's official automated tool for improving web page quality. Provides audits for performance, accessibility, progressive web apps, SEO, and more. Industry-standard tool for web performance and SEO analysis.",
    githubUrl: "https://github.com/GoogleChrome/lighthouse",
    repoOwner: "GoogleChrome",
    repoName: "lighthouse",
    localPath: "repos/seo/lighthouse",
    categories: ["seo", "monitoring", "developer-tools"],
    useCases: ["Performance Audit", "SEO Audit", "Accessibility", "Core Web Vitals", "Best Practices", "PWA"],
    stack: ["Node.js", "JavaScript"],
    tags: ["seo", "performance", "audit", "google", "core-web-vitals", "accessibility", "featured", "official"],
    featured: true,
    priority: "high"
  },
  {
    name: "lighthouse-mcp-server",
    description: "MCP server that enables AI agents to perform comprehensive web audits using Google Lighthouse. Provides 13+ tools for performance, accessibility, SEO, and security analysis. Perfect for integrating Lighthouse into AI-powered workflows.",
    githubUrl: "https://github.com/danielsogl/lighthouse-mcp-server",
    repoOwner: "danielsogl",
    repoName: "lighthouse-mcp-server",
    localPath: "repos/seo/lighthouse-mcp-server",
    categories: ["seo", "mcp", "developer-tools"],
    useCases: ["AI Agents", "Lighthouse Automation", "Performance Testing", "SEO Automation"],
    stack: ["TypeScript", "MCP"],
    tags: ["seo", "mcp", "lighthouse", "ai-agents", "automation"],
    featured: false
  },
  {
    name: "schema-org",
    description: "Fluent builder for Schema.org types and ld+json generator by Spatie. Provides a clean PHP API for generating all Schema.org types with full property support. Great for Laravel and PHP projects.",
    githubUrl: "https://github.com/spatie/schema-org",
    repoOwner: "spatie",
    repoName: "schema-org",
    localPath: "repos/seo/schema-org",
    categories: ["seo", "backend", "libraries"],
    useCases: ["Schema.org", "JSON-LD", "Structured Data", "PHP SEO"],
    stack: ["PHP"],
    tags: ["seo", "schema", "php", "json-ld", "spatie", "structured-data"],
    featured: false
  },
  {
    name: "contentswift",
    description: "Free content research and optimization tool for SEO. Open-source alternative to Surfer SEO, Frase, and NeuronWriter. Analyzes Google SERP data to provide insights from top-ranking pages for keyword research and content strategy.",
    githubUrl: "https://github.com/hilmanski/contentswift",
    repoOwner: "hilmanski",
    repoName: "contentswift",
    localPath: "repos/seo/contentswift",
    categories: ["seo", "marketing", "developer-tools"],
    useCases: ["Content Optimization", "Keyword Research", "SERP Analysis", "Content Strategy"],
    stack: ["JavaScript"],
    tags: ["seo", "content-optimization", "keyword-research", "serp-analysis", "featured"],
    featured: true,
    priority: "medium"
  },
  {
    name: "awesome-seo-tools",
    description: "Curated list of awesome SEO tools by SerpApi. Comprehensive collection of free and paid SEO tools, libraries, and resources. Great reference for discovering SEO solutions.",
    githubUrl: "https://github.com/serpapi/awesome-seo-tools",
    repoOwner: "serpapi",
    repoName: "awesome-seo-tools",
    localPath: "repos/seo/awesome-seo-tools",
    categories: ["seo", "catalog", "research"],
    useCases: ["SEO Resources", "Tool Discovery", "Reference"],
    stack: [],
    tags: ["seo", "awesome-list", "catalog", "resources"],
    featured: false
  },
  {
    name: "react-seo-meta-tags",
    description: "SEO metatags for React apps, especially Gatsby & Next.js blogs. Includes Facebook (og) and Twitter tags for better SEO and social sharing. Simple component-based approach to meta tags.",
    githubUrl: "https://github.com/TeemuKoivisto/react-seo-meta-tags",
    repoOwner: "TeemuKoivisto",
    repoName: "react-seo-meta-tags",
    localPath: "repos/seo/react-seo-meta-tags",
    categories: ["seo", "frontend", "libraries"],
    useCases: ["Meta Tags", "Social Sharing", "React SEO"],
    stack: ["React", "TypeScript"],
    tags: ["seo", "react", "meta-tags", "social-sharing", "open-graph"],
    featured: false
  },
  {
    name: "react-seo-tools",
    description: "Generates SEO-related tags for HTML <head> and robots.txt for search engine crawlers. Works especially well with Next.js. Includes sitemap XML generation, meta tags, Open Graph tags, and robots.txt generation.",
    githubUrl: "https://github.com/jessym/react-seo-tools",
    repoOwner: "jessym",
    repoName: "react-seo-tools",
    localPath: "repos/seo/react-seo-tools",
    categories: ["seo", "frontend", "libraries"],
    useCases: ["Meta Tags", "Sitemap", "Robots.txt", "React SEO"],
    stack: ["React"],
    tags: ["seo", "react", "meta-tags", "sitemap", "robots-txt"],
    featured: false
  },
  {
    name: "seonaut",
    description: "Open-source SEO audit tool designed to analyze websites for issues that may impact search engine rankings. Provides comprehensive technical SEO analysis with a web-based interface.",
    githubUrl: "https://github.com/StJudeWasHere/seonaut",
    repoOwner: "StJudeWasHere",
    repoName: "seonaut",
    localPath: "repos/seo/seonaut",
    categories: ["seo", "developer-tools", "monitoring"],
    useCases: ["SEO Audit", "Technical SEO", "Site Analysis", "Crawling"],
    stack: ["Go"],
    tags: ["seo", "audit", "crawler", "technical-seo", "featured"],
    featured: true,
    priority: "medium"
  },
  {
    name: "LibreCrawl",
    description: "Free desktop SEO crawler - open-source alternative to Screaming Frog. Crawl websites, analyze links, extract SEO data, and export results without subscription fees. Fully customizable and extensible.",
    githubUrl: "https://github.com/PhialsBasement/LibreCrawl",
    repoOwner: "PhialsBasement",
    repoName: "LibreCrawl",
    localPath: "repos/seo/LibreCrawl",
    categories: ["seo", "developer-tools", "web-scraping"],
    useCases: ["SEO Crawling", "Link Analysis", "Site Auditing", "Data Extraction"],
    stack: ["Python"],
    tags: ["seo", "crawler", "desktop-app", "screaming-frog-alternative", "featured", "primary"],
    featured: true,
    priority: "high"
  },
  {
    name: "python-seo-analyzer",
    description: "SEO tool that analyzes website structure, crawls sites, counts words in the body, and warns of technical SEO issues. Python-based CLI tool for comprehensive SEO analysis.",
    githubUrl: "https://github.com/sethblack/python-seo-analyzer",
    repoOwner: "sethblack",
    repoName: "python-seo-analyzer",
    localPath: "repos/seo/python-seo-analyzer",
    categories: ["seo", "developer-tools"],
    useCases: ["SEO Analysis", "Site Crawling", "Technical SEO"],
    stack: ["Python"],
    tags: ["seo", "python", "analyzer", "crawler", "cli"],
    featured: false
  },
  {
    name: "serpbear",
    description: "Open-source search engine position tracking app. Track your website's keyword rankings across search engines with a self-hosted solution. Modern UI with comprehensive tracking features.",
    githubUrl: "https://github.com/towfiqi/serpbear",
    repoOwner: "towfiqi",
    repoName: "serpbear",
    localPath: "repos/seo/serpbear",
    categories: ["seo", "monitoring", "developer-tools"],
    useCases: ["Rank Tracking", "SERP Monitoring", "Keyword Tracking", "SEO Analytics"],
    stack: ["Next.js", "TypeScript", "React"],
    tags: ["seo", "rank-tracking", "serp", "monitoring", "self-hosted", "featured", "primary"],
    featured: true,
    priority: "high"
  },
  {
    name: "page-auditor",
    description: "Page Auditor for Technical SEO - open-source Google Chrome Extension by Franco Folini. Explore and analyze Structured Data, JavaScript scripts, Meta-Tags, Robots.txt, and Sitemap.xml from any webpage. Critical for on-page SEO.",
    githubUrl: "https://github.com/folini/Page-Auditor",
    repoOwner: "folini",
    repoName: "Page-Auditor",
    localPath: "repos/seo/page-auditor",
    categories: ["seo", "browser-automation", "developer-tools"],
    useCases: ["Technical SEO", "Meta Tag Analysis", "Structured Data", "Chrome Extension"],
    stack: ["JavaScript"],
    tags: ["seo", "chrome-extension", "technical-seo", "meta-tags", "structured-data"],
    featured: false
  },
  {
    name: "site-audit-seo",
    description: "Web service and CLI tool for SEO site audit: crawl site, run Lighthouse on all pages, view public reports in browser. Output to console, JSON, CSV, XLSX. Comprehensive automated SEO auditing.",
    githubUrl: "https://github.com/viasite/site-audit-seo",
    repoOwner: "viasite",
    repoName: "site-audit-seo",
    localPath: "repos/seo/site-audit-seo",
    categories: ["seo", "developer-tools", "monitoring"],
    useCases: ["SEO Audit", "Lighthouse", "Site Crawling", "Automated Reporting"],
    stack: ["JavaScript", "Node.js"],
    tags: ["seo", "audit", "lighthouse", "crawler", "cli", "featured"],
    featured: true,
    priority: "medium"
  },
  {
    name: "seo-audits-toolkit",
    description: "SEO & Security Audit for Websites (OSAT). Free, easy, and open-source toolkit featuring Lighthouse audits, SERP rank tracking, security audits, sitemap/keywords/images extraction, and summarization.",
    githubUrl: "https://github.com/StanGirard/seo-audits-toolkit",
    repoOwner: "StanGirard",
    repoName: "seo-audits-toolkit",
    localPath: "repos/seo/seo-audits-toolkit",
    categories: ["seo", "developer-tools", "monitoring"],
    useCases: ["SEO Audit", "Security Audit", "SERP Tracking", "Lighthouse", "Content Analysis"],
    stack: ["TypeScript", "Node.js"],
    tags: ["seo", "audit", "security", "lighthouse", "serp", "featured"],
    featured: true,
    priority: "medium"
  },
  {
    name: "seo-auditor",
    description: "SEO Auditor Chrome Extension - powerful instant on-page SEO audit tool. Analyzes meta tags, headings, images, links, indexing signals, accessibility, structured data, and more. Client-side, privacy-first, fully open-source.",
    githubUrl: "https://github.com/plainsignal/seo-auditor",
    repoOwner: "plainsignal",
    repoName: "seo-auditor",
    localPath: "repos/seo/seo-auditor",
    categories: ["seo", "browser-automation", "developer-tools"],
    useCases: ["SEO Audit", "Chrome Extension", "On-Page SEO", "Privacy-First"],
    stack: ["JavaScript"],
    tags: ["seo", "chrome-extension", "audit", "privacy", "on-page-seo"],
    featured: false
  },
  {
    name: "yoast-seo",
    description: "Yoast SEO for WordPress - the #1 WordPress SEO plugin. Open-source comprehensive SEO solution for WordPress with schema, meta tags, XML sitemaps, breadcrumbs, and content analysis. Industry-standard WordPress SEO.",
    githubUrl: "https://github.com/Yoast/wordpress-seo",
    repoOwner: "Yoast",
    repoName: "wordpress-seo",
    localPath: "repos/seo/yoast-seo",
    categories: ["seo", "wordpress", "cms"],
    useCases: ["WordPress SEO", "Schema", "Sitemaps", "Content Optimization"],
    stack: ["PHP", "WordPress"],
    tags: ["seo", "wordpress", "plugin", "schema", "sitemaps", "featured", "primary"],
    featured: true,
    priority: "high"
  }
];

// Add "seo" to categories if not present
if (!catalog.metadata.categories.includes("seo")) {
  catalog.metadata.categories.push("seo");
  catalog.metadata.categories.sort();
}

// Update metadata
catalog.metadata.totalResources = catalog.resources.length + seoResources.length;
catalog.metadata.lastUpdated = new Date().toISOString();

// Add default empty arrays for required fields
seoResources.forEach(resource => {
  resource.database = resource.database || [];
  resource.auth = resource.auth || [];
  resource.cms = resource.cms || [];
  resource.subPath = resource.subPath || "";
  resource.isSubdirectory = resource.isSubdirectory || false;
});

// Add SEO resources to catalog
catalog.resources.push(...seoResources);

// Write updated catalog
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');

console.log(`✅ Added ${seoResources.length} SEO resources to catalog`);
console.log(`📊 Total resources: ${catalog.metadata.totalResources}`);
console.log(`📁 Categories: ${catalog.metadata.categories.length}`);
