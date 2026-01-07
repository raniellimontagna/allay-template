# Architecture

This document describes the architecture and technical decisions of the template.

## Overview

```
┌─────────────────────────────────────────────────────────┐
│                         App                             │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ Expo Router │  │   Tamagui   │  │     Zustand     │  │
│  │ (Navigation)│  │   (UI/UX)   │  │ (Global State)  │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐                       │
│  │ Solar Icons │  │    Biome    │                       │
│  │   (Icons)   │  │(Lint/Format)│                       │
│  └─────────────┘  └─────────────┘                       │
├─────────────────────────────────────────────────────────┤
│                    React Native                         │
├─────────────────────────────────────────────────────────┤
│                     Expo SDK 54                         │
└─────────────────────────────────────────────────────────┘
```

## Layers

### 1. `src/app/` - Routes (Expo Router)

Defines app navigation using file-based routing.

- `_layout.tsx` - Root layout (providers, navigation configuration)
- `index.tsx` - Home screen (`/`)
- `[slug].tsx` - Dynamic routes
- `(group)/` - Route groups (shared layouts)

### 2. `src/components/` - UI Components

Reusable components built with Tamagui.

```
components/
├── ui/           # Base components (Button, Input, Card)
├── layout/       # Layout components (Container, Header)
└── features/     # Shared feature components (reusable across features)
```

### 3. `src/features/` - Attributes

Self-contained modules that group screens, components, API calls, and state for a specific domain.

```
features/
├── auth/
├── settings/
│   ├── screens/      # Feature-specific screens
│   ├── components/   # Feature-specific components
│   └── index.ts      # Public API
└── ...
```

### 4. `src/stores/` - Global State (Zustand)

State management with Zustand.

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppStore {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### 5. `src/hooks/` - Custom Hooks

Reusable logic encapsulated in hooks.

```
hooks/
├── useAuth.ts        # Authentication
├── useApi.ts         # API calls
└── useStorage.ts     # AsyncStorage wrapper
```

### 6. `src/theme/` - Tamagui Config

Design system configuration.

```
theme/
├── tamagui.config.ts   # Main config
├── tokens.ts           # Colors, spacing, etc.
└── themes.ts           # Light/dark themes
```

### 7. `src/types/` - TypeScript Types

Global types and interfaces.

```
types/
├── api.ts          # API response types
├── navigation.ts   # Navigation types
└── models.ts       # Data models
```

### 8. `src/utils/` - Utilities

Pure helper functions.

```
utils/
├── format.ts       # Formatting (dates, currency)
├── validation.ts   # Data validation
└── storage.ts      # AsyncStorage helpers
```

## Data Flow

```
User Action
    │
    ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│  View   │────▶│  Store  │────▶│   API   │
│ (Screen)│◀────│(Zustand)│◀────│(Backend)│
└─────────┘     └─────────┘     └─────────┘
```

1. **View** dispatches action (e.g., button clicked)
2. **Store** updates state and/or makes API call
3. **View** re-renders with new state

## Technical Decisions

### Why Expo?
- Zero config to start
- OTA updates with EAS
- `npx expo prebuild` when native code is needed

### Why Expo Router?
- File-based routing (similar to Next.js)
- Automatic deep linking
- Typed routes

### Why Tamagui?
- Native performance (compiles to StyleSheet)
- Consistent design tokens
- Supports web + mobile

### Why Zustand?
- Simple and lightweight (~1KB)
- No boilerplate (vs Redux)
- Easy to type with TypeScript
