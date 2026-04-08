const fs = require('fs');
const path = require('path');

// Read the current catalog
const catalogPath = path.join(__dirname, '..', 'CATALOG.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Advanced SEO resources to add
const advancedSEOResources = [
  // ===== KEYWORD CLUSTERING =====
  {
    name: "seo-keyword-clusters",
    description: "Machine Learning-powered keyword clustering from Google Search Console data. Automatically creates semantic keyword clusters using ML algorithms to group keywords by intent and topic. Essential for content strategy and topical authority.",
    githubUrl: "https://github.com/jfaccioli/seo-keyword-clusters",
    repoOwner: "jfaccioli",
    repoName: "seo-keyword-clusters",
    localPath: "repos/seo/seo-keyword-clusters",
    categories: ["seo", "data-processing", "ai"],
    useCases: ["Keyword Clustering", "Machine Learning", "GSC Data Analysis", "Content Strategy", "Topical Authority"],
    stack: ["Python", "Machine Learning"],
    tags: ["seo", "keyword-clustering", "machine-learning", "gsc", "content-strategy", "featured", "primary"],
    featured: true,
    priority: "high"
  },
  {
    name: "keyword-clustering",
    description: "Python-based keyword clustering using Jaccard similarity coefficient. Groups keywords based on URL similarity in search results. Thinks of websites as 3D objects rather than 2D planes for advanced clustering analysis.",
    githubUrl: "https://github.com/dartseoengineer/keyword-clustering",
    repoOwner: "dartseoengineer",
    repoName: "keyword-clustering",
    localPath: "repos/seo/keyword-clustering",
    categories: ["seo", "data-processing"],
    useCases: ["Keyword Clustering", "SERP Analysis", "Intent Mapping", "Content Planning"],
    stack: ["Python"],
    tags: ["seo", "keyword-clustering", "python", "serp-analysis", "jaccard-similarity"],
    featured: false
  },

  // ===== ENTITY-BASED & SEMANTIC SEO =====
  {
    name: "open-semantic-search",
    description: "Complete open-source semantic search suite with REST API for named entity extraction, linking, and disambiguation. Supports SKOS thesaurus, RDF ontology, and knowledge graphs. Essential for entity-based SEO and semantic analysis.",
    githubUrl: "https://github.com/opensemanticsearch/open-semantic-search",
    repoOwner: "opensemanticsearch",
    repoName: "open-semantic-search",
    localPath: "repos/seo/open-semantic-search",
    categories: ["seo", "search", "ai"],
    useCases: ["Entity Extraction", "Semantic Search", "Knowledge Graphs", "Entity SEO", "NLP"],
    stack: ["Python", "Solr"],
    tags: ["seo", "semantic-seo", "entity-extraction", "knowledge-graph", "nlp", "featured", "primary"],
    featured: true,
    priority: "high"
  },
  {
    name: "awesome-topic-models",
    description: "Curated list of topic model implementations and resources. Includes BERTopic, Top2Vec, OCTIS, TopicGPT, and more. Essential reference for implementing topic modeling in SEO content strategy.",
    githubUrl: "https://github.com/jonaschn/awesome-topic-models",
    repoOwner: "jonaschn",
    repoName: "awesome-topic-models",
    localPath: "repos/seo/awesome-topic-models",
    categories: ["seo", "ai", "catalog"],
    useCases: ["Topic Modeling", "Content Strategy", "NLP", "Semantic Analysis"],
    stack: ["Python"],
    tags: ["seo", "topic-modeling", "nlp", "awesome-list", "content-strategy"],
    featured: false
  },
  {
    name: "nlp-topic-models",
    description: "Application of topic models for topic extraction and document similarity. Implements various topic modeling algorithms for SEO content analysis and semantic understanding.",
    githubUrl: "https://github.com/goerlitz/nlp-topic-models",
    repoOwner: "goerlitz",
    repoName: "nlp-topic-models",
    localPath: "repos/seo/nlp-topic-models",
    categories: ["seo", "ai", "data-processing"],
    useCases: ["Topic Modeling", "Document Similarity", "Content Analysis", "Semantic SEO"],
    stack: ["Python"],
    tags: ["seo", "topic-modeling", "nlp", "content-analysis", "semantic-seo"],
    featured: false
  },

  // ===== CONTENT ANALYSIS & GAP ANALYSIS =====
  {
    name: "seo-analysis-tool",
    description: "All-in-one SEO analysis with performance metrics, competitor research, and AI-powered content evaluation. Comprehensive tool for content gap analysis and competitive intelligence.",
    githubUrl: "https://github.com/kenancn/seo-analysis-tool",
    repoOwner: "kenancn",
    repoName: "seo-analysis-tool",
    localPath: "repos/seo/seo-analysis-tool",
    categories: ["seo", "ai", "developer-tools"],
    useCases: ["SEO Analysis", "Competitor Research", "Content Evaluation", "Performance Metrics"],
    stack: ["Python", "AI"],
    tags: ["seo", "analysis", "competitor-research", "ai", "content-evaluation", "featured"],
    featured: true,
    priority: "medium"
  },
  {
    name: "rankcraft-ai",
    description: "Complete AI-powered SEO pipeline: User Input → Keyword Research API → Competitor Analysis → Content Generation → SEO Optimization. Includes SERP analysis, content gap identification with NLP, and topical cluster generation.",
    githubUrl: "https://github.com/steve2700/rankcraft-ai",
    repoOwner: "steve2700",
    repoName: "rankcraft-ai",
    localPath: "repos/seo/rankcraft-ai",
    categories: ["seo", "ai", "automation"],
    useCases: ["SEO Automation", "Content Generation", "Competitor Analysis", "Topical Clusters", "Content Gaps"],
    stack: ["Python", "AI", "NLP"],
    tags: ["seo", "ai", "automation", "content-generation", "competitor-analysis", "topical-clusters", "featured", "primary"],
    featured: true,
    priority: "high"
  },

  // ===== SCHEMA & STRUCTURED DATA =====
  {
    name: "schemify",
    description: "Automatically generates Schema.org JSON-LD markup for WordPress. Flexible structure with reasonable defaults and drop-in support regardless of WordPress theme. Simplifies structured data implementation.",
    githubUrl: "https://github.com/stevegrunwell/schemify",
    repoOwner: "stevegrunwell",
    repoName: "schemify",
    localPath: "repos/seo/schemify",
    categories: ["seo", "wordpress", "cms"],
    useCases: ["Schema.org", "JSON-LD", "WordPress SEO", "Structured Data"],
    stack: ["PHP", "WordPress"],
    tags: ["seo", "schema", "wordpress", "json-ld", "structured-data"],
    featured: false
  },
  {
    name: "structured-data-json-ld",
    description: "Collection of structured data snippets in JSON-LD format. Includes examples for Person, Product, Recipe, FAQPage, HowTo, Course, and more. Ready-to-use schema markup templates.",
    githubUrl: "https://github.com/JayHoltslander/Structured-Data-JSON-LD",
    repoOwner: "JayHoltslander",
    repoName: "Structured-Data-JSON-LD",
    localPath: "repos/seo/structured-data-json-ld",
    categories: ["seo", "templates"],
    useCases: ["Schema.org", "JSON-LD", "Structured Data", "Templates"],
    stack: ["JSON-LD"],
    tags: ["seo", "schema", "json-ld", "templates", "structured-data", "featured"],
    featured: true,
    priority: "medium"
  },

  // ===== SERP SCRAPING & ANALYSIS =====
  {
    name: "serp-scraper",
    description: "Google Search SERP scraper with different options for scraping Google results. Uses Playwright to accept cookie consent popups automatically. Essential for SERP analysis and competitor research.",
    githubUrl: "https://github.com/christophebe/serp",
    repoOwner: "christophebe",
    repoName: "serp",
    localPath: "repos/seo/serp-scraper",
    categories: ["seo", "web-scraping", "developer-tools"],
    useCases: ["SERP Scraping", "Competitor Research", "Rank Tracking", "SERP Features"],
    stack: ["JavaScript", "Playwright"],
    tags: ["seo", "serp", "scraping", "playwright", "google", "featured"],
    featured: true,
    priority: "medium"
  },
  {
    name: "crawl4ai",
    description: "#1 trending open-source web crawler on GitHub. LLM-friendly crawler that extracts internal links, external links, and embedded iframe content. Most-starred crawler with advanced features for AI applications.",
    githubUrl: "https://github.com/unclecode/crawl4ai",
    repoOwner: "unclecode",
    repoName: "crawl4ai",
    localPath: "repos/seo/crawl4ai",
    categories: ["seo", "web-scraping", "ai"],
    useCases: ["Web Crawling", "Link Extraction", "AI Training Data", "SEO Analysis"],
    stack: ["Python"],
    tags: ["seo", "crawler", "ai", "llm", "web-scraping", "trending", "featured", "primary"],
    featured: true,
    priority: "high"
  },
  {
    name: "google-search-scraper",
    description: "Apify actor that crawls Google Search result pages and extracts organic results, ads, and related queries. Custom country, language, and location selection for localized SERP analysis.",
    githubUrl: "https://github.com/maxCopell/actor-google-search-scraper",
    repoOwner: "maxCopell",
    repoName: "actor-google-search-scraper",
    localPath: "repos/seo/google-search-scraper",
    categories: ["seo", "web-scraping"],
    useCases: ["SERP Scraping", "Organic Results", "Ads Analysis", "Local SEO"],
    stack: ["JavaScript", "Apify"],
    tags: ["seo", "serp", "scraping", "google", "apify", "local-seo"],
    featured: false
  },

  // ===== LOG FILE ANALYSIS =====
  {
    name: "goaccess",
    description: "Open-source real-time web log analyzer with interactive viewer in terminal or browser. Fast HTTP statistics with complete, self-contained, real-time HTML reports. Also generates JSON and CSV. Essential for crawl budget optimization.",
    githubUrl: "https://github.com/allinurl/goaccess",
    repoOwner: "allinurl",
    repoName: "goaccess",
    localPath: "repos/seo/goaccess",
    categories: ["seo", "monitoring", "developer-tools"],
    useCases: ["Log Analysis", "Crawl Budget", "Bot Detection", "Server Analytics"],
    stack: ["C"],
    tags: ["seo", "log-analysis", "crawl-budget", "monitoring", "real-time", "featured", "primary"],
    featured: true,
    priority: "high"
  },
  {
    name: "logai",
    description: "Salesforce's open-source library for log analytics and intelligence. Supports log summarization, clustering, and anomaly detection. Advanced log analysis for SEO professionals tracking crawler behavior.",
    githubUrl: "https://github.com/salesforce/logai",
    repoOwner: "salesforce",
    repoName: "logai",
    localPath: "repos/seo/logai",
    categories: ["seo", "ai", "monitoring"],
    useCases: ["Log Analysis", "Anomaly Detection", "Crawler Monitoring", "AI Analytics"],
    stack: ["Python", "AI"],
    tags: ["seo", "log-analysis", "ai", "salesforce", "anomaly-detection"],
    featured: false
  },

  // ===== BACKLINK ANALYSIS =====
  {
    name: "backlink-monitoring",
    description: "Python-based backlink checker that validates backlink quality, identifies problematic backlinks, and outputs to Slack. Uses Requests and Beautiful Soup 4 for automated backlink monitoring.",
    githubUrl: "https://github.com/oxylabs/backlink-monitoring",
    repoOwner: "oxylabs",
    repoName: "backlink-monitoring",
    localPath: "repos/seo/backlink-monitoring",
    categories: ["seo", "monitoring"],
    useCases: ["Backlink Monitoring", "Link Quality", "SEO Monitoring", "Slack Integration"],
    stack: ["Python"],
    tags: ["seo", "backlinks", "monitoring", "python", "slack"],
    featured: false
  },
  {
    name: "awesome-seo-backlinks",
    description: "Curated collection of useful backlinks and SEO resources with in-depth analysis on each backlink. Organized by backlink strength, difficulty, and categories. Great reference for link building.",
    githubUrl: "https://github.com/indie-hacking/Awesome-SEO-Backlinks",
    repoOwner: "indie-hacking",
    repoName: "Awesome-SEO-Backlinks",
    localPath: "repos/seo/awesome-seo-backlinks",
    categories: ["seo", "catalog", "marketing"],
    useCases: ["Link Building", "Backlinks", "SEO Resources", "Reference"],
    stack: [],
    tags: ["seo", "backlinks", "link-building", "awesome-list", "catalog"],
    featured: false
  },
  {
    name: "backlink-checker",
    description: "Validates a list of known backlinks and confirms donor web pages contain required backlinks. Essential for link building campaigns and backlink quality assurance.",
    githubUrl: "https://github.com/rvalitov/backlink-checker",
    repoOwner: "rvalitov",
    repoName: "backlink-checker",
    localPath: "repos/seo/backlink-checker",
    categories: ["seo", "developer-tools"],
    useCases: ["Backlink Validation", "Link Building", "Quality Assurance"],
    stack: ["Shell"],
    tags: ["seo", "backlinks", "validation", "link-building"],
    featured: false
  },

  // ===== INTERNAL LINKING =====
  {
    name: "internal-link-juicer",
    description: "WordPress plugin that eliminates manual internal linking work. Automatically imports keywords from post/term titles and creates relevant internal links. Integrates with Yoast SEO and RankMath.",
    githubUrl: "https://github.com/cmsminds/internal-link-juicer",
    repoOwner: "cmsminds",
    repoName: "internal-link-juicer",
    localPath: "repos/seo/internal-link-juicer",
    categories: ["seo", "wordpress", "automation"],
    useCases: ["Internal Linking", "WordPress SEO", "Link Automation", "SEO Automation"],
    stack: ["PHP", "WordPress"],
    tags: ["seo", "internal-linking", "wordpress", "automation", "featured"],
    featured: true,
    priority: "medium"
  },

  // ===== AI & AUTOMATION =====
  {
    name: "curatedseotools",
    description: "Curated list of best SEO tools organized by category. Comprehensive collection covering all aspects of modern SEO including AI tools, keyword research, content optimization, and more.",
    githubUrl: "https://github.com/sneg55/curatedseotools",
    repoOwner: "sneg55",
    repoName: "curatedseotools",
    localPath: "repos/seo/curatedseotools",
    categories: ["seo", "catalog", "research"],
    useCases: ["SEO Tools", "Tool Discovery", "Reference", "Best Practices"],
    stack: [],
    tags: ["seo", "tools", "catalog", "awesome-list", "reference"],
    featured: false
  }
];

// Add required categories to metadata
const requiredCategories = ["seo", "web-scraping", "ai", "automation", "data-processing"];
requiredCategories.forEach(cat => {
  if (!catalog.metadata.categories.includes(cat)) {
    catalog.metadata.categories.push(cat);
  }
});
catalog.metadata.categories.sort();

// Update metadata
const initialCount = catalog.resources.length;
catalog.metadata.totalResources = initialCount + advancedSEOResources.length;
catalog.metadata.lastUpdated = new Date().toISOString();

// Add default empty arrays for required fields
advancedSEOResources.forEach(resource => {
  resource.database = resource.database || [];
  resource.auth = resource.auth || [];
  resource.cms = resource.cms || [];
  resource.subPath = resource.subPath || "";
  resource.isSubdirectory = resource.isSubdirectory || false;
});

// Add advanced SEO resources to catalog
catalog.resources.push(...advancedSEOResources);

// Write updated catalog
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');

console.log(`✅ Added ${advancedSEOResources.length} advanced SEO resources to catalog`);
console.log(`📊 Total resources: ${catalog.metadata.totalResources} (was ${initialCount})`);
console.log(`📁 Categories: ${catalog.metadata.categories.length}`);
console.log('\n📦 Added resources by category:');

const categoryCount = {};
advancedSEOResources.forEach(r => {
  r.categories.forEach(cat => {
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });
});

Object.entries(categoryCount)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count}`);
  });

console.log('\n⭐ Featured resources:', advancedSEOResources.filter(r => r.featured).length);
console.log('🎯 High priority resources:', advancedSEOResources.filter(r => r.priority === 'high').length);
