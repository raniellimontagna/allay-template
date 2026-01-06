import { CheckCircleLinear } from '@solar-icons/react-native';
import { useTranslation } from 'react-i18next';
import { Button, Text, useTheme, XStack, YStack } from 'tamagui';

import { BottomSheet, useToast } from '@/components/ui';
import { changeLanguage, getCurrentLanguage } from '@/lib';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/locales';
import { BRFlag, ESFlag, USFlag } from './components/flags';

interface LanguageSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const FLAG_COMPONENTS: Record<SupportedLanguage, React.FC<{ size?: number }>> = {
  en: USFlag,
  pt: BRFlag,
  es: ESFlag,
};

const NATIVE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
};

export function LanguageSheet({ isOpen, onClose }: LanguageSheetProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const toast = useToast();
  const currentLang = getCurrentLanguage();

  const handleLanguageChange = (lang: SupportedLanguage) => {
    if (lang === currentLang) {
      onClose();
      return;
    }

    changeLanguage(lang);
    onClose();

    toast.show(t('settings.language'), {
      message: t(`languages.${lang}`),
      additionalInfo: { type: 'info' },
    });
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} snapPoints={['50%']}>
      <YStack padding="$4" gap="$3">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const Flag = FLAG_COMPONENTS[lang];
          const isActive = currentLang === lang;

          return (
            <Button
              key={lang}
              size="$6" // Keeps the size but we'll override height for card feel if needed, or leave as is
              height="auto" // Allow height to grow with content
              paddingVertical="$3"
              onPress={() => handleLanguageChange(lang)}
              backgroundColor="$background"
              borderWidth={1}
              borderColor={isActive ? '$color11' : '$borderColor'}
              pressStyle={{ backgroundColor: '$backgroundPress' }}
              justifyContent="flex-start"
              paddingHorizontal="$4"
              elevation={isActive ? '$1' : '$0'}
            >
              <XStack gap="$4" items="center" flex={1}>
                <Flag size={48} />
                <YStack flex={1} gap="$0">
                  <Text fontSize="$5" fontWeight="600" color={isActive ? '$color12' : '$color11'}>
                    {t(`languages.${lang}`)}
                  </Text>
                  <Text fontSize="$3" color="$color10">
                    {NATIVE_NAMES[lang]}
                  </Text>
                </YStack>
              </XStack>
              {isActive && (
                <CheckCircleLinear size={24} color={theme.color11?.val} style={{ marginLeft: 8 }} />
              )}
            </Button>
          );
        })}
      </YStack>
    </BottomSheet>
  );
}
