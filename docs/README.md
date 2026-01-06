# Allay Template

Functional template for React Native apps using Expo, Tamagui, Expo Router, and Zustand.

## 🚀 Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Expo SDK | 54 | React Native Framework |
| TypeScript | 5.x | Static typing |
| Expo Router | 6.x | File-based navigation |
| Tamagui | 1.x | Design system |
| Biome | 2.x | Linting and formatting |
| Zustand | 5.x | State management |
| React Query | 5.x | Server state management |
| Axios | 1.x | HTTP client |
| Solar Icons | 1.x | Icon library |
| Inter | - | Custom font (Google Fonts) |

## 📁 Project Structure

```
allay-template-with-tamagui/
├── docs/                   # Documentation
│   ├── README.md          # This file
│   ├── ARCHITECTURE.md    # Project architecture
│   ├── CONVENTIONS.md     # Code conventions
│   └── COMPONENTS.md      # Component documentation
├── src/
│   ├── app/               # Routes (Expo Router)
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom hooks
│   ├── providers/         # React providers (Query, etc.)
│   ├── services/          # API services and clients
│   ├── stores/            # Zustand stores
│   ├── theme/             # Tamagui configuration
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── assets/                # Images, fonts, etc.
├── app.json               # Expo configuration
├── babel.config.js        # Babel configuration
├── biome.json             # Biome configuration
├── jest.config.js         # Jest configuration
├── jest.setup.ts          # Jest setup (mocks)
├── tsconfig.json          # TypeScript configuration
└── metro.config.js        # Metro bundler configuration
```

## 🏃 Commands

```bash
# Development
pnpm start          # Start Metro bundler
pnpm android        # Open on Android
pnpm ios            # Open on iOS
pnpm web            # Open on web

# Code quality
pnpm lint           # Run linter
pnpm format         # Format code
pnpm check          # Lint + format + fix
pnpm typecheck      # TypeScript check

# Tests
pnpm test           # Run all tests
pnpm test:watch     # Run tests in watch mode
pnpm test:coverage  # Run tests with coverage report

# Generate native folders (when needed)
npx expo prebuild
```

## 📚 Documentation

- [Architecture](./ARCHITECTURE.md) - Project architecture details
- [Conventions](./CONVENTIONS.md) - Code patterns and naming
- [Components](./COMPONENTS.md) - UI component documentation
