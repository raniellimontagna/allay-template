import { GlobalLinear, Logout2Linear, SettingsLinear } from '@solar-icons/react-native';
import { useTranslation } from 'react-i18next';
import { Button, H1, H3, Text, useTheme, XStack, YStack } from 'tamagui';

import { SafeAreaContainer } from '@/components';
import { useToast } from '@/components/ui';
import { changeLanguage, getCurrentLanguage } from '@/lib';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/locales';
import { useAppStore } from '@/stores';

const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  en: '🇺🇸',
  pt: '🇧🇷',
  es: '🇪🇸',
};

export default function SettingsTab() {
  const { t } = useTranslation();
  const theme = useTheme();
  const reset = useAppStore((state) => state.reset);
  const toast = useToast();

  const handleReset = () => {
    reset();
    toast.show(t('settings.resetSuccess'), {
      message: t('settings.resetMessage'),
      additionalInfo: { type: 'warning' },
    });
  };

  const handleLanguageChange = (lang: SupportedLanguage) => {
    changeLanguage(lang);
    toast.show(t('settings.language'), {
      message: t(`languages.${lang}`),
      additionalInfo: { type: 'info' },
    });
  };

  const currentLang = getCurrentLanguage();

  return (
    <SafeAreaContainer edges={['top']}>
      <YStack flex={1} p="$4" gap="$4">
        <YStack items="center" gap="$4" pt="$8">
          <YStack
            width={80}
            height={80}
            borderRadius="$10"
            items="center"
            justify="center"
            bg="$color3"
          >
            <SettingsLinear size={40} color={theme.gray10?.val} />
          </YStack>

          <H1 size="$6">{t('settings.title')}</H1>
          <Text color="$color11" text="center">
            {t('settings.description')}
          </Text>
        </YStack>

        {/* Language Selector */}
        <YStack gap="$2" pt="$4">
          <XStack gap="$2" items="center">
            <GlobalLinear size={20} color={theme.color11?.val} />
            <H3 size="$4">{t('settings.language')}</H3>
          </XStack>

          <XStack gap="$2" flexWrap="wrap">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <Button
                key={lang}
                size="$3"
                variant={currentLang === lang ? undefined : 'outlined'}
                onPress={() => handleLanguageChange(lang)}
              >
                <Button.Text>
                  {LANGUAGE_FLAGS[lang]} {t(`languages.${lang}`)}
                </Button.Text>
              </Button>
            ))}
          </XStack>
        </YStack>

        <YStack flex={1} justify="flex-end" pb="$4">
          <Button size="$4" theme="red" onPress={handleReset}>
            <Button.Icon>
              <Logout2Linear size={18} />
            </Button.Icon>
            <Button.Text>{t('settings.reset')}</Button.Text>
          </Button>
        </YStack>
      </YStack>
    </SafeAreaContainer>
  );
}
