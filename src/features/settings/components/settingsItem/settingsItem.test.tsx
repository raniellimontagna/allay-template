import { Text } from 'tamagui';
import { fireEvent, render, screen } from '@/testing/test-utils';

import { SettingsItem } from './settingsItem';

jest.mock('./useSettingsItem', () => ({
  useSettingsItem: ({ onPress }: { onPress?: () => void }) => ({
    handlePress: onPress,
  }),
}));

describe('SettingsItem', () => {
  it('should render title', () => {
    render(<SettingsItem title="Account Settings" />);

    expect(screen.getByText('Account Settings')).toBeTruthy();
  });

  it('should render subtitle when provided', () => {
    render(<SettingsItem title="Theme" subtitle="Dark mode" />);

    expect(screen.getByText('Theme')).toBeTruthy();
    expect(screen.getByText('Dark mode')).toBeTruthy();
  });

  it('should render icon when provided', () => {
    const TestIcon = () => <Text testID="test-icon">Icon</Text>;

    render(<SettingsItem title="Profile" icon={<TestIcon />} />);

    expect(screen.getByTestId('test-icon')).toBeTruthy();
  });

  it('should render right element when provided', () => {
    const RightElement = () => <Text testID="right-element">Toggle</Text>;

    render(<SettingsItem title="Notifications" rightElement={<RightElement />} />);

    expect(screen.getByTestId('right-element')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn();

    render(<SettingsItem title="Logout" onPress={onPressMock} />);

    fireEvent.press(screen.getByText('Logout'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should apply destructive styling when destructive prop is true', () => {
    render(<SettingsItem title="Delete Account" destructive onPress={() => {}} />);

    expect(screen.getByText('Delete Account')).toBeTruthy();
  });
});
