# Advanced Content Strategy: Data-Driven Content Planning and Optimization

## Table of Contents

1. [Introduction to Strategic Content Planning](#introduction)
2. [Content Gap Analysis Methods](#gap-analysis)
3. [Competitor Content Benchmarking](#competitor-benchmarking)
4. [SERP Intent Analysis](#serp-intent)
5. [Topic Modeling for Content Planning](#topic-modeling)
6. [Content Calendar Optimization](#calendar-optimization)
7. [Tool Integration and Automation](#tool-integration)
8. [n8n Automation Workflows](#n8n-automation)
9. [Metrics and KPIs](#metrics-kpis)
10. [Advanced Implementation Strategies](#advanced-strategies)

## Introduction to Strategic Content Planning {#introduction}

Advanced content strategy goes far beyond creating blog posts based on keyword research. In 2025, successful content strategies are data-driven, intent-focused, and systematically optimized for both search engines and user needs. This guide provides a comprehensive framework for building content strategies that drive measurable business results.

### The Evolution of Content Strategy

**Traditional Content Strategy:**
- Keyword-driven topic selection
- Publication frequency focus
- Basic SEO optimization
- Limited competitive analysis
- Intuition-based planning

**Advanced Content Strategy:**
- Data-driven topic discovery
- Intent-matched content creation
- Comprehensive gap analysis
- Systematic competitor benchmarking
- Automated research workflows
- Continuous optimization cycles

### Why Advanced Content Strategy Matters

1. **Competitive Advantage**: Systematic analysis reveals opportunities competitors miss
2. **Resource Efficiency**: Data-driven prioritization maximizes ROI on content investment
3. **Search Visibility**: Intent-matched content performs better in modern search algorithms
4. **Scalability**: Automated workflows enable consistent content production at scale
5. **Measurability**: Clear metrics tie content efforts to business outcomes

### Framework Overview

This guide follows a systematic approach:

```
Research Phase → Analysis Phase → Planning Phase → Production Phase → Optimization Phase
     ↓               ↓                ↓                 ↓                    ↓
Gap Analysis    Competitor      Content         Automated          Performance
SERP Intent     Benchmarking    Calendar        Workflows          Tracking
Topic Models    Content Audit   Prioritization  n8n Integration    Iteration
```

## Content Gap Analysis Methods {#gap-analysis}

Content gap analysis identifies topics, keywords, and content formats where competitors rank but you don't. This reveals high-value opportunities for new content creation.

### Method 1: Keyword Gap Analysis

**Using DataForSEO for Comprehensive Gap Analysis:**

```python
import requests
import json
from typing import List, Dict
import pandas as pd

class KeywordGapAnalyzer:
    """Analyze keyword gaps between your site and competitors"""

    def __init__(self, dataforseo_login: str, dataforseo_password: str):
        self.login = dataforseo_login
        self.password = dataforseo_password
        self.base_url = "https://api.dataforseo.com/v3"

    def get_competitor_keywords(
        self,
        competitor_domain: str,
        location_code: int = 2840,
        limit: int = 1000
    ) -> List[Dict]:
        """Get keywords competitor ranks for"""

        endpoint = f"{self.base_url}/dataforseo_labs/google/ranked_keywords/live"

        payload = [{
            "target": competitor_domain,
            "location_code": location_code,
            "language_code": "en",
            "limit": limit,
            "filters": [
                ["ranked_serp_element.serp_item.rank_group", "<=", 20]
            ]
        }]

        response = requests.post(
            endpoint,
            auth=(self.login, self.password),
            headers={"Content-Type": "application/json"},
            data=json.dumps(payload)
        )

        if response.status_code == 200:
            data = response.json()
            if data['tasks'][0]['status_code'] == 20000:
                return data['tasks'][0]['result'][0]['items']

        return []

    def find_keyword_gaps(
        self,
        your_domain: str,
        competitor_domains: List[str],
        location_code: int = 2840
    ) -> pd.DataFrame:
        """Find keywords competitors rank for but you don't"""

        # Get your keywords
        print(f"Fetching keywords for {your_domain}...")
        your_keywords = self.get_competitor_keywords(your_domain, location_code)
        your_keyword_set = set([kw['keyword_data']['keyword'] for kw in your_keywords])

        # Get competitor keywords
        gap_keywords = []

        for competitor in competitor_domains:
            print(f"Analyzing {competitor}...")
            comp_keywords = self.get_competitor_keywords(competitor, location_code)

            for kw_data in comp_keywords:
                keyword = kw_data['keyword_data']['keyword']

                # Check if gap exists
                if keyword not in your_keyword_set:
                    gap_keywords.append({
                        'keyword': keyword,
                        'competitor': competitor,
                        'competitor_position': kw_data['ranked_serp_element']['serp_item']['rank_group'],
                        'search_volume': kw_data['keyword_data'].get('keyword_info', {}).get('search_volume', 0),
                        'cpc': kw_data['keyword_data'].get('keyword_info', {}).get('cpc', 0),
                        'competition': kw_data['keyword_data'].get('keyword_info', {}).get('competition', 0),
                        'difficulty': kw_data['keyword_data'].get('keyword_properties', {}).get('keyword_difficulty', 0)
                    })

        # Convert to DataFrame for analysis
        df = pd.DataFrame(gap_keywords)

        if not df.empty:
            # Remove duplicates, keeping highest volume version
            df = df.sort_values('search_volume', ascending=False)
            df = df.drop_duplicates(subset=['keyword'], keep='first')

            # Add opportunity score
            df['opportunity_score'] = (
                df['search_volume'] * 0.4 +
                (100 - df['difficulty']) * 0.3 +
                df['cpc'] * 100 * 0.3
            )

            df = df.sort_values('opportunity_score', ascending=False)

        return df

    def export_gap_analysis(self, df: pd.DataFrame, output_file: str):
        """Export gap analysis to CSV"""
        df.to_csv(output_file, index=False)
        print(f"Gap analysis exported to {output_file}")

    def categorize_gaps_by_intent(self, df: pd.DataFrame) -> Dict[str, pd.DataFrame]:
        """Categorize gap keywords by search intent"""

        # Define intent patterns
        intent_patterns = {
            'informational': ['how to', 'what is', 'why', 'guide', 'tutorial', 'tips', 'learn'],
            'commercial': ['best', 'top', 'review', 'compare', 'vs', 'alternative'],
            'transactional': ['buy', 'price', 'cost', 'discount', 'deal', 'shop'],
            'navigational': ['login', 'download', 'app', 'tool', 'software']
        }

        categorized = {}

        for intent, patterns in intent_patterns.items():
            pattern_regex = '|'.join(patterns)
            mask = df['keyword'].str.contains(pattern_regex, case=False, na=False)
            categorized[intent] = df[mask].copy()

        # Uncategorized
        all_masks = pd.Series([False] * len(df))
        for intent_df in categorized.values():
            all_masks |= df['keyword'].isin(intent_df['keyword'])

        categorized['uncategorized'] = df[~all_masks].copy()

        return categorized

# Usage example
analyzer = KeywordGapAnalyzer(
    dataforseo_login='your_login',
    dataforseo_password='your_password'
)

# Find gaps
gaps = analyzer.find_keyword_gaps(
    your_domain='yoursite.com',
    competitor_domains=[
        'competitor1.com',
        'competitor2.com',
        'competitor3.com'
    ]
)

print(f"\nFound {len(gaps)} keyword gaps")
print("\nTop 10 opportunities:")
print(gaps[['keyword', 'search_volume', 'difficulty', 'opportunity_score']].head(10))

# Categorize by intent
categorized = analyzer.categorize_gaps_by_intent(gaps)

print("\nGaps by intent:")
for intent, intent_df in categorized.items():
    print(f"  {intent}: {len(intent_df)} keywords")

# Export
analyzer.export_gap_analysis(gaps, 'keyword_gaps.csv')
```

### Method 2: Topic Gap Analysis

**Identifying Topic Clusters You're Missing:**

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import numpy as np

class TopicGapAnalyzer:
    """Analyze topic coverage gaps"""

    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            max_features=1000,
            ngram_range=(1, 3),
            stop_words='english'
        )

    def analyze_competitor_topics(
        self,
        competitor_keywords: List[str],
        n_clusters: int = 10
    ) -> Dict:
        """Cluster competitor keywords into topics"""

        # Vectorize keywords
        X = self.vectorizer.fit_transform(competitor_keywords)

        # Cluster
        kmeans = KMeans(n_clusters=n_clusters, random_state=42)
        clusters = kmeans.fit_predict(X)

        # Organize by cluster
        clustered_keywords = {}
        for idx, cluster_id in enumerate(clusters):
            if cluster_id not in clustered_keywords:
                clustered_keywords[cluster_id] = []
            clustered_keywords[cluster_id].append(competitor_keywords[idx])

        # Get top terms for each cluster
        cluster_terms = {}
        feature_names = self.vectorizer.get_feature_names_out()

        for cluster_id in range(n_clusters):
            center = kmeans.cluster_centers_[cluster_id]
            top_indices = center.argsort()[-10:][::-1]
            top_terms = [feature_names[i] for i in top_indices]
            cluster_terms[cluster_id] = top_terms

        return {
            'clusters': clustered_keywords,
            'cluster_terms': cluster_terms
        }

    def find_missing_topics(
        self,
        your_keywords: List[str],
        competitor_keywords: List[str],
        n_clusters: int = 10
    ) -> List[Dict]:
        """Identify topic clusters present in competitor but not yours"""

        # Analyze competitor topics
        comp_topics = self.analyze_competitor_topics(competitor_keywords, n_clusters)

        # Vectorize your keywords
        your_set = set([kw.lower() for kw in your_keywords])

        # Find gaps
        topic_gaps = []

        for cluster_id, keywords in comp_topics['clusters'].items():
            # Check coverage
            cluster_keywords = set([kw.lower() for kw in keywords])
            coverage = len(cluster_keywords & your_set) / len(cluster_keywords)

            if coverage < 0.3:  # Less than 30% coverage = gap
                topic_gaps.append({
                    'cluster_id': cluster_id,
                    'topic_terms': comp_topics['cluster_terms'][cluster_id],
                    'coverage': coverage,
                    'example_keywords': keywords[:10],
                    'priority': 'high' if coverage < 0.1 else 'medium'
                })

        # Sort by coverage (lowest first)
        topic_gaps.sort(key=lambda x: x['coverage'])

        return topic_gaps

# Usage
topic_analyzer = TopicGapAnalyzer()

# Your keywords
your_keywords = [
    "machine learning basics",
    "python tutorial",
    "data science guide"
    # ... your actual keywords
]

# Competitor keywords
competitor_keywords = [
    "machine learning basics",
    "deep learning neural networks",
    "tensorflow tutorial",
    "pytorch guide",
    "computer vision applications",
    "nlp text processing"
    # ... competitor keywords from gap analysis
]

# Find missing topics
missing_topics = topic_analyzer.find_missing_topics(
    your_keywords,
    competitor_keywords,
    n_clusters=15
)

print(f"\nFound {len(missing_topics)} topic gaps\n")

for topic in missing_topics[:5]:
    print(f"Topic Cluster {topic['cluster_id']}:")
    print(f"  Priority: {topic['priority']}")
    print(f"  Coverage: {topic['coverage']:.1%}")
    print(f"  Key terms: {', '.join(topic['topic_terms'][:5])}")
    print(f"  Example keywords: {', '.join(topic['example_keywords'][:3])}")
    print()
```

### Method 3: SERP Feature Gap Analysis

**Identifying Missing Content Formats:**

```python
class SERPFeatureGapAnalyzer:
    """Analyze SERP feature opportunities"""

    def __init__(self, dataforseo_login: str, dataforseo_password: str):
        self.login = dataforseo_login
        self.password = dataforseo_password
        self.base_url = "https://api.dataforseo.com/v3"

    def analyze_serp_features(
        self,
        keywords: List[str],
        location_code: int = 2840
    ) -> pd.DataFrame:
        """Analyze SERP features for keywords"""

        results = []

        for keyword in keywords:
            endpoint = f"{self.base_url}/serp/google/organic/live/advanced"

            payload = [{
                "keyword": keyword,
                "location_code": location_code,
                "language_code": "en",
                "device": "desktop"
            }]

            response = requests.post(
                endpoint,
                auth=(self.login, self.password),
                headers={"Content-Type": "application/json"},
                data=json.dumps(payload)
            )

            if response.status_code == 200:
                data = response.json()

                if data['tasks'][0]['status_code'] == 20000:
                    items = data['tasks'][0]['result'][0]['items']

                    # Identify SERP features
                    features = {
                        'keyword': keyword,
                        'featured_snippet': False,
                        'people_also_ask': False,
                        'video_carousel': False,
                        'image_pack': False,
                        'knowledge_graph': False,
                        'local_pack': False,
                        'top_stories': False,
                        'related_searches': False
                    }

                    for item in items:
                        item_type = item.get('type', '')

                        if item_type == 'featured_snippet':
                            features['featured_snippet'] = True
                        elif item_type == 'people_also_ask':
                            features['people_also_ask'] = True
                        elif item_type == 'video':
                            features['video_carousel'] = True
                        elif item_type == 'images':
                            features['image_pack'] = True
                        elif item_type == 'knowledge_graph':
                            features['knowledge_graph'] = True
                        elif item_type == 'local_pack':
                            features['local_pack'] = True
                        elif item_type == 'top_stories':
                            features['top_stories'] = True
                        elif item_type == 'related_searches':
                            features['related_searches'] = True

                    results.append(features)

        return pd.DataFrame(results)

    def identify_feature_opportunities(
        self,
        serp_features_df: pd.DataFrame,
        your_current_features: Dict[str, List[str]]
    ) -> Dict:
        """Identify SERP feature opportunities you're missing"""

        opportunities = {}

        feature_columns = [col for col in serp_features_df.columns if col != 'keyword']

        for feature in feature_columns:
            # Keywords with this feature
            keywords_with_feature = serp_features_df[
                serp_features_df[feature] == True
            ]['keyword'].tolist()

            # Keywords you already have this feature for
            your_keywords = set(your_current_features.get(feature, []))

            # Gap
            opportunities[feature] = [
                kw for kw in keywords_with_feature
                if kw not in your_keywords
            ]

        return opportunities

# Usage
serp_analyzer = SERPFeatureGapAnalyzer(
    dataforseo_login='your_login',
    dataforseo_password='your_password'
)

# Analyze target keywords
target_keywords = [
    "how to train machine learning model",
    "best python libraries for data science",
    "tensorflow vs pytorch"
]

serp_features = serp_analyzer.analyze_serp_features(target_keywords)

print("\nSERP Feature Presence:")
print(serp_features)

# Your current feature coverage
your_features = {
    'featured_snippet': ['best python libraries for data science'],
    'people_also_ask': []
}

# Find opportunities
opportunities = serp_analyzer.identify_feature_opportunities(
    serp_features,
    your_features
)

print("\nSERP Feature Opportunities:")
for feature, keywords in opportunities.items():
    if keywords:
        print(f"\n{feature}:")
        for kw in keywords:
            print(f"  - {kw}")
```

## Competitor Content Benchmarking {#competitor-benchmarking}

### Comprehensive Competitor Content Audit

```python
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import statistics

class CompetitorContentAuditor:
    """Audit competitor content strategy"""

    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

    def crawl_competitor_sitemap(self, sitemap_url: str) -> List[str]:
        """Extract URLs from competitor sitemap"""

        response = requests.get(sitemap_url, headers=self.headers)
        soup = BeautifulSoup(response.content, 'xml')

        urls = []
        for loc in soup.find_all('loc'):
            urls.append(loc.text)

        return urls

    def analyze_content_metrics(self, url: str) -> Dict:
        """Analyze content metrics for a page"""

        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')

            # Remove script and style elements
            for script in soup(["script", "style"]):
                script.decompose()

            # Get text
            text = soup.get_text()
            words = text.split()

            # Extract headings
            headings = {
                'h1': [h.get_text() for h in soup.find_all('h1')],
                'h2': [h.get_text() for h in soup.find_all('h2')],
                'h3': [h.get_text() for h in soup.find_all('h3')]
            }

            # Count images
            images = len(soup.find_all('img'))

            # Count internal links
            base_domain = urlparse(url).netloc
            links = soup.find_all('a', href=True)
            internal_links = len([
                l for l in links
                if urlparse(urljoin(url, l['href'])).netloc == base_domain
            ])

            # Check for video
            has_video = len(soup.find_all(['video', 'iframe'])) > 0

            # Check for schema
            has_schema = len(soup.find_all('script', type='application/ld+json')) > 0

            return {
                'url': url,
                'word_count': len(words),
                'h1_count': len(headings['h1']),
                'h2_count': len(headings['h2']),
                'h3_count': len(headings['h3']),
                'total_headings': sum(len(h) for h in headings.values()),
                'image_count': images,
                'internal_link_count': internal_links,
                'has_video': has_video,
                'has_schema': has_schema,
                'headings': headings
            }

        except Exception as e:
            print(f"Error analyzing {url}: {e}")
            return None

    def benchmark_competitors(
        self,
        competitor_urls: List[str],
        sample_size: int = 50
    ) -> Dict:
        """Benchmark multiple competitors"""

        all_metrics = []

        for url in competitor_urls[:sample_size]:
            print(f"Analyzing {url}...")
            metrics = self.analyze_content_metrics(url)
            if metrics:
                all_metrics.append(metrics)

        if not all_metrics:
            return {}

        # Calculate benchmarks
        df = pd.DataFrame(all_metrics)

        benchmarks = {
            'word_count': {
                'mean': df['word_count'].mean(),
                'median': df['word_count'].median(),
                'min': df['word_count'].min(),
                'max': df['word_count'].max()
            },
            'heading_count': {
                'mean': df['total_headings'].mean(),
                'median': df['total_headings'].median()
            },
            'image_count': {
                'mean': df['image_count'].mean(),
                'median': df['image_count'].median()
            },
            'internal_links': {
                'mean': df['internal_link_count'].mean(),
                'median': df['internal_link_count'].median()
            },
            'video_usage': df['has_video'].sum() / len(df) * 100,
            'schema_adoption': df['has_schema'].sum() / len(df) * 100
        }

        return {
            'benchmarks': benchmarks,
            'detailed_data': all_metrics
        }

    def compare_to_benchmark(
        self,
        your_content: Dict,
        benchmarks: Dict
    ) -> Dict:
        """Compare your content to competitor benchmarks"""

        comparison = {}

        for metric in ['word_count', 'heading_count', 'image_count', 'internal_links']:
            your_value = your_content.get(metric, 0)
            benchmark_median = benchmarks[metric]['median']

            difference = your_value - benchmark_median
            percentage = (difference / benchmark_median) * 100 if benchmark_median > 0 else 0

            comparison[metric] = {
                'your_value': your_value,
                'benchmark': benchmark_median,
                'difference': difference,
                'percentage_diff': percentage,
                'status': 'above' if difference > 0 else 'below'
            }

        return comparison

# Usage
auditor = CompetitorContentAuditor()

# Get competitor URLs
competitor_sitemap = "https://competitor.com/sitemap.xml"
competitor_urls = auditor.crawl_competitor_sitemap(competitor_sitemap)

print(f"Found {len(competitor_urls)} competitor URLs")

# Benchmark
benchmarks = auditor.benchmark_competitors(competitor_urls, sample_size=50)

print("\nCompetitor Benchmarks:")
print(f"Average word count: {benchmarks['benchmarks']['word_count']['mean']:.0f}")
print(f"Median word count: {benchmarks['benchmarks']['word_count']['median']:.0f}")
print(f"Average headings: {benchmarks['benchmarks']['heading_count']['mean']:.1f}")
print(f"Average images: {benchmarks['benchmarks']['image_count']['mean']:.1f}")
print(f"Video usage: {benchmarks['benchmarks']['video_usage']:.1f}%")
print(f"Schema adoption: {benchmarks['benchmarks']['schema_adoption']:.1f}%")

# Compare your content
your_content = {
    'word_count': 1200,
    'heading_count': 8,
    'image_count': 3,
    'internal_links': 5
}

comparison = auditor.compare_to_benchmark(your_content, benchmarks['benchmarks'])

print("\nYour Content vs Benchmark:")
for metric, data in comparison.items():
    print(f"\n{metric}:")
    print(f"  Your value: {data['your_value']}")
    print(f"  Benchmark: {data['benchmark']:.0f}")
    print(f"  Difference: {data['percentage_diff']:+.1f}%")
```

### Content Quality Scoring

```python
class ContentQualityScorer:
    """Score content quality based on multiple factors"""

    def __init__(self):
        self.weights = {
            'readability': 0.15,
            'comprehensiveness': 0.25,
            'structure': 0.15,
            'media_richness': 0.15,
            'technical_seo': 0.15,
            'engagement_signals': 0.15
        }

    def calculate_readability_score(self, text: str) -> float:
        """Calculate readability (0-100)"""
        # Simple approximation of Flesch Reading Ease
        sentences = text.count('.') + text.count('!') + text.count('?')
        words = len(text.split())
        syllables = sum([self._count_syllables(word) for word in text.split()])

        if sentences == 0 or words == 0:
            return 0

        flesch = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)

        # Normalize to 0-100
        return max(0, min(100, flesch))

    def _count_syllables(self, word: str) -> int:
        """Simple syllable counter"""
        word = word.lower()
        count = 0
        vowels = 'aeiouy'
        previous_was_vowel = False

        for char in word:
            is_vowel = char in vowels
            if is_vowel and not previous_was_vowel:
                count += 1
            previous_was_vowel = is_vowel

        if word.endswith('e'):
            count -= 1
        if count == 0:
            count = 1

        return count

    def calculate_comprehensiveness_score(
        self,
        word_count: int,
        heading_count: int,
        topic_coverage: float
    ) -> float:
        """Calculate comprehensiveness (0-100)"""

        # Word count score (0-40 points)
        word_score = min(40, (word_count / 2000) * 40)

        # Structure score (0-30 points)
        structure_score = min(30, (heading_count / 10) * 30)

        # Topic coverage score (0-30 points)
        coverage_score = topic_coverage * 30

        return word_score + structure_score + coverage_score

    def calculate_structure_score(self, headings: Dict) -> float:
        """Calculate content structure quality (0-100)"""

        score = 0

        # H1 presence (20 points)
        if len(headings.get('h1', [])) == 1:
            score += 20

        # H2 usage (40 points)
        h2_count = len(headings.get('h2', []))
        score += min(40, (h2_count / 8) * 40)

        # H3 usage (20 points)
        h3_count = len(headings.get('h3', []))
        score += min(20, (h3_count / 12) * 20)

        # Hierarchy check (20 points)
        if h2_count > 0 and h3_count > 0:
            score += 20

        return score

    def calculate_media_richness_score(
        self,
        image_count: int,
        has_video: bool,
        has_infographic: bool
    ) -> float:
        """Calculate media richness (0-100)"""

        score = 0

        # Images (40 points)
        score += min(40, (image_count / 8) * 40)

        # Video (40 points)
        if has_video:
            score += 40

        # Infographic (20 points)
        if has_infographic:
            score += 20

        return score

    def calculate_technical_seo_score(
        self,
        has_schema: bool,
        internal_links: int,
        external_links: int,
        has_meta_description: bool,
        has_alt_text: bool
    ) -> float:
        """Calculate technical SEO score (0-100)"""

        score = 0

        # Schema markup (30 points)
        if has_schema:
            score += 30

        # Internal linking (25 points)
        score += min(25, (internal_links / 10) * 25)

        # External linking (15 points)
        score += min(15, (external_links / 5) * 15)

        # Meta description (15 points)
        if has_meta_description:
            score += 15

        # Alt text (15 points)
        if has_alt_text:
            score += 15

        return score

    def calculate_overall_score(self, content_metrics: Dict) -> Dict:
        """Calculate overall content quality score"""

        scores = {
            'readability': self.calculate_readability_score(
                content_metrics.get('text', '')
            ),
            'comprehensiveness': self.calculate_comprehensiveness_score(
                content_metrics.get('word_count', 0),
                content_metrics.get('heading_count', 0),
                content_metrics.get('topic_coverage', 0.5)
            ),
            'structure': self.calculate_structure_score(
                content_metrics.get('headings', {})
            ),
            'media_richness': self.calculate_media_richness_score(
                content_metrics.get('image_count', 0),
                content_metrics.get('has_video', False),
                content_metrics.get('has_infographic', False)
            ),
            'technical_seo': self.calculate_technical_seo_score(
                content_metrics.get('has_schema', False),
                content_metrics.get('internal_links', 0),
                content_metrics.get('external_links', 0),
                content_metrics.get('has_meta_description', False),
                content_metrics.get('has_alt_text', False)
            ),
            'engagement_signals': content_metrics.get('engagement_score', 50)
        }

        # Calculate weighted overall score
        overall_score = sum(
            scores[category] * self.weights[category]
            for category in scores.keys()
        )

        return {
            'overall_score': overall_score,
            'category_scores': scores,
            'grade': self._get_grade(overall_score)
        }

    def _get_grade(self, score: float) -> str:
        """Convert score to letter grade"""
        if score >= 90:
            return 'A'
        elif score >= 80:
            return 'B'
        elif score >= 70:
            return 'C'
        elif score >= 60:
            return 'D'
        else:
            return 'F'

# Usage
scorer = ContentQualityScorer()

content_metrics = {
    'text': "Your article content here...",
    'word_count': 2500,
    'heading_count': 12,
    'topic_coverage': 0.85,
    'headings': {
        'h1': ['Main Title'],
        'h2': ['Section 1', 'Section 2', 'Section 3'],
        'h3': ['Subsection 1.1', 'Subsection 1.2']
    },
    'image_count': 6,
    'has_video': True,
    'has_infographic': False,
    'has_schema': True,
    'internal_links': 8,
    'external_links': 4,
    'has_meta_description': True,
    'has_alt_text': True,
    'engagement_score': 75
}

quality_score = scorer.calculate_overall_score(content_metrics)

print(f"\nContent Quality Score: {quality_score['overall_score']:.1f} ({quality_score['grade']})")
print("\nCategory Breakdown:")
for category, score in quality_score['category_scores'].items():
    print(f"  {category}: {score:.1f}/100")
```

## SERP Intent Analysis {#serp-intent}

### Automated Intent Classification

```python
from typing import List, Dict
import re

class SERPIntentAnalyzer:
    """Analyze search intent from SERP features and top results"""

    def __init__(self):
        self.intent_signals = {
            'informational': {
                'query_patterns': ['how to', 'what is', 'why', 'guide', 'tutorial', 'learn', 'tips'],
                'serp_features': ['featured_snippet', 'people_also_ask', 'knowledge_graph'],
                'content_types': ['article', 'guide', 'tutorial']
            },
            'commercial': {
                'query_patterns': ['best', 'top', 'review', 'compare', 'vs', 'alternative'],
                'serp_features': ['shopping_results', 'product_carousel'],
                'content_types': ['review', 'comparison', 'list']
            },
            'transactional': {
                'query_patterns': ['buy', 'price', 'cost', 'discount', 'deal', 'shop', 'order'],
                'serp_features': ['shopping_results', 'local_pack', 'ads'],
                'content_types': ['product', 'pricing', 'store']
            },
            'navigational': {
                'query_patterns': ['login', 'sign in', 'account', 'app', 'download'],
                'serp_features': ['sitelinks', 'knowledge_graph'],
                'content_types': ['homepage', 'login']
            }
        }

    def analyze_query_intent(self, keyword: str) -> Dict:
        """Analyze intent from query string"""

        keyword_lower = keyword.lower()
        intent_scores = {intent: 0 for intent in self.intent_signals.keys()}

        # Check query patterns
        for intent, signals in self.intent_signals.items():
            for pattern in signals['query_patterns']:
                if pattern in keyword_lower:
                    intent_scores[intent] += 1

        # Determine primary intent
        primary_intent = max(intent_scores, key=intent_scores.get)

        # If no patterns matched, default to informational
        if intent_scores[primary_intent] == 0:
            primary_intent = 'informational'

        return {
            'keyword': keyword,
            'primary_intent': primary_intent,
            'intent_scores': intent_scores
        }

    def analyze_serp_intent(
        self,
        keyword: str,
        serp_features: List[str],
        top_result_types: List[str]
    ) -> Dict:
        """Analyze intent from SERP features and results"""

        intent_scores = {intent: 0 for intent in self.intent_signals.keys()}

        # Analyze SERP features
        for intent, signals in self.intent_signals.items():
            for feature in serp_features:
                if feature in signals['serp_features']:
                    intent_scores[intent] += 2

        # Analyze top result types
        for intent, signals in self.intent_signals.items():
            for result_type in top_result_types:
                if result_type in signals['content_types']:
                    intent_scores[intent] += 1

        # Combine with query analysis
        query_intent = self.analyze_query_intent(keyword)
        intent_scores[query_intent['primary_intent']] += 2

        # Determine primary and secondary intent
        sorted_intents = sorted(intent_scores.items(), key=lambda x: x[1], reverse=True)

        return {
            'keyword': keyword,
            'primary_intent': sorted_intents[0][0],
            'secondary_intent': sorted_intents[1][0] if sorted_intents[1][1] > 0 else None,
            'intent_confidence': sorted_intents[0][1] / sum(intent_scores.values()) if sum(intent_scores.values()) > 0 else 0,
            'intent_scores': intent_scores,
            'serp_features': serp_features,
            'top_result_types': top_result_types
        }

    def recommend_content_type(self, intent_analysis: Dict) -> Dict:
        """Recommend content type based on intent"""

        recommendations = {
            'informational': {
                'content_format': 'Long-form guide or tutorial',
                'min_word_count': 2000,
                'required_elements': [
                    'Step-by-step instructions',
                    'Examples and screenshots',
                    'FAQ section',
                    'Video tutorial (optional)',
                    'Downloadable resources'
                ],
                'schema_types': ['Article', 'HowTo', 'FAQPage']
            },
            'commercial': {
                'content_format': 'Comparison or review article',
                'min_word_count': 1500,
                'required_elements': [
                    'Comparison table',
                    'Pros and cons lists',
                    'Expert verdict',
                    'User reviews/ratings',
                    'Product images'
                ],
                'schema_types': ['Article', 'Product', 'Review']
            },
            'transactional': {
                'content_format': 'Product or service page',
                'min_word_count': 500,
                'required_elements': [
                    'Clear pricing',
                    'CTA buttons',
                    'Product specifications',
                    'Customer testimonials',
                    'Trust signals'
                ],
                'schema_types': ['Product', 'Offer', 'Review']
            },
            'navigational': {
                'content_format': 'Landing or homepage',
                'min_word_count': 300,
                'required_elements': [
                    'Clear navigation',
                    'Brand information',
                    'Quick access links',
                    'Contact information'
                ],
                'schema_types': ['Organization', 'WebSite']
            }
        }

        primary_intent = intent_analysis['primary_intent']

        return {
            'intent': primary_intent,
            'recommendation': recommendations[primary_intent],
            'confidence': intent_analysis['intent_confidence']
        }

# Usage
intent_analyzer = SERPIntentAnalyzer()

# Analyze keyword intent
keyword = "how to train a machine learning model"

# SERP features present
serp_features = [
    'featured_snippet',
    'people_also_ask',
    'video_carousel'
]

# Top result types
top_result_types = [
    'tutorial',
    'guide',
    'article'
]

# Analyze intent
intent_analysis = intent_analyzer.analyze_serp_intent(
    keyword,
    serp_features,
    top_result_types
)

print(f"\nKeyword: {keyword}")
print(f"Primary Intent: {intent_analysis['primary_intent']}")
print(f"Confidence: {intent_analysis['intent_confidence']:.1%}")

# Get content recommendations
recommendation = intent_analyzer.recommend_content_type(intent_analysis)

print(f"\nRecommended Content Format: {recommendation['recommendation']['content_format']}")
print(f"Minimum Word Count: {recommendation['recommendation']['min_word_count']}")
print("\nRequired Elements:")
for element in recommendation['recommendation']['required_elements']:
    print(f"  - {element}")
```

### Content-Intent Matching Score

```python
class ContentIntentMatcher:
    """Match existing content to search intent"""

    def __init__(self):
        pass

    def analyze_content_intent_alignment(
        self,
        content_analysis: Dict,
        target_intent: str
    ) -> Dict:
        """Score how well content matches target intent"""

        intent_requirements = {
            'informational': {
                'min_word_count': 1500,
                'required_elements': ['headings', 'examples', 'explanations'],
                'optimal_headings': 10,
                'requires_video': False
            },
            'commercial': {
                'min_word_count': 1200,
                'required_elements': ['comparison', 'pros_cons', 'recommendations'],
                'optimal_headings': 8,
                'requires_images': True
            },
            'transactional': {
                'min_word_count': 500,
                'required_elements': ['pricing', 'cta', 'specifications'],
                'optimal_headings': 5,
                'requires_cta': True
            }
        }

        requirements = intent_requirements.get(target_intent, {})
        score = 0
        max_score = 100
        feedback = []

        # Word count check (30 points)
        word_count = content_analysis.get('word_count', 0)
        min_words = requirements.get('min_word_count', 1000)

        if word_count >= min_words:
            score += 30
        elif word_count >= min_words * 0.7:
            score += 20
            feedback.append(f"Word count below optimal ({word_count}/{min_words})")
        else:
            score += 10
            feedback.append(f"Word count significantly below target ({word_count}/{min_words})")

        # Structure check (30 points)
        heading_count = content_analysis.get('heading_count', 0)
        optimal_headings = requirements.get('optimal_headings', 8)

        if heading_count >= optimal_headings:
            score += 30
        elif heading_count >= optimal_headings * 0.7:
            score += 20
            feedback.append("Could use more headings for better structure")
        else:
            score += 10
            feedback.append("Insufficient heading structure")

        # Required elements check (40 points)
        required_elements = requirements.get('required_elements', [])
        present_elements = 0

        for element in required_elements:
            if content_analysis.get(f'has_{element}', False):
                present_elements += 1

        element_score = (present_elements / len(required_elements)) * 40 if required_elements else 0
        score += element_score

        if present_elements < len(required_elements):
            missing = len(required_elements) - present_elements
            feedback.append(f"Missing {missing} required elements for {target_intent} intent")

        return {
            'intent': target_intent,
            'alignment_score': score,
            'grade': self._get_grade(score),
            'feedback': feedback,
            'actionable_improvements': self._generate_improvements(
                content_analysis,
                requirements,
                feedback
            )
        }

    def _get_grade(self, score: float) -> str:
        """Convert score to grade"""
        if score >= 90:
            return 'Excellent'
        elif score >= 75:
            return 'Good'
        elif score >= 60:
            return 'Fair'
        else:
            return 'Poor'

    def _generate_improvements(
        self,
        content_analysis: Dict,
        requirements: Dict,
        feedback: List[str]
    ) -> List[str]:
        """Generate specific improvement recommendations"""

        improvements = []

        # Word count
        if content_analysis.get('word_count', 0) < requirements.get('min_word_count', 1000):
            target = requirements.get('min_word_count', 1000)
            current = content_analysis.get('word_count', 0)
            needed = target - current
            improvements.append(f"Add approximately {needed} words to reach target length")

        # Headings
        if content_analysis.get('heading_count', 0) < requirements.get('optimal_headings', 8):
            needed = requirements.get('optimal_headings', 8) - content_analysis.get('heading_count', 0)
            improvements.append(f"Add {needed} more headings to improve structure")

        # Elements
        required_elements = requirements.get('required_elements', [])
        for element in required_elements:
            if not content_analysis.get(f'has_{element}', False):
                improvements.append(f"Add {element.replace('_', ' ')} section")

        return improvements

# Usage
matcher = ContentIntentMatcher()

content_analysis = {
    'word_count': 1800,
    'heading_count': 9,
    'has_headings': True,
    'has_examples': True,
    'has_explanations': True,
    'has_video': False
}

alignment = matcher.analyze_content_intent_alignment(
    content_analysis,
    target_intent='informational'
)

print(f"\nIntent Alignment Score: {alignment['alignment_score']:.0f}/100 ({alignment['grade']})")
print("\nFeedback:")
for item in alignment['feedback']:
    print(f"  - {item}")

print("\nActionable Improvements:")
for improvement in alignment['actionable_improvements']:
    print(f"  - {improvement}")
```

## Topic Modeling for Content Planning {#topic-modeling}

### LDA Topic Modeling for Content Discovery

```python
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

class TopicModeler:
    """Use LDA to discover content topics"""

    def __init__(self, n_topics: int = 10):
        self.n_topics = n_topics
        self.vectorizer = CountVectorizer(
            max_features=1000,
            stop_words='english',
            ngram_range=(1, 2)
        )
        self.lda_model = LatentDirichletAllocation(
            n_components=n_topics,
            random_state=42,
            max_iter=50
        )

    def fit_topics(self, documents: List[str]) -> Dict:
        """Fit LDA model to documents"""

        # Vectorize
        doc_term_matrix = self.vectorizer.fit_transform(documents)

        # Fit LDA
        self.lda_model.fit(doc_term_matrix)

        # Extract topics
        feature_names = self.vectorizer.get_feature_names_out()
        topics = []

        for topic_idx, topic in enumerate(self.lda_model.components_):
            top_indices = topic.argsort()[-10:][::-1]
            top_terms = [feature_names[i] for i in top_indices]
            top_weights = [topic[i] for i in top_indices]

            topics.append({
                'topic_id': topic_idx,
                'terms': top_terms,
                'weights': top_weights
            })

        return {
            'topics': topics,
            'n_documents': len(documents),
            'n_features': len(feature_names)
        }

    def assign_topics_to_documents(
        self,
        documents: List[str]
    ) -> List[Dict]:
        """Assign primary topic to each document"""

        doc_term_matrix = self.vectorizer.transform(documents)
        doc_topics = self.lda_model.transform(doc_term_matrix)

        assignments = []

        for doc_idx, topic_distribution in enumerate(doc_topics):
            primary_topic = np.argmax(topic_distribution)
            confidence = topic_distribution[primary_topic]

            assignments.append({
                'document_idx': doc_idx,
                'primary_topic': primary_topic,
                'confidence': confidence,
                'topic_distribution': topic_distribution.tolist()
            })

        return assignments

    def find_content_gaps(
        self,
        your_documents: List[str],
        competitor_documents: List[str]
    ) -> List[Dict]:
        """Identify topics well-covered by competitors but not you"""

        # Fit on combined corpus
        all_documents = your_documents + competitor_documents
        self.fit_topics(all_documents)

        # Assign topics
        your_assignments = self.assign_topics_to_documents(your_documents)
        comp_assignments = self.assign_topics_to_documents(competitor_documents)

        # Count coverage by topic
        your_coverage = {}
        comp_coverage = {}

        for assignment in your_assignments:
            topic = assignment['primary_topic']
            your_coverage[topic] = your_coverage.get(topic, 0) + 1

        for assignment in comp_assignments:
            topic = assignment['primary_topic']
            comp_coverage[topic] = comp_coverage.get(topic, 0) + 1

        # Find gaps
        gaps = []

        for topic_id in range(self.n_topics):
            your_count = your_coverage.get(topic_id, 0)
            comp_count = comp_coverage.get(topic_id, 0)

            if comp_count > 0:
                coverage_ratio = your_count / comp_count if comp_count > 0 else 0

                if coverage_ratio < 0.5:  # Less than 50% coverage
                    gaps.append({
                        'topic_id': topic_id,
                        'your_documents': your_count,
                        'competitor_documents': comp_count,
                        'coverage_ratio': coverage_ratio,
                        'priority': 'high' if coverage_ratio < 0.2 else 'medium'
                    })

        # Sort by priority
        gaps.sort(key=lambda x: x['coverage_ratio'])

        return gaps

    def generate_content_ideas(
        self,
        topic_id: int,
        existing_documents: List[str]
    ) -> List[str]:
        """Generate content ideas for a topic"""

        # Get topic terms
        feature_names = self.vectorizer.get_feature_names_out()
        topic = self.lda_model.components_[topic_id]
        top_indices = topic.argsort()[-20:][::-1]
        topic_terms = [feature_names[i] for i in top_indices]

        # Generate content ideas (combinations of terms)
        ideas = []

        # How-to ideas
        for term in topic_terms[:10]:
            ideas.append(f"How to {term}")
            ideas.append(f"{term.title()} guide for beginners")

        # Best/top ideas
        for term in topic_terms[:5]:
            ideas.append(f"Best {term} tools")
            ideas.append(f"Top {term} strategies")

        # Comparison ideas
        for i, term1 in enumerate(topic_terms[:3]):
            for term2 in topic_terms[i+1:i+3]:
                ideas.append(f"{term1.title()} vs {term2.title()}")

        return ideas[:15]  # Return top 15 ideas

# Usage
modeler = TopicModeler(n_topics=15)

# Your content (titles or snippets)
your_content = [
    "Machine learning basics for beginners",
    "Python programming tutorial",
    "Data science with pandas"
    # ... more documents
]

# Competitor content
competitor_content = [
    "Deep learning neural networks explained",
    "TensorFlow complete guide",
    "Computer vision applications",
    "Natural language processing basics"
    # ... more documents
]

# Fit model
topic_model = modeler.fit_topics(your_content + competitor_content)

print("\nDiscovered Topics:")
for topic in topic_model['topics'][:5]:
    print(f"\nTopic {topic['topic_id']}:")
    print(f"  Top terms: {', '.join(topic['terms'][:5])}")

# Find gaps
gaps = modeler.find_content_gaps(your_content, competitor_content)

print(f"\nFound {len(gaps)} content gaps\n")

for gap in gaps[:3]:
    topic_id = gap['topic_id']
    topic_terms = topic_model['topics'][topic_id]['terms'][:5]

    print(f"Topic {topic_id}: {', '.join(topic_terms)}")
    print(f"  Your coverage: {gap['your_documents']} documents")
    print(f"  Competitor coverage: {gap['competitor_documents']} documents")
    print(f"  Priority: {gap['priority']}")

    # Generate ideas
    ideas = modeler.generate_content_ideas(topic_id, your_content)
    print(f"  Content ideas:")
    for idea in ideas[:3]:
        print(f"    - {idea}")
    print()
```

## Content Calendar Optimization {#calendar-optimization}

### Data-Driven Content Calendar

```python
import datetime
from typing import List, Dict
import pandas as pd

class ContentCalendarOptimizer:
    """Optimize content calendar based on data"""

    def __init__(self):
        self.calendar = []

    def add_content_item(
        self,
        title: str,
        target_keyword: str,
        intent: str,
        priority_score: float,
        estimated_effort: int,  # hours
        publish_date: datetime.date = None
    ):
        """Add item to content calendar"""

        self.calendar.append({
            'title': title,
            'target_keyword': target_keyword,
            'intent': intent,
            'priority_score': priority_score,
            'estimated_effort': estimated_effort,
            'publish_date': publish_date,
            'status': 'planned'
        })

    def prioritize_by_roi(self, search_volume_data: Dict[str, int]) -> pd.DataFrame:
        """Prioritize content by potential ROI"""

        df = pd.DataFrame(self.calendar)

        # Add search volume
        df['search_volume'] = df['target_keyword'].map(search_volume_data)

        # Calculate ROI score (search volume / effort)
        df['roi_score'] = (df['search_volume'] * df['priority_score']) / df['estimated_effort']

        # Sort by ROI
        df = df.sort_values('roi_score', ascending=False)

        return df

    def generate_publishing_schedule(
        self,
        start_date: datetime.date,
        posts_per_week: int,
        team_capacity_hours: int
    ) -> pd.DataFrame:
        """Generate optimized publishing schedule"""

        df = pd.DataFrame(self.calendar)

        # Sort by priority
        df = df.sort_values('priority_score', ascending=False)

        # Assign publish dates
        current_date = start_date
        weekly_hours_used = 0
        week_posts = 0

        for idx, row in df.iterrows():
            # Check if we exceed weekly capacity
            if weekly_hours_used + row['estimated_effort'] > team_capacity_hours:
                # Move to next week
                current_date += datetime.timedelta(days=7 - current_date.weekday())
                weekly_hours_used = 0
                week_posts = 0

            # Check if we hit posts per week limit
            if week_posts >= posts_per_week:
                current_date += datetime.timedelta(days=7 - current_date.weekday())
                weekly_hours_used = 0
                week_posts = 0

            # Assign date
            df.at[idx, 'publish_date'] = current_date
            weekly_hours_used += row['estimated_effort']
            week_posts += 1

            # Move to next day for variety
            current_date += datetime.timedelta(days=2)

        return df.sort_values('publish_date')

    def balance_content_types(self, schedule: pd.DataFrame) -> pd.DataFrame:
        """Ensure balanced mix of content intents"""

        # Group by week
        schedule['week'] = schedule['publish_date'].dt.isocalendar().week

        # Check intent balance per week
        for week in schedule['week'].unique():
            week_content = schedule[schedule['week'] == week]

            intent_counts = week_content['intent'].value_counts()

            # If too imbalanced, flag for review
            if len(intent_counts) > 0:
                max_count = intent_counts.max()
                if max_count > len(week_content) * 0.6:  # More than 60% same intent
                    schedule.loc[schedule['week'] == week, 'needs_review'] = True

        return schedule

    def export_calendar(self, schedule: pd.DataFrame, output_file: str):
        """Export calendar to CSV"""
        schedule.to_csv(output_file, index=False)
        print(f"Calendar exported to {output_file}")

# Usage
optimizer = ContentCalendarOptimizer()

# Add content items from gap analysis
optimizer.add_content_item(
    title="Complete Guide to Deep Learning",
    target_keyword="deep learning guide",
    intent="informational",
    priority_score=85,
    estimated_effort=12
)

optimizer.add_content_item(
    title="TensorFlow vs PyTorch: Which to Choose",
    target_keyword="tensorflow vs pytorch",
    intent="commercial",
    priority_score=78,
    estimated_effort=8
)

optimizer.add_content_item(
    title="Best Machine Learning Tools 2025",
    target_keyword="best machine learning tools",
    intent="commercial",
    priority_score=82,
    estimated_effort=10
)

# Add search volume data
search_volumes = {
    "deep learning guide": 2400,
    "tensorflow vs pytorch": 1800,
    "best machine learning tools": 3200
}

# Prioritize by ROI
prioritized = optimizer.prioritize_by_roi(search_volumes)

print("\nPrioritized Content:")
print(prioritized[['title', 'roi_score', 'priority_score']].head())

# Generate schedule
schedule = optimizer.generate_publishing_schedule(
    start_date=datetime.date.today(),
    posts_per_week=3,
    team_capacity_hours=40
)

print("\nPublishing Schedule:")
print(schedule[['title', 'publish_date', 'intent']])

# Export
optimizer.export_calendar(schedule, 'content_calendar.csv')
```

## Tool Integration and Automation {#tool-integration}

### Integration with SEO Tools from Catalog

**Using seo-analysis-tool:**

```python
# Assuming seo-analysis-tool is available in your catalog
import subprocess
import json

class SEOAnalysisIntegration:
    """Integrate with seo-analysis-tool from catalog"""

    def __init__(self, tool_path: str = "seo-analysis-tool"):
        self.tool_path = tool_path

    def analyze_page(self, url: str) -> Dict:
        """Analyze page using SEO tool"""

        result = subprocess.run(
            [self.tool_path, 'analyze', '--url', url, '--format', 'json'],
            capture_output=True,
            text=True
        )

        if result.returncode == 0:
            return json.loads(result.stdout)

        return {}

    def batch_analyze(self, urls: List[str]) -> List[Dict]:
        """Batch analyze multiple URLs"""

        results = []

        for url in urls:
            print(f"Analyzing {url}...")
            analysis = self.analyze_page(url)
            results.append(analysis)

        return results
```

**Using rankcraft-ai for Content Optimization:**

```python
class RankcraftIntegration:
    """Integrate with rankcraft-ai"""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.rankcraft.ai/v1"

    def optimize_content(
        self,
        content: str,
        target_keyword: str,
        competitor_urls: List[str]
    ) -> Dict:
        """Get content optimization recommendations"""

        payload = {
            'content': content,
            'target_keyword': target_keyword,
            'competitor_urls': competitor_urls
        }

        response = requests.post(
            f"{self.base_url}/optimize",
            headers={'Authorization': f'Bearer {self.api_key}'},
            json=payload
        )

        return response.json()

    def get_content_score(self, content: str, keyword: str) -> float:
        """Get content optimization score"""

        payload = {
            'content': content,
            'keyword': keyword
        }

        response = requests.post(
            f"{self.base_url}/score",
            headers={'Authorization': f'Bearer {self.api_key}'},
            json=payload
        )

        data = response.json()
        return data.get('score', 0)
```

**Using contentswift for Content Generation:**

```python
class ContentSwiftIntegration:
    """Integrate with contentswift"""

    def __init__(self, api_key: str):
        self.api_key = api_key

    def generate_outline(
        self,
        topic: str,
        intent: str,
        competitor_analysis: Dict
    ) -> Dict:
        """Generate content outline"""

        # Integrate with contentswift API
        # This is a placeholder - adjust based on actual API

        payload = {
            'topic': topic,
            'intent': intent,
            'competitor_headings': competitor_analysis.get('headings', []),
            'target_word_count': competitor_analysis.get('avg_word_count', 2000)
        }

        # API call would go here
        # return requests.post(...).json()

        return payload

    def generate_content_brief(
        self,
        keyword: str,
        intent: str,
        serp_analysis: Dict
    ) -> Dict:
        """Generate comprehensive content brief"""

        brief = {
            'keyword': keyword,
            'intent': intent,
            'recommended_word_count': serp_analysis.get('avg_word_count', 2000),
            'required_headings': serp_analysis.get('common_headings', []),
            'topics_to_cover': serp_analysis.get('topics', []),
            'questions_to_answer': serp_analysis.get('paa_questions', []),
            'related_keywords': serp_analysis.get('related_keywords', [])
        }

        return brief
```

## n8n Automation Workflows {#n8n-automation}

### Keyword Research Automation Workflow

**n8n Workflow: Automated Keyword Research**

```json
{
  "name": "Automated Keyword Research",
  "nodes": [
    {
      "parameters": {
        "url": "https://api.dataforseo.com/v3/dataforseo_labs/google/related_keywords/live",
        "authentication": "basicAuth",
        "method": "POST",
        "jsonParameters": true,
        "bodyParametersJson": "={{ [{\"keyword\": $json[\"seed_keyword\"], \"location_code\": 2840, \"language_code\": \"en\"}] }}",
        "options": {}
      },
      "name": "DataForSEO Related Keywords",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "functionCode": "// Extract and filter keywords\nconst items = $input.all();\nconst keywords = [];\n\nfor (const item of items) {\n  const tasks = item.json.tasks || [];\n  \n  for (const task of tasks) {\n    const result = task.result || [];\n    \n    for (const res of result) {\n      const items = res.items || [];\n      \n      for (const kw of items) {\n        const keyword_data = kw.keyword_data || {};\n        const keyword_info = keyword_data.keyword_info || {};\n        \n        // Filter: volume > 100, difficulty < 50\n        if (keyword_info.search_volume > 100 && \n            (kw.keyword_properties?.keyword_difficulty || 100) < 50) {\n          keywords.push({\n            keyword: keyword_data.keyword,\n            volume: keyword_info.search_volume,\n            difficulty: kw.keyword_properties?.keyword_difficulty || 0,\n            cpc: keyword_info.cpc || 0\n          });\n        }\n      }\n    }\n  }\n}\n\nreturn keywords.map(kw => ({ json: kw }));"
      },
      "name": "Filter Keywords",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "YOUR_GOOGLE_SHEET_ID",
        "sheetName": "Keywords",
        "options": {}
      },
      "name": "Add to Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [850, 300]
    }
  ],
  "connections": {
    "DataForSEO Related Keywords": {
      "main": [[{"node": "Filter Keywords", "type": "main", "index": 0}]]
    },
    "Filter Keywords": {
      "main": [[{"node": "Add to Google Sheets", "type": "main", "index": 0}]]
    }
  }
}
```

### SERP Tracking Workflow

**n8n Workflow: Daily SERP Position Tracking**

```json
{
  "name": "Daily SERP Tracking",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [{"field": "cronExpression", "expression": "0 8 * * *"}]
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
        "documentId": "YOUR_KEYWORDS_SHEET_ID",
        "sheetName": "Keywords",
        "options": {}
      },
      "name": "Get Keywords from Sheet",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [450, 300]
    },
    {
      "parameters": {
        "url": "https://api.dataforseo.com/v3/serp/google/organic/live/advanced",
        "authentication": "basicAuth",
        "method": "POST",
        "jsonParameters": true,
        "bodyParametersJson": "={{ [{\"keyword\": $json[\"keyword\"], \"location_code\": 2840, \"url\": \"yoursite.com\"}] }}",
        "options": {}
      },
      "name": "Check SERP Position",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "functionCode": "// Extract position\nconst item = $input.first();\nconst tasks = item.json.tasks || [];\n\nlet position = null;\nlet found = false;\n\nfor (const task of tasks) {\n  const result = task.result || [];\n  \n  for (const res of result) {\n    const items = res.items || [];\n    \n    for (const serp_item of items) {\n      if (serp_item.type === 'organic') {\n        position = serp_item.rank_absolute;\n        found = true;\n        break;\n      }\n    }\n  }\n}\n\nreturn [{\n  json: {\n    keyword: $json.keyword,\n    position: found ? position : 'Not ranking',\n    date: new Date().toISOString().split('T')[0],\n    url: $json.url\n  }\n}];"
      },
      "name": "Extract Position",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [850, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "YOUR_TRACKING_SHEET_ID",
        "sheetName": "SERP History",
        "options": {}
      },
      "name": "Log to Sheet",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [1050, 300]
    }
  ],
  "connections": {
    "Schedule: Daily 8 AM": {
      "main": [[{"node": "Get Keywords from Sheet", "type": "main", "index": 0}]]
    },
    "Get Keywords from Sheet": {
      "main": [[{"node": "Check SERP Position", "type": "main", "index": 0}]]
    },
    "Check SERP Position": {
      "main": [[{"node": "Extract Position", "type": "main", "index": 0}]]
    },
    "Extract Position": {
      "main": [[{"node": "Log to Sheet", "type": "main", "index": 0}]]
    }
  }
}
```

### Content Research Automation

**n8n Workflow: Automated Content Research**

```json
{
  "name": "Content Research Automation",
  "nodes": [
    {
      "parameters": {
        "url": "https://api.dataforseo.com/v3/serp/google/organic/live/advanced",
        "method": "POST",
        "bodyParametersJson": "={{ [{\"keyword\": $json[\"keyword\"], \"depth\": 10}] }}"
      },
      "name": "Get SERP Results",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "url": "={{ $json[\"url\"] }}",
        "options": {}
      },
      "name": "Fetch Competitor Content",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "resource": "chat",
        "operation": "message",
        "modelId": "gpt-4",
        "messages": {
          "values": [
            {
              "role": "user",
              "content": "=Analyze this content and extract: 1) Main topics covered, 2) Content structure (headings), 3) Word count estimate, 4) Key points. Content: {{ $json[\"content\"] }}"
            }
          ]
        }
      },
      "name": "OpenAI Content Analysis",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 1,
      "position": [850, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "YOUR_RESEARCH_SHEET_ID",
        "sheetName": "Content Research"
      },
      "name": "Save Research",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [1050, 300]
    }
  ]
}
```

### Competitor Monitoring Workflow

**n8n Workflow: Weekly Competitor Content Monitoring**

```json
{
  "name": "Competitor Content Monitor",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [{"field": "cronExpression", "expression": "0 9 * * 1"}]
        }
      },
      "name": "Schedule: Weekly Monday 9 AM",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "url": "={{ $json[\"competitor_rss_feed\"] }}",
        "options": {}
      },
      "name": "Fetch Competitor RSS",
      "type": "n8n-nodes-base.rssFeedRead",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "conditions": {
          "dateTime": [
            {
              "value1": "={{ $json[\"pubDate\"] }}",
              "operation": "after",
              "value2": "={{ $now.minus(7, 'days').toISO() }}"
            }
          ]
        }
      },
      "name": "Filter Last 7 Days",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "authentication": "oAuth2",
        "channel": "YOUR_SLACK_CHANNEL",
        "text": "=New competitor content: {{ $json[\"title\"] }}\\nURL: {{ $json[\"link\"] }}",
        "otherOptions": {}
      },
      "name": "Notify on Slack",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 1,
      "position": [850, 250]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "YOUR_MONITOR_SHEET_ID",
        "sheetName": "Competitor Content"
      },
      "name": "Log to Sheet",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [850, 350]
    }
  ]
}
```

For more n8n workflow templates, visit: https://n8n.io/workflows/?categories=SEO

## Metrics and KPIs {#metrics-kpis}

### Content Performance Tracking

```python
class ContentPerformanceTracker:
    """Track content performance metrics"""

    def __init__(self):
        self.metrics = {}

    def track_organic_metrics(
        self,
        url: str,
        impressions: int,
        clicks: int,
        avg_position: float,
        date: datetime.date
    ):
        """Track organic search metrics from GSC"""

        if url not in self.metrics:
            self.metrics[url] = {
                'organic': [],
                'engagement': [],
                'conversions': []
            }

        ctr = (clicks / impressions * 100) if impressions > 0 else 0

        self.metrics[url]['organic'].append({
            'date': date,
            'impressions': impressions,
            'clicks': clicks,
            'ctr': ctr,
            'avg_position': avg_position
        })

    def track_engagement_metrics(
        self,
        url: str,
        pageviews: int,
        avg_time_on_page: float,
        bounce_rate: float,
        date: datetime.date
    ):
        """Track engagement metrics from GA"""

        if url not in self.metrics:
            self.metrics[url] = {
                'organic': [],
                'engagement': [],
                'conversions': []
            }

        self.metrics[url]['engagement'].append({
            'date': date,
            'pageviews': pageviews,
            'avg_time_on_page': avg_time_on_page,
            'bounce_rate': bounce_rate
        })

    def calculate_content_roi(
        self,
        url: str,
        content_cost: float,
        revenue_per_conversion: float
    ) -> Dict:
        """Calculate ROI for content piece"""

        if url not in self.metrics:
            return {'error': 'No metrics found'}

        # Get total clicks
        total_clicks = sum(
            m['clicks'] for m in self.metrics[url]['organic']
        )

        # Estimate conversions (assume 2% conversion rate)
        estimated_conversions = total_clicks * 0.02

        # Calculate revenue
        estimated_revenue = estimated_conversions * revenue_per_conversion

        # Calculate ROI
        roi = ((estimated_revenue - content_cost) / content_cost) * 100

        return {
            'url': url,
            'total_clicks': total_clicks,
            'estimated_conversions': estimated_conversions,
            'estimated_revenue': estimated_revenue,
            'content_cost': content_cost,
            'roi_percentage': roi
        }

    def identify_top_performers(self, metric: str = 'clicks', limit: int = 10) -> List[Dict]:
        """Identify top performing content"""

        performance = []

        for url, data in self.metrics.items():
            if data['organic']:
                total_metric = sum(m[metric] for m in data['organic'])

                performance.append({
                    'url': url,
                    'total_' + metric: total_metric,
                    'avg_position': sum(m['avg_position'] for m in data['organic']) / len(data['organic'])
                })

        # Sort by metric
        performance.sort(key=lambda x: x['total_' + metric], reverse=True)

        return performance[:limit]

    def identify_underperformers(
        self,
        min_age_days: int = 90,
        min_impressions: int = 100
    ) -> List[Dict]:
        """Identify underperforming content for optimization"""

        underperformers = []

        for url, data in self.metrics.items():
            if not data['organic']:
                continue

            # Check age
            first_date = min(m['date'] for m in data['organic'])
            age = (datetime.date.today() - first_date).days

            if age < min_age_days:
                continue

            # Calculate totals
            total_impressions = sum(m['impressions'] for m in data['organic'])
            total_clicks = sum(m['clicks'] for m in data['organic'])
            avg_position = sum(m['avg_position'] for m in data['organic']) / len(data['organic'])

            # Identify issues
            issues = []

            if total_impressions < min_impressions:
                issues.append('low_impressions')

            if total_impressions > min_impressions and total_clicks < total_impressions * 0.01:
                issues.append('low_ctr')

            if avg_position > 20:
                issues.append('poor_ranking')

            if issues:
                underperformers.append({
                    'url': url,
                    'impressions': total_impressions,
                    'clicks': total_clicks,
                    'avg_position': avg_position,
                    'age_days': age,
                    'issues': issues
                })

        # Sort by severity (most issues first)
        underperformers.sort(key=lambda x: len(x['issues']), reverse=True)

        return underperformers

