# Components

Documentation for the project's UI components.

> ⚠️ This documentation will be expanded as components are created with Tamagui.

## Structure

```
src/components/
├── ui/           # Primitive components
│   └── button/
│       ├── button.tsx
│       ├── useButton.ts
│       └── index.ts
├── layout/       # Layout components
│   └── container/
│       ├── container.tsx
│       ├── useContainer.ts
│       └── index.ts
components/
├── ui/           # Primitive components
│   └── button/
│       ├── button.tsx
│       ├── useButton.ts
│       └── index.ts
├── layout/       # Layout components
│   └── container/
│       ├── container.tsx
│       ├── useContainer.ts
│       └── index.ts
└── features/     # Feature-specific components (shared)
    └── ...
```

> **Note:** Feature-specific components that are **not** shared should be located within their respective feature directory (e.g., `src/features/settings/components/`). Identifiable by their domain specificity. `src/components/features` is for components that are feature-related but used across multiple features or screens.

## UI Components

### Button (to create)

```tsx
import { Button } from '@/components/ui/button';

// Basic usage
<Button onPress={handlePress}>
  Click here
</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
```

### Input (to create)

```tsx
import { Input } from '@/components/ui/input';

// Basic usage
<Input
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
/>

// With label
<Input
  label="Email"
  placeholder="your@email.com"
/>

// With error
<Input
  label="Email"
  error="Invalid email"
/>

// Types
<Input type="email" />
<Input type="password" />
<Input type="number" />
```

### Card (to create)

```tsx
import { Card } from '@/components/ui/card';

<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>
    Card content
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

## Layout Components

### Container (to create)

```tsx
import { Container } from '@/components/layout/container';

// Centered with padding
<Container>
  <Text>Content</Text>
</Container>

// Full width
<Container fullWidth>
  <Text>Content</Text>
</Container>
```

### SafeAreaContainer
```tsx
import { SafeAreaContainer } from '@/components/layout/safe-area-container';

// Respects device safe areas with default edges (all)
<SafeAreaContainer>
  <Text>Safe content</Text>
</SafeAreaContainer>

// With specific edges
<SafeAreaContainer edges={['top', 'bottom']}>
  <Text>Content</Text>
</SafeAreaContainer>
```

### Toast
Global toast notification system powered by `@tamagui/toast`.

```tsx
import { useToast } from '@/components/ui/toast';

const toast = useToast();

// Show a success toast
toast.show('Success!', {
  message: 'Operation completed successfully.',
  additionalInfo: { type: 'success' }, // 'success' | 'error' | 'warning' | 'info'
});

// Show with custom duration
toast.show('Quick Info', {
  duration: 1000,
});
```

### Loading
Loading spinner component for async feedback.

```tsx
import { Loading } from '@/components/ui/loading';

// Basic usage
<Loading />

// With message
<Loading message="Loading data..." />

// Different sizes: 'small' | 'medium' | 'large'
<Loading size="small" />
<Loading size="large" message="Processing..." />

// Full screen overlay
<Loading fullScreen message="Please wait..." />

// Custom color
<Loading color="#FF0000" />
```

### BottomSheet
Modal bottom sheet component powered by `@gorhom/bottom-sheet`.

```tsx
import { BottomSheet, useBottomSheet } from '@/components/ui';

// Using the hook for state management
const sheet = useBottomSheet();

// Button to open
<Button onPress={sheet.open}>Open Sheet</Button>

// BottomSheet component
<BottomSheet 
  isOpen={sheet.isOpen} 
  onClose={sheet.close}
  snapPoints={['40%', '80%']}  // Optional, default: ['50%']
>
  <YStack p="$4">
    <Text>Sheet content here</Text>
    <Button onPress={sheet.close}>Close</Button>
  </YStack>
</BottomSheet>
```

**Props:**
- `isOpen` - Whether the sheet is visible
- `onClose` - Callback when dismissed
- `snapPoints` - Array of snap positions (e.g., `['25%', '50%', '90%']`)
- `enablePanDownToClose` - Allow swipe down to close (default: true)
- `handleIndicator` - Show the drag handle (default: true)

## Hooks

### useHaptics
Haptic feedback hook for tactile interactions.

```tsx
import { useHaptics } from '@/hooks';

const { light, medium, heavy, success, warning, error, selection } = useHaptics();

// Impact feedback
<Button onPress={() => { light(); doAction(); }}>Light Tap</Button>
<Button onPress={() => { medium(); doAction(); }}>Medium Tap</Button>
<Button onPress={() => { heavy(); doAction(); }}>Heavy Tap</Button>

// Notification feedback
success();  // After successful action
warning();  // For warnings
error();    // For errors

// Selection feedback (for pickers)
selection();

// Check if supported
const { isSupported } = useHaptics(); // true on iOS/Android
```

## Creating New Components

### 1. Folder structure

```
src/components/ui/newComponent/
├── newComponent.tsx      # Rendering only
├── useNewComponent.ts    # Logic (state, handlers)
├── newComponent.types.ts # Types (optional)
└── index.ts              # Re-exports
```

### 2. Hook (Logic)

```typescript
// src/components/ui/newComponent/useNewComponent.ts

import { useState, useCallback } from 'react';

interface UseNewComponentProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

export function useNewComponent({ initialValue = '', onChange }: UseNewComponentProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  return {
    value,
    handleChange,
  };
}
```

### 3. Component (Rendering)

```tsx
// src/components/ui/newComponent/newComponent.tsx

import { View } from 'react-native';
import { styled } from 'tamagui';
import type { GetProps } from 'tamagui';
import { useNewComponent } from './useNewComponent';

const StyledComponent = styled(View, {
  name: 'NewComponent',
  padding: '$4',
  borderRadius: '$2',
  backgroundColor: '$background',
  
  variants: {
    variant: {
      primary: { backgroundColor: '$primary' },
      secondary: { backgroundColor: '$secondary' },
    },
    size: {
      sm: { padding: '$2' },
      md: { padding: '$4' },
      lg: { padding: '$6' },
    },
  },
  
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type NewComponentProps = GetProps<typeof StyledComponent> & {
  initialValue?: string;
  onChange?: (value: string) => void;
};

export function NewComponent({ initialValue, onChange, ...props }: NewComponentProps) {
  const { value, handleChange } = useNewComponent({ initialValue, onChange });
  
  return <StyledComponent {...props} />;
}
```

### 4. Index (Re-exports)

```typescript
// src/components/ui/newComponent/index.ts

export { NewComponent } from './newComponent';
export { useNewComponent } from './useNewComponent';
```

### 5. Update this documentation

Add usage examples for the new component.
