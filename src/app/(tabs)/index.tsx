import { MoonLinear, SunLinear } from '@solar-icons/react-native';
import { Button, H1, Text, XStack, YStack } from 'tamagui';

import { SafeAreaContainer } from '@/components';
import { useToast } from '@/components/ui';
import { useAppStore } from '@/stores';

export default function HomeTab() {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const toast = useToast();

  return (
    <SafeAreaContainer edges={['top']}>
      <YStack flex={1} items="center" justify="center" p="$4" gap="$4">
        <H1 size="$6">🏠 Home</H1>
        <Text color="$color11" text="center">
          Welcome to the home tab
        </Text>

        <Button
          size="$3"
          onPress={() => {
            toggleTheme();
            toast.show('Theme Changed', {
              message: `Switched to ${theme === 'dark' ? 'light' : 'dark'} mode`,
              additionalInfo: { type: 'info' },
            });
          }}
        >
          <XStack gap="$2" items="center">
            {theme === 'dark' ? <SunLinear size={18} color="white" /> : <MoonLinear size={18} />}
            <Text>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</Text>
          </XStack>
        </Button>
      </YStack>
    </SafeAreaContainer>
  );
}
