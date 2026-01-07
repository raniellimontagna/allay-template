import { render, screen } from '@/testing/test-utils';

import { OfflineBanner } from './offlineBanner';

jest.mock('@/hooks', () => ({
  useNetwork: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => (key === 'common.offline' ? 'You are offline' : key),
  }),
}));

import { useNetwork } from '@/hooks';

const mockUseNetwork = useNetwork as jest.Mock;

describe('OfflineBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when online', () => {
    mockUseNetwork.mockReturnValue({ isOffline: false, isOnline: true });

    render(<OfflineBanner />);

    expect(screen.queryByText('You are offline')).toBeFalsy();
  });

  it('should render banner when offline', () => {
    mockUseNetwork.mockReturnValue({ isOffline: true, isOnline: false });

    render(<OfflineBanner />);

    expect(screen.getByText('You are offline')).toBeTruthy();
  });
});
