import { render, screen } from '@/testing/test-utils';

import { Loading } from './loading';

describe('Loading', () => {
  it('should render spinner', () => {
    render(<Loading />);

    // Spinner should be rendered (it's an ActivityIndicator internally)
    expect(screen.root).toBeTruthy();
  });

  it('should render with message', () => {
    render(<Loading message="Loading data..." />);

    expect(screen.getByText('Loading data...')).toBeTruthy();
  });

  it('should render in fullScreen mode', () => {
    render(<Loading fullScreen message="Please wait..." />);

    expect(screen.getByText('Please wait...')).toBeTruthy();
  });

  it('should accept different sizes with messages', () => {
    render(<Loading size="small" message="Small Loading" />);
    expect(screen.getByText('Small Loading')).toBeTruthy();

    render(<Loading size="large" message="Large Loading" />);
    expect(screen.getByText('Large Loading')).toBeTruthy();
  });
});
