import { CheckCircleLinear, MoonLinear, SunLinear } from '@solar-icons/react-native';
import { useTranslation } from 'react-i18next';
import { Button, Text, useTheme, XStack, YStack } from 'tamagui';

import { BottomSheet } from '@/components/ui';
import { useAppStore } from '@/stores';

interface ThemeSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeSheet({ isOpen, onClose }: ThemeSheetProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { theme: currentTheme, setTheme } = useAppStore();

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    onClose();
  };

  const themes = [
    {
      value: 'light',
      title: t('settings.theme.light'),
      description: t('settings.theme.lightDescription'),
      Icon: SunLinear,
    },
    {
      value: 'dark',
      title: t('settings.theme.dark'),
      description: t('settings.theme.darkDescription'),
      Icon: MoonLinear,
    },
  ] as const;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} snapPoints={['40%']}>
      <YStack padding="$4" gap="$3">
        {themes.map((item) => {
          const isActive = currentTheme === item.value;
          const Icon = item.Icon;

          return (
            <Button
              key={item.value}
              size="$6"
              height="auto"
              paddingVertical="$3"
              onPress={() => handleThemeChange(item.value)}
              backgroundColor="$background"
              borderWidth={1}
              borderColor={isActive ? '$color11' : '$borderColor'}
              pressStyle={{ backgroundColor: '$backgroundPress' }}
              justifyContent="flex-start"
              paddingHorizontal="$4"
              elevation={isActive ? '$1' : '$0'}
            >
              <XStack gap="$4" items="center" flex={1}>
                {/* Visual Preview / Icon Container */}
                <YStack
                  width={48}
                  height={48}
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="$4"
                  backgroundColor={isActive ? '$color4' : '$color3'}
                >
                  <Icon size={32} color={theme.color11?.val} />
                </YStack>

                <YStack flex={1} gap="$0">
                  <Text fontSize="$5" fontWeight="600" color={isActive ? '$color12' : '$color11'}>
                    {item.title}
                  </Text>
                  <Text fontSize="$3" color="$color10">
                    {item.description}
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
