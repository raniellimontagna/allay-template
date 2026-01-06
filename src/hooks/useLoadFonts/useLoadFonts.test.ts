import { renderHook } from '@testing-library/react-native';

// Mock expo-google-fonts/inter
jest.mock('@expo-google-fonts/inter', () => ({
  Inter_400Regular: 'Inter_400Regular',
  Inter_500Medium: 'Inter_500Medium',
  Inter_600SemiBold: 'Inter_600SemiBold',
  Inter_700Bold: 'Inter_700Bold',
  useFonts: jest.fn(),
}));

import { useFonts } from '@expo-google-fonts/inter';
import { useLoadFonts } from './useLoadFonts';

const mockUseFonts = useFonts as jest.Mock;

describe('useLoadFonts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return isReady false while fonts are loading', () => {
    mockUseFonts.mockReturnValue([false, null]);

    const { result } = renderHook(() => useLoadFonts());

    expect(result.current.fontsLoaded).toBe(false);
    expect(result.current.fontError).toBeNull();
    expect(result.current.isReady).toBe(false);
  });

  it('should return isReady true when fonts are loaded', () => {
    mockUseFonts.mockReturnValue([true, null]);

    const { result } = renderHook(() => useLoadFonts());

    expect(result.current.fontsLoaded).toBe(true);
    expect(result.current.fontError).toBeNull();
    expect(result.current.isReady).toBe(true);
  });

  it('should return fontError when there is an error', () => {
    const mockError = new Error('Failed to load fonts');
    mockUseFonts.mockReturnValue([false, mockError]);

    const { result } = renderHook(() => useLoadFonts());

    expect(result.current.fontsLoaded).toBe(false);
    expect(result.current.fontError).toBe(mockError);
    expect(result.current.isReady).toBe(false);
  });

  it('should call useFonts with correct font configuration', () => {
    mockUseFonts.mockReturnValue([true, null]);

    renderHook(() => useLoadFonts());

    expect(mockUseFonts).toHaveBeenCalledWith({
      Inter_400Regular: 'Inter_400Regular',
      Inter_500Medium: 'Inter_500Medium',
      Inter_600SemiBold: 'Inter_600SemiBold',
      Inter_700Bold: 'Inter_700Bold',
    });
  });
});
