#!/bin/bash
# Clone all recommended SEO repos
# Run from the SEO-Resources root directory

REPOS_DIR="./repos"
mkdir -p "$REPOS_DIR"

echo "=== Cloning Tier 1: Essential Repos ==="

# Crawlers & Data Extraction
git clone --depth 1 https://github.com/unclecode/crawl4ai.git "$REPOS_DIR/crawl4ai"
git clone --depth 1 https://github.com/scrapy/scrapy.git "$REPOS_DIR/scrapy"
git clone --depth 1 https://github.com/apify/crawlee.git "$REPOS_DIR/crawlee"
git clone --depth 1 https://github.com/apify/crawlee-python.git "$REPOS_DIR/crawlee-python"
git clone --depth 1 https://github.com/mendableai/firecrawl.git "$REPOS_DIR/firecrawl"

# Performance & Core Web Vitals
git clone --depth 1 https://github.com/GoogleChrome/web-vitals.git "$REPOS_DIR/web-vitals"
git clone --depth 1 https://github.com/harlan-zw/unlighthouse.git "$REPOS_DIR/unlighthouse"

# AI SEO / GEO / AEO
git clone --depth 1 https://github.com/GEO-optim/GEO.git "$REPOS_DIR/GEO"
git clone --depth 1 https://github.com/AI2HU/gego.git "$REPOS_DIR/gego"

echo ""
echo "=== Cloning Tier 2: High Value Repos ==="

# All-in-One Platforms
git clone --depth 1 https://github.com/mascanho/RustySEO.git "$REPOS_DIR/RustySEO"
git clone --depth 1 https://github.com/janreges/siteone-crawler.git "$REPOS_DIR/siteone-crawler"
git clone --depth 1 https://github.com/seopanel/Seo-Panel.git "$REPOS_DIR/seo-panel"

# Python SEO
git clone --depth 1 https://github.com/eliasdabbas/advertools.git "$REPOS_DIR/advertools"
git clone --depth 1 https://github.com/searchsolved/search-solved-public-seo.git "$REPOS_DIR/search-solved-public-seo"

# Content & NLP
git clone --depth 1 https://github.com/postlight/parser.git "$REPOS_DIR/postlight-parser"
git clone --depth 1 https://github.com/MLTSEO/MLTS.git "$REPOS_DIR/MLTS"
git clone --depth 1 https://github.com/maddevsio/seo-analyzer.git "$REPOS_DIR/seo-analyzer"

# Schema
git clone --depth 1 https://github.com/schemaorg/schemaorg.git "$REPOS_DIR/schemaorg-official"
git clone --depth 1 https://github.com/spatie/schema-org.git "$REPOS_DIR/spatie-schema-org"

# Keyword Research
git clone --depth 1 https://github.com/chukhraiartur/seo-keyword-research-tool.git "$REPOS_DIR/seo-keyword-research-tool"

# Backlink
git clone --depth 1 https://github.com/oxylabs/backlink-monitoring.git "$REPOS_DIR/backlink-monitoring"

# Sitemap & Indexing
git clone --depth 1 https://github.com/cresteem/Hawk.js.git "$REPOS_DIR/hawk-js"
git clone --depth 1 https://github.com/sybrew/the-seo-framework.git "$REPOS_DIR/the-seo-framework"

# Internal Linking
git clone --depth 1 https://github.com/PostHog/internallinker.git "$REPOS_DIR/internallinker"

# Rank Tracking
git clone --depth 1 https://github.com/beb7/gflare-tk.git "$REPOS_DIR/greenflare"

echo ""
echo "=== Cloning Tier 3: Curated Lists & AI SEO ==="

# Awesome Lists
git clone --depth 1 https://github.com/teles/awesome-seo.git "$REPOS_DIR/awesome-seo"
git clone --depth 1 https://github.com/amplifying-ai/awesome-generative-engine-optimization.git "$REPOS_DIR/awesome-geo"
git clone --depth 1 https://github.com/DavidHuji/Awesome-GEO.git "$REPOS_DIR/awesome-geo-research"
git clone --depth 1 https://github.com/best-of-ai/awesome-ai-seo.git "$REPOS_DIR/awesome-ai-seo"
git clone --depth 1 https://github.com/eliquid/awesome-local-seo.git "$REPOS_DIR/awesome-local-seo"
git clone --depth 1 https://github.com/sneg55/curatedseotools.git "$REPOS_DIR/curatedseotools"
git clone --depth 1 https://github.com/thospfuller/awesome-search-engine-optimization.git "$REPOS_DIR/awesome-search-engine-optimization"

# AI SEO Tools
git clone --depth 1 https://github.com/RivalSee/ai-seo-tools.git "$REPOS_DIR/ai-seo-tools"

echo ""
echo "=== Done! ==="
echo "Total repos cloned: $(ls -d $REPOS_DIR/*/ 2>/dev/null | wc -l)"
