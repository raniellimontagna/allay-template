import { changeLanguage } from '@/lib';
import { fireEvent, render, screen } from '@/testing/test-utils';
import { LanguageSheet } from './languageSheet';

jest.mock('@/lib', () => ({
  changeLanguage: jest.fn(),
  getCurrentLanguage: jest.fn(() => 'en'),
}));

describe('LanguageSheet', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render when open', () => {
    render(<LanguageSheet isOpen={true} onClose={onCloseMock} />);

    expect(screen.getByText(/English/i)).toBeTruthy();
    expect(screen.getByText(/Português/i)).toBeTruthy();
  });

  it('should change language and close when a different language is selected', () => {
    render(<LanguageSheet isOpen={true} onClose={onCloseMock} />);

    fireEvent.press(screen.getByText(/Português/i));

    expect(changeLanguage).toHaveBeenCalledWith('pt');
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should only close when the current language is selected', () => {
    render(<LanguageSheet isOpen={true} onClose={onCloseMock} />);

    fireEvent.press(screen.getByText(/English/i));

    expect(changeLanguage).not.toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