# Usage
tracker = ContentPerformanceTracker()

# Track metrics
tracker.track_organic_metrics(
    url='/blog/machine-learning-guide',
    impressions=5000,
    clicks=250,
    avg_position=8.5,
    date=datetime.date.today()
)

tracker.track_engagement_metrics(
    url='/blog/machine-learning-guide',
    pageviews=300,
    avg_time_on_page=285,  # seconds
    bounce_rate=45.0,
    date=datetime.date.today()
)

# Calculate ROI
roi = tracker.calculate_content_roi(
    url='/blog/machine-learning-guide',
    content_cost=500,
    revenue_per_conversion=50
)

print(f"\nContent ROI Analysis:")
print(f"  Total clicks: {roi['total_clicks']}")
print(f"  Estimated revenue: ${roi['estimated_revenue']:.2f}")
print(f"  ROI: {roi['roi_percentage']:.1f}%")

# Identify top performers
top_performers = tracker.identify_top_performers(metric='clicks', limit=5)

print(f"\nTop Performing Content:")
for content in top_performers:
    print(f"  {content['url']}: {content['total_clicks']} clicks")

# Identify underperformers
underperformers = tracker.identify_underperformers()

print(f"\nUnderperforming Content ({len(underperformers)} pieces):")
for content in underperformers[:3]:
    print(f"  {content['url']}")
    print(f"    Issues: {', '.join(content['issues'])}")
    print(f"    Avg position: {content['avg_position']:.1f}")
