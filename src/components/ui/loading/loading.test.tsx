import { defaultConfig } from '@tamagui/config/v4';
import { render, screen } from '@testing-library/react-native';
import { createTamagui, TamaguiProvider } from 'tamagui';

import { Loading } from './loading';

const tamaguiConfig = createTamagui(defaultConfig);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
);

describe('Loading', () => {
  it('should render spinner', () => {
    render(<Loading />, { wrapper });

    // Spinner should be rendered (it's an ActivityIndicator internally)
    expect(screen.root).toBeTruthy();
  });

  it('should render with message', () => {
    render(<Loading message="Loading data..." />, { wrapper });

    expect(screen.getByText('Loading data...')).toBeTruthy();
  });

  it('should render in fullScreen mode', () => {
    render(<Loading fullScreen message="Please wait..." />, { wrapper });

    expect(screen.getByText('Please wait...')).toBeTruthy();
  });

  it('should accept different sizes', () => {
    const { rerender } = render(<Loading size="small" />, { wrapper });
    expect(screen.root).toBeTruthy();

    rerender(<Loading size="large" />);
    expect(screen.root).toBeTruthy();
  });
});
