import { MoonLinear, SunLinear } from '@solar-icons/react-native';
import { useTranslation } from 'react-i18next';
import { Button, H1, Text, XStack, YStack } from 'tamagui';

import { SafeAreaContainer } from '@/components';
import { useToast } from '@/components/ui';
import { useAppStore } from '@/stores';

export default function HomeTab() {
  const { t } = useTranslation();
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const toast = useToast();

  const handleToggleTheme = () => {
    const newMode = theme === 'dark' ? 'light' : 'dark';
    toggleTheme();
    toast.show(t('home.themeChanged'), {
      message: t('home.switchedTo', { mode: newMode }),
      additionalInfo: { type: 'info' },
    });
  };

  return (
    <SafeAreaContainer edges={['top']}>
      <YStack flex={1} items="center" justify="center" p="$4" gap="$4">
        <H1 size="$6">🏠 {t('home.title')}</H1>
        <Text color="$color11" text="center">
          {t('home.welcome')}
        </Text>

        <Button size="$3" onPress={handleToggleTheme}>
          <XStack gap="$2" items="center">
            {theme === 'dark' ? <SunLinear size={18} color="white" /> : <MoonLinear size={18} />}
            <Text>{theme === 'dark' ? t('home.lightMode') : t('home.darkMode')}</Text>
          </XStack>
        </Button>
      </YStack>
    </SafeAreaContainer>
  );
}