```

### Key Performance Indicators

**Content Strategy KPIs Dashboard:**

1. **Input Metrics (Activity)**
   - Content pieces published per month
   - Average word count per piece
   - Content types distribution
   - Publishing consistency

2. **Output Metrics (Performance)**
   - Organic traffic growth
   - Keyword rankings improvement
   - Featured snippet acquisitions
   - Backlinks earned

3. **Outcome Metrics (Business Impact)**
   - Lead generation from content
   - Revenue attributed to content
   - Customer acquisition cost
   - Content ROI

4. **Quality Metrics**
   - Average content quality score
   - Time on page
   - Bounce rate
   - Social shares

5. **Efficiency Metrics**
   - Content production cost
   - Time to publish
   - Content lifespan
   - Update frequency

```python
class ContentStrategyDashboard:
    """Generate content strategy performance dashboard"""

    def __init__(self):
        self.kpis = {}

    def calculate_kpis(
        self,
        published_count: int,
        organic_traffic: int,
        previous_traffic: int,
        leads_generated: int,
        content_cost: float,
        revenue: float
    ) -> Dict:
        """Calculate key KPIs"""

        traffic_growth = ((organic_traffic - previous_traffic) / previous_traffic * 100) if previous_traffic > 0 else 0

        roi = ((revenue - content_cost) / content_cost * 100) if content_cost > 0 else 0

        cost_per_lead = content_cost / leads_generated if leads_generated > 0 else 0

        traffic_per_post = organic_traffic / published_count if published_count > 0 else 0

        return {
            'published_count': published_count,
            'organic_traffic': organic_traffic,
            'traffic_growth_pct': traffic_growth,
            'leads_generated': leads_generated,
            'roi_pct': roi,
            'cost_per_lead': cost_per_lead,
            'traffic_per_post': traffic_per_post
        }

    def generate_report(self, kpis: Dict) -> str:
        """Generate text report"""

        report = f"""
Content Strategy Performance Report
{'='*50}

Publishing Activity:
  - Content pieces published: {kpis['published_count']}
  - Average traffic per post: {kpis['traffic_per_post']:.0f}

Traffic Performance:
  - Total organic traffic: {kpis['organic_traffic']:,}
  - Traffic growth: {kpis['traffic_growth_pct']:+.1f}%

Business Impact:
  - Leads generated: {kpis['leads_generated']}
  - Cost per lead: ${kpis['cost_per_lead']:.2f}
  - Content ROI: {kpis['roi_pct']:.1f}%
"""

        return report

