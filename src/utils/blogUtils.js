import matter from 'gray-matter';

// Function to load markdown files from the public/posts directory
const loadMarkdownPosts = async () => {
  try {
    // First, get the list of available posts
    const indexResponse = await fetch('/posts/posts-index.json');
    const postFiles = await indexResponse.json();
    
    // Load each markdown file
    const posts = await Promise.all(
      postFiles.map(async (filename) => {
        const response = await fetch(`/posts/${filename}`);
        const markdownContent = await response.text();
        
        // Parse frontmatter and content
        const { data, content } = matter(markdownContent);
        
        // Generate slug from filename
        const slug = filename.replace('.md', '');
        
        // Calculate read time if not provided
        const wordCount = content.split(' ').length;
        const readTime = data.readTime || Math.ceil(wordCount / 200);
        
        // Generate excerpt if not provided
        const excerpt = data.excerpt || content.substring(0, 200).replace(/[#*]/g, '') + '...';
        
        return {
          slug,
          title: data.title,
          excerpt,
          content,
          author: data.author,
          date: data.date,
          category: data.category,
          tags: data.tags || [],
          featured: data.featured || false,
          readTime
        };
      })
    );
    
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error loading markdown posts:', error);
    // Fallback to mock data if markdown files can't be loaded
    return mockPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};

// Mock blog posts data - fallback when markdown files aren't available
const mockPosts = [
  {
    slug: 'building-open-source-community',
    title: 'Building an Open Source Community That Attracts Investors',
    excerpt: 'Learn how to grow a thriving open source community that demonstrates market validation and attracts venture capital.',
    content: `# Building an Open Source Community That Attracts Investors

Open source projects have become a powerful pathway to startup success. Companies like MongoDB, Elastic, and GitLab have shown that strong open source communities can be the foundation for billion-dollar businesses.

## Why Investors Love Open Source

Investors are increasingly interested in open source startups because they offer:

- **Market validation**: A growing community demonstrates real demand
- **Reduced customer acquisition costs**: Organic growth through community
- **Network effects**: Each new user adds value to the ecosystem
- **Talent attraction**: Top developers want to work on popular open source projects

## Building Your Community Strategy

### 1. Start with a Real Problem

Your open source project must solve a genuine pain point that developers face daily. The best communities form around tools that people actually need and use.

### 2. Focus on Developer Experience

Make it incredibly easy for developers to:
- Get started (clear documentation, examples)
- Contribute (good first issues, contribution guidelines)
- Get help (responsive maintainers, active forums)

### 3. Measure What Matters

Track metrics that investors care about:
- GitHub stars and forks
- Active contributors
- Download/usage statistics
- Community engagement (issues, discussions)

## From Community to Capital

Once you have a thriving community, you can leverage it for fundraising by:

1. **Demonstrating traction**: Show growth metrics and user testimonials
2. **Proving market size**: Use community data to validate TAM
3. **Building relationships**: Connect with VCs who understand open source
4. **Creating urgency**: Show momentum and competitive advantages

Remember: A strong community is not just a nice-to-have—it's your competitive moat and your path to sustainable growth.`,
    author: 'Kate Wang',
    date: '2024-01-15',
    category: 'Open Source',
    tags: ['community', 'fundraising', 'open-source'],
    featured: true,
    readTime: 8
  },
  {
    slug: 'technical-founder-fundraising-guide',
    title: 'The Technical Founder\'s Guide to Fundraising',
    excerpt: 'Navigate the fundraising process as a technical founder with practical tips on pitching, valuation, and investor relations.',
    content: `# The Technical Founder's Guide to Fundraising

As a technical founder, you have unique advantages in the fundraising process—but also specific challenges to overcome. This guide will help you leverage your technical expertise while building the business skills needed to secure investment.

## Your Technical Advantage

Technical founders often have:
- **Deep product knowledge**: You understand the technology better than anyone
- **Credibility with developers**: Your target users trust your technical judgment
- **Cost efficiency**: You can build more with less capital
- **Innovation potential**: You can spot technical opportunities others miss

## Common Pitfalls to Avoid

### 1. Over-Engineering Your Pitch
Don't get lost in technical details. Investors want to understand:
- The problem you're solving
- Market size and opportunity
- Your unique solution
- Business model and revenue potential

### 2. Underestimating Business Metrics
Learn to speak the language of business:
- Customer acquisition cost (CAC)
- Lifetime value (LTV)
- Monthly recurring revenue (MRR)
- Churn rate and retention

### 3. Neglecting the Team Story
Investors invest in people, not just products. Show how your technical background makes you the right person to solve this problem.

## Building Your Fundraising Strategy

### Pre-Fundraising Checklist
- [ ] Clear product-market fit evidence
- [ ] Strong technical team in place
- [ ] Basic financial projections
- [ ] Competitive analysis
- [ ] Customer testimonials and case studies

### The Perfect Technical Pitch
1. **Hook**: Start with the problem, not the solution
2. **Solution**: Explain your technical approach simply
3. **Market**: Size the opportunity with data
4. **Traction**: Show growth and validation
5. **Team**: Highlight your technical expertise
6. **Ask**: Be specific about funding needs

## Investor Relations for Technical Founders

### Finding the Right Investors
Look for VCs who:
- Have technical backgrounds themselves
- Invest in your sector/technology
- Understand open source business models
- Can provide strategic value beyond capital

### Building Relationships
- Engage with investors on social media
- Attend technical conferences where VCs speak
- Get warm introductions through your network
- Share technical insights and thought leadership

Remember: Fundraising is a skill that can be learned. Your technical background is an asset—use it to build credibility while developing your business acumen.`,
    author: 'Kate Wang',
    date: '2024-01-10',
    category: 'Fundraising',
    tags: ['fundraising', 'technical-founders', 'investment'],
    featured: true,
    readTime: 12
  },
  {
    slug: 'open-source-business-models',
    title: 'Monetizing Open Source: Business Models That Work',
    excerpt: 'Explore proven business models for open source projects, from SaaS offerings to enterprise support and consulting.',
    content: `# Monetizing Open Source: Business Models That Work

Creating a successful business around open source software requires careful consideration of your monetization strategy. Here are the most effective models used by successful open source companies.

## The Open Core Model

**How it works**: Offer a free, open source version alongside paid premium features.

**Examples**: GitLab, MongoDB, Elastic

**Pros**:
- Clear value proposition for paid features
- Large user base for the free version
- Natural upgrade path

**Cons**:
- Risk of feature creep in free version
- Potential community backlash over licensing changes

## Software as a Service (SaaS)

**How it works**: Provide hosted, managed versions of your open source software.

**Examples**: GitHub, Supabase, PlanetScale

**Pros**:
- Recurring revenue model
- Lower barrier to entry for users
- Operational expertise becomes competitive advantage

**Cons**:
- Infrastructure costs
- Need for DevOps expertise
- Competition from cloud providers

## Enterprise Support and Services

**How it works**: Offer professional support, consulting, and training for enterprise users.

**Examples**: Red Hat, Canonical, Confluent

**Pros**:
- High-margin business
- Deep customer relationships
- Leverages existing expertise

**Cons**:
- Doesn't scale as well as product revenue
- Requires building a services organization

## Dual Licensing

**How it works**: Offer the software under both open source and commercial licenses.

**Examples**: MySQL, Qt, MongoDB (historically)

**Pros**:
- Clear monetization path
- Protects commercial interests

**Cons**:
- Complex licensing management
- Potential legal complications

## Marketplace and Ecosystem

**How it works**: Create a platform where third parties can sell complementary products or services.

**Examples**: WordPress, Shopify, Atlassian

**Pros**:
- Network effects
- Revenue sharing opportunities
- Community-driven growth

**Cons**:
- Requires significant platform investment
- Dependency on third-party success

## Choosing Your Model

Consider these factors:

1. **Target market**: Enterprise vs. developer vs. end-user
2. **Product complexity**: Simple tools vs. complex platforms
3. **Competitive landscape**: Existing solutions and pricing
4. **Team capabilities**: Technical vs. business skills
5. **Capital requirements**: Bootstrap vs. venture-funded

## Implementation Tips

### Start Simple
Begin with one model and expand over time. Many successful companies started with consulting and evolved to SaaS.

### Maintain Community Trust
Be transparent about your business model from the beginning. Sudden changes can damage community relationships.

### Measure and Iterate
Track key metrics for your chosen model:
- Conversion rates (free to paid)
- Customer lifetime value
- Churn rates
- Community health metrics

The key to success is aligning your business model with your community's needs while building sustainable revenue streams.`,
    author: 'Kate Wang',
    date: '2024-01-05',
    category: 'Open Source',
    tags: ['business-models', 'monetization', 'open-source'],
    featured: false,
    readTime: 10
  },
  {
    slug: 'developer-community-metrics',
    title: 'Essential Metrics for Developer Community Growth',
    excerpt: 'Track the right metrics to build and scale your developer community effectively, from engagement to conversion.',
    content: `# Essential Metrics for Developer Community Growth

Building a thriving developer community requires more than just creating great software. You need to track the right metrics to understand what's working and where to focus your efforts.

## Core Community Health Metrics

### 1. Active Contributors
- **Monthly Active Contributors (MAC)**: Developers who contribute code, documentation, or participate in discussions
- **Contributor Retention**: Percentage of contributors who remain active over time
- **New Contributor Rate**: How many new people join your community each month

### 2. Engagement Metrics
- **GitHub Activity**: Stars, forks, issues, pull requests
- **Forum/Discord Activity**: Messages, active users, response times
- **Documentation Usage**: Page views, time spent, bounce rate

### 3. Growth Metrics
- **Community Size**: Total registered users, followers, subscribers
- **Growth Rate**: Month-over-month and year-over-year growth
- **Organic vs. Paid Growth**: Understanding your acquisition channels

## Business Impact Metrics

### 4. Conversion Metrics
- **Community to Customer**: How many community members become paying customers
- **Trial to Paid**: Conversion rates for your commercial offerings
- **Upsell Rate**: Expansion revenue from existing customers

### 5. Support Efficiency
- **Community-Driven Support**: Percentage of questions answered by community
- **Time to Resolution**: How quickly issues get resolved
- **Self-Service Success**: Users finding answers without human intervention

## Advanced Analytics

### 6. Sentiment Analysis
- **Community Sentiment**: Overall positive/negative sentiment in discussions
- **Brand Mentions**: How your project is discussed across the web
- **NPS Score**: Net Promoter Score from community surveys

### 7. Network Effects
- **Referral Rate**: How often community members refer others
- **Integration Usage**: Third-party tools and integrations built by community
- **Content Creation**: Blog posts, tutorials, videos created by community

## Setting Up Your Measurement Framework

### Tools and Platforms
- **GitHub Analytics**: Built-in insights for repository activity
- **Google Analytics**: Website and documentation traffic
- **Discord/Slack Analytics**: Community platform metrics
- **Custom Dashboards**: Combine data from multiple sources

### Reporting Cadence
- **Daily**: Monitor for issues or spikes in activity
- **Weekly**: Track growth trends and community health
- **Monthly**: Comprehensive community review and planning
- **Quarterly**: Strategic assessment and goal setting

## Actionable Insights

### What Good Looks Like
- **Healthy Growth**: 10-20% month-over-month growth in active contributors
- **Strong Engagement**: 70%+ of questions answered by community within 24 hours
- **Retention**: 60%+ of new contributors make a second contribution within 30 days

### Red Flags to Watch
- **Declining Engagement**: Fewer contributions or discussions
- **Increasing Support Burden**: More questions, fewer community answers
- **Contributor Churn**: High percentage of one-time contributors

## Making Data-Driven Decisions

Use your metrics to:
1. **Identify Growth Opportunities**: Which channels bring the highest-quality contributors?
2. **Optimize Onboarding**: Where do new contributors get stuck?
3. **Improve Retention**: What keeps contributors engaged long-term?
4. **Demonstrate Value**: Show investors and stakeholders community impact

Remember: Metrics are tools for improvement, not vanity numbers. Focus on metrics that directly correlate with your business goals and community health.`,
    author: 'Kate Wang',
    date: '2023-12-28',
    category: 'Community Building',
    tags: ['metrics', 'analytics', 'community-growth'],
    featured: false,
    readTime: 9
  }
];

// Load blog posts - tries markdown files first, falls back to mock data
export const getBlogPosts = async () => {
  return await loadMarkdownPosts();
};

// Get a single blog post by slug
export const getBlogPost = async (slug) => {
  const posts = await loadMarkdownPosts();
  return posts.find(p => p.slug === slug);
};

// Parse markdown content (for when you have actual .md files)
export const parseMarkdownFile = (fileContent) => {
  const { data, content } = matter(fileContent);
  
  // Generate excerpt if not provided
  const excerpt = data.excerpt || content.substring(0, 200) + '...';
  
  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = content.split(' ').length;
  const readTime = Math.ceil(wordCount / 200);
  
  return {
    ...data,
    content,
    excerpt,
    readTime
  };
};

// Search posts (used by the search functionality)
export const searchPosts = async (query, category = '') => {
  const posts = await getBlogPosts();
  
  if (!query && !category) return posts;
  
  return posts.filter(post => {
    const matchesQuery = !query || 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())));
    
    const matchesCategory = !category || post.category === category;
    
    return matchesQuery && matchesCategory;
  });
};
