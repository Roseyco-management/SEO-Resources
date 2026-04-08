# SEO & Marketing Resources

This is the team's SEO and marketing knowledge base. When anyone references this project for SEO work, use this file as your index.

## How to Use This Repo

When asked to do SEO work on any project, follow this decision tree:

### "I need to do SEO on a website"
1. Start with [SEO Master Playbook](guides/seo-master-playbook-2026.md) — it covers the full process
2. Run an audit using the checklist in the playbook
3. Follow the 90-day quick start plan

### "I need to optimize content for AI search (ChatGPT, Perplexity, etc.)"
1. Read [GEO/AEO/LLMO Research](research/seo-geo-aeo-llmo-research-2026.md)
2. Use the `/ai-seo` skill if available

### "I need to write SEO content"
1. Read [Content Creation Workflow](guides/seo-content-creation-workflow.md)
2. For topic planning, use [Topical Maps & Clustering](guides/topical-maps-and-clustering.md)
3. For keyword research, use [Keyword Clustering Guide](guides/keyword-clustering-guide.md)

### "I need to add schema/structured data"
1. Read [the schema-markup skill](skills/schema-markup/SKILL.md) for patterns
2. Reference repos: `repos/react-schemaorg/`, `repos/schema-org/`, `repos/schemaorg-official/`

### "I need to fix technical SEO issues"
1. Read the technical SEO section in [SEO Master Playbook](guides/seo-master-playbook-2026.md)
2. For internal linking: [Internal Linking Automation](guides/internal-linking-automation.md)
3. For E-E-A-T: [E-E-A-T Framework](guides/eeat-optimization-framework.md)
4. For log analysis: [Log File Analysis](guides/log-file-analysis-setup.md)

### "I need to build authority"
1. [E-E-A-T Framework](guides/eeat-optimization-framework.md)
2. [Entity-Based SEO Workflow](guides/entity-based-seo-workflow.md)
3. [Topical Maps & Clustering](guides/topical-maps-and-clustering.md)

### "I need to automate SEO tasks"
1. [N8N SEO Automation](guides/n8n-seo-automation.md)
2. [N8N Automation Setup](guides/n8n-automation-setup.md)

## Guide Index

| Guide | When to use it |
|-------|---------------|
| `guides/seo-master-playbook-2026.md` | Starting point for any SEO project. Full strategy. |
| `guides/keyword-clustering-guide.md` | Researching and grouping keywords by intent |
| `guides/topical-maps-and-clustering.md` | Planning content clusters and pillar pages |
| `guides/eeat-optimization-framework.md` | Building author/site authority and trust signals |
| `guides/entity-based-seo-workflow.md` | Knowledge Graph optimization, entity SEO |
| `guides/seo-content-creation-workflow.md` | Writing SEO content from brief to publish |
| `guides/internal-linking-automation.md` | Automating and improving internal link structure |
| `guides/advanced-content-strategy.md` | Deep content strategy framework |
| `guides/n8n-seo-automation.md` | Automating SEO workflows with N8N |
| `guides/n8n-automation-setup.md` | Setting up N8N automation |
| `guides/log-file-analysis-setup.md` | Analyzing server logs for crawl insights |
| `research/seo-geo-aeo-llmo-research-2026.md` | AI search optimization (GEO/AEO/LLMO) |

## Skills Index

Skills are in `/skills/`. Each has a `SKILL.md` with the full framework and `/references/` with supporting data.

### SEO Skills
- `skills/ai-seo/` — Optimize for AI search engines
- `skills/seo-audit/` — Full SEO audit framework
- `skills/schema-markup/` — Structured data implementation
- `skills/programmatic-seo/` — Pages at scale with templates
- `skills/site-architecture/` — URL structure, navigation, site hierarchy

### Content Skills
- `skills/content-strategy/` — What content to create and why
- `skills/copywriting/` — Writing marketing copy
- `skills/copy-editing/` — Editing and improving copy
- `skills/humanizer/` — Remove AI writing patterns
- `skills/cold-email/` — Cold outreach emails
- `skills/email-sequence/` — Drip campaigns and nurture flows
- `skills/social-content/` — Social media content

### CRO Skills
- `skills/page-cro/` — Landing page optimization
- `skills/form-cro/` — Form optimization
- `skills/signup-flow-cro/` — Signup flow optimization
- `skills/onboarding-cro/` — Post-signup activation
- `skills/popup-cro/` — Popup/modal optimization
- `skills/paywall-upgrade-cro/` — Upgrade screen optimization

### Advertising Skills
- `skills/paid-ads/` — PPC campaign management
- `skills/ad-creative/` — Ad copy and creative
- `skills/ab-test-setup/` — A/B test design
- `skills/analytics-tracking/` — GA4, GTM, conversion tracking

### Growth Skills
- `skills/marketing-ideas/` — Marketing idea generation
- `skills/marketing-psychology/` — Behavioral science for marketing
- `skills/customer-research/` — ICP and customer research
- `skills/competitor-alternatives/` — Competitor comparison pages
- `skills/lead-magnets/` — Lead magnet creation
- `skills/free-tool-strategy/` — Engineering as marketing
- `skills/launch-strategy/` — Product launch planning
- `skills/referral-program/` — Referral/affiliate programs
- `skills/churn-prevention/` — Retention and save flows

### Revenue Skills
- `skills/pricing-strategy/` — Pricing and packaging
- `skills/product-marketing-context/` — Positioning docs
- `skills/revops/` — Revenue operations and lead lifecycle
- `skills/sales-enablement/` — Pitch decks, objection handling

## Tool Repos

52 open-source SEO tools are in `/repos/`. Key ones:

| Need | Use |
|------|-----|
| Site audit | `repos/seonaut/`, `repos/site-audit-seo/`, `repos/seo-audits-toolkit/` |
| Performance audit | `repos/lighthouse/`, `repos/unlighthouse/`, `repos/web-vitals/` |
| Crawling | `repos/crawl4ai/`, `repos/scrapy/`, `repos/crawlee/`, `repos/firecrawl/` |
| Schema markup | `repos/react-schemaorg/`, `repos/schema-org/`, `repos/schemaorg-official/` |
| WordPress SEO | `repos/yoast-seo/`, `repos/the-seo-framework/` |
| Next.js SEO | `repos/next-seo/`, `repos/next-sitemap/` |
| Rank tracking | `repos/serpbear/` |
| Keyword research | `repos/seo-keyword-research-tool/`, `repos/advertools/` |
| Internal linking | `repos/internallinker/` |
| Backlinks | `repos/backlink-monitoring/` |
| Python SEO scripts | `repos/advertools/`, `repos/search-solved-public-seo/`, `repos/python-seo-analyzer/` |
| Content extraction | `repos/postlight-parser/`, `repos/crawl4ai/` |
| GEO/AI SEO | `repos/GEO/`, `repos/gego/`, `repos/ai-seo-tools/` |
| Sitemaps | `repos/next-sitemap/`, `repos/hawk-js/` |