# Usage
dashboard = ContentStrategyDashboard()

kpis = dashboard.calculate_kpis(
    published_count=12,
    organic_traffic=25000,
    previous_traffic=18000,
    leads_generated=150,
    content_cost=6000,
    revenue=15000
)

print(dashboard.generate_report(kpis))
```

## Advanced Implementation Strategies {#advanced-strategies}

### Comprehensive Content Strategy Implementation Plan

**Phase 1: Foundation (Weeks 1-4)**
1. Conduct comprehensive keyword gap analysis
2. Perform competitor content audit
3. Analyze SERP intent for target keywords
4. Build initial content calendar
5. Set up tracking and analytics

**Phase 2: Content Production (Weeks 5-12)**
1. Create pillar content for main topics
2. Develop supporting cluster content
3. Implement schema markup
4. Build internal linking structure
5. Optimize for target keywords

**Phase 3: Automation (Weeks 13-16)**
1. Set up n8n workflows for research
2. Automate SERP tracking
3. Implement competitor monitoring
4. Create performance dashboards
5. Establish optimization triggers

**Phase 4: Optimization (Ongoing)**
1. Review performance metrics weekly
2. Update underperforming content
3. Expand successful topics
4. A/B test content formats
5. Refine based on data

### Success Metrics Timeline

**3-Month Goals:**
- Publish 20+ optimized content pieces
- 30% increase in organic traffic
- Rank in top 10 for 15+ target keywords
- Achieve 80%+ content quality scores

**6-Month Goals:**
- 50+ published content pieces
- 75% increase in organic traffic
- Top 3 rankings for 20+ keywords
- 10+ featured snippet acquisitions

**12-Month Goals:**
- 100+ content pieces
- 150% organic traffic growth
- Established topic authority in niche
- Measurable impact on revenue

---

## Conclusion

Advanced content strategy is a systematic, data-driven approach to content creation and optimization. By implementing gap analysis, competitor benchmarking, intent matching, topic modeling, and automated workflows, you create a sustainable content engine that drives measurable business results.

The tools and frameworks in this guide provide everything needed to build, execute, and optimize a world-class content strategy. Start with analysis, plan strategically, automate repetitively, and optimize continuously.

Remember: Content strategy is not about creating more content—it's about creating the right content at the right time for the right audience, backed by data and optimized for both search engines and users.
