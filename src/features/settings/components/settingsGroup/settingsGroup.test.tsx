import { Text } from 'tamagui';
import { render, screen } from '@/testing/test-utils';

import { SettingsGroup } from './settingsGroup';

describe('SettingsGroup', () => {
  it('should render children', () => {
    render(
      <SettingsGroup>
        <Text testID="child-1">Item 1</Text>
        <Text testID="child-2">Item 2</Text>
      </SettingsGroup>
    );

    expect(screen.getByTestId('child-1')).toBeTruthy();
    expect(screen.getByTestId('child-2')).toBeTruthy();
  });

  it('should render title when provided', () => {
    render(
      <SettingsGroup title="General">
        <Text>Item</Text>
      </SettingsGroup>
    );

    expect(screen.getByText('General')).toBeTruthy();
  });

  it('should render footer when provided', () => {
    render(
      <SettingsGroup footer="This is a footer">
        <Text>Item</Text>
      </SettingsGroup>
    );

    expect(screen.getByText('This is a footer')).toBeTruthy();
  });

  it('should render with title and footer together', () => {
    render(
      <SettingsGroup title="Account" footer="Manage your account settings">
        <Text>Profile</Text>
      </SettingsGroup>
    );

    expect(screen.getByText('Account')).toBeTruthy();
    expect(screen.getByText('Manage your account settings')).toBeTruthy();
    expect(screen.getByText('Profile')).toBeTruthy();
  });

  it('should handle non-element children gracefully', () => {
    render(<SettingsGroup>{'Not an element'}</SettingsGroup>);

    expect(screen.getByText('Not an element')).toBeTruthy();
  });
});
