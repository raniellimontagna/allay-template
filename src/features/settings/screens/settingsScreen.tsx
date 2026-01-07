import { GlobalLinear, SettingsLinear } from '@solar-icons/react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { H1, Text, useTheme, YStack } from 'tamagui';

import { SafeAreaContainer } from '@/components';
import { getCurrentLanguage } from '@/lib';
import { useAppStore } from '@/stores';
import { SettingsGroup } from '../components/settingsGroup';
import { SettingsItem } from '../components/settingsItem';
import { LanguageSheet } from '../sheets/languageSheet/languageSheet';
import { ThemeSheet } from '../sheets/themeSheet/themeSheet';

export function SettingsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const themeMode = useAppStore((state) => state.theme);

  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const [isThemeSheetOpen, setIsThemeSheetOpen] = useState(false);

  const currentLang = getCurrentLanguage();

  return (
    <SafeAreaContainer edges={['top']}>
      <YStack flex={1} bg="$background">
        <YStack p="$4" pb="$6" items="center" gap="$4">
          <YStack
            width={64}
            height={64}
            borderRadius="$10"
            items="center"
            justify="center"
            bg="$color4"
          >
            <SettingsLinear size={32} color={theme.color11?.val} />
          </YStack>
          <YStack items="center" gap="$1">
            <H1 size="$6" fontWeight="700">
              {t('settings.title')}
            </H1>
            <Text color="$color10" fontSize="$4" textAlign="center">
              {t('settings.description')}
            </Text>
          </YStack>
        </YStack>

        <YStack flex={1} px="$4" gap="$6">
          <SettingsGroup title={t('settings.title')} footer="Customize your experience">
            <SettingsItem
              title={t('settings.language')}
              subtitle={t(`languages.${currentLang}`)}
              icon={<GlobalLinear size={24} color={theme.color11?.val} />}
              onPress={() => setIsLanguageSheetOpen(true)}
            />
            <SettingsItem
              title={t('settings.theme.title')}
              subtitle={t(`settings.theme.${themeMode}`)}
              icon={<SettingsLinear size={24} color={theme.color11?.val} />}
              onPress={() => setIsThemeSheetOpen(true)}
            />
          </SettingsGroup>
        </YStack>

        {/* Sheets */}
        <LanguageSheet isOpen={isLanguageSheetOpen} onClose={() => setIsLanguageSheetOpen(false)} />
        <ThemeSheet isOpen={isThemeSheetOpen} onClose={() => setIsThemeSheetOpen(false)} />
      </YStack>
    </SafeAreaContainer>
  );
}
