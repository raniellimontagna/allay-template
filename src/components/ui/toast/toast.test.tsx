import { useToastState } from '@tamagui/toast';
import { cleanup, render, screen } from '@/testing/test-utils';
import { Toast } from './toast';

jest.mock('@tamagui/toast', () => ({
  ...jest.requireActual('@tamagui/toast'),
  useToastState: jest.fn(),
}));

describe('Toast', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should return null when there is no current toast', () => {
    (useToastState as jest.Mock).mockReturnValue(null);
    render(<Toast />);
    expect(screen.queryByTestId('toast-component')).toBeNull();
  });

  it('should return null when toast is handled natively', () => {
    (useToastState as jest.Mock).mockReturnValue({ isHandledNatively: true });
    render(<Toast />);
    expect(screen.queryByTestId('toast-component')).toBeNull();
  });

  it('should render success toast correctly', () => {
    (useToastState as jest.Mock).mockReturnValue({
      id: '1',
      title: 'Success!',
      message: 'Operation completed',
      type: 'success',
    });

    render(<Toast />);
    expect(screen.getByTestId('toast-component')).toBeTruthy();
    expect(screen.getByText('Success!')).toBeTruthy();
    expect(screen.getByText('Operation completed')).toBeTruthy();
  });

  it('should render error toast correctly', () => {
    (useToastState as jest.Mock).mockReturnValue({
      id: '2',
      title: 'Error!',
      message: 'Something went wrong',
      type: 'error',
    });

    render(<Toast />);
    expect(screen.getByTestId('toast-component')).toBeTruthy();
    expect(screen.getByText('Error!')).toBeTruthy();
    expect(screen.getByText('Something went wrong')).toBeTruthy();
  });

  it('should render warning toast correctly', () => {
    (useToastState as jest.Mock).mockReturnValue({
      id: '3',
      title: 'Warning!',
      type: 'warning',
    });

    render(<Toast />);
    expect(screen.getByTestId('toast-component')).toBeTruthy();
    expect(screen.getByText('Warning!')).toBeTruthy();
  });

  it('should render info toast specifically', () => {
    (useToastState as jest.Mock).mockReturnValue({
      id: '4',
      title: 'Info Message',
      type: 'info',
    });

    render(<Toast />);
    expect(screen.getByTestId('toast-component')).toBeTruthy();
    expect(screen.getByText('Info Message')).toBeTruthy();
  });

  it('should render info toast as default', () => {
    (useToastState as jest.Mock).mockReturnValue({
      id: '5',
      title: 'Default Toast',
    });

    render(<Toast />);
    expect(screen.getByTestId('toast-component')).toBeTruthy();
    expect(screen.getByText('Default Toast')).toBeTruthy();
  });
});
