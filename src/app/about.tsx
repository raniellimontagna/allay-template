import { Link } from 'expo-router';
import { Button, H1, Text, XStack, YStack } from 'tamagui';

export default function AboutScreen() {
  return (
    <YStack flex={1} bg="$background" items="center" justify="center" p="$4" gap="$4">
      <H1 color="$color">📖 About</H1>
      <Text color="$color" text="center">
        This is a template for building apps with:
      </Text>

      <YStack gap="$2" items="flex-start">
        <XStack gap="$2">
          <Text color="$green10">✅</Text>
          <Text color="$color">Expo SDK 54</Text>
        </XStack>
        <XStack gap="$2">
          <Text color="$green10">✅</Text>
          <Text color="$color">TypeScript</Text>
        </XStack>
        <XStack gap="$2">
          <Text color="$green10">✅</Text>
          <Text color="$color">Expo Router</Text>
        </XStack>
        <XStack gap="$2">
          <Text color="$green10">✅</Text>
          <Text color="$color">Tamagui</Text>
        </XStack>
        <XStack gap="$2">
          <Text color="$green10">✅</Text>
          <Text color="$color">Biome</Text>
        </XStack>
        <XStack gap="$2">
          <Text color="$green10">✅</Text>
          <Text color="$color">Zustand</Text>
        </XStack>
      </YStack>

      <Link href="/" asChild>
        <Button size="$4">← Back to Home</Button>
      </Link>
    </YStack>
  );
}
