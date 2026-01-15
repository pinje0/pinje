# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this Next.js portfolio project.

## Project Overview

This is a Next.js 16 portfolio website with TypeScript, Tailwind CSS v4, and internationalization support (English, Indonesian, Japanese). The project uses Radix UI components and follows a modern React architecture.

# IMPORTANT

Never run npm run dev or build unless explicitly requested

## Build & Development Commands

```bash
# Development
npm run dev              # Start development server (http://localhost:3000)

# Build & Production
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
```

## Testing

This project currently does not have a test framework configured. When adding tests, consider using:

- Jest + React Testing Library for component testing
- Playwright or Cypress for E2E testing

## Code Style Guidelines

### TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- JSX: `react-jsx` (no need to import React)
- Target: ES2017, Module: esnext

### Import Organization

```typescript
// 1. React/Next.js imports
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

// 2. Third-party libraries
import { cva } from "class-variance-authority";
import { Moon, Sun } from "lucide-react";

// 3. Internal imports (use @ alias)
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
```

### Component Patterns

#### Functional Components with TypeScript

```typescript
interface ComponentProps {
  children: ReactNode;
  variant?: "default" | "secondary";
  className?: string;
}

export default function Component({ children, variant = "default", className }: ComponentProps) {
  return <div className={cn("base-class", className)}>{children}</div>;
}
```

#### Client Components

- Use `"use client";` directive for components with hooks/event handlers
- Keep server components as default for better performance

#### UI Components (shadcn/ui style)

- Use class-variance-authority (CVA) for component variants
- Follow the pattern in `src/components/ui/button.tsx`
- Export both component and variants
- Use `cn()` utility for class merging

### Styling Guidelines

#### Tailwind CSS v4

- Use utility classes primarily
- Custom CSS variables defined in `globals.css` for theming
- Dark mode support with `.dark` class
- Component-specific styles in CSS layers when needed

#### CSS Variables (Theme)

```css
/* Light mode (root) */
--background: oklch(1 0 0);
--foreground: oklch(0.141 0.005 285.823);
--primary: oklch(0.21 0.006 285.885);

/* Dark mode (.dark) */
--background: oklch(0.141 0.005 285.823);
--foreground: oklch(0.985 0 0);
```

#### Custom Utility Classes

- `.link-rise-bg` for animated underline links
- `.navbar-fixed` for scrolled navbar state
- `.theme-transition` for smooth theme switching

### File Structure

```
src/
├── app/                    # Next.js app router
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   ├── icons/             # Custom icon components
│   └── [feature]/         # Feature-specific components
└── lib/
    ├── utils.ts           # Utility functions (cn, etc.)
    ├── i18n.ts            # Internationalization
    └── [hooks].ts         # Custom hooks
```

### Naming Conventions

#### Components

- PascalCase for component names
- Default export for main component
- Named exports for utilities/variants

#### Files

- Component files: `ComponentName.tsx`
- Utility files: `lowercase.ts`
- Type files: `types.ts` or inline interfaces

#### CSS Classes

- Tailwind: kebab-case utility classes
- Custom: kebab-case with semantic meaning
- States: prefix with state (`.active-nav`, `.scrolled`)

### Error Handling

#### TypeScript

- Use strict mode
- Define proper interfaces for props
- Use generic types where appropriate
- Handle optional props with `?` and default values

#### React

- Use error boundaries for route-level errors
- Implement proper loading states
- Handle async operations with try/catch

### Internationalization

#### Supported Locales

- `en` - English
- `id` - Indonesian
- `jp` - Japanese

#### Implementation

- Dynamic routes with `[locale]` parameter
- Dictionary files in `src/lib/i18n.ts`
- Language switching via URL path changes
- Use `getDictionary(locale)` for translations

### Performance Guidelines

#### Next.js Optimizations

- Use server components by default
- Client components only when needed (hooks, events)
- Dynamic imports for heavy components
- Image optimization with Next.js Image component

#### Bundle Size

- Tree-shake imports from libraries
- Use specific imports rather than entire libraries
- Optimize font loading with proper font-display

### Git & Development Workflow

#### Before Committing

1. Run `npm run lint` to check code quality
2. Test functionality manually
3. Ensure TypeScript compilation succeeds

#### Next.js Configuration Notes

- Turbopack enabled for development
- ESLint ignored during builds (configured in next.config.ts)
- TypeScript errors ignored during builds (for development speed)

### Common Patterns

#### Theme Switching

```typescript
const { theme, setTheme } = useTheme();
const [mounted, setMounted] = useState(false);

useEffect(() => setMounted(true), []);
if (!mounted) return null; // Prevent hydration mismatch
```

#### Internationalized Routing

```typescript
const changeLanguage = (lang: string) => {
  const segments = pathname.split("/");
  segments[1] = lang;
  router.push(segments.join("/"));
};
```

#### Utility Function

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Dependencies

### Key Libraries

- Next.js 16 - React framework
- TypeScript 5 - Type safety
- Tailwind CSS v4 - Styling
- Radix UI - Component primitives
- Lucide React - Icons
- next-themes - Theme management
- clsx + tailwind-merge - Class utilities

### UI Components

- Button, Card, Dropdown, Navigation, Switch, Alert, Sheet
- All follow shadcn/ui patterns with CVA for variants

## Notes for Agents

1. **Always use TypeScript interfaces** for component props
2. **Prefer server components** unless client-side interactivity is needed
3. **Use the `cn()` utility** for combining classes
4. **Follow the existing component patterns** in `/src/components/ui/`
5. **Test in both light and dark themes** when making UI changes
6. **Focus on English (en.json) first** - Complete all content and features in English before working on translations
7. **Indonesian (id) and Japanese (jp) translations can be added later** - Only translate after English is complete
8. **Use path aliases** (`@/`) for internal imports
9. **Run lint command** before completing tasks

## Future Work: Data Population & Localization

When adding actual portfolio data, follow this workflow:

### Step 1: Populate English Data (en.json)
Add all actual content to en.json first:
- Experience items (roles, companies, descriptions)
- Project details (titles, descriptions, tech stack, features)
- Skills data
- Certificates data
- Any other text content

### Step 2: Implement Locale-Specific Patterns
Each language has different grammatical structures:

**English (en.json):**
- Default pattern: `prefix + role + @ + organization`
- Example: `ex-Full Stack Developer Intern @ Telkom Indonesia`

**Indonesian (id.json):**
- Pattern: `prefix + role + di + organization`
- Example: `ex Intern Full Stack Developer di Telkom Indonesia`
- Update `labels.at` to `"di"`

**Japanese (jp.json):**
- Pattern: `organization + で + role` (org comes first)
- Example: `Telkom Indonesiaでフルスタック開発インターン`
- Update `labels.at` to `"で"`
- Remove prefix or set to empty string

### Step 3: Translate to Indonesian (id.json)
Translate en.json content to Indonesian:
- Keep same data structure
- Natural Bahasa Indonesia phrasing
- Adjust labels/patterns as needed

### Step 4: Translate to Japanese (jp.json)
Translate en.json content to Japanese:
- Keep same data structure
- Natural Japanese phrasing
- May need different word order (org before role)
- Adjust labels/patterns as needed

### Key Principles
- **Accuracy over automation** - Manual translation quality > machine translation
- **Natural phrasing** - Content should sound native in each language
- **Clickable links preserved** - AnimatedLink components should wrap organization/company names
- **Component logic handles order** - Use locale checks in components to render correct order (e.g., `locale === "jp"` check)
