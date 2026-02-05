# Enterprise Dashboard

A modern dashboard application for monitoring system health and recent activities. Built with Next.js 16 and TypeScript, featuring server-side rendering, optimistic UI updates, and comprehensive test coverage.

## Features

- Real-time system metrics monitoring (CPU, Memory, Disk, Network)
- Activity management with filtering and search capabilities
- URL-synced filters for shareable links
- Optimistic UI updates for instant feedback
- Fully responsive design
- Performance optimized with lazy loading and code splitting

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest 4 (unit/integration), Playwright 1.58 (E2E)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd enterprise-dashboard
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
npm start
```

## Available Scripts

| Command               | Description                      |
| --------------------- | -------------------------------- |
| `npm run dev`         | Start development server         |
| `npm run build`       | Build for production             |
| `npm start`           | Start production server          |
| `npm run lint`        | Run ESLint                       |
| `npm test`            | Run unit and integration tests   |
| `npm run test:ui`     | Run tests with Vitest UI         |
| `npm run test:e2e`    | Run E2E tests with Playwright    |
| `npm run test:e2e:ui` | Run E2E tests with Playwright UI |

## Testing

The project includes comprehensive test coverage:

- **Unit Tests**: 8 tests for utility functions
- **Integration Tests**: 3 tests for component interactions
- **E2E Tests**: 15 tests across Chromium, Firefox, and WebKit

Run all tests:

```bash
npm test
npm run test:e2e
```

## Project Structure

```
enterprise-dashboard/
├── app/
│   ├── actions/          # Server Actions
│   ├── error.tsx         # Error boundary
│   ├── loading.tsx       # Loading state
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main dashboard
├── components/
│   ├── dashboard/        # Dashboard components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/
│   ├── data.ts           # Data fetching with caching
│   ├── types.ts          # Type definitions
│   └── mock-data.json    # Mock data
├── tests/
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # E2E tests
└── public/               # Static assets
```

## Key Implementation Details

### Server-Side Rendering

- Main dashboard is a Server Component
- Independent Suspense boundaries for metrics and activities
- Data cached with 60-second revalidation

### Client-Side Features

- URL-synced filters for shareable links
- Debounced search (600ms)
- Optimistic UI updates

### Performance

- Image optimization with `next/image`
- Dynamic imports for code splitting
- CSS optimization in production
- Content visibility optimization

### Error Handling

- Global error boundary
- Loading states with skeleton UI
- Local error handling in components

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari/iOS 15+

## License

This project is created for educational and demonstration purposes.
