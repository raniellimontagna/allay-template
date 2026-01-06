import { CompassLinear } from '@solar-icons/react-native';
import { H1, Text, useTheme, YStack } from 'tamagui';

import { SafeAreaContainer } from '@/components';

export default function ExploreTab() {
  const theme = useTheme();

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
      </YStack>
    </SafeAreaContainer>
  );
}
