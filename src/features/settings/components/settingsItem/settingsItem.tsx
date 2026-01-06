import { AltArrowRightLinear } from '@solar-icons/react-native';
import { Button, Text, useTheme, XStack, YStack } from 'tamagui';

import type { SettingsItemProps } from './settingsItem.types';
import { useSettingsItem } from './useSettingsItem';

export function SettingsItem({
  title,
  subtitle,
  icon,
  rightElement,
  onPress,
  destructive,
}: SettingsItemProps) {
  const theme = useTheme();
  const { handlePress } = useSettingsItem({ onPress });

  return (
    <Button
      size="$5"
      onPress={handlePress}
      disabled={!onPress}
      pressStyle={{ opacity: onPress ? 0.7 : 1, backgroundColor: '$background' }}
      backgroundColor="$background"
      borderWidth={0}
      height="auto"
      paddingVertical="$3"
      paddingHorizontal="$4"
      justifyContent="space-between"
      width="100%"
    >
      <XStack gap="$3" items="center" flex={1}>
        {icon && (
          <XStack items="center" justify="center" width={24}>
            {icon}
          </XStack>
        )}
        <YStack flex={1}>
          <Text
            color={destructive ? '$red10' : '$color12'}
            fontWeight="500"
            fontSize="$4"
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && (
            <Text color="$color10" fontSize="$3" numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </YStack>
      </XStack>

      <XStack items="center" gap="$2">
        {rightElement}
        {onPress && !rightElement && <AltArrowRightLinear size={20} color={theme.color10?.val} />}
      </XStack>
    </Button>
  );
}
