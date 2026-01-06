import { Spinner, Text, useTheme, YStack } from 'tamagui';

import type { LoadingProps } from './loading.types';

const sizeMap = {
  small: 'small',
  medium: 'large',
  large: 'large',
} as const;

export function Loading({ size = 'medium', message, fullScreen = false, color }: LoadingProps) {
  const theme = useTheme();
  const spinnerColor = color ?? theme.color?.val;

  const content = (
    <YStack gap="$3" items="center" justify="center">
      <Spinner size={sizeMap[size]} color={spinnerColor} />
      {message && (
        <Text color="$color11" fontSize={size === 'small' ? '$2' : '$3'}>
          {message}
        </Text>
      )}
    </YStack>
  );

  if (fullScreen) {
    return (
      <YStack
        flex={1}
        items="center"
        justify="center"
        bg="$background"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={1000}
      >
        {content}
      </YStack>
    );
  }

  return content;
}
