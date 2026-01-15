# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js 16, TypeScript, and Tailwind CSS v4. Features multi-language support (English, Indonesian, Japanese), dark/light theme, and a clean minimalist design.

![Portfolio Preview](./preview.png)

## Features

- **Multi-language Support** - Available in English, Indonesian, and Japanese with instant language switching
- **Dark/Light Mode** - Seamless theme switching with smooth transitions
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Modern Tech Stack** - Built with Next.js 16, TypeScript, and Tailwind CSS v4
- **Accessible Components** - Uses Radix UI primitives for keyboard navigation and screen reader support
- **Project Showcase** - Interactive project gallery with detailed views
- **Certificate Gallery** - Album-style certificate viewer with zoom and navigation
- **Skills Display** - Categorized skills with icons for easy recognition
- **Experience Timeline** - Professional experience and education history

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Components**: Radix UI, shadcn/ui inspired components
- **Icons**: Lucide React, React Icons
- **Theme**: next-themes for dark/light mode
- **Internationalization**: Custom i18n implementation

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/pinje0/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── page.tsx       # Home page
│   │   ├── projects # Projects section/
│   │   ├── experience/    # Experience page
│   │   ├── skills/        # Skills page
│   │   └── certificates/  # Certificates gallery
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   ├── icons/             # Icon components
│   ├── Navbar.tsx         # Navigation component
│   └── CertificateModal.tsx  # Certificate viewer modal
├── locales/               # Translation files
│   ├── en.json
│   ├── id.json
│   └── jp.json
└── lib/
    ├── i18n.ts            # Internationalization utilities
    └── utils.ts           # Utility functions
```

## Customization

### Adding Projects

Edit `src/locales/en.json` (and other locale files) to add or modify projects:

```json
"projectsPage": {
  "items": [
    {
      "id": "your-project",
      "title": "Your Project Name",
      "description": "Project description...",
      "thumbnail": "/img/projects/your-thumbnail.png",
      "techStack": ["React", "Node.js"],
      "featured": true
    }
  ]
}
```

### Adding Certificates

Add certificate images to `public/certificates/` and update the locale files:

```json
"certificatesPage": {
  "items": [
    {
      "id": "your-certificate",
      "title": "Certificate Name",
      "organization": "Issuing Organization",
      "date": "2024",
      "thumbnail": "/certificates/your-certificate.png",
      "credentialUrl": "https://credential-url.com"
    }
  ]
}
```

### Changing Colors

Modify CSS variables in `src/app/globals.css`:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.21 0.006 285.885);
}

.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
}
```

## Deployment

Deploy to Vercel with zero configuration:

1. Push to GitHub
2. Import in Vercel dashboard
3. Deploy

Or use any Next.js-supported hosting platform.

## License

MIT License - feel free to use this template for your own portfolio.

## Author

**Melvin Austin**

- GitHub: [@pinje0](https://github.com/pinje0)
- LinkedIn: [melvin-austin](https://www.linkedin.com/in/melvin-austin/)
