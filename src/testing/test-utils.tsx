import { defaultConfig } from '@tamagui/config/v4';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type RenderOptions, render, renderHook } from '@testing-library/react-native';
import { type ReactElement, type ReactNode, useMemo } from 'react';
import { createTamagui, TamaguiProvider } from 'tamagui';

const tamaguiConfig = createTamagui(defaultConfig);

// Create a new QueryClient for each test
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
        staleTime: Infinity,
        networkMode: 'always',
      },
      mutations: {
        retry: false,
        networkMode: 'always',
      },
    },
  });
}

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Wrapper with all providers needed for testing components
 */
export function AllProviders({ children }: ProvidersProps) {
  const queryClient = useMemo(() => createTestQueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig}>
        <ToastProvider>
          {children}
          <ToastViewport />
        </ToastProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}

/**
 * Custom render that wraps component with all providers
 * Use this instead of @testing-library/react-native render
 */
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllProviders, ...options });
}

/**
 * Custom renderHook that wraps hook with all providers
 * Use this for testing custom hooks that use React Query
 */
export function renderHookWithProviders<Result, Props>(
  hook: (props: Props) => Result,
  options?: { initialProps?: Props }
) {
  return renderHook(hook, { wrapper: AllProviders, ...options });
}

// Re-export everything from testing-library
export * from '@testing-library/react-native';

// Override render and renderHook with our custom ones
export { renderWithProviders as render, renderHookWithProviders as renderHook };
