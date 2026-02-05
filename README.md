# Enterprise Dashboard

A high-performance enterprise dashboard built with Next.js 15, TypeScript, and Tailwind CSS. Features real-time metrics monitoring, activity tracking, and advanced filtering capabilities.

## Features

- **Real-time System Metrics**: Monitor CPU, Memory, Disk, and Network usage
- **Activity Management**: Track and manage system activities with filtering and search
- **URL-driven State**: Search and filter parameters sync with URL for shareable links
- **Optimistic UI**: Instant feedback when dismissing activities
- **Server Components**: Leverages Next.js App Router for optimal performance
- **Strict TypeScript**: Zero `any` types, full type safety throughout
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Testing**: Vitest (Unit) + Playwright (E2E)
- **Data**: JSON-based mock data

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Building for Production

```bash
npm run build
npm start
```

## Testing

### Unit Tests

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

### E2E Tests

```bash
npm run test:e2e
```

Run E2E tests with UI:

```bash
npm run test:e2e:ui
```

## Project Structure

```
enterprise-dashboard/
├── app/
│   ├── actions/          # Server Actions
│   ├── page.tsx          # Main dashboard page
│   ├── layout.tsx        # Root layout
│   ├── loading.tsx       # Loading UI
│   └── error.tsx         # Error boundary
├── components/
│   ├── dashboard/        # Dashboard-specific components
│   └── ui/               # Reusable UI primitives
├── lib/
│   ├── types.ts          # TypeScript type definitions
│   ├── data.ts           # Data fetching functions
│   └── mock-data.json    # Mock data source
└── tests/
    ├── unit/             # Vitest unit tests
    └── e2e/              # Playwright E2E tests
```

## Key Features Explained

### Server Components

The dashboard uses React Server Components by default for optimal performance. Data is fetched on the server and streamed to the client with Suspense boundaries.

### URL State Management

Search queries and category filters are synchronized with URL parameters, making the dashboard state shareable and bookmarkable.

### Optimistic UI Updates

When dismissing an activity, the UI updates immediately while the server action processes in the background, providing instant feedback.

### Type Safety

The entire codebase uses strict TypeScript with no `any` types, ensuring type safety and better developer experience.

## Development Phases

This project was built in 4 phases:

1. **Phase 1**: Project foundation, TypeScript configuration, type definitions
2. **Phase 2**: UI components and design system
3. **Phase 3**: Core features (metrics, activities, filters)
4. **Phase 4**: Interactivity and testing

## License

MIT
