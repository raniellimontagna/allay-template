import { Logout2Linear, SettingsLinear } from '@solar-icons/react-native';
import { Button, H1, Text, useTheme, YStack } from 'tamagui';

import { SafeAreaContainer } from '@/components';
import { useToast } from '@/components/ui';
import { useAppStore } from '@/stores';

export default function SettingsTab() {
  const theme = useTheme();
  const reset = useAppStore((state) => state.reset);
  const toast = useToast();

  const handleReset = () => {
    reset();
    toast.show('Settings Reset', {
      message: 'All settings have been reset to defaults',
      additionalInfo: { type: 'warning' },
    });
  };

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

          <H1 size="$6">Settings</H1>
          <Text color="$color11" text="center">
            Manage your app preferences
          </Text>
        </YStack>

        <YStack flex={1} justify="flex-end" pb="$4">
          <Button size="$4" theme="red" onPress={handleReset}>
            <Button.Icon>
              <Logout2Linear size={18} />
            </Button.Icon>
            <Button.Text>Reset All Settings</Button.Text>
          </Button>
        </YStack>
      </YStack>
    </SafeAreaContainer>
  );
}
