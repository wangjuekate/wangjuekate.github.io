# TechFounder Blog

A modern React-based blog platform designed for software engineers building startups through open source communities and seeking investment.

## Features

- **Markdown Support**: Write blog posts in Markdown with frontmatter
- **Advanced Search**: Fuzzy search with category filtering using Fuse.js
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Cards
- **GitHub Pages Ready**: Automated deployment with GitHub Actions

## Target Audience

This blog is specifically designed for:
- Software engineers transitioning to entrepreneurship
- Open source project maintainers seeking monetization strategies
- Technical founders looking for investment guidance
- Developers building communities around their projects

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/wangjuekate/wangjuekate.github.io.git
cd wangjuekate.github.io

# Install dependencies
npm install

# Start development server
npm start
```

### Adding Blog Posts

Blog posts are currently managed through the `src/utils/blogUtils.js` file. To add real markdown files:

1. Create a `posts/` directory in `public/`
2. Add your `.md` files with frontmatter:

```markdown
---
title: "Your Post Title"
excerpt: "Brief description"
author: "Your Name"
date: "2024-01-15"
category: "Open Source"
tags: ["tag1", "tag2"]
featured: true
---

# Your Post Content

Write your blog post content here...
```

3. Update `blogUtils.js` to read from actual markdown files

## Deployment

The blog automatically deploys to GitHub Pages when you push to the main branch.

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/App.css` for custom styles

### Content
- Edit `src/pages/About.js` for your bio and information
- Update `src/components/Header.js` and `src/components/Footer.js` for branding
- Modify `src/utils/blogUtils.js` for blog post management

### Categories
Current categories focus on:
- Open Source Strategy
- Community Building  
- Fundraising & Investment
- Technical Leadership
- Startup Strategy

## Technologies Used

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **React Markdown**: Markdown rendering with syntax highlighting
- **Fuse.js**: Fuzzy search functionality
- **Lucide React**: Beautiful icons
- **Gray Matter**: Frontmatter parsing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this template for your own blog!
Knowledge sharing


wangjuekate.github.io/
├── src/
│   ├── components/     # Header, Footer components
│   ├── pages/         # Home, BlogPost, Search, About
│   ├── utils/         # Blog post management utilities
│   └── App.js         # Main application
├── public/            # Static assets and HTML template
├── .github/workflows/ # Automated deployment
└── package.json       # Dependencies and scripts