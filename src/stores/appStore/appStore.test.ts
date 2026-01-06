import { useAppStore } from './appStore';

// Reset store between tests
beforeEach(() => {
  useAppStore.setState({
    theme: 'dark',
    isOnboarded: false,
  });
});

describe('appStore', () => {
  describe('initial state', () => {
    it('should have dark theme as default', () => {
      const { theme } = useAppStore.getState();
      expect(theme).toBe('dark');
    });

    it('should have isOnboarded as false by default', () => {
      const { isOnboarded } = useAppStore.getState();
      expect(isOnboarded).toBe(false);
    });
  });

  describe('setTheme', () => {
    it('should set theme to light', () => {
      useAppStore.getState().setTheme('light');
      expect(useAppStore.getState().theme).toBe('light');
    });

    it('should set theme to dark', () => {
      useAppStore.getState().setTheme('light');
      useAppStore.getState().setTheme('dark');
      expect(useAppStore.getState().theme).toBe('dark');
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from dark to light', () => {
      useAppStore.getState().toggleTheme();
      expect(useAppStore.getState().theme).toBe('light');
    });

    it('should toggle from light to dark', () => {
      useAppStore.setState({ theme: 'light' });
      useAppStore.getState().toggleTheme();
      expect(useAppStore.getState().theme).toBe('dark');
    });
  });

  describe('completeOnboarding', () => {
    it('should set isOnboarded to true', () => {
      useAppStore.getState().completeOnboarding();
      expect(useAppStore.getState().isOnboarded).toBe(true);
    });
  });

  describe('reset', () => {
    it('should reset to initial state', () => {
      useAppStore.setState({ theme: 'light', isOnboarded: true });
      useAppStore.getState().reset();

      const state = useAppStore.getState();
      expect(state.theme).toBe('dark');
      expect(state.isOnboarded).toBe(false);
    });
  });
});
