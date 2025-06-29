# Personal Tech & Travel Blog

A minimal, fast, and SEO-optimized personal website built with Jekyll, featuring a clean design with dark mode support and excellent typography.

## Features

- 🎨 **Minimal Design**: Clean, professional layout with excellent typography
- 🌙 **Dark Mode**: Automatic system preference detection with manual toggle
- 📱 **Responsive**: Works perfectly on mobile, tablet, and desktop
- ⚡ **Fast**: Optimized for performance with lazy loading and minimal JavaScript
- 🔍 **SEO Optimized**: Structured data, meta tags, and search engine friendly
- 📝 **Blog Features**: Category filtering, search functionality, reading time estimation
- 🚀 **GitHub Pages Ready**: Automated deployment with GitHub Actions

## Tech Stack

- **Static Site Generator**: Jekyll
- **Hosting**: GitHub Pages
- **Styling**: Custom SCSS with CSS variables for theming
- **JavaScript**: Vanilla JS for dark mode, search, and filtering
- **Deployment**: GitHub Actions
- **SEO**: Jekyll SEO plugin + custom structured data

## Quick Start

1. **Clone this repository**:
   ```bash
   git clone https://github.com/yourusername/personal-site.git
   cd personal-site
   ```

2. **Install dependencies**:
   ```bash
   bundle install
   ```

3. **Customize the site**:
   - Update `_config.yml` with your information
   - Replace placeholder content in `about.md` and `contact.md`
   - Update social links in the footer

4. **Run locally**:
   ```bash
   bundle exec jekyll serve
   ```
   
5. **Create your first post**:
   - Copy one of the sample posts in `_posts/`
   - Follow the naming convention: `YYYY-MM-DD-title.md`
   - Use frontmatter to set category, tags, and other metadata

## Customization

### Site Configuration

Edit `_config.yml` to customize:
- Site title and description
- Author information
- Social media links
- SEO settings

### Theme Colors

The site uses CSS custom properties for easy theming. Edit `_sass/main.scss` to customize:
- Accent colors (currently red)
- Background and text colors
- Dark mode variations

### Adding Content

#### Blog Posts
Create markdown files in `_posts/` with this frontmatter:

```yaml
---
layout: post
title: "Your Post Title"
date: 2024-06-28 10:00:00 -0000
category: tech # or travel
tags: [tag1, tag2, tag3]
excerpt: "Brief description of your post"
read_time: 5 # optional, calculated automatically if omitted
---

Your content here...
```

#### Pages
Create markdown files in the root directory with:

```yaml
---
layout: default
title: "Page Title"
permalink: /page-url/
---

Your content here...
```

## Deployment

### GitHub Pages (Recommended)

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select "GitHub Actions" as the source
4. The included workflow will automatically build and deploy your site

### Manual Deployment

```bash
# Build the site
bundle exec jekyll build

# Deploy the _site folder to your hosting provider
```

## Performance Features

- **Lighthouse Score**: 95+ performance score
- **Lazy Loading**: Images load as needed
- **Minified Assets**: CSS and JS are optimized
- **Caching Headers**: Proper cache configuration
- **Semantic HTML**: Accessible and SEO-friendly markup

## Browser Support

- Chrome/Chromium (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Development

### File Structure

```
├── _includes/          # Reusable HTML components
├── _layouts/           # Page templates
├── _posts/             # Blog posts
├── _sass/              # SCSS styles
├── assets/             # CSS, JS, images
├── .github/workflows/  # GitHub Actions
├── _config.yml         # Jekyll configuration
├── Gemfile             # Ruby dependencies
└── README.md           # This file
```

### Local Development

```bash
# Install dependencies
bundle install

# Run development server
bundle exec jekyll serve

# Run with drafts
bundle exec jekyll serve --drafts

# Build for production
JEKYLL_ENV=production bundle exec jekyll build
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## SEO Features

- **Structured Data**: JSON-LD for blog posts and pages
- **Meta Tags**: Proper OpenGraph and Twitter Card tags
- **Sitemap**: Automatically generated
- **RSS Feed**: Available at `/feed.xml`
- **Canonical URLs**: Prevent duplicate content issues

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Typography: Inter and JetBrains Mono fonts
- Icons: SVG icons for social media
- Syntax Highlighting: Highlight.js with GitHub themes

---

Built with ❤️ using Jekyll. Perfect for developers, writers, and digital nomads who want a fast, professional blog.