import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export type HapticStyle =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'success'
  | 'warning'
  | 'error'
  | 'selection';

const impactMap: Record<'light' | 'medium' | 'heavy', Haptics.ImpactFeedbackStyle> = {
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
  heavy: Haptics.ImpactFeedbackStyle.Heavy,
};

const notificationMap: Record<'success' | 'warning' | 'error', Haptics.NotificationFeedbackType> = {
  success: Haptics.NotificationFeedbackType.Success,
  warning: Haptics.NotificationFeedbackType.Warning,
  error: Haptics.NotificationFeedbackType.Error,
};

/**
 * Hook for triggering haptic feedback
 * Haptics only work on physical devices (iOS/Android)
 */
export function useHaptics() {
  const isSupported = Platform.OS === 'ios' || Platform.OS === 'android';

  /**
   * Trigger haptic feedback
   * @param style - Type of haptic feedback
   */
  const trigger = async (style: HapticStyle = 'light') => {
    if (!isSupported) return;

    try {
      if (style === 'selection') {
        await Haptics.selectionAsync();
      } else if (style in impactMap) {
        await Haptics.impactAsync(impactMap[style as keyof typeof impactMap]);
      } else if (style in notificationMap) {
        await Haptics.notificationAsync(notificationMap[style as keyof typeof notificationMap]);
      }
    } catch {
      // Silently fail on unsupported devices or simulators
    }
  };

  /**
   * Light impact feedback - for subtle interactions
   */
  const light = () => trigger('light');

  /**
   * Medium impact feedback - for standard interactions
   */
  const medium = () => trigger('medium');

  /**
   * Heavy impact feedback - for significant actions
   */
  const heavy = () => trigger('heavy');

  /**
   * Success notification feedback
   */
  const success = () => trigger('success');

  /**
   * Warning notification feedback
   */
  const warning = () => trigger('warning');

  /**
   * Error notification feedback
   */
  const error = () => trigger('error');

  /**
   * Selection feedback - for picker/selection changes
   */
  const selection = () => trigger('selection');

  return {
    trigger,
    light,
    medium,
    heavy,
    success,
    warning,
    error,
    selection,
    isSupported,
  };
}
