import { fireEvent, render, screen } from '@/testing/test-utils';
import { SettingsScreen } from './settingsScreen';

describe('SettingsScreen', () => {
  it('should render correctly', () => {
    render(<SettingsScreen />);
    expect(screen.getAllByText(/Settings/i).length).toBeGreaterThan(0);
  });

  it('should close language and theme sheets when onClose is called', () => {
    render(<SettingsScreen />);

    fireEvent.press(screen.getAllByText(/Language/i)[0]);
    expect(screen.getAllByText(/Português/i).length).toBeGreaterThan(0);

    fireEvent.press(screen.getAllByText('Close')[0]);

    fireEvent.press(screen.getAllByText(/Theme/i)[0]);
    expect(screen.getAllByText(/Dark/i).length).toBeGreaterThan(0);

    fireEvent.press(screen.getAllByText('Close')[0]);
  });

  it('should open language sheet when language item is pressed', () => {
    render(<SettingsScreen />);

    fireEvent.press(screen.getAllByText(/Language/i)[0]);

    expect(screen.getAllByText(/Português/i).length).toBeGreaterThan(0);
  });

  it('should open theme sheet when theme item is pressed', () => {
    render(<SettingsScreen />);

    fireEvent.press(screen.getAllByText(/Theme/i)[0]);

    expect(screen.getAllByText(/Light/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Dark/i).length).toBeGreaterThan(0);
  });
});
