import NetInfo from '@react-native-community/netinfo';
import { act, renderHook, waitFor } from '@testing-library/react-native';

import { useNetwork } from './useNetwork';

describe('useNetwork', () => {
  const mockAddEventListener = NetInfo.addEventListener as jest.Mock;
  const mockFetch = NetInfo.fetch as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAddEventListener.mockReturnValue(jest.fn());
    // Default mock - will be overridden in specific tests
    mockFetch.mockResolvedValue({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    });
  });

  it('should return initial connected state', async () => {
    const { result } = renderHook(() => useNetwork());

    // Wait for fetch to complete
    await act(async () => {
      await mockFetch();
    });

    expect(result.current.isConnected).toBe(true);
    expect(result.current.isOffline).toBe(false);
  });

  it('should subscribe to network changes on mount', async () => {
    renderHook(() => useNetwork());

    await act(async () => {
      await mockFetch();
    });

    expect(mockAddEventListener).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalled();
  });

  it('should unsubscribe on unmount', async () => {
    const unsubscribe = jest.fn();
    mockAddEventListener.mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() => useNetwork());

    await act(async () => {
      await mockFetch();
    });

    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });

  it('should update state when network changes via listener', async () => {
    let networkCallback: (state: unknown) => void = () => {};
    mockAddEventListener.mockImplementation((callback) => {
      networkCallback = callback;
      return jest.fn();
    });

    const { result } = renderHook(() => useNetwork());

    await act(async () => {
      await mockFetch();
    });

    // Trigger network change via the listener callback
    act(() => {
      networkCallback({
        isConnected: false,
        isInternetReachable: false,
        type: 'none',
      });
    });

    expect(result.current.isConnected).toBe(false);
    expect(result.current.isOffline).toBe(true);
    expect(result.current.type).toBe('none');
  });

  it('should fetch initial state on mount and update accordingly', async () => {
    mockFetch.mockResolvedValue({
      isConnected: false,
      isInternetReachable: false,
      type: 'none',
    });

    const { result } = renderHook(() => useNetwork());

    await waitFor(() => {
      expect(result.current.isConnected).toBe(false);
    });

    expect(result.current.isOffline).toBe(true);
  });
});
