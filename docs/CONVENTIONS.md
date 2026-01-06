# Code Conventions

Patterns and conventions to maintain consistency in the project.

## Naming

### Files and Folders

| Type | Pattern | Example |
|------|---------|---------|
| Components | camelCase | `button.tsx`, `userCard.tsx` |
| Component hooks | camelCase with `use` | `useButton.ts`, `useUserCard.ts` |
| Global hooks | camelCase with `use` | `useAuth.ts`, `useApi.ts` |
| Stores | camelCase with `Store` | `authStore.ts`, `appStore.ts` |
| Utils | camelCase | `format.ts`, `validation.ts` |
| Types | camelCase | `api.ts`, `models.ts` |
| Routes (Expo Router) | kebab-case | `user-profile.tsx`, `settings.tsx` |

### Variables and Functions

```typescript
// ✅ Good
const userName = 'John';
const isLoading = true;
function getUserById(id: string) {}
const handleSubmit = () => {};

// ❌ Avoid
const user_name = 'John';
const loading = true; // prefer is/has/can prefix for booleans
function get_user() {}
```

### Types and Interfaces

```typescript
// ✅ Interfaces for objects
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Types for unions, intersections, primitives
type Theme = 'light' | 'dark';
type UserId = string;
type UserWithPosts = User & { posts: Post[] };

// ✅ Component props
interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

### Strict Typing

**Rule: Avoid `any` at all costs.**

Use `unknown` if the type is truly not known yet, or specific utility types. If a library has wrong types, use `@ts-expect-error` with a justification comment instead of casting to `any`.

```

## Component Structure

Every component must have a local hook separating logic from rendering:

```
src/components/ui/button/
├── newComponent.tsx      # Rendering only (UI)
├── useNewComponent.ts    # Component logic (state, handlers)
├── newComponent.styles.ts # Styled components definitions
├── newComponent.types.ts   # Types and interfaces (optional)
└── index.ts          # Re-export
```

### Component Hook (Logic)

```typescript
// src/components/ui/button/useButton.ts

import { useCallback, useState } from 'react';

interface UseButtonProps {
  onPress?: () => void;
  disabled?: boolean;
}

export function useButton({ onPress, disabled = false }: UseButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = useCallback(() => {
    if (!disabled) setIsPressed(true);
  }, [disabled]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handlePress = useCallback(() => {
    if (!disabled && onPress) {
      onPress();
    }
  }, [disabled, onPress]);

  return {
    isPressed,
    isDisabled: disabled,
    handlePress,
    handlePressIn,
    handlePressOut,
  };
}
```

### Component (Rendering)

```typescript
// src/components/ui/button/button.tsx

import { TouchableOpacity, Text } from 'react-native';
import { useButton } from './useButton';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onPress, disabled, variant = 'primary' }: ButtonProps) {
  const { isPressed, isDisabled, handlePress, handlePressIn, handlePressOut } = useButton({
    onPress,
    disabled,
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[styles.base, styles[variant], isPressed && styles.pressed]}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}
```

### Index (Re-export)

```typescript
// src/components/ui/button/index.ts

export { Button } from './button';
export { useButton } from './useButton';
export type { ButtonProps } from './button.types';
```

### Benefits of this approach

- ✅ **Separation of concerns** - UI and logic isolated
- ✅ **Testability** - Hook can be tested separately
- ✅ **Reusability** - Hook can be used in other components
- ✅ **Readability** - Component focused only on rendering
- ✅ **AI context** - Predictable structure facilitates analysis

## Store Structure (Zustand)

```typescript
// src/stores/authStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      login: async (email, password) => {
        // implementation
      },
      
      logout: () => {
        set(initialState);
      },
      
      setUser: (user) => {
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

## Imports

### Import Order

```typescript
// 1. React/React Native
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// 2. External libraries
import { useRouter } from 'expo-router';
import { styled } from 'tamagui';

// 3. Internal imports (using alias @/)
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { formatDate } from '@/utils/format';
import type { User } from '@/types/models';
```

### Path Aliases

Use `@/` for internal imports:

```typescript
// ✅ Good
import { Button } from '@/components/ui/button';

// ❌ Avoid
import { Button } from '../../../components/ui/button';
```

Configured in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## Icons

Using Solar Icons for React Native:

```typescript
import { HomeLinear, HomeBold, SettingsLinear } from '@solar-icons/react-native';

// Linear style (outline)
<HomeLinear size={24} color="white" />

// Bold style (filled)
<HomeBold size={24} color="$color" />

// With Tamagui theme color
<SettingsLinear size={20} color={theme === 'dark' ? 'white' : 'black'} />
```

### Available Styles

| Style | Suffix | Example |
|-------|--------|---------|
| Outline | `*Linear` | `SunLinear` |
| Filled | `*Bold` | `SunBold` |
| Duotone | `*BoldDuotone` | `SunBoldDuotone` |
| Broken | `*Broken` | `SunBroken` |

### Browse Icons

Visit [Solar Icons](https://www.figma.com/community/file/1166831539721848736) to browse available icons.

## Comments

**Rule: Avoid comments. Let the code be self-documenting.**

Good code should be readable without comments. Use descriptive variable and function names instead. Only add comments when absolutely necessary.

### When to avoid comments

```typescript
// ❌ Bad - states the obvious
// Set loading to true
setIsLoading(true);

// ❌ Bad - describes what, not why
// Loop through users
users.forEach(user => processUser(user));

// ❌ Bad - the function name already explains it
// Format the date to display
function formatDateForDisplay(date: Date) {}
```

### When comments are acceptable

```typescript
// ✅ Good - explains WHY (business rule)
// Users under 18 require parental consent per COPPA regulations
if (user.age < 18) {
  requireParentalConsent();
}

// ✅ Good - explains non-obvious workaround
// setTimeout needed because Android has a race condition with keyboard dismiss
setTimeout(() => inputRef.current?.focus(), 100);

// ✅ Good - TODO with context
// TODO: Replace with real API when backend is ready
const mockData = getMockUsers();

// ✅ Good - warns about important side effect
// WARNING: This clears all user data including offline cache
function resetApp() {}
```

### Better than comments: Self-documenting code

```typescript
// ❌ With comment
// Check if user can access premium features
if (user.subscription === 'premium' && !user.isBlocked) {}

// ✅ Without comment - self-explanatory
const canAccessPremiumFeatures = user.subscription === 'premium' && !user.isBlocked;
if (canAccessPremiumFeatures) {}
```

```typescript
// ❌ With comment
// 86400000 = 24 hours in milliseconds
const expirationTime = Date.now() + 86400000;

// ✅ Without comment - use constants
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const expirationTime = Date.now() + ONE_DAY_IN_MS;
```

## Tests (Future)

```
__tests__/
├── components/
│   ├── button.test.tsx      # Tests rendering
│   └── useButton.test.ts    # Tests hook logic
├── stores/
│   └── authStore.test.ts
└── utils/
    └── format.test.ts
```

## Git Commits

Use Conventional Commits:

```
feat: add Button component
fix: fix login navigation
docs: update README
refactor: extract auth logic to hook
chore: update dependencies
```
