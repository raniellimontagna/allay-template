import { defaultConfig } from '@tamagui/config/v4';
import { type RenderOptions, render } from '@testing-library/react-native';
import type { ReactElement, ReactNode } from 'react';
import { createTamagui, TamaguiProvider } from 'tamagui';

const tamaguiConfig = createTamagui(defaultConfig);

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Wrapper with all providers needed for testing components
 */
export function AllProviders({ children }: ProvidersProps) {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>;
}

/**
 * Custom render that wraps component with all providers
 * Use this instead of @testing-library/react-native render
 */
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// Re-export everything from testing-library
export * from '@testing-library/react-native';

// Override render with our custom one
export { renderWithProviders as render };
