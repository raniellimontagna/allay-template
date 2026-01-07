import { useAppStore } from '@/stores';
import { fireEvent, render, screen } from '@/testing/test-utils';
import { ThemeSheet } from './themeSheet';

jest.mock('@/stores', () => ({
  useAppStore: jest.fn(),
}));

describe('ThemeSheet', () => {
  const onCloseMock = jest.fn();
  const setThemeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: setThemeMock,
    });
  });

  it('should render when open', () => {
    render(<ThemeSheet isOpen={true} onClose={onCloseMock} />);

    expect(screen.getAllByText(/Light/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Dark/i).length).toBeGreaterThan(0);
  });

  it('should change theme and close when a theme is selected', () => {
    render(<ThemeSheet isOpen={true} onClose={onCloseMock} />);

    // Press the Dark option
    const darkOption = screen.getAllByText(/Dark/i)[0];
    fireEvent.press(darkOption);

    expect(setThemeMock).toHaveBeenCalledWith('dark');
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
