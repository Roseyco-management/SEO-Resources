# n8n SEO Automation: Complete Workflow Guide

## Table of Contents

1. [Introduction to n8n for SEO](#introduction)
2. [n8n Setup and Configuration](#setup)
3. [Keyword Research Automation](#keyword-research)
4. [Content Creation Automation](#content-creation)
5. [SERP Tracking Workflows](#serp-tracking)
6. [Competitor Monitoring](#competitor-monitoring)
7. [DataForSEO Integration](#dataforseo-integration)
8. [OpenAI and Claude Integration](#ai-integration)
9. [Ready-to-Use Workflow Templates](#workflow-templates)
10. [Advanced Automation Strategies](#advanced-strategies)

## Introduction to n8n for SEO {#introduction}

n8n is a powerful workflow automation platform that enables you to connect various SEO tools, APIs, and services without writing code. For SEO professionals, n8n transforms manual, time-consuming tasks into automated workflows that run 24/7, freeing you to focus on strategy and analysis.

### Why n8n for SEO?

**Advantages Over Competitors:**
- **Self-hosted**: Complete control over your data and workflows
- **Open source**: Free to use, with optional cloud hosting
- **Extensible**: 400+ integrations plus custom HTTP requests
- **Visual interface**: Build complex workflows with drag-and-drop
- **Cost-effective**: No per-execution pricing like Zapier
- **Developer-friendly**: JavaScript support for custom logic

**SEO Use Cases:**
- Automated keyword research and tracking
- Content optimization workflows
- Competitor analysis and monitoring
- Backlink monitoring and outreach
- Technical SEO audits and alerts
- Rank tracking and reporting
- Content distribution and syndication
- Social media automation for content promotion

### n8n vs. Other Automation Tools

| Feature | n8n | Zapier | Make | IFTTT |
|---------|-----|--------|------|-------|
| Self-hosted option | ✓ | ✗ | ✗ | ✗ |
| Open source | ✓ | ✗ | ✗ | ✗ |
| Execution pricing | None (self-hosted) | Per task | Per operation | Limited |
| Custom code | JavaScript | Limited | Limited | No |
| API integrations | 400+ | 5000+ | 1000+ | 600+ |
| SEO tool support | Good | Excellent | Good | Limited |
| Learning curve | Medium | Easy | Medium | Easy |

## n8n Setup and Configuration {#setup}

### Installation Options

**Option 1: Docker (Recommended for most users)**

```bash
# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your_secure_password
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - NODE_ENV=production
      - WEBHOOK_URL=https://your-domain.com/
      - GENERIC_TIMEZONE=America/New_York
    volumes:
      - n8n_data:/home/node/.n8n
      - ./workflows:/home/node/.n8n/workflows

volumes:
  n8n_data:
EOF

# Start n8n
docker-compose up -d

# Access n8n at http://localhost:5678
```

**Option 2: npm (For developers)**

```bash
# Install globally
npm install n8n -g

# Run n8n
n8n start

# Or with custom settings
n8n start --tunnel
```

**Option 3: n8n Cloud**

Sign up at https://n8n.io/cloud for hosted solution (paid, but no infrastructure management).

### Initial Configuration

**1. Set Up Credentials**

Navigate to Settings > Credentials and add:

- **Google Sheets**: For data storage
- **Slack**: For notifications
- **HTTP Request**: For API integrations
- **Gmail**: For email automation
- **Airtable**: For database operations

**2. Configure Webhooks**

```
Webhook URL format: https://your-n8n-instance.com/webhook/webhook-name

For testing: https://your-n8n-instance.com/webhook-test/webhook-name
```

**3. Environment Variables**

Create `.env` file:

```bash
# API Keys
DATAFORSEO_LOGIN=your_login
DATAFORSEO_PASSWORD=your_password
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=your-claude-key

# Database
POSTGRES_HOST=localhost
POSTGRES_DB=n8n_data
POSTGRES_USER=n8n
POSTGRES_PASSWORD=your_password

# Webhooks
WEBHOOK_SECRET=your_webhook_secret
```

## Keyword Research Automation {#keyword-research}

### Workflow 1: Automated Keyword Discovery

**Workflow Description:**
Automatically discover and score new keyword opportunities daily.

**Nodes:**

1. **Schedule Trigger** - Runs daily at 8 AM
2. **HTTP Request (DataForSEO)** - Fetch related keywords
3. **Function** - Filter and score keywords
4. **Google Sheets** - Save results
5. **Slack** - Send notification

**Complete Workflow JSON:**

```json
{
  "name": "Daily Keyword Research",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "cronExpression",
              "expression": "0 8 * * *"
            }
          ]
        }
      },
      "name": "Schedule: Daily 8 AM",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "operation": "getAll",
        "documentId": "YOUR_SEED_KEYWORDS_SHEET_ID",
        "sheetName": "Seed Keywords",
        "options": {}
      },
      "name": "Get Seed Keywords",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [450, 300],
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "1",
          "name": "Google Sheets account"
        }
      }
    },
    {
      "parameters": {
        "url": "https://api.dataforseo.com/v3/dataforseo_labs/google/related_keywords/live",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpBasicAuth",
        "method": "POST",
        "jsonParameters": true,
        "bodyParametersJson": "={{ [\n  {\n    \"keyword\": $json[\"seed_keyword\"],\n    \"location_code\": 2840,\n    \"language_code\": \"en\",\n    \"depth\": 3\n  }\n] }}",
        "options": {}
      },
      "name": "DataForSEO Related Keywords",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [650, 300],
      "credentials": {
        "httpBasicAuth": {
          "id": "2",
          "name": "DataForSEO API"
        }
      }
    },
    {
      "parameters": {
        "functionCode": "// Extract and score keywords\nconst items = $input.all();\nconst keywords = [];\n\nfor (const item of items) {\n  const tasks = item.json.tasks || [];\n  \n  for (const task of tasks) {\n    const result = task.result || [];\n    \n    for (const res of result) {\n      const items = res.items || [];\n      \n      for (const kw of items) {\n        const keyword_data = kw.keyword_data || {};\n        const keyword_info = keyword_data.keyword_info || {};\n        const keyword_properties = kw.keyword_properties || {};\n        \n        // Extract metrics\n        const searchVolume = keyword_info.search_volume || 0;\n        const difficulty = keyword_properties.keyword_difficulty || 100;\n        const cpc = keyword_info.cpc || 0;\n        \n        // Filter criteria\n        if (searchVolume >= 100 && difficulty <= 50) {\n          // Calculate opportunity score\n          const opportunityScore = (\n            (searchVolume / 100) * 0.4 +\n            (100 - difficulty) * 0.4 +\n            (cpc * 100) * 0.2\n          );\n          \n          keywords.push({\n            json: {\n              keyword: keyword_data.keyword,\n              search_volume: searchVolume,\n              difficulty: difficulty,\n              cpc: cpc,\n              opportunity_score: Math.round(opportunityScore),\n              date_found: new Date().toISOString().split('T')[0],\n              seed_keyword: item.json.seed_keyword\n            }\n          });\n        }\n      }\n    }\n  }\n}\n\n// Sort by opportunity score\nkeywords.sort((a, b) => b.json.opportunity_score - a.json.opportunity_score);\n\n// Return top 50\nreturn keywords.slice(0, 50);"
      },
      "name": "Filter and Score Keywords",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [850, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "YOUR_RESULTS_SHEET_ID",
        "sheetName": "Keyword Opportunities",
        "options": {
          "valueInputMode": "USER_ENTERED"
        }
      },
      "name": "Save to Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [1050, 300],
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "1",
          "name": "Google Sheets account"
        }
      }
    },
    {
      "parameters": {
        "channel": "#seo-alerts",
        "text": "=🔍 Found {{ $json[\"length\"] }} new keyword opportunities!\\n\\nTop 5:\\n{{ $json[\"keywords\"].slice(0, 5).map(k => `• ${k.keyword} (Vol: ${k.search_volume}, Difficulty: ${k.difficulty}, Score: ${k.opportunity_score})`).join('\\n') }}\\n\\nView full report: [Google Sheet]",
        "otherOptions": {}
      },
      "name": "Notify on Slack",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 1,
      "position": [1250, 300],
      "credentials": {
        "slackOAuth2Api": {
          "id": "3",
          "name": "Slack account"
        }
      }
    }
  ],
  "connections": {
    "Schedule: Daily 8 AM": {
      "main": [
        [
          {
            "node": "Get Seed Keywords",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Seed Keywords": {
      "main": [
        [
          {
            "node": "DataForSEO Related Keywords",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "DataForSEO Related Keywords": {
      "main": [
        [
          {
            "node": "Filter and Score Keywords",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Filter and Score Keywords": {
      "main": [
        [
          {
            "node": "Save to Google Sheets",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Save to Google Sheets": {
      "main": [
        [
          {
            "node": "Notify on Slack",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

### Workflow 2: Keyword Gap Analysis Automation

**Function Node for Gap Analysis:**

```javascript
// Keyword Gap Analysis Function
const yourKeywords = $('Get Your Keywords').all().map(item => item.json.keyword.toLowerCase());
const competitorKeywords = $('Get Competitor Keywords').all();

const gaps = [];

for (const item of competitorKeywords) {
  const keyword = item.json.keyword.toLowerCase();

  // Check if gap exists
  if (!yourKeywords.includes(keyword)) {
    gaps.push({
      json: {
        keyword: item.json.keyword,
        competitor: item.json.competitor,
        competitor_position: item.json.position,
        search_volume: item.json.search_volume,
        difficulty: item.json.difficulty,
        priority: calculatePriority(item.json)
      }
    });
  }
}

function calculatePriority(data) {
  const volumeScore = Math.min(data.search_volume / 100, 50);
  const difficultyScore = (100 - data.difficulty) / 2;
  const positionScore = data.competitor_position <= 3 ? 20 : 10;

  const totalScore = volumeScore + difficultyScore + positionScore;

  if (totalScore >= 70) return 'High';
  if (totalScore >= 40) return 'Medium';
  return 'Low';
}

// Sort by search volume
gaps.sort((a, b) => b.json.search_volume - a.json.search_volume);

return gaps;
```

## Content Creation Automation {#content-creation}

### Workflow 3: AI-Powered Content Brief Generation

**Workflow Description:**
Automatically generate content briefs based on target keywords using AI.

**Complete Workflow:**

```json
{
  "name": "Content Brief Generator",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "generate-brief",
        "responseMode": "responseNode",
        "options": {}
      },
      "name": "Webhook: Trigger Brief Generation",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300],
      "webhookId": "content-brief-generator"
    },
    {
      "parameters": {
        "url": "https://api.dataforseo.com/v3/serp/google/organic/live/advanced",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpBasicAuth",
        "method": "POST",
        "jsonParameters": true,
        "bodyParametersJson": "={{ [\n  {\n    \"keyword\": $json[\"body\"][\"keyword\"],\n    \"location_code\": 2840,\n    \"language_code\": \"en\",\n    \"device\": \"desktop\",\n    \"depth\": 10\n  }\n] }}",
        "options": {}
      },
      "name": "Analyze SERP",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [450, 300]
    },
    {
      "parameters": {
        "functionCode": "// Analyze top 10 SERP results\nconst serp = $input.first().json;\nconst tasks = serp.tasks || [];\n\nif (tasks.length === 0 || !tasks[0].result) {\n  return [{ json: { error: 'No SERP data found' } }];\n}\n\nconst items = tasks[0].result[0].items || [];\nconst organicResults = items.filter(item => item.type === 'organic');\n\n// Extract data\nconst analysis = {\n  keyword: $json[\"body\"][\"keyword\"],\n  top_urls: [],\n  common_headings: {},\n  avg_word_count: 0,\n  content_types: {},\n  paa_questions: [],\n  related_searches: []\n};\n\n// Analyze organic results\nfor (const result of organicResults.slice(0, 10)) {\n  analysis.top_urls.push({\n    url: result.url,\n    title: result.title,\n    description: result.description,\n    position: result.rank_absolute\n  });\n}\n\n// Extract PAA questions\nconst paaItems = items.filter(item => item.type === 'people_also_ask');\nif (paaItems.length > 0) {\n  const paaQuestions = paaItems[0].items || [];\n  analysis.paa_questions = paaQuestions.map(q => q.title).slice(0, 5);\n}\n\n// Extract related searches\nconst relatedItems = items.filter(item => item.type === 'related_searches');\nif (relatedItems.length > 0) {\n  const searches = relatedItems[0].items || [];\n  analysis.related_searches = searches.map(s => s.query).slice(0, 8);\n}\n\nreturn [{ json: analysis }];"
      },
      "name": "Extract SERP Insights",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "resource": "chat",
        "operation": "message",
        "modelId": "gpt-4-turbo-preview",
        "messages": {
          "values": [
            {
              "role": "system",
              "content": "You are an expert SEO content strategist. Generate comprehensive content briefs based on SERP analysis."
            },
            {
              "role": "user",
              "content": "=Generate a detailed content brief for the keyword: {{ $json[\"keyword\"] }}\\n\\nSERP Analysis:\\n- Top ranking pages: {{ $json[\"top_urls\"].map(u => u.title).join(', ') }}\\n- People Also Ask: {{ $json[\"paa_questions\"].join(', ') }}\\n- Related Searches: {{ $json[\"related_searches\"].join(', ') }}\\n\\nCreate a brief including:\\n1. Recommended title (H1)\\n2. Target word count\\n3. Main sections (H2s) to include\\n4. Key topics to cover\\n5. Questions to answer\\n6. Content angle/unique value proposition\\n7. Internal linking opportunities"
            }
          ]
        },
        "options": {}
      },
      "name": "Generate Brief with GPT-4",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 1,
      "position": [850, 300],
      "credentials": {
        "openAiApi": {
          "id": "4",
          "name": "OpenAI account"
        }
      }
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "YOUR_CONTENT_BRIEFS_SHEET_ID",
        "sheetName": "Content Briefs",
        "columns": {
          "mappings": [
            {
              "column": "Keyword",
              "value": "={{ $json[\"keyword\"] }}"
            },
            {
              "column": "Brief",
              "value": "={{ $json[\"choices\"][0][\"message\"][\"content\"] }}"
            },
            {
              "column": "Date Created",
              "value": "={{ new Date().toISOString() }}"
            },
            {
              "column": "PAA Questions",
              "value": "={{ $json[\"paa_questions\"].join('; ') }}"
            }
          ]
        },
        "options": {}
      },
      "name": "Save Brief",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [1050, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { \"success\": true, \"brief\": $json[\"choices\"][0][\"message\"][\"content\"], \"keyword\": $json[\"keyword\"] } }}"
      },
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [1250, 300]
    }
  ],
  "connections": {
    "Webhook: Trigger Brief Generation": {
      "main": [
        [
          {
            "node": "Analyze SERP",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Analyze SERP": {
      "main": [
        [
          {
            "node": "Extract SERP Insights",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract SERP Insights": {
      "main": [
        [
          {
            "node": "Generate Brief with GPT-4",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Brief with GPT-4": {
      "main": [
        [
          {
            "node": "Save Brief",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Save Brief": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

**Usage:**

```bash
# Trigger workflow via webhook
curl -X POST https://your-n8n.com/webhook/generate-brief \
  -H "Content-Type: application/json" \
  -d '{"keyword": "machine learning best practices"}'
```

### Workflow 4: Content Optimization Checker

**Function Node for Content Analysis:**

```javascript
// Content Optimization Checker
const content = $json["content"];
const targetKeyword = $json["target_keyword"];
const competitorData = $json["competitor_data"];

// Calculate metrics
const wordCount = content.split(/\s+/).length;
const keywordDensity = (content.toLowerCase().match(new RegExp(targetKeyword.toLowerCase(), 'g')) || []).length / wordCount * 100;

// Extract headings
const headings = {
  h1: (content.match(/<h1[^>]*>(.*?)<\/h1>/gi) || []).length,
  h2: (content.match(/<h2[^>]*>(.*?)<\/h2>/gi) || []).length,
  h3: (content.match(/<h3[^>]*>(.*?)<\/h3>/gi) || []).length
};

// Check for images
const images = (content.match(/<img[^>]*>/gi) || []).length;

// Check for internal links
const internalLinks = (content.match(/<a[^>]*href=["']\/[^"']*["'][^>]*>/gi) || []).length;

// Compare to competitors
const avgCompetitorWordCount = competitorData.reduce((sum, c) => sum + c.word_count, 0) / competitorData.length;

// Generate score
let score = 0;
let recommendations = [];

// Word count check
if (wordCount >= avgCompetitorWordCount * 0.9) {
  score += 25;
} else {
  recommendations.push(`Increase word count to at least ${Math.round(avgCompetitorWordCount)} words (currently ${wordCount})`);
}

// Heading structure
if (headings.h1 === 1 && headings.h2 >= 5) {
  score += 20;
} else {
  if (headings.h1 !== 1) recommendations.push('Use exactly one H1 tag');
  if (headings.h2 < 5) recommendations.push('Add more H2 headings (target: 5-8)');
}

// Keyword optimization
if (keywordDensity >= 0.5 && keywordDensity <= 2.5) {
  score += 15;
} else {
  recommendations.push(`Adjust keyword density (currently ${keywordDensity.toFixed(2)}%, target: 0.5-2.5%)`);
}

// Images
if (images >= 3) {
  score += 15;
} else {
  recommendations.push(`Add more images (currently ${images}, target: 5+)`);
}

// Internal links
if (internalLinks >= 3) {
  score += 15;
} else {
  recommendations.push(`Add more internal links (currently ${internalLinks}, target: 5+)`);
}

// Check for schema markup
if (content.includes('application/ld+json')) {
  score += 10;
} else {
  recommendations.push('Add schema markup');
}

return [{
  json: {
    score: score,
    word_count: wordCount,
    keyword_density: keywordDensity.toFixed(2),
    headings: headings,
    images: images,
    internal_links: internalLinks,
    recommendations: recommendations,
    grade: score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'F'
  }
}];
```

## SERP Tracking Workflows {#serp-tracking}

### Workflow 5: Daily Rank Tracking

**Complete Workflow JSON:**

```json
{
  "name": "Daily Rank Tracking",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "cronExpression",
              "expression": "0 6 * * *"
            }
          ]
        }
      },
      "name": "Schedule: Daily 6 AM",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "operation": "getAll",
        "documentId": "YOUR_KEYWORDS_SHEET_ID",
        "sheetName": "Tracked Keywords",
        "options": {}
      },
      "name": "Get Keywords to Track",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [450, 300]
    },
    {
      "parameters": {
        "batchSize": 10,
        "options": {}
      },
      "name": "Split into Batches",
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "url": "https://api.dataforseo.com/v3/serp/google/organic/live/advanced",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpBasicAuth",
        "method": "POST",
        "jsonParameters": true,
        "bodyParametersJson": "={{ [\n  {\n    \"keyword\": $json[\"keyword\"],\n    \"location_code\": 2840,\n    \"language_code\": \"en\",\n    \"device\": \"desktop\",\n    \"depth\": 100,\n    \"url\": \"yoursite.com\"\n  }\n] }}",
        "options": {}
      },
      "name": "Check Ranking",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [850, 300]
    },
    {
      "parameters": {
        "functionCode": "// Extract ranking position\nconst items = $input.all();\nconst results = [];\n\nfor (const item of items) {\n  const tasks = item.json.tasks || [];\n  \n  if (tasks.length === 0) continue;\n  \n  const task = tasks[0];\n  const keyword = task.data?.keyword || 'unknown';\n  \n  let position = null;\n  let found = false;\n  \n  if (task.result && task.result.length > 0) {\n    const serpItems = task.result[0].items || [];\n    \n    for (const serpItem of serpItems) {\n      if (serpItem.type === 'organic') {\n        position = serpItem.rank_absolute;\n        found = true;\n        break;\n      }\n    }\n  }\n  \n  results.push({\n    json: {\n      keyword: keyword,\n      position: found ? position : 'Not ranking',\n      date: new Date().toISOString().split('T')[0],\n      found: found,\n      url: task.data?.url || 'yoursite.com'\n    }\n  });\n}\n\nreturn results;"
      },
      "name": "Extract Position",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [1050, 300]
    },
    {
      "parameters": {
        "amount": 2,
        "unit": "seconds"
      },
      "name": "Rate Limit",
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1,
      "position": [1250, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "YOUR_TRACKING_SHEET_ID",
        "sheetName": "Rank History",
        "options": {}
      },
      "name": "Log Rankings",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [1450, 300]
    },
    {
      "parameters": {
        "functionCode": "// Calculate changes from previous week\nconst currentData = $('Extract Position').all();\nconst historicalData = $('Get Historical Data').all();\n\nconst changes = [];\n\nfor (const current of currentData) {\n  const keyword = current.json.keyword;\n  \n  // Find previous position (7 days ago)\n  const previous = historicalData.find(h => \n    h.json.keyword === keyword && \n    new Date(h.json.date).getTime() === new Date().getTime() - (7 * 24 * 60 * 60 * 1000)\n  );\n  \n  if (previous) {\n    const currentPos = current.json.position === 'Not ranking' ? 101 : current.json.position;\n    const previousPos = previous.json.position === 'Not ranking' ? 101 : previous.json.position;\n    \n    const change = previousPos - currentPos; // Positive = improvement\n    \n    if (Math.abs(change) >= 5) { // Significant change\n      changes.push({\n        json: {\n          keyword: keyword,\n          current_position: current.json.position,\n          previous_position: previous.json.position,\n          change: change,\n          change_direction: change > 0 ? 'up' : 'down',\n          alert_level: Math.abs(change) >= 10 ? 'high' : 'medium'\n        }\n      });\n    }\n  }\n}\n\nreturn changes;"
      },
      "name": "Detect Significant Changes",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [1650, 300]
    },
    {
      "parameters": {
        "conditions": {
          "boolean": [
            {
              "value1": "={{ $json[\"length\"] }}",
              "operation": "larger",
              "value2": 0
            }
          ]
        }
      },
      "name": "If Changes Detected",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [1850, 300]
    },
    {
      "parameters": {
        "channel": "#seo-alerts",
        "text": "=📊 Daily Rank Tracking Report\\n\\n{{ $json.length }} significant ranking changes detected:\\n\\n{{ $json.map(item => `${item.change > 0 ? '📈' : '📉'} ${item.keyword}\\n  Position: ${item.previous_position} → ${item.current_position} (${item.change > 0 ? '+' : ''}${item.change})`).join('\\n\\n') }}",
        "otherOptions": {}
      },
      "name": "Alert on Slack",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 1,
      "position": [2050, 200]
    }
  ],
  "connections": {
    "Schedule: Daily 6 AM": {
      "main": [
        [
          {
            "node": "Get Keywords to Track",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Keywords to Track": {
      "main": [
        [
          {
            "node": "Split into Batches",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Split into Batches": {
      "main": [
        [
          {
            "node": "Check Ranking",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Check Ranking": {
      "main": [
        [
          {
            "node": "Extract Position",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract Position": {
      "main": [
        [
          {
            "node": "Rate Limit",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Rate Limit": {
      "main": [
        [
          {
            "node": "Log Rankings",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Log Rankings": {
      "main": [
        [
          {
            "node": "Detect Significant Changes",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Detect Significant Changes": {
      "main": [
        [
          {
            "node": "If Changes Detected",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If Changes Detected": {
      "main": [
        [
          {
            "node": "Alert on Slack",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## Competitor Monitoring {#competitor-monitoring}

### Workflow 6: Competitor Content Monitoring

**Complete Workflow:**

```json
{
  "name": "Competitor Content Monitor",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "cronExpression",
              "expression": "0 */4 * * *"
            }
          ]
        }
      },
      "name": "Schedule: Every 4 Hours",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "operation": "getAll",
        "documentId": "YOUR_COMPETITORS_SHEET_ID",
        "sheetName": "Competitor Feeds",
        "options": {}
      },
      "name": "Get Competitor RSS Feeds",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [450, 300]
    },
    {
      "parameters": {
        "url": "={{ $json[\"rss_feed_url\"] }}",
        "options": {}
      },
      "name": "Fetch RSS Feed",
      "type": "n8n-nodes-base.rssFeedRead",
      "typeVersion": 1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "conditions": {
          "dateTime": [
            {
              "value1": "={{ $json[\"pubDate\"] }}",
              "operation": "after",
              "value2": "={{ $now.minus(4, 'hours').toISO() }}"
            }
          ]
        }
      },
      "name": "Filter Recent Posts",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [850, 300]
    },
    {
      "parameters": {
        "url": "={{ $json[\"link\"] }}",
        "options": {}
      },
      "name": "Fetch Content",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [1050, 200]
    },
    {
      "parameters": {
        "resource": "chat",
        "operation": "message",
        "modelId": "gpt-4-turbo-preview",
        "messages": {
          "values": [
            {
              "role": "user",
              "content": "=Analyze this competitor content and provide:\\n1. Main topic/angle\\n2. Target keywords (estimated)\\n3. Content quality (1-10)\\n4. Unique insights\\n5. Potential gaps we can exploit\\n\\nTitle: {{ $json[\"title\"] }}\\nURL: {{ $json[\"link\"] }}\\nContent preview: {{ $json[\"contentSnippet\"] }}"
            }
          ]
        },
        "options": {}
      },
      "name": "Analyze with AI",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 1,
      "position": [1250, 200]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "YOUR_COMPETITOR_ANALYSIS_SHEET_ID",
        "sheetName": "Competitor Content",
        "columns": {
          "mappings": [
            {
              "column": "Date",
              "value": "={{ new Date().toISOString() }}"
            },
            {
              "column": "Competitor",
              "value": "={{ $json[\"competitor_name\"] }}"
            },
            {
              "column": "Title",
              "value": "={{ $json[\"title\"] }}"
            },
            {
              "column": "URL",
              "value": "={{ $json[\"link\"] }}"
            },
            {
              "column": "Analysis",
              "value": "={{ $json[\"ai_analysis\"] }}"
            }
          ]
        },
        "options": {}
      },
      "name": "Log Competitor Content",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [1450, 200]
    },
    {
      "parameters": {
        "channel": "#competitor-intel",
        "text": "=🔍 New competitor content detected:\\n\\n**{{ $json[\"competitor_name\"] }}** published:\\n{{ $json[\"title\"] }}\\n{{ $json[\"link\"] }}\\n\\n📊 AI Analysis:\\n{{ $json[\"ai_analysis\"] }}",
        "otherOptions": {}
      },
      "name": "Notify Team",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 1,
      "position": [1650, 200]
    }
  ]
}
```

## DataForSEO Integration {#dataforseo-integration}

### Complete DataForSEO Function Library

```javascript
// DataForSEO Helper Functions for n8n

class DataForSEOHelper {
  constructor(login, password) {
    this.login = login;
    this.password = password;
    this.baseUrl = 'https://api.dataforseo.com/v3';
  }

  // Get related keywords
  async getRelatedKeywords(keyword, locationCode = 2840) {
    const endpoint = `${this.baseUrl}/dataforseo_labs/google/related_keywords/live`;

    const payload = [{
      keyword: keyword,
      location_code: locationCode,
      language_code: 'en',
      depth: 3
    }];

    return await this.makeRequest(endpoint, payload);
  }

  // Get SERP data
  async getSERP(keyword, locationCode = 2840, depth = 10) {
    const endpoint = `${this.baseUrl}/serp/google/organic/live/advanced`;

    const payload = [{
      keyword: keyword,
      location_code: locationCode,
      language_code: 'en',
      device: 'desktop',
      depth: depth
    }];

    return await this.makeRequest(endpoint, payload);
  }

  // Get competitor keywords
  async getCompetitorKeywords(domain, locationCode = 2840, limit = 1000) {
    const endpoint = `${this.baseUrl}/dataforseo_labs/google/ranked_keywords/live`;

    const payload = [{
      target: domain,
      location_code: locationCode,
      language_code: 'en',
      limit: limit
    }];

    return await this.makeRequest(endpoint, payload);
  }

  // Get keyword ideas
  async getKeywordIdeas(seed, locationCode = 2840) {
    const endpoint = `${this.baseUrl}/dataforseo_labs/google/keyword_ideas/live`;

    const payload = [{
      keywords: Array.isArray(seed) ? seed : [seed],
      location_code: locationCode,
      language_code: 'en',
      include_seed_keyword: true,
      include_serp_info: true
    }];

    return await this.makeRequest(endpoint, payload);
  }

  // Get domain ranking keywords
  async getDomainMetrics(domain, locationCode = 2840) {
    const endpoint = `${this.baseUrl}/dataforseo_labs/google/domain_metrics/live`;

    const payload = [{
      target: domain,
      location_code: locationCode,
      language_code: 'en'
    }];

    return await this.makeRequest(endpoint, payload);
  }

  // Make authenticated request
  async makeRequest(endpoint, payload) {
    const auth = Buffer.from(`${this.login}:${this.password}`).toString('base64');

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return await response.json();
  }
}

// Export for use in n8n Function nodes
module.exports = DataForSEOHelper;

// Usage in n8n Function node:
/*
const DataForSEOHelper = require('./dataforseo-helper');

const helper = new DataForSEOHelper(
  $env.DATAFORSEO_LOGIN,
  $env.DATAFORSEO_PASSWORD
);

const results = await helper.getRelatedKeywords($json["keyword"]);

return results.tasks[0].result[0].items.map(item => ({
  json: {
    keyword: item.keyword_data.keyword,
    search_volume: item.keyword_data.keyword_info.search_volume,
    difficulty: item.keyword_properties.keyword_difficulty
  }
}));
*/
```

## OpenAI and Claude Integration {#ai-integration}

### Workflow 7: AI Content Optimizer

**Claude Integration for Content Analysis:**

```javascript
// Function node for Claude API integration
const anthropicApiKey = $env.ANTHROPIC_API_KEY;
const content = $json["content"];
const targetKeyword = $json["target_keyword"];

// Call Claude API
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': anthropicApiKey,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `Analyze this content for SEO optimization. Target keyword: "${targetKeyword}"

Content:
${content}

Provide:
1. SEO Score (0-100)
2. Keyword usage analysis
3. Content structure assessment
4. Readability evaluation
5. Top 5 specific optimization recommendations
6. Suggested meta description
7. Suggested title tag

Format as JSON.`
    }]
  })
});

const data = await response.json();
const analysis = JSON.parse(data.content[0].text);

return [{
  json: {
    original_content: content,
    target_keyword: targetKeyword,
    seo_score: analysis.seo_score,
    analysis: analysis,
    recommendations: analysis.recommendations,
    suggested_meta: analysis.meta_description,
    suggested_title: analysis.title_tag
  }
}];
```

**OpenAI Integration for Bulk Content Generation:**

```javascript
// Bulk content generation with GPT-4
const keywords = $input.all();
const generatedContent = [];

for (const item of keywords) {
  const keyword = item.json.keyword;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${$env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert SEO content writer. Create comprehensive, well-structured content that ranks well in search engines.'
        },
        {
          role: 'user',
          content: `Write a comprehensive blog post about: ${keyword}

Requirements:
- 1500-2000 words
- Include H2 and H3 headings
- Natural keyword integration
- Include FAQ section
- Add conclusion with CTA
- Optimize for featured snippets`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  const data = await response.json();

  generatedContent.push({
    json: {
      keyword: keyword,
      content: data.choices[0].message.content,
      word_count: data.choices[0].message.content.split(/\s+/).length,
      generated_at: new Date().toISOString()
    }
  });

  // Rate limiting
  await new Promise(resolve => setTimeout(resolve, 1000));
}

return generatedContent;
```

## Ready-to-Use Workflow Templates {#workflow-templates}

### Template 1: Complete SEO Dashboard Update

**Workflow that updates a comprehensive SEO dashboard:**

1. Fetch keyword rankings (DataForSEO)
2. Get GSC performance data (Google Search Console API)
3. Pull backlink data (Ahrefs API)
4. Analyze competitor rankings
5. Generate AI insights
6. Update Google Sheets dashboard
7. Send weekly email report

### Template 2: Content Publishing Pipeline

**Automated content workflow:**

1. Webhook trigger when content is ready
2. Run SEO optimization check (Claude)
3. Generate meta tags (GPT-4)
4. Create social media posts (GPT-4)
5. Schedule publication (WordPress/CMS API)
6. Submit to search engines
7. Post to social media
8. Add to internal linking system

### Template 3: Technical SEO Monitor

**Monitor and alert on technical issues:**

1. Scheduled crawl trigger
2. Check site speed (PageSpeed API)
3. Monitor uptime (StatusCake API)
4. Scan for broken links (custom script)
5. Check robots.txt/sitemap changes
6. Analyze Core Web Vitals
7. Alert on issues (Slack/Email)
8. Log all metrics (Database)

**Access n8n workflow templates:**
- https://n8n.io/workflows/?categories=SEO
- https://n8n.io/workflows/?categories=Marketing
- Community templates: https://community.n8n.io/

## Advanced Automation Strategies {#advanced-strategies}

### Strategy 1: Dynamic Content Update System

```javascript
// Automatically update old content based on performance
const posts = $('Get Old Posts').all();
const updatedPosts = [];

for (const post of posts) {
  // Check if post is underperforming
  const isUnderperforming = post.json.clicks < 100 &&
                           post.json.age_days > 180;

  if (isUnderperforming) {
    // Generate update suggestions with AI
    const suggestions = await generateUpdateSuggestions(post.json);

    // If high-value keyword, auto-update
    if (post.json.search_volume > 1000) {
      const updatedContent = await updateContent(
        post.json.content,
        suggestions
      );

      // Publish update
      await publishUpdate(post.json.id, updatedContent);

      updatedPosts.push({
        json: {
          post_id: post.json.id,
          title: post.json.title,
          update_type: 'automatic',
          suggestions: suggestions
        }
      });
    }
  }
}

return updatedPosts;
```

### Strategy 2: Intelligent Link Building Outreach

```javascript
// Find and reach out to link prospects automatically
const targetKeyword = $json["keyword"];

// Find top ranking pages
const serp = await getCompetitorBacklinks(targetKeyword);

// Extract linking domains
const linkProspects = await findContactInfo(serp);

// Score prospects
const scoredProspects = linkProspects.map(prospect => ({
  ...prospect,
  score: calculateProspectScore(prospect)
}));

// Generate personalized outreach emails with AI
for (const prospect of scoredProspects.slice(0, 20)) {
  const email = await generateOutreachEmail(prospect);

  await sendEmail({
    to: prospect.email,
    subject: email.subject,
    body: email.body
  });

  // Log outreach
  await logOutreach(prospect);
}
```

### Strategy 3: Predictive Content Planning

```javascript
// Use historical data and trends to predict content opportunities
const historicalData = $('Get Historical Rankings').all();
const trendData = $('Get Google Trends').all();

// Analyze patterns
const patterns = analyzeSeasonalPatterns(historicalData);
const emergingTopics = identifyEmergingTopics(trendData);

// Predict next month's opportunities
const predictions = [];

for (const topic of emergingTopics) {
  const predictedVolume = predictSearchVolume(topic, patterns);
  const competitionLevel = await assessCompetition(topic.keyword);

  if (predictedVolume > 500 && competitionLevel < 50) {
    predictions.push({
      json: {
        keyword: topic.keyword,
        predicted_volume: predictedVolume,
        current_volume: topic.current_volume,
        growth_rate: topic.growth_rate,
        competition: competitionLevel,
        recommended_publish_date: calculateOptimalPublishDate(topic, patterns),
        priority: calculatePriority(predictedVolume, competitionLevel)
      }
    });
  }
}

return predictions.sort((a, b) => b.json.priority - a.json.priority);
```

### Best Practices for n8n SEO Automation

**1. Error Handling:**
```javascript
try {
  const result = await riskyOperation();
  return [{ json: result }];
} catch (error) {
  // Log error
  await logError(error);

  // Send alert
  await sendSlackAlert(`Workflow failed: ${error.message}`);

  // Return gracefully
  return [{ json: { error: error.message, success: false } }];
}
```

**2. Rate Limiting:**
```javascript
// Implement intelligent rate limiting
const requests = $input.all();
const results = [];

for (let i = 0; i < requests.length; i++) {
  results.push(await processRequest(requests[i]));

  // Wait between requests
  if (i < requests.length - 1) {
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

return results;
```

**3. Data Validation:**
```javascript
// Validate data before processing
function validateData(data) {
  const errors = [];

  if (!data.keyword || data.keyword.length < 2) {
    errors.push('Invalid keyword');
  }

  if (!data.search_volume || data.search_volume < 0) {
    errors.push('Invalid search volume');
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`);
  }

  return true;
}

// Use in workflow
const data = $json;
validateData(data);
// Continue processing...
```

---

## Conclusion

n8n transforms SEO from a manual, time-intensive process into an automated, data-driven operation. By implementing the workflows and strategies in this guide, you can:

- Automate repetitive SEO tasks
- Scale keyword research and tracking
- Monitor competitors 24/7
- Generate AI-powered content insights
- React to ranking changes in real-time
- Optimize content systematically
- Build comprehensive SEO dashboards

Start with simple workflows like daily rank tracking, then gradually build more complex automations. The combination of n8n's flexibility, SEO tool APIs, and AI capabilities creates endless possibilities for SEO automation.

**Next Steps:**
1. Install n8n (Docker recommended)
2. Set up DataForSEO and OpenAI credentials
3. Import starter workflows from n8n.io/workflows
4. Customize for your specific needs
5. Monitor and iterate

Remember: Automation amplifies strategy. Build solid SEO foundations first, then automate intelligently to scale your efforts.
