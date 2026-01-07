import { renderHook } from '@/testing/test-utils';
import { useSettingsItem } from './useSettingsItem';

describe('useSettingsItem', () => {
  it('should call onPress when handlePress is called', () => {
    const onPressMock = jest.fn();
    const { result } = renderHook(() => useSettingsItem({ onPress: onPressMock }));

    result.current.handlePress();

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should handle missing onPress gracefully', () => {
    const { result } = renderHook(() => useSettingsItem({}));

    expect(() => result.current.handlePress()).not.toThrow();
  });
});
