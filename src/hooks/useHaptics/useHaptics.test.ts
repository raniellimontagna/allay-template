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

import { useHaptics } from './useHaptics';

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

  it('should not trigger haptics on web', async () => {
    Platform.OS = 'web';
    const { light } = useHaptics();
    await light();
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });
});
