import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

import { useHaptics, type HapticStyle } from './useHaptics';

describe('useHaptics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Platform.OS = 'ios';
  });

  it('should return isSupported true on iOS', () => {
    Platform.OS = 'ios';
    const { isSupported } = useHaptics();
    expect(isSupported).toBe(true);
  });

  it('should return isSupported true on Android', () => {
    Platform.OS = 'android';
    const { isSupported } = useHaptics();
    expect(isSupported).toBe(true);
  });

  it('should return isSupported false on web', () => {
    Platform.OS = 'web';
    const { isSupported } = useHaptics();
    expect(isSupported).toBe(false);
  });

  it('should call impactAsync with Light on light()', async () => {
    const { light } = useHaptics();
    await light();
    expect(Haptics.impactAsync).toHaveBeenCalledWith('light');
  });

  it('should call impactAsync with Medium on medium()', async () => {
    const { medium } = useHaptics();
    await medium();
    expect(Haptics.impactAsync).toHaveBeenCalledWith('medium');
  });

  it('should call impactAsync with Heavy on heavy()', async () => {
    const { heavy } = useHaptics();
    await heavy();
    expect(Haptics.impactAsync).toHaveBeenCalledWith('heavy');
  });

  it('should call notificationAsync with Success on success()', async () => {
    const { success } = useHaptics();
    await success();
    expect(Haptics.notificationAsync).toHaveBeenCalledWith('success');
  });

  it('should call selectionAsync on selection()', async () => {
    const { selection } = useHaptics();
    await selection();
    expect(Haptics.selectionAsync).toHaveBeenCalled();
  });

  it('should call notificationAsync with Warning on warning()', async () => {
    const { warning } = useHaptics();
    await warning();
    expect(Haptics.notificationAsync).toHaveBeenCalledWith('warning');
  });

  it('should call notificationAsync with Error on error()', async () => {
    const { error } = useHaptics();
    await error();
    expect(Haptics.notificationAsync).toHaveBeenCalledWith('error');
  });

  it('should use default style light on trigger()', async () => {
    const { trigger } = useHaptics();
    await trigger();
    expect(Haptics.impactAsync).toHaveBeenCalledWith('light');
  });

  it('should not trigger haptics on web', async () => {
    Platform.OS = 'web';
    const { light } = useHaptics();
    await light();
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });

  it('should fail silently if haptics throw', async () => {
    (Haptics.selectionAsync as jest.Mock).mockRejectedValueOnce(new Error('Haptics failed'));
    const { selection } = useHaptics();

    // Should not throw
    await expect(selection()).resolves.not.toThrow();
  });

  it('should do nothing for invalid style', async () => {
    const { trigger } = useHaptics();
    await trigger('invalid' as unknown as HapticStyle);
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
    expect(Haptics.notificationAsync).not.toHaveBeenCalled();
    expect(Haptics.selectionAsync).not.toHaveBeenCalled();
  });
});
