# Allay Template

Functional template for React Native apps using Expo, Tamagui, Expo Router, and Zustand.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Run on device/emulator
pnpm android    # Android
pnpm ios        # iOS
pnpm web        # Web
```

## 📦 What's Included

- **Expo SDK 54** + TypeScript
- **Tamagui** - Design system with theming
- **Expo Router 6** - File-based navigation with tabs
- **Zustand** - State management with persistence
- **React Query + Axios** - API layer with caching
- **Jest** - Unit testing with coverage
- **Biome** - Linting and formatting
- **Solar Icons** - Icon library
- **Haptic Feedback** - Tactile feedback hook
- **Bottom Sheet** - Modal bottom sheets
- **Toast System** - Notifications

## 📁 Project Structure

```
src/
├── app/           # Routes (Expo Router)
├── components/    # UI components
├── hooks/         # Custom hooks
├── providers/     # React providers
├── services/      # API services
├── stores/        # Zustand stores
└── theme/         # Tamagui config
```

## 📚 Documentation

See the [docs](./docs) folder for detailed documentation:

- [README](./docs/README.md) - Full documentation
- [Architecture](./docs/ARCHITECTURE.md) - Project architecture
- [Conventions](./docs/CONVENTIONS.md) - Code patterns
- [Components](./docs/COMPONENTS.md) - Component docs

## 🛠️ Commands

```bash
pnpm start          # Start Metro
pnpm android        # Run Android
pnpm ios            # Run iOS
pnpm test           # Run tests
pnpm test:coverage  # Coverage report
pnpm check          # Lint + format
pnpm typecheck      # TypeScript check
```

## 📝 License

MIT
