jest.mock('expo-localization', () => ({
  getLocales: jest.fn(() => []),
}));

describe('i18n', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should use device language if supported', () => {
      const Localization = require('expo-localization');
      Localization.getLocales.mockReturnValue([{ languageCode: 'pt' }]);

      const i18n = require('./i18n').default;
      expect(i18n.language).toBe('pt');
    });

    it('should fallback to default if not supported', () => {
      const Localization = require('expo-localization');
      Localization.getLocales.mockReturnValue([{ languageCode: 'fr' }]);

      const i18n = require('./i18n').default;
      expect(i18n.language).toBe('en');
    });

    it('should fallback to default if locales list is empty', () => {
      const Localization = require('expo-localization');
      Localization.getLocales.mockReturnValue([]);

      const i18n = require('./i18n').default;
      expect(i18n.language).toBe('en');
    });
  });

  describe('methods', () => {
    it('should change language', async () => {
      const { changeLanguage, getCurrentLanguage } = require('./i18n');
      const i18n = require('./i18n').default;
      await changeLanguage('es');
      expect(i18n.language).toBe('es');
      expect(getCurrentLanguage()).toBe('es');
    });
  });
});
