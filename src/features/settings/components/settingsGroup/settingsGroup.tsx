import { Children, Fragment, isValidElement, type ReactNode } from 'react';
import { Text, YStack } from 'tamagui';

export interface SettingsGroupProps {
  title?: string;
  children: ReactNode;
  footer?: string;
}

export function SettingsGroup({ title, children, footer }: SettingsGroupProps) {
  const items = Children.toArray(children);

  return (
    <YStack gap="$2" width="100%">
      {title && (
        <Text
          paddingHorizontal="$4"
          color="$color11"
          fontSize="$3"
          textTransform="uppercase"
          fontWeight="600"
        >
          {title}
        </Text>
      )}

      <YStack backgroundColor="$background" overflow="hidden" gap="$2">
        {items.map((child, index) => (
          <Fragment key={isValidElement(child) ? child.key : `item-${index}`}>{child}</Fragment>
        ))}
      </YStack>

      {footer && (
        <Text paddingHorizontal="$4" color="$color10" fontSize="$2">
          {footer}
        </Text>
      )}
    </YStack>
  );
}
