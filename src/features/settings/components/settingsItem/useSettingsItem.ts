import { useCallback } from 'react';

import type { SettingsItemProps } from './settingsItem.types';

export function useSettingsItem({ onPress }: Partial<SettingsItemProps>) {
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return {
    handlePress,
  };
}
