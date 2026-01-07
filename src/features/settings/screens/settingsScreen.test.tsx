import { render } from '@/testing/test-utils';
import { SettingsScreen } from './settingsScreen';

it('should render children', () => {
  const { getAllByText } = render(<SettingsScreen />);

  expect(getAllByText('Settings').length).toBeGreaterThan(0);
});
