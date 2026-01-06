import { CompassLinear, ListLinear } from '@solar-icons/react-native';
import { Button, H1, H2, Text, useTheme, YStack } from 'tamagui';

import { SafeAreaContainer } from '@/components';
import { BottomSheet, useBottomSheet } from '@/components/ui';

export default function ExploreTab() {
  const theme = useTheme();
  const sheet = useBottomSheet();

  return (
    <SafeAreaContainer edges={['top']}>
      <YStack flex={1} items="center" justify="center" p="$4" gap="$4">
        <YStack
          width={80}
          height={80}
          borderRadius="$10"
          items="center"
          justify="center"
          bg="$color3"
        >
          <CompassLinear size={40} color={theme.blue10?.val} />
        </YStack>

        <H1 size="$6">Explore</H1>
        <Text color="$color11" text="center">
          Discover new content and features
        </Text>

        <Button size="$4" onPress={sheet.open}>
          <Button.Icon>
            <ListLinear size={18} />
          </Button.Icon>
          <Button.Text>Open Bottom Sheet</Button.Text>
        </Button>
      </YStack>

      <BottomSheet isOpen={sheet.isOpen} onClose={sheet.close} snapPoints={['40%', '80%']}>
        <YStack p="$4" gap="$4">
          <H2 size="$5">Bottom Sheet Content</H2>
          <Text color="$color11">
            This is an example of the bottom sheet component. You can add any content here.
          </Text>
          <Button size="$3" variant="outlined" onPress={sheet.close}>
            <Button.Text>Close</Button.Text>
          </Button>
        </YStack>
      </BottomSheet>
    </SafeAreaContainer>
  );
}
